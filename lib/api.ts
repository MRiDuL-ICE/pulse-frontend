const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost"

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
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
  pageviews: (token: string, start?: string, end?: string) => {
    const p = new URLSearchParams()
    if (start) p.set("start", start)
    if (end) p.set("end", end)
    return request<{ data: { bucket: string; count: number }[] }>(`/api/v1/analytics/pageviews?${p}`, {}, token)
  },
  topPages: (token: string, limit = 10) =>
    request<{ data: { url: string; count: number }[] }>(`/api/v1/analytics/top-pages?limit=${limit}`, {}, token),
  eventBreakdown: (token: string) =>
    request<{ data: { event_type: string; count: number }[] }>("/api/v1/analytics/events", {}, token),
}

export const apiKeys = {
  list: (token: string) => request<ApiKey[]>("/api/v1/api-keys", {}, token),
  create: (token: string, name: string) =>
    request<ApiKey & { key: string; warning: string }>("/api/v1/api-keys", { method: "POST", body: JSON.stringify({ name }) }, token),
  revoke: (token: string, id: string) => request<void>(`/api/v1/api-keys/${id}`, { method: "DELETE" }, token),
}

export const tenant = {
  me: (token: string) =>
    request<{ id: string; name: string; slug: string }>("/api/v1/tenants/me", {}, token),
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
