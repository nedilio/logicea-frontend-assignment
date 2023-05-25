import { useEffect, useState } from "react";
import { getJokes, logout } from "../services";
import { Joke } from "../types";
import { useLocation, Link } from "wouter";

import {
  Card,
  Text,
  Badge,
  Button,
  SelectBox,
  SelectBoxItem,
  Flex,
} from "@tremor/react";

const jokeColor = (views: number) => {
  if (views <= 25) return "red";
  if (views <= 50) return "orange";
  if (views <= 75) return "yellow";
  if (views <= 100) return "green";
};

const limits = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
];

function Jokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  // const { filterJokes } = useFilters();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<{
    label: string;
    value: number;
  }>(limits[0]);

  const [, setLocation] = useLocation();

  useEffect(() => {
    getJokes(page, limit.value).then((jokes) => setJokes(jokes));
  }, [page, limit]);

  useEffect(() => {
    if (!window.localStorage.getItem("Token")) {
      setLocation("/");
    }
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <main>
      <Card className="dark:bg-gray-800 bg-white shadow-md dark:text-gray-100 text-gray-800">
        <h1>Jokes</h1>
        <Flex>
          <Link href="/joke">
            <a className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold  py-2 px-4 rounded">
              New Joke
            </a>
          </Link>
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
        <h2>Jokes per page</h2>
        <SelectBox
          onValueChange={(value) =>
            setLimit(limits.find((l) => l.label === value) || limits[0])
          }
          defaultValue={limit.label}
        >
          {limits.map((limit) => (
            <SelectBoxItem
              key={limit.value}
              value={limit.label}
              text={limit.label}
            />
          ))}
        </SelectBox>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Author
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              {jokes.map((joke) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link href={`/joke/${joke.id}`}>
                      <a>{joke.Title}</a>
                    </Link>
                  </th>
                  <td className="px-6 py-4">{joke.Author}</td>
                  <td className="px-6 py-4">
                    {new Date(joke.CreatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={jokeColor(Number(joke.Views))}>
                      {joke.Views}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-5">
          <Button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {"<"}
          </Button>
          <Text>Page {page}</Text>
          <Button
            disabled={jokes.length < limit.value}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {">"}
          </Button>
        </div>
      </Card>
    </main>
  );
}

export default Jokes;
