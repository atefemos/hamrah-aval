import React from "react";
import Routers from "Router/router";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";

function App() {
  const history = createBrowserHistory();

  return (
    <HistoryRouter history={history}>
      <Routers />
    </HistoryRouter>
  );
}

export default App;
