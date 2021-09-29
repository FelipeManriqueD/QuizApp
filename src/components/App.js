import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.scss";
import Header from "./Header/Header";
import Question from "./Admin/Question/Question";
import Admin from "./Admin/Admin";
import Guest from "./Guest/Guest";
import { Auth, PrivateRoute } from "./Auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="ui container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin" exact component={Admin} />
            <PrivateRoute path="/question" component={Question} />
            <Route path="/quiz" component={Guest} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
const Home = () => <div>Welcome to Quiz App <Auth /></div>;

export default App;
