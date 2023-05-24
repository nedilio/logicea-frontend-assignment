import { Route } from "wouter";
import Jokes from "./components/Table";
import Login from "./components/Login";
import JokeForm from "./components/JokeForm";
import { FiltersProvider } from "./context/filters";

const App = () => {
  return (
    <>
      <Route path="/">
        <Login />
      </Route>

      <FiltersProvider>
        <Route path="/jokes">
          <Jokes />
        </Route>
      </FiltersProvider>
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
