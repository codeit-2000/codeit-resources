import "@src/App.css";
import Layout from "./components/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
}

export default App;
