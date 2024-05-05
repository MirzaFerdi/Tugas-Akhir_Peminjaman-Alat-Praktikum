import React from "react";
import Router from "./router/Router";
import { BackdropLoader, ConfirmDialog, AlertComponent } from "./components";

const App = () => {  
  return (
    <React.Fragment>
      <AlertComponent />
      <ConfirmDialog />
      <BackdropLoader />
      <Router />
    </React.Fragment>
  )
};

export default App;
