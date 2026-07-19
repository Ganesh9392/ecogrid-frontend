// Centralized endpoint registry — swap paths here when Django API is ready.
export const endpoints = {
  dashboard: { summary: "/dashboard/summary", charts: "/dashboard/charts" },
  buildings: { list: "/buildings", detail: (id: string) => `/buildings/${id}` },
  floors: { list: "/floors", byBuilding: (id: string) => `/buildings/${id}/floors` },
  rooms: { list: "/rooms", byFloor: (id: string) => `/floors/${id}/rooms` },
  fixtures: {
    list: "/fixtures",
    detail: (id: string) => `/fixtures/${id}`,
    control: (id: string) => `/fixtures/${id}/control`,
  },
  zones: { list: "/zones" },
  automation: { list: "/automation/rules" },
  ai: { insights: "/ai/insights" },
  energy: { analytics: "/energy/analytics" },
  alerts: { list: "/alerts" },
  reports: { list: "/reports" },
  users: { list: "/users", me: "/users/me" },
  settings: { org: "/settings/organization", notifications: "/settings/notifications" },
} as const;