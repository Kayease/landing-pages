import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_DEMO_MSW === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' }, onUnhandledRequest: 'bypass' })
  }
}

enableMocking().finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);
})
