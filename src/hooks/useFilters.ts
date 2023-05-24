import { useContext } from "react";
import { FiltersContext } from "../context/filters";
import { Joke } from "../types";

export const useFilters = () => {
  const { filters } = useContext(FiltersContext);

  const filterJokes = (jokes: Joke[]) => {
    return jokes.filter((joke) => {
      return (
        Number(joke.Views) >= filters.views
        // &&

        // (filters.date === filters.date)
      );
    });
  };

  return { filterJokes };
};
