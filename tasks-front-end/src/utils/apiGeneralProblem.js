export const getApiGeneralProblem = (error) => {
  switch (error.statusCode) {
    case 400:
      return error.message[0];
    case 401:
    case 403:
      return error.message;
    case 404:
      return error.message;
    case 409:
      return error.message;
    case 500:
      return error.message;
    default:
      return "An unexpected error occurred, please try again in a few minutes.";
  }
};
