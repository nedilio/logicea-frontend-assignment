import { Route } from "wouter";
import Jokes from "./components/Table";
import Login from "./components/Login";
import JokeForm from "./components/JokeForm";
import ThemeToggler from "./components/ThemeToggler";
import { ThemeContextProvider } from "./context/theme";
import { FiltersProvider } from "./context/filters";
import "./App.css";

const App = () => {
  return (
    <>
      <ThemeContextProvider>
        <ThemeToggler>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/jokes">
            <FiltersProvider>
              <Jokes />
            </FiltersProvider>
          </Route>
          <Route path="/joke/:id">
            <JokeForm />
          </Route>
          <Route path="/joke">
            <JokeForm />
          </Route>
        </ThemeToggler>
      </ThemeContextProvider>
    </>
  );
};

export default App;
