import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import Professionals from "../src/pages/Professionals";
import RecivedWork from "../src/pages/RecivedWork";
import NotFound from "../src/pages/NotFound";
import store from "./redux/store";
import history from "./history";

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/professionals" component={Professionals} />
          <Route path="/recived-work" component={RecivedWork} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}
