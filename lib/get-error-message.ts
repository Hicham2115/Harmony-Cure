export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Une erreur est survenue, veuillez réessayer.";
}
