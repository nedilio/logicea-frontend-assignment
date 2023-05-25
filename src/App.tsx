import { Route } from "wouter";
import Jokes from "./components/Table";
import Login from "./components/Login";
import JokeForm from "./components/JokeForm";
import { useContext } from "react";
import { ThemeContext, ThemeContextProvider } from "./context/theme";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);
  return (
    <>
      <ThemeContextProvider>
        <div data-theme={theme}>
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
        </div>
      </ThemeContextProvider>
    </>
  );
};

export default App;
