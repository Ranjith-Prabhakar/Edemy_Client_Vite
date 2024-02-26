export const catchError = (error: unknown) => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message); // value in the message property could be any type but doing this way we are doing the type casting
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "unknown error";
  }
  console.log(message);
};
