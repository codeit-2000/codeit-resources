import { Authenticator } from "@aws-amplify/ui-react";
import ToastProvider from "@src/components/commons/Toast/ToastProvider";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";
import ModalProvider from "./components/commons/Modal";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";

function App() {
  return (
    <Authenticator>
      <BrowserRouter>
        <ToastProvider />
        <MobileSizeWatcher />
        <ModalProvider />
        <Router />
      </BrowserRouter>
    </Authenticator>
  );
}

export default App;
