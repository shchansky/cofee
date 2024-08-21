import React from "react";
import { GlobalStyle } from "./app.global-styles";
import { View } from "./view";
import * as Markup from "./app.styles";

function App() {
  return (
    <>
      <div className="App">
        <GlobalStyle />
        <View />
      </div>
    </>
  );
}

export default App;
