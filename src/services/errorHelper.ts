import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string => {
  if ('status' in error) {
    return 'error' in error ? error.error : JSON.stringify(error.data);
  }
  return error.message || 'Unknown error';
};

export default getErrorMessage;
