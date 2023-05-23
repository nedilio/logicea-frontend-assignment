import { Route } from "wouter";
import Jokes from "./components/Table";
import Login from "./components/Login";
import JokeForm from "./components/JokeForm";
const App = () => {
  return (
    <>
      <Route path="/">
        <Login />
      </Route>
      <Route path="/jokes">
        <Jokes />
      </Route>
      <Route path="/joke/:id">
        <JokeForm />
      </Route>
      <Route path="/joke">
        <JokeForm />
      </Route>
    </>
  );
};

export default App;
