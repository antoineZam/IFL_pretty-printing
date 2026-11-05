import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Intercept all /api/* fetch calls and inject auth headers so no individual
// page needs to manually manage the keys in headers.
//
// The query string wins over localStorage, matching useConnectionKey(): an OBS
// browser source carries its keys as ?key=… (and ?iffKey=… for /api/iff and
// /api/rib) because OBS does not share localStorage between sources. Reading
// only localStorage here meant an overlay's socket connected while its first
// REST load answered 401/403, leaving the source blank.
;(() => {
  const nativeFetch = window.fetch.bind(window);
  const readKey = (param: string, storageKey: string): string => {
    const fromUrl = new URLSearchParams(window.location.search).get(param);
    if (fromUrl) return fromUrl;
    try {
      return localStorage.getItem(storageKey) ?? '';
    } catch {
      return '';
    }
  };
  window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (typeof input === 'string' && input.startsWith('/api')) {
      const connectionKey = readKey('key', 'connectionKey');
      const ribKey = readKey('iffKey', 'ribAccessKey');
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
