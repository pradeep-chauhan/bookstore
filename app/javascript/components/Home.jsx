import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Home = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDom.render(<Home />, document.getElementById("root"));
});

export default Home;
