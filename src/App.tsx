import { Route } from "wouter";
import Jokes from "./Table";
import Login from "./Login";
import Form from "./Form";
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
        <Form />
      </Route>
      <Route path="/joke">
        <Form />
      </Route>
    </>
  );
};

export default App;
