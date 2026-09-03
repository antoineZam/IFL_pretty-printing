/**
 * Shared API client.
 *
 * The one rule this module exists to enforce: a non-OK response never reaches
 * component state. Before this existed, ~79 inline fetches each hand-rolled a
 * try/catch and about half of them fed the parsed body straight into typed
 * state -- so a 401 stored {error:'Unauthorized'} into a variable typed as an
 * array, and the next render called .filter() on it and threw. A render throw
 * is not catchable by the surrounding try/catch, so the page went blank.
 *
 * Auth headers are injected globally for /api/* in main.tsx; this layer is
 * only about status handling, parsing and typed failure.
 */

export class ApiError extends Error {
    readonly status: number;
    readonly url: string;
    readonly body: string;

    constructor(status: number, url: string, body: string) {
        super(
            status === 401 || status === 403
                ? 'Unauthorized - your connection key is missing, wrong or expired.'
                : `Request failed (${status}) for ${url}`
        );
        this.name = 'ApiError';
        this.status = status;
        this.url = url;
        this.body = body;
    }

    /** True when the failure is an auth problem the operator can fix by re-entering the key. */
    get isAuthError(): boolean {
        return this.status === 401 || this.status === 403;
    }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);

    if (!res.ok) {
        // Read the body for diagnostics, but never let a parse failure mask the status.
        let body = '';
        try {
            body = await res.text();
        } catch {
            /* ignore */
        }
        throw new ApiError(res.status, url, body);
    }

    // 204 and empty bodies are legitimate successes for the POST/PUT routes here.
    const text = await res.text();
    if (text === '') {
        return undefined as T;
    }

    try {
        return JSON.parse(text) as T;
    } catch {
        throw new ApiError(res.status, url, text.slice(0, 200));
    }
}

export function apiGet<T>(url: string, init?: RequestInit): Promise<T> {
    return request<T>(url, init);
}

export function apiPost<T>(url: string, body?: unknown, init?: RequestInit): Promise<T> {
    return sendJson<T>('POST', url, body, init);
}

export function apiPut<T>(url: string, body?: unknown, init?: RequestInit): Promise<T> {
    return sendJson<T>('PUT', url, body, init);
}

function sendJson<T>(method: string, url: string, body?: unknown, init?: RequestInit): Promise<T> {
    return request<T>(url, {
        ...init,
        method,
        headers: {
            'Content-Type': 'application/json',
            ...((init?.headers as Record<string, string>) ?? {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
}

export function apiDelete<T>(url: string, init?: RequestInit): Promise<T> {
    return request<T>(url, { method: 'DELETE', ...init });
}

/**
 * Guard for the specific shape that caused the white-screens: state typed as an
 * array being handed something that is not one. Use at every boundary where a
 * response feeds a variable the render calls .map()/.filter() on.
 */
export function asArray<T>(value: unknown): T[] {
    return Array.isArray(value) ? (value as T[]) : [];
}

/** Human-readable message for any thrown value, for showing in an error banner. */
export function errorMessage(err: unknown): string {
    if (err instanceof ApiError) return err.message;
    if (err instanceof Error) return err.message;
    return String(err);
}
