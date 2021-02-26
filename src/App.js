import React from "react";
import MediaContainer from "./Components/MediaContainer/MediaContainer";
import store from "./Store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <MediaContainer />
    </Provider>
  );
};

export default App;
