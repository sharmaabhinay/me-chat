import React from "react";
import RootRoute from "./routes/RootRoute";
import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
    <div>
      <RootRoute />
    </div>
    </Provider>
  );
};

export default App;
