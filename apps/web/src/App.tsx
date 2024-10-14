import "@src/App.css";
import Layout from "./components/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetCss from "@src/styles/ResetCss";
import AmplifyTest from "@src/pages/amplify-test";

function App() {
  return (
    <>
      <ResetCss />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/amplify" element={<AmplifyTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
