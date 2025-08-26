import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UsersApi, type ListUsersParams, type UserRecord } from './api'

export const usersKeys = {
  all: ['users'] as const,
  list: (params?: ListUsersParams) => [...usersKeys.all, 'list', params] as const,
}

export function useUsers(params?: ListUsersParams) {
  return useQuery({ queryKey: usersKeys.list(params), queryFn: () => UsersApi.list(params) })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (user: Omit<UserRecord, 'id'>) => UsersApi.create(user),
    onSuccess: () => qc.invalidateQueries({ queryKey: usersKeys.all }),
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<UserRecord, 'id'>> }) => UsersApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: usersKeys.all }),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => UsersApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: usersKeys.all }),
  })
}


