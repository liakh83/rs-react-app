import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
      </>
    );
  }

  return (
    <>
      <h2>Unexpected Application Error</h2>

      {error instanceof Error ? (
        <p>{error?.message}</p>
      ) : (
        <p>{'Something went wrong'}</p>
      )}
    </>
  );
};

export default ErrorPage;
