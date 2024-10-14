import "@src/App.css";
import Layout from "./components/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetCss from "@src/styles/ResetCss";

function App() {
  return (
    <>
      <ResetCss />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
}

export default App;
