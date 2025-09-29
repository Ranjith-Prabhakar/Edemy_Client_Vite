import "./assets/global.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import SocketContextProvider from "./context/SocketContextProvider.tsx";
import { setupGlobalErrorHandlers } from "./utils/globalErrorHandler.ts";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry.tsx";
import AppRoute from "./Routes/AppRoute.tsx";

setupGlobalErrorHandlers();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <SocketContextProvider>
        <AppRoute />
      </SocketContextProvider>
    </Provider>
  </ErrorBoundary>
);
