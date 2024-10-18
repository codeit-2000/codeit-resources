import { BrowserRouter } from "react-router-dom";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";
import Modal from "./components/commons/Modal";
import Router from "./Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <MobileSizeWatcher />
        <Modal />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
