import { useEffect, useState } from "react";
import { getJokes, logout } from "../services";
import { Joke } from "../types";
import { useLocation, Link } from "wouter";

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Button,
  SelectBox,
  SelectBoxItem,
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
  }, []);

  return (
    <main>
      <Card>
        <Title>Jokes</Title>
        <Button onClick={() => logout()}>Logout</Button>
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
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Author</TableHeaderCell>
              <TableHeaderCell>Created Date</TableHeaderCell>
              <TableHeaderCell>Views</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jokes.map((joke) => (
              <TableRow key={joke.id}>
                <TableCell>
                  <Link href={`/joke/${joke.id}`}>
                    <a>{joke.Title}</a>
                  </Link>
                </TableCell>
                <TableCell>
                  <Text>{joke.Author}</Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {new Date(joke.CreatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge color={jokeColor(Number(joke.Views))}>
                    {joke.Views}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-5">
          <Button onClick={() => setPage(page - 1)}>{"<"}</Button>
          <Text>Page {page}</Text>
          <Button onClick={() => setPage(page + 1)}>{">"}</Button>
        </div>
      </Card>
    </main>
  );
}

export default Jokes;
