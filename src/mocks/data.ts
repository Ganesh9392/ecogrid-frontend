import type {
  Alert,
  AiInsight,
  AutomationRule,
  Building,
  DashboardSummary,
  Fixture,
  Floor,
  OrgUser,
  ReportItem,
  Room,
  Zone,
} from "@/features/types";

export const buildings: Building[] = [
  { id: "B-01", name: "HQ Tower", address: "120 Market St", city: "San Francisco", floors: 18, rooms: 220, fixtures: 1840, energyKwh: 4820, status: "online", occupancyRate: 0.72 },
  { id: "B-02", name: "Innovation Campus", address: "88 Innovation Way", city: "Austin", floors: 6, rooms: 96, fixtures: 812, energyKwh: 1980, status: "online", occupancyRate: 0.61 },
  { id: "B-03", name: "West Distribution", address: "500 Logistics Blvd", city: "Denver", floors: 3, rooms: 42, fixtures: 640, energyKwh: 3210, status: "online", occupancyRate: 0.44 },
  { id: "B-04", name: "Research Annex", address: "22 Science Park", city: "Boston", floors: 8, rooms: 118, fixtures: 990, energyKwh: 2610, status: "offline", occupancyRate: 0.5 },
  { id: "B-05", name: "Downtown Office", address: "310 Grand Ave", city: "Chicago", floors: 12, rooms: 164, fixtures: 1420, energyKwh: 3780, status: "online", occupancyRate: 0.68 },
];

export const floors: Floor[] = Array.from({ length: 12 }).map((_, i) => {
  const b = buildings[i % buildings.length]!;
  return {
    id: `F-${i + 1}`,
    buildingId: b.id,
    buildingName: b.name,
    name: `Floor ${((i % 8) + 1).toString().padStart(2, "0")}`,
    level: (i % 8) + 1,
    rooms: 12 + (i % 6),
    fixtures: 80 + i * 7,
    energyKwh: 180 + i * 24,
  };
});

const roomTypes: Room["type"][] = ["Office", "Meeting", "Lobby", "Corridor", "Server Room", "Cafeteria"];
export const rooms: Room[] = Array.from({ length: 18 }).map((_, i) => {
  const f = floors[i % floors.length]!;
  return {
    id: `R-${i + 1}`,
    floorId: f.id,
    floorName: f.name,
    buildingName: f.buildingName,
    name: `${roomTypes[i % roomTypes.length]} ${100 + i}`,
    type: roomTypes[i % roomTypes.length]!,
    fixtures: 6 + (i % 8),
    occupied: i % 3 !== 0,
    temperatureC: 21 + (i % 5),
  };
});

export const fixtures: Fixture[] = Array.from({ length: 24 }).map((_, i) => {
  const r = rooms[i % rooms.length]!;
  const online = i % 7 !== 0;
  return {
    id: `L-${1000 + i}`,
    name: `Fixture ${1000 + i}`,
    roomId: r.id,
    roomName: r.name,
    buildingName: r.buildingName,
    isOn: online && i % 4 !== 0,
    brightness: online ? 40 + ((i * 7) % 60) : 0,
    powerW: online ? 12 + ((i * 3) % 24) : 0,
    voltageV: online ? 228 + (i % 8) : 0,
    currentA: online ? +(0.08 + (i % 6) * 0.03).toFixed(2) : 0,
    operatingHours: 1200 + i * 137,
    health: i % 9 === 0 ? "critical" : i % 5 === 0 ? "warning" : "healthy",
    firmware: `v2.${(i % 6) + 1}.${i % 3}`,
    status: online ? "online" : "offline",
  };
});

