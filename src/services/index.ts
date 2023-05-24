import { Joke } from "../types";

export async function getJokes(page: number, limit: number): Promise<Joke[]> {
  const data = await fetch(
    `https://retoolapi.dev/zu9TVE/jokes?_page=${page}&_limit=${limit}`
  ).then((response) => response.json());
  const jokes = data.map((joke: Joke) => {
    const { id, Author, Body, CreatedAt, Title, Views } = joke;
    return {
      id,
      Author: !Author || Author === "" ? "No Author*" : Author,
      Body: !Body || Body === "" ? "No Body*" : Body,
      CreatedAt: !CreatedAt || CreatedAt === "" ? "2022-01-01" : CreatedAt,
      Title: !Title || Title === "" ? "No Title*" : Title,
      Views: !Views || Views === "" ? "0" : Views,
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

export function login() {
  window.localStorage.setItem("Token", "true");
}

export function logout() {
  window.localStorage.removeItem("Token");
}
