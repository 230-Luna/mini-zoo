export function assert(
  condition: unknown,
  message: string | Error
): asserts condition {
  if (condition) {
    return;
  }

  if (typeof message === "string") {
    throw new Error(message);
  }

  throw message;
}
