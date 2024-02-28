import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="font-poppins  bg-[#AAD7D9]  text-black dark:bg-gradient-to-r from-[#062C2F] to-[#09616A] dark:text-white">
        <App />
      </div>
      <Toaster />
    </Provider>
  </React.StrictMode>
);
