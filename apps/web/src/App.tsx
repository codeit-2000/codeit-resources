import ToastProvider from "@src/components/commons/Toast/ToastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";
import ModalProvider from "./components/commons/Modal";
import MobileSizeWatcher from "./components/layout/MobileSizeWatcher";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider />
        <MobileSizeWatcher />
        <ModalProvider />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
