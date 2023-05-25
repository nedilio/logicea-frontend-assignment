import { useEffect, useState } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { createJoke, deleteJoke, getJokeById, updateJoke } from "../services";
import { Joke } from "../types";
import { Button, Card, Text, TextInput } from "@tremor/react";

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
        <a className="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold  py-2 px-4 rounded">
          ❌Close
        </a>
      </Link>

      <Card>
        <Text>{params?.id ? `Edit ${joke?.Title}` : "Add new Joke"}</Text>
        <form onSubmit={params?.id ? handleSubmit : handleSubmit}>
          <label htmlFor="Title">Title</label>
          <TextInput
            type="text"
            name="Title"
            placeholder="joke title"
            value={joke?.Title}
            onChange={(e) => setJoke({ ...joke, Title: e.target.value })}
          />
          <label htmlFor="Body">Body</label>
          <TextInput
            type="text"
            name="Body"
            placeholder="joke body"
            value={joke?.Body}
            onChange={(e) => setJoke({ ...joke, Body: e.target.value })}
          />
          <label htmlFor="Author">Author</label>
          <TextInput
            type="text"
            name="Author"
            placeholder="joke author"
            value={joke?.Author}
            onChange={(e) => setJoke({ ...joke, Author: e.target.value })}
          />
          <Button>Submit</Button>
        </form>
      </Card>
      {params?.id && (
        <Button color="red" onClick={handleDeleteJoke}>
          Delete Joke
        </Button>
      )}
      <footer className="text-xs text-gray-500 absolute bottom-2 bg-black p-2 rounded-3xl">
        Joke {JSON.stringify(joke)}
      </footer>
    </div>
  );
};

export default JokeForm;
