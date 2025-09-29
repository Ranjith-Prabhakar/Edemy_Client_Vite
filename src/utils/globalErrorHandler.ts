import toast from "react-hot-toast";

export const setupGlobalErrorHandlers = (): void => {
  window.onerror = (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ): void => {
    toast.error("Sorry for the inconvenience. Service under maintenance!");
    console.error("JS Error:", { message, source, lineno, colno, error });
  };

  window.onunhandledrejection = (event: PromiseRejectionEvent): void => {
    toast.error("Sorry for the inconvenience. Service under maintenance!");
    console.error("Unhandled rejection:", event.reason);
  };
};
