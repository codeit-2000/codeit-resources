import "@src/App.css";
import Layout from "./components/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AmplifyTest from "@src/pages/amplify-test";

function App() {
  return (
    <>
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
