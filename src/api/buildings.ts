// import { api } from "./client";

// export const getBuildings = async () => {
//     const { data } = await api.get("/buildings/");

//     console.log("API DATA:", data);

//     return data;
// };

import { api } from "./client";

export const getBuildings = async () => {
  try {
    const response = await api.get("/buildings/");

    console.log("Full Response:", response);
    console.log("Response Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};