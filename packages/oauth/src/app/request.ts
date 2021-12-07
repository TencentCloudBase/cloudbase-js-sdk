export interface RequestOptions {
  body?: any | null;
  headers?: any | null;
  method?: string;

  [key: string]: any;
}

export enum ErrorType {
  UNREACHABLE = 'unreachable'
}

export type RequestFn = <T>(url: string, options?: RequestOptions) => Promise<T>;

/** An Error For all concern **/
export interface ResponseError {
  error: string;
  error_description?: string | null;
  error_uri?: string | null;
  details?: any | null;
}

export const defaultRequest: RequestFn = async <T>(
  url: string,
  options?: RequestOptions,
): Promise<T> => {
  let result: T | null = null;
  let responseError: ResponseError | null = null;
  try {
    // Objects must be copied to prevent modification of data such as body.
    const copyOptions = Object.assign({}, options);
    if (!copyOptions.method) {
      copyOptions.method = 'GET';
    }
    if (copyOptions.body && typeof copyOptions.body !== 'string') {
      copyOptions.body = JSON.stringify(copyOptions.body);
    }
    const responseResult: Response = await fetch(url, copyOptions);
    const jsonResponse = await responseResult.json();
    if (responseResult.status >= 400) {
      responseError = jsonResponse as ResponseError;
      responseError.error_uri = new URL(url).pathname;
    } else {
      result = jsonResponse as T;
    }
  } catch (error) {
    responseError = {
      error: ErrorType.UNREACHABLE,
      error_description: error.message,
      error_uri: new URL(url).pathname,
    };
  }
  if (responseError) {
    throw responseError;
  } else {
    return result;
  }
};