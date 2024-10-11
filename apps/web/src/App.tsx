import "@src/App.css";
import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";
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
