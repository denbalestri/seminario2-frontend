import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
