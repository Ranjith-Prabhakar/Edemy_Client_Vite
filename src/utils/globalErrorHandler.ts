import toast from "react-hot-toast";

export const setupGlobalErrorHandlers = (): void => {
  window.onerror = (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ): void => {
    toast.error("Unexpected app crash!");
    console.error("JS Error:", { message, source, lineno, colno, error });
  };

  window.onunhandledrejection = (event: PromiseRejectionEvent): void => {
    toast.error("Something went wrong!");
    console.error("Unhandled rejection:", event.reason);
  };
};
