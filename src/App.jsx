import React from "react";
import Router from "./router/Router";
import { BackdropLoader, ConfirmDialog } from "./components";

const App = () => {
  return (
    <React.Fragment>      
      <ConfirmDialog />
      <BackdropLoader />
      <Router />
    </React.Fragment>
  );
};

export default App;
