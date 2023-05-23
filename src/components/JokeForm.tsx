import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getJokeById } from "../services";
import { Joke } from "../types";
const JokeForm = () => {
  const [match, params] = useRoute("/joke/:id");
  const [joke, setJoke] = useState<Joke | null>(null);
  useEffect(() => {
    if (match) {
      getJokeById(Number(params.id)).then((joke) => {
        setJoke(joke);
      });
    }
  });

  return (
    <div>
      <Link href="/jokes">
        <a>Back</a>
      </Link>
      <h1>{joke?.Title}</h1>
      <p>{joke?.Body || "💥 No body found"}</p>
    </div>
  );
};

export default JokeForm;
