import { BrowserRouter } from "react-router-dom";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";
import Router from "./Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <MobileSizeWatcher />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
