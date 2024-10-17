import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";

function App() {
  return (
    <>
      <BrowserRouter>
        <MobileSizeWatcher />
        <Layout />
      </BrowserRouter>
    </>
  );
}

export default App;
