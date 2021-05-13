import { Router, useNavigate } from "@reach/router";
import React from "react";
import {
  basePath,
  dashboardPath,
  startingPath,
} from "@atlascode/hefesto-constants";

import NotFoundRoute from "../../Util/NotFoundRoute";
import Login from "../Login";
import Dashboard from "./DashboardRoutes";

interface Props {}

const RouterMain = ({}: Props) => {
  try {
    console.log(basePath, dashboardPath, startingPath);
  } catch (error) {
    console.log(error);
  }

  return (
    <Router basepath={`${"admin"}`} style={{ width: "100%" }}>
      <Login path={"login"} />
      <Dashboard path={`${"dashboard"}/*`} />
      <NotFoundRoute default />
    </Router>
  );
};

export default RouterMain;
