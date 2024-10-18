import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";
import ToastProvider from "./components/commons/Toast/ToastProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <MobileSizeWatcher />
        <Layout />
        <ToastProvider />
      </BrowserRouter>
    </>
  );
}

export default App;
