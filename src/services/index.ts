import { Joke } from "../types";

export async function getJokes(
  page: number,
  limit: number,
  dateFilter: string,
  viewFilterString: string
): Promise<Joke[]> {
  const data = await fetch(
    `https://retoolapi.dev/zu9TVE/jokes?_page=${page}&_limit=${limit}${dateFilter}${viewFilterString}`
  ).then((response) => response.json());

  const jokes = data.map((joke: Joke) => {
    const { id, Author, Body, CreatedAt, Title, Views } = joke;
    return {
      id,
      Author: !Author || Author === "" ? "No Author*" : Author,
      Body: !Body || Body === "" ? "No Body*" : Body,
      CreatedAt: !CreatedAt || typeof CreatedAt === "string" ? 0 : CreatedAt,
      Title: !Title || Title === "" ? "No Title*" : Title,
      Views: !Views || typeof Views === "string" ? "0" : Views,
    };
  });
  return jokes;
}

export async function getJokeById(id: number) {
  const data = await fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`).then(
    (response) => response.json()
  );
  return data;
}

export async function deleteJoke(id: number) {
  const data = await fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
  console.log(data);
  return data;
}

export async function createJoke(joke: Omit<Joke, "id">) {
  const data = await fetch("https://retoolapi.dev/zu9TVE/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joke),
  }).then((response) => response.json());
  console.log(data);
  return data;
}

export async function updateJoke(id: number, joke: Omit<Joke, "id">) {
  const data = await fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joke),
  }).then((response) => response.json());
  console.log(data);
  return data;
}

export function login() {
  window.localStorage.setItem("Token", "true");
}

export function logout() {
  window.localStorage.removeItem("Token");
}
