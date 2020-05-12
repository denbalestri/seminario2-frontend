/** @format */

import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Professionals from "../src/pages/Professionals";
import RecivedWork from "../src/pages/RecivedWork";
import NotFound from "../src/pages/NotFound";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/professionals" component={Professionals} />
          <Route path="/recived-work" component={RecivedWork} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
