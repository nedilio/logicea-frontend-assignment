import { useEffect, useState } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { createJoke, deleteJoke, getJokeById, updateJoke } from "../services";
import { Joke } from "../types";
import { Button } from "@tremor/react";

const JokeForm = () => {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/joke/:id");
  const [joke, setJoke] = useState<Omit<Joke, "id">>({
    Author: "",
    Body: "",
    Title: "",
    CreatedAt: 0,
    Views: 0,
  });

  useEffect(() => {
    if (params?.id !== null) {
      getJokeById(Number(params?.id)).then((jokeID) => {
        if (!jokeID?.id) {
          console.log("Empty form");
        } else {
          const { Author, Body, Title, CreatedAt, Views } = jokeID;
          setJoke({ Author, Body, Title, CreatedAt, Views });
        }
      });
    }
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    joke.Author === "" || joke.Body === "" || joke.Title === ""
      ? alert("Please fill out all the fields")
      : params?.id
      ? updateJokebyId(Number(params?.id))
      : createNewJoke(joke);
  };

  const updateJokebyId = async (id: number) => {
    const data = await updateJoke(id, joke);
    if (data.id) {
      setLocation("/jokes");
    }
  };

  const createNewJoke = async (joke: Omit<Joke, "id">) => {
    const CreatedAt = Date.now();
    const data = await createJoke({ ...joke, CreatedAt, Views: 0 });
    if (data.id) {
      setLocation("/jokes");
    }
  };

  const handleDeleteJoke = async () => {
    const data = await deleteJoke(Number(params?.id));
    if (data) {
      setLocation("/jokes");
    }
  };

  return (
    <div>
      <Link href="/jokes">
        <a className="py-2 text-blue-500 hover:underline hover:underline-offset-2">
          🔙Back to Jokes
        </a>
      </Link>
      <h1>{params?.id ? `Edit ${joke?.Title}` : "Add new Joke"}</h1>
      {params?.id && <Button onClick={handleDeleteJoke}>Delete Joke</Button>}
      <form onSubmit={params?.id ? handleSubmit : handleSubmit}>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          name="Title"
          value={joke?.Title}
          onChange={(e) => setJoke({ ...joke, Title: e.target.value })}
        />
        <label htmlFor="Body">Body</label>
        <input
          type="text"
          name="Body"
          value={joke?.Body}
          onChange={(e) => setJoke({ ...joke, Body: e.target.value })}
        />
        <label htmlFor="Author">Author</label>
        <input
          type="text"
          name="Author"
          value={joke?.Author}
          onChange={(e) => setJoke({ ...joke, Author: e.target.value })}
        />
        <Button>Submit</Button>
      </form>
      <footer className="text-xs text-gray-500 absolute bottom-2 bg-black p-2 rounded-3xl">
        Joke {JSON.stringify(joke)}
      </footer>
    </div>
  );
};

export default JokeForm;
