import ToastProvider from "@src/components/commons/Toast/ToastProvider";
import { BrowserRouter } from "react-router-dom";

import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";
import ModalProvider from "./components/commons/Modal";
import Router from "./Router";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";

function App() {
  return (
    <BrowserRouter>
        <ToastProvider />
        <MobileSizeWatcher />
        <ModalProvider />
        <Router />
      </BrowserRouter>
  );
}

export default App;
