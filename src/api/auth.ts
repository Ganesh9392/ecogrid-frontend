import axios from "./client";

export async function login(email: string, password: string) {
  const res = await axios.post("/auth/login/", {
    email,
    password,
  });

  return res.data;
}