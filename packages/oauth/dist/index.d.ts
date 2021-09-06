import { ICloudbase } from '@cloudbase/types';
export { Syntax, ErrorType } from './oauth2client/consts';
export { defaultStorage, defaultRequest, ToResponseErrorOptions, toResponseError, generateRequestId, OAuth2Client, } from './oauth2client/oauth2client';
export { AuthClient, SimpleStorage } from './oauth2client/interface';
export { Credentials, ResponseError, OAuth2ClientOptions, AuthClientRequestOptions, } from './oauth2client/models';
export { AuthOptions, Auth } from './auth/apis';
import * as authModels from './auth/models';
export { authModels };
export declare function registerOAuth(app: Pick<ICloudbase, 'registerComponent'>): void;
