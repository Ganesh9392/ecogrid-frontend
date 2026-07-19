export type OnlineStatus = "online" | "offline";
export type HealthStatus = "healthy" | "warning" | "critical";

export interface Building {
  id: string;
  name: string;
  address: string;
  city: string;
  floors: number;
  rooms: number;
  fixtures: number;
  energyKwh: number;
  status: OnlineStatus;
  occupancyRate: number;
}

export interface Floor {
  id: string;
  buildingId: string;
  buildingName: string;
  name: string;
  level: number;
  rooms: number;
  fixtures: number;
  energyKwh: number;
}

export interface Room {
  id: string;
  floorId: string;
  floorName: string;
  buildingName: string;
  name: string;
  type: "Office" | "Meeting" | "Lobby" | "Corridor" | "Server Room" | "Cafeteria";
  fixtures: number;
  occupied: boolean;
  temperatureC: number;
}

export interface Fixture {
  id: string;
  name: string;
  roomId: string;
  roomName: string;
  buildingName: string;
  isOn: boolean;
  brightness: number;
  powerW: number;
  voltageV: number;
  currentA: number;
  operatingHours: number;
  health: HealthStatus;
  firmware: string;
  status: OnlineStatus;
}

export interface Zone {
  id: string;
  name: string;
  buildingName: string;
  fixtureCount: number;
  scene: "Work" | "Meeting" | "Evening" | "Off" | "Custom";
  brightness: number;
  isOn: boolean;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  scope: string;
  enabled: boolean;
  lastRun?: string;
}

export interface AiInsight {
  id: string;
  category:
    | "Energy Saving"
    | "Occupancy Prediction"
    | "Brightness Optimization"
    | "Anomaly Detection"
    | "Usage Trend"
    | "Predictive Maintenance";
  title: string;
  detail: string;
  impact: "High" | "Medium" | "Low";
  savingsUsd?: number;
}

export interface Alert {
  id: string;
  type:
    | "Fixture Offline"
    | "Communication Failure"
    | "High Energy Usage"
    | "Voltage Abnormality"
    | "Fixture Fault"
    | "Maintenance Required";
  severity: "critical" | "warning" | "info";
  source: string;
  building: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface ReportItem {
  id: string;
  name: string;
  type: "Daily Energy" | "Monthly Energy" | "Lighting Performance" | "Maintenance" | "Energy Saving";
  generatedAt: string;
  sizeKb: number;
}

export interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Operator" | "Viewer";
  building: string;
  lastActive: string;
  active: boolean;
}

export interface DashboardSummary {
  totalBuildings: number;
  totalFloors: number;
  totalRooms: number;
  totalFixtures: number;
  onlineFixtures: number;
  offlineFixtures: number;
  energyKwh: number;
  energySavedKwh: number;
  carbonReducedKg: number;
  activeAlerts: number;
  occupiedRooms: number;
  vacantRooms: number;
}

// export interface DashboardSummary {
//   totalBuildings: number;
//   totalFixtures: number;
//   onlineFixtures: number;
//   offlineFixtures: number;
//   energyKwh: number;
//   energySavedKwh: number;
//   carbonReducedKg: number;
// }