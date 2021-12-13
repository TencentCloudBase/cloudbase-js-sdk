import { App } from "@xbasesdk/xbase/app";
import { getOAuthClient, AuthClient, ErrorType } from "@xbasesdk/xbase/oauthclient";
import { uuidv4 } from "@xbasesdk/xbase/utils/uuid";

export interface FunctionOptions {
  credentialsClient: AuthClient;
  env: string
}

/**
 * Returns the existing `Auth` instance that is associated with the app
 */
export function getFunction(app: App): Function {
  const credentialsClient = getOAuthClient(app)
  return new Function({
    credentialsClient: credentialsClient,
    env: app.options.clientId
  })
}


export class Function {

  private _config: FunctionOptions;

  /**
   * constructor
   * @param {AuthOptions} opts
   */
  constructor(opts: FunctionOptions) {
    this._config = {
      credentialsClient: opts.credentialsClient,
      env: opts.env,
    }
  }
  /**
   * callFunction call function
   * @param {SignInRequest} params A SignInRequest Object.
   * @return {Promise<Credentials>} A Promise<Credentials> object.
   */
  public async callFunction(params: FunctionRequest): Promise<FunctionResponse> {
    let accessToken: string
    try {
      accessToken = await this._config.credentialsClient.getAccessToken()
    } catch (e) {
      if (e.error === ErrorType.UNAUTHENTICATED) {
        accessToken = ""
      } else {
        return Promise.reject(e)
      }
    }
    const requestId = uuidv4()
    var reqBody = {
      "action": "functions.invokeFunction",
      "dataVersion": "2020-01-10",
      "env": this._config.env,
      "function_name": params.name,
      "request_data": JSON.stringify(params.data),
      "seqId": requestId,
      "access_token": accessToken
    }
    const url = "/web?env=" + this._config.env
    const resp = await this._config.credentialsClient.request<functionHTTPResponse>(url, {
      method: 'POST',
      body: reqBody,
      headers: {
        'content-type': 'application/json'
      }
    })
    if (resp.code) {
      return Promise.reject({
        error: resp.code,
        error_description: resp.message
      })
    }
    return {
      requestId: resp.requestId,
      result: resp.data.response_data,
    }
  }
}


export interface FunctionRequest {
  name: string;
  data: any;
}

export interface FunctionResponse {
  requestId: string;
  result: any;
}

export interface functionHTTPResponse {
  requestId: string;
  data: any
  code: string
  message: string
}