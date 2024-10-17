import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";
import Modal from "./components/commons/Modal";

function App() {
  return (
    <>
      <BrowserRouter>
        <MobileSizeWatcher />
        <Modal />
        <Layout />
      </BrowserRouter>
    </>
  );
}

export default App;
