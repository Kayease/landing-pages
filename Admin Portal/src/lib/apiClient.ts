export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiClientOptions {
  baseUrl?: string;
  getAccessToken?: () => string | null | undefined;
  defaultHeaders?: Record<string, string>;
  requestTimeoutMs?: number;
}

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: TBody;
  signal?: AbortSignal;
}

export interface ApiErrorPayload {
  message: string;
  code?: string | number;
  details?: unknown;
}

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload | unknown;

  constructor(message: string, status: number, payload?: ApiErrorPayload | unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function buildQueryString(query?: RequestOptions["query"]): string {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function withTimeout<T>(promise: Promise<T>, ms: number, controller: AbortController): Promise<T> {
  if (!ms) return promise;
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
}

export function createApiClient(options?: ApiClientOptions) {
  const baseUrl = (options?.baseUrl ?? import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  const requestTimeoutMs = options?.requestTimeoutMs ?? 15000;

  async function request<TResponse = unknown, TBody = unknown>(path: string, reqOptions?: RequestOptions<TBody>): Promise<TResponse> {
    const method = (reqOptions?.method ?? "GET") as HttpMethod;
    const controller = new AbortController();
    const headers: Record<string, string> = {
      "Accept": "application/json",
      ...(reqOptions?.body ? { "Content-Type": "application/json" } : {}),
      ...(options?.defaultHeaders ?? {}),
      ...(reqOptions?.headers ?? {}),
    };

    const token = options?.getAccessToken?.();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const query = buildQueryString(reqOptions?.query);
    const url = `${baseUrl}${path}${query}`;

    const fetchPromise = fetch(url, {
      method,
      headers,
      body: reqOptions?.body ? JSON.stringify(reqOptions.body) : undefined,
      signal: reqOptions?.signal ?? controller.signal,
      credentials: "include",
    }).then(async (res) => {
      const contentType = res.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

      if (!res.ok) {
        const payload: ApiErrorPayload | unknown = isJson ? data : { message: String(data ?? res.statusText) };
        const message = (payload as ApiErrorPayload)?.message || res.statusText || "Request failed";
        throw new ApiError(message, res.status, payload);
      }

      return (data as TResponse);
    });

    return withTimeout(fetchPromise, requestTimeoutMs, controller);
  }

  return {
    request,
    get: <TResponse = unknown>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
      request<TResponse>(path, { ...opts, method: "GET" }),
    post: <TResponse = unknown, TBody = unknown>(path: string, body?: TBody, opts?: Omit<RequestOptions<TBody>, "method" | "body">) =>
      request<TResponse, TBody>(path, { ...opts, method: "POST", body }),
    put: <TResponse = unknown, TBody = unknown>(path: string, body?: TBody, opts?: Omit<RequestOptions<TBody>, "method" | "body">) =>
      request<TResponse, TBody>(path, { ...opts, method: "PUT", body }),
    patch: <TResponse = unknown, TBody = unknown>(path: string, body?: TBody, opts?: Omit<RequestOptions<TBody>, "method" | "body">) =>
      request<TResponse, TBody>(path, { ...opts, method: "PATCH", body }),
    delete: <TResponse = unknown>(path: string, opts?: Omit<RequestOptions, "method" | "body">) =>
      request<TResponse>(path, { ...opts, method: "DELETE" }),
  };
}

export const apiClient = createApiClient({
  getAccessToken: () => {
    try {
      return localStorage.getItem("access_token");
    } catch {
      return null;
    }
  },
});

// Convenience types for common patterns
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}


