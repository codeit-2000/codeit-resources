import ToastProvider from "@src/components/commons/Toast/ToastProvider";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <MobileSizeWatcher />
      <Router />
    </BrowserRouter>
  );
}

export default App;
