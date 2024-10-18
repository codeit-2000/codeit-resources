import { BrowserRouter } from "react-router-dom";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";
import ToastProvider from "./components/commons/Toast/ToastProvider";
import Router from "./Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <MobileSizeWatcher />
        <Layout />
        <ToastProvider />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