export const zones: Zone[] = [
  { id: "Z-1", name: "North Wing Offices", buildingName: "HQ Tower North", fixtureCount: 84, scene: "Work", brightness: 80, isOn: true },
  { id: "Z-2", name: "Executive Boardroom", buildingName: "HQ Tower North", fixtureCount: 24, scene: "Meeting", brightness: 60, isOn: true },
  { id: "Z-3", name: "Lobby & Reception", buildingName: "Downtown Office", fixtureCount: 40, scene: "Evening", brightness: 45, isOn: true },
  { id: "Z-4", name: "Warehouse Bay A", buildingName: "West Distribution", fixtureCount: 120, scene: "Work", brightness: 100, isOn: true },
  { id: "Z-5", name: "Cafeteria", buildingName: "Innovation Campus", fixtureCount: 32, scene: "Off", brightness: 0, isOn: false },
  { id: "Z-6", name: "Lab East", buildingName: "Research Annex", fixtureCount: 56, scene: "Custom", brightness: 70, isOn: true },
];

export const automationRules: AutomationRule[] = [
  { id: "A-1", name: "Auto-off on vacancy", trigger: "No occupancy > 10 min", action: "Turn OFF fixtures", scope: "All rooms", enabled: true, lastRun: "2m ago" },
  { id: "A-2", name: "Daylight harvesting", trigger: "Ambient > 400 lux", action: "Dim to 40%", scope: "Perimeter zones", enabled: true, lastRun: "12m ago" },
  { id: "A-3", name: "Office schedule", trigger: "Mon–Fri 07:00", action: "Turn ON at 60%", scope: "Offices", enabled: true, lastRun: "Today 07:00" },
  { id: "A-4", name: "Holiday mode", trigger: "Public holiday", action: "Keep OFF except safety", scope: "All buildings", enabled: false },
  { id: "A-5", name: "Energy-saving mode", trigger: "Peak tariff window", action: "Cap brightness at 70%", scope: "Non-critical zones", enabled: true, lastRun: "45m ago" },
];

export const aiInsights: AiInsight[] = [
  { id: "AI-1", category: "Energy Saving", title: "Reduce corridor brightness after 20:00", detail: "Corridor fixtures run at 90% brightness past working hours. Reducing to 40% saves ~1,850 kWh/month.", impact: "High", savingsUsd: 420 },
  { id: "AI-2", category: "Occupancy Prediction", title: "Meeting Room 204 predicted idle 14:00–16:00", detail: "Based on 30-day patterns, occupancy < 5%. Schedule OFF window.", impact: "Medium" },
  { id: "AI-3", category: "Brightness Optimization", title: "Increase daylight harvesting on 6th floor", detail: "South-facing offices have 620 lux ambient by 10:00. Aggressive dim schedule recommended.", impact: "Medium", savingsUsd: 180 },
  { id: "AI-4", category: "Anomaly Detection", title: "Fixture L-1017 drawing 32W (nominal 18W)", detail: "Sustained over-current for 6 days. Likely driver degradation.", impact: "High" },
  { id: "AI-5", category: "Usage Trend", title: "Weekend lighting up 12% MoM", detail: "West Distribution weekend hours trending up. Verify cleaning-crew schedules.", impact: "Low" },
  { id: "AI-6", category: "Predictive Maintenance", title: "42 fixtures approaching 40k operating hours", detail: "Schedule preventive replacement in Q3 to avoid outage clusters.", impact: "Medium" },
];

export const alerts: Alert[] = [
  { id: "AL-1", type: "Fixture Offline", severity: "critical", source: "L-1006", building: "HQ Tower North", createdAt: "10 min ago", acknowledged: false },
  { id: "AL-2", type: "High Energy Usage", severity: "warning", source: "Zone Warehouse Bay A", building: "West Distribution", createdAt: "42 min ago", acknowledged: false },
  { id: "AL-3", type: "Voltage Abnormality", severity: "warning", source: "Panel 3-B", building: "Downtown Office", createdAt: "1 h ago", acknowledged: true },
  { id: "AL-4", type: "Communication Failure", severity: "critical", source: "Gateway GW-04", building: "Research Annex", createdAt: "2 h ago", acknowledged: false },
  { id: "AL-5", type: "Fixture Fault", severity: "warning", source: "L-1017", building: "HQ Tower North", createdAt: "5 h ago", acknowledged: false },
  { id: "AL-6", type: "Maintenance Required", severity: "info", source: "42 fixtures", building: "Multiple", createdAt: "Yesterday", acknowledged: true },
];

