import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import IntlProviderWrapper from "./modules/intl/component/IntlProviderWrapper";
import { createRootStore } from "./redux/configureStore";

const { store, persistor } = createRootStore({});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={"loading from persist"}>
        <IntlProviderWrapper>
          <App />
        </IntlProviderWrapper>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
