/** @format */

import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Professionals from "../src/pages/Professionals";
import store from "./redux/store";
import { PROFESSIONALS_PATH } from "../src/constants/PathNames";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={PROFESSIONALS_PATH} component={Professionals} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
