import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import IntlProviderWrapper from "./modules/intl/component/IntlProviderWrapper";
import { createRootStore } from "./redux/configureStore";

const { store } = createRootStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProviderWrapper>
        <App />
      </IntlProviderWrapper>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
