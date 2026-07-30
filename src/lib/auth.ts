export function saveToken(token: string) {
  localStorage.setItem("access", token);
}

export function getToken() {
  return localStorage.getItem("access");
}

export function logout() {
  localStorage.removeItem("access");
}

export function isLoggedIn() {
  return !!localStorage.getItem("access");
}