import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import SocketContextProvider from "./context/SocketContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        {/* <div className="font-poppins  bg-body-lightMode  text-black bg-gradient-to-r from-body-gradient-one to-body-gradient-two text-white"> */}
        <div className="font-poppins  bg-gradient-to-r from-body-gradient-one to-body-gradient-two text-white">
          <App />
        </div>
      </SocketContextProvider>
      <Toaster />
    </Provider>
  </React.StrictMode>
);
