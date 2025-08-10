import { describe, it, expect } from 'vitest';

import getErrorMessage from '@services/errorHelper';

import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

describe('getErrorMessage', () => {
  it('should return a stringified data message for a FetchBaseQueryError with data', () => {
    const errorWithData = {
      status: 404,
      data: 'Not Found',
    } as FetchBaseQueryError;

    expect(getErrorMessage(errorWithData)).toBe('"Not Found"');
  });

  it('should return an error string for a FetchBaseQueryError with an "error" property', () => {
    const errorWithError = {
      status: 'FETCH_ERROR',
      error: 'API is unreachable',
    } as FetchBaseQueryError;

    expect(getErrorMessage(errorWithError)).toBe('API is unreachable');
  });

  it('should return the message for a SerializedError', () => {
    const serializedError = {
      message: 'A network error occurred',
      name: 'Error',
      stack: '...',
    } as SerializedError;

    expect(getErrorMessage(serializedError)).toBe('A network error occurred');
  });

  it('should return "Unknown error" for a SerializedError without a message', () => {
    const serializedErrorWithoutMessage = {
      message: undefined,
    } as SerializedError;

    expect(getErrorMessage(serializedErrorWithoutMessage)).toBe(
      'Unknown error'
    );
  });
});
