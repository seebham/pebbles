import React from "react";
import ReactDOM from "react-dom";
import WrapperApp from "./App";

import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WrapperApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
