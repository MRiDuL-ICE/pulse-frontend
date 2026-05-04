const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost"

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  // Don't make API calls during build/SSR
  if (typeof window === 'undefined') {
    // Return default values based on type
    if (path.includes('/sites')) return [] as T;
    if (path.includes('/tenants/me')) return { id: '', name: 'UNKNOWN', slug: '' } as T;
    if (path.includes('/api-keys')) return [] as T;
    if (path.includes('/analytics/')) return { data: [] } as T;
    return null as T;
  }
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }
  if (token) headers["Authorization"] = `Bearer ${token}`
  const res = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: "include" })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }))
    throw new Error(err.detail || "Request failed")
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const auth = {
  register: (data: { email: string; password: string; tenant_name: string; tenant_slug: string }) =>
    request("/api/v1/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    request<{ access_token: string; refresh_token: string }>("/api/v1/auth/login", { method: "POST", body: JSON.stringify(data) }),
  logout: (refresh_token: string, token: string) =>
    request("/api/v1/auth/logout", { method: "POST", body: JSON.stringify({ refresh_token }) }, token)
}

export const analytics = {
  pageviews: (token: string, site_id: string, start?: string, end?: string) => {
    const p = new URLSearchParams()
    p.set("site_id", site_id)
    if (start) p.set("start", start)
    if (end) p.set("end", end)
    return request<{ data: { bucket: string; count: number }[] }>(`/api/v1/analytics/pageviews?${p}`, {}, token)
  },
  topPages: (token: string, site_id: string, limit: number = 10) =>
    request<{ data: { url: string; count: number }[] }>(`/api/v1/analytics/top-pages?site_id=${site_id}&limit=${limit}`, {}, token),
  eventBreakdown: (token: string, site_id: string) =>
    request<{ data: { event_type: string; count: number }[] }>(`/api/v1/analytics/events?site_id=${site_id}`, {}, token),
}

export const apiKeys = {
  list: (token: string) => request<ApiKey[]>("/api/v1/api-keys", {}, token),
  create: (token: string, name: string, site_id: string) =>
    request<ApiKey & { key: string; warning: string }>("/api/v1/api-keys", { method: "POST", body: JSON.stringify({ name, site_id }) }, token),
  revoke: (token: string, id: string) => request<void>(`/api/v1/api-keys/${id}`, { method: "DELETE" }, token),
}

export const tenant = {
  me: (token: string) =>
    request<{ id: string; name: string; slug: string }>("/api/v1/tenants/me", {}, token),
}

export const sites = {
  list: (token: string) =>
    request<Site[]>("/api/v1/sites", {}, token),

  create: (token: string, name: string, domain: string) =>
    request<Site>("/api/v1/sites", {
      method: "POST",
      body: JSON.stringify({ name, domain }),
    }, token),

  remove: (token: string, id: string) =>
    request<void>(`/api/v1/sites/${id}`, { method: "DELETE" }, token),
}

export interface ApiKey {
  id: string
  tenant_id: string
  name: string
  key_prefix: string
  is_active: boolean
  last_used_at: string | null
  created_at: string
}

export interface Site {
  id: string
  name: string
  domain: string
  is_active: boolean
  created_at: string
}