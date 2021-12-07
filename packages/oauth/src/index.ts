export { Syntax, ErrorType } from './oauth2client/consts';

import { OAuth2Client } from './oauth2client/oauth2client'

export {
  defaultStorage,
  defaultRequest,
  ToResponseErrorOptions,
  toResponseError,
  generateRequestId,
  OAuth2Client,
} from './oauth2client/oauth2client';

export { AuthClient, SimpleStorage } from './oauth2client/interface';

// import { Credentials } from './oauth2client/models'
export {
  Credentials,
  ResponseError,
  OAuth2ClientOptions,
  AuthClientRequestOptions,
} from './oauth2client/models';

import { AuthOptions, Auth } from './auth/apis'

export { AuthOptions, Auth } from './auth/apis';

import * as authModels from './auth/models';
export { authModels };


export class CloudbaseOAuth {
  public oauth2client: OAuth2Client
  public authApi: Auth

  constructor(authOptions: AuthOptions) {
    const { apiOrigin, clientId } = authOptions
    this.oauth2client = new OAuth2Client({
      apiOrigin,
      clientId
    })

    this.authApi = new Auth({
      credentialsClient: this.oauth2client,
      ...authOptions
    })
  }
}