export const reports: ReportItem[] = [
  { id: "RP-1", name: "Daily Energy — HQ Tower North", type: "Daily Energy", generatedAt: "Today 06:00", sizeKb: 184 },
  { id: "RP-2", name: "Monthly Energy — All Buildings", type: "Monthly Energy", generatedAt: "1 Jul", sizeKb: 942 },
  { id: "RP-3", name: "Lighting Performance — Q2", type: "Lighting Performance", generatedAt: "5 Jul", sizeKb: 612 },
  { id: "RP-4", name: "Maintenance Log — June", type: "Maintenance", generatedAt: "2 Jul", sizeKb: 348 },
  { id: "RP-5", name: "Energy Saving — YTD", type: "Energy Saving", generatedAt: "10 Jul", sizeKb: 720 },
];

export const orgUsers: OrgUser[] = [
  { id: "U-1", name: "Amelia Chen", email: "amelia.chen@ecogrid.io", role: "Admin", building: "All", lastActive: "just now", active: true },
  { id: "U-2", name: "Marcus Reyes", email: "m.reyes@ecogrid.io", role: "Manager", building: "HQ Tower North", lastActive: "12 min ago", active: true },
  { id: "U-3", name: "Priya Nair", email: "priya@ecogrid.io", role: "Operator", building: "Downtown Office", lastActive: "1 h ago", active: true },
  { id: "U-4", name: "Jonas Weber", email: "jonas@ecogrid.io", role: "Operator", building: "Innovation Campus", lastActive: "3 h ago", active: true },
  { id: "U-5", name: "Sara Kim", email: "sara.kim@ecogrid.io", role: "Viewer", building: "Research Annex", lastActive: "yesterday", active: false },
];

export const dashboardSummary: DashboardSummary = {
  totalBuildings: buildings.length,
  totalFloors: buildings.reduce((s, b) => s + b.floors, 0),
  totalRooms: buildings.reduce((s, b) => s + b.rooms, 0),
  totalFixtures: buildings.reduce((s, b) => s + b.fixtures, 0),
  onlineFixtures: fixtures.filter((f) => f.status === "online").length + 5310,
  offlineFixtures: fixtures.filter((f) => f.status === "offline").length + 92,
  energyKwh: buildings.reduce((s, b) => s + b.energyKwh, 0),
  energySavedKwh: 2840,
  carbonReducedKg: 1642,
  activeAlerts: alerts.filter((a) => !a.acknowledged).length,
  occupiedRooms: rooms.filter((r) => r.occupied).length + 380,
  vacantRooms: rooms.filter((r) => !r.occupied).length + 122,
};

export const dailyEnergy = Array.from({ length: 24 }).map((_, h) => ({
  hour: `${h.toString().padStart(2, "0")}:00`,
  kwh: Math.round(120 + Math.sin((h / 24) * Math.PI * 2) * 60 + Math.random() * 30),
  saved: Math.round(20 + Math.random() * 30),
}));

export const monthlyEnergy = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({
  month: m,
  usage: Math.round(9000 + Math.sin(i / 2) * 1500 + i * 90),
  saved: Math.round(600 + i * 80 + Math.random() * 200),
}));

export const buildingComparison = buildings.map((b) => ({
  name: b.name.split(" ").slice(0, 2).join(" "),
  usage: b.energyKwh,
  saved: Math.round(b.energyKwh * 0.18),
}));

export const floorComparison = floors.slice(0, 8).map((f) => ({
  name: `${f.buildingName.split(" ")[0]} · ${f.name}`,
  usage: f.energyKwh,
}));

export const occupancyTrend = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  day: d,
  occupancy: Math.round(30 + (i < 5 ? 55 : 15) + Math.random() * 8),
}));