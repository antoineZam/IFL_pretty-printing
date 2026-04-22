import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Intercept all /api/* fetch calls and inject auth headers from localStorage
// so no individual page needs to manually manage the connection key in headers.
;(() => {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (typeof input === 'string' && input.startsWith('/api')) {
      const connectionKey = localStorage.getItem('connectionKey') ?? '';
      const ribKey = localStorage.getItem('ribAccessKey') ?? '';
      const injected: Record<string, string> = {};
      if (connectionKey) injected['X-Connection-Key'] = connectionKey;
      if (ribKey) injected['X-IFF-Key'] = ribKey;
      const callerHeaders = (init?.headers as Record<string, string>) ?? {};
      init = { ...init, headers: { ...injected, ...callerHeaders } };
    }
    return nativeFetch(input, init);
  };
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
