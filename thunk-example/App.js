// App.js
import React from "react";

import { Provider } from "react-redux";
import Home from "./src/screens/Home";
import store from "./src/redux/store";

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
 
export default App;