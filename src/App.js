import { useState, useEffect } from "react";
import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Actors from "./components/Actors";
function App() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <Router>
      <Layout>
        <Header toggleClass={toggleClass}></Header>
        <SidePanel />
        <Routes>
          <Route path="/" exact element={<Content />} />
          <Route path="/actors/awards" element={<Actors />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
