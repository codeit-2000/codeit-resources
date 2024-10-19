import { BrowserRouter } from "react-router-dom";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";
import ModalProvider from "./components/commons/Modal";
import Router from "./Router";

function App() {
  return (
    <BrowserRouter>
        <MobileSizeWatcher />
        <ModalProvider />
        <Router />
      </BrowserRouter>
  );
}

export default App;
