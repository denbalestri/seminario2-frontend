/** @format */

import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Professionals from "../src/pages/Professionals";
import RevisedWork from "../src/pages/RevisedWorks";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/professionals" component={Professionals} />
          <Route path="/revisedwork" component={RevisedWork} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
