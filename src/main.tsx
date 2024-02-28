import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="font-poppins  bg-body-lightMode  text-black dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white">
        <App />
      </div>
      <Toaster />
    </Provider>
  </React.StrictMode>
);
