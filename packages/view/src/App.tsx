import React from "react";
import Loading from "./components/Util/Loading";
import GlobalAlert from "./components/Util/GlobalAlert";
import "./css/App.css";
import RouterMain from "./components/App/RouterMain";
import Login from "./components/App/Login";

function App() {
  return (
    <div>
      <Loading />
      <GlobalAlert />
      <RouterMain />
    </div>
  );
}

export default App;
