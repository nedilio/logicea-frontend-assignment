import { Joke } from "../types";

export async function getJokes(page: number, limit: number): Promise<Joke[]> {
  const data = await fetch(
    `https://retoolapi.dev/zu9TVE/jokes?_page=${page}&_limit=${limit}`
  ).then((response) => response.json());
  return data;
}

export async function getJokeById(id: number) {
  const data = await fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`).then(
    (response) => response.json()
  );
  return data;
}

export function login() {
  window.localStorage.setItem("Token", "true");
}

export function logout() {
  window.localStorage.removeItem("Token");
}
