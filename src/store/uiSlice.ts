import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  selectedBuildingId: string | null;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  theme: "light",
  selectedBuildingId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (s) => {
      s.sidebarCollapsed = !s.sidebarCollapsed;
    },
    setTheme: (s, a: PayloadAction<UiState["theme"]>) => {
      s.theme = a.payload;
    },
    setSelectedBuilding: (s, a: PayloadAction<string | null>) => {
      s.selectedBuildingId = a.payload;
    },
  },
});

export const { toggleSidebar, setTheme, setSelectedBuilding } = uiSlice.actions;
export default uiSlice.reducer;