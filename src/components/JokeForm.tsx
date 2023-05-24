import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { createJoke, deleteJoke, getJokeById } from "../services";
import { Joke } from "../types";
import { Button } from "@tremor/react";
const JokeForm = () => {
  const [, params] = useRoute("/joke/:id");
  const [joke, setJoke] = useState<Omit<Joke, "id" | "CreatedAt" | "Views">>({
    Author: "",
    Body: "",
    Title: "",
  });
  useEffect(() => {
    if (params?.id !== null) {
      getJokeById(Number(params?.id)).then((jokeID) => {
        console.log(jokeID);
        if (!jokeID?.id) {
          console.log("no joke found we can navigate to home");
        } else {
          const { Author, Body, Title } = jokeID;
          setJoke({ Author, Body, Title });
        }
      });
    }
  }, [params?.id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const CreatedAt = Date.now();
    joke.Author === "" || joke.Body === "" || joke.Title === ""
      ? alert("Please fill out all the fields")
      : createJoke({ ...joke, CreatedAt, Views: 0 });
  };

  return (
    <div>
      <Link href="/jokes">
        <a className="py-2 text-blue-500 hover:underline hover:underline-offset-2">
          🔙Back to Jokes
        </a>
      </Link>
      <h1>{params?.id ? `Edit ${joke?.Title}` : "Add new Joke"}</h1>
      {params?.id && (
        <Button onClick={() => deleteJoke(Number(params.id))}>
          Delete Joke
        </Button>
      )}
      <form onSubmit={handleSubmit}>
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
