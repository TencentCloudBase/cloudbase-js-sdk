interface BaseRequest {
  client_id?: string;
}

export interface SignInRequest extends BaseRequest {
  username?: string;
  password?: string;
  verification_code?: string;
  verification_token?: string;
}

export interface SignInWithProviderRequest extends BaseRequest {
  provider_token: string;
}

export interface SignUpRequest extends BaseRequest {
  phone_number?: string;
  email?: string;

  verification_code?: string;
  verification_token?: string;
  provider_token?: string;

  password?: string;
  name?: string;
  gender?: string;
  picture?: string;
  locale?: string;
}

export interface GetVerificationRequest extends BaseRequest {
  phone_number?: string;
  email?: string;
  target?: string | 'ANY';
  usage?: string;
}

export interface GetVerificationResponse {
  verification_id?: string;
  is_user?: boolean | false;
}

export interface VerifyResponse {
  verification_token?: string;
}

export interface VerifyRequest extends BaseRequest {
  verification_code: string;
  verification_id?: string;
}

export interface ProviderBindRequest {
  provider_token: string;
}

export interface GrantProviderTokenRequest extends BaseRequest {
  provider_id: string;
  provider_redirect_uri?: string;
  provider_code?: string;
  provider_access_token?: string;
  provider_id_token?: string;
}

export interface GrantProviderTokenResponse {
  provider_token: string;
  expires_in: number;
}

export interface PatchProviderTokenRequest extends BaseRequest {
  provider_token: string;
  provider_params: {
    encryptedData: string;
    iv: string;
  };
}

export interface PatchProviderTokenResponse {
  provider_token: string;
  expires_in: number;
  provider_profile: ProviderProfile;
}

export interface GenProviderRedirectUriRequest {
  provider_id: string;
  provider_redirect_uri: string;
  state: string;
  other_params?: {
    sign_out_uri?: string;
  };
}

export interface GenProviderRedirectUriResponse {
  uri: string;
  signout_uri?: string;
}

export interface BindWithProviderRequest extends BaseRequest {
  provider_token: string;
}

export interface BindWithProviderRequest {
  provider_token: string;
}

export interface UserProfileProvider {
  id?: string;
  provider_user_id?: string;
  name?: string;
}

export interface UserProfile {
  name?: string;
  picture?: string;
  avatarUrl?: string;
  username?: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  providers?: [UserProfileProvider];
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  created_from?: string;
  sub?: string
  uid?: string
}

export type UserInfo = UserProfile;

export interface ProviderProfile {
  provider_id: string;
  phone_number?: string;
}

export interface TransByProviderRequest {
  provider_token: string;
}

export interface GrantTokenRequest extends BaseRequest {
  client_secret?: string;
  code?: string;
  grant_type?: string;
  redirect_uri?: string;
  nonce?: string;
  refresh_token?: string;
  scope?: string;
}

export interface UnbindProviderRequest extends BaseRequest {
  provider_id: string;
}

export interface CheckPasswordrRequest extends BaseRequest {
  password: string;
}

export interface BindPhoneRequest extends BaseRequest {
  phone_number: string;
  sudo_token: string;
  verification_token: string;
}

export interface SetPasswordRequest extends BaseRequest {
  new_password: string;
  sudo_token: string;
}

export interface ChangeBindedProviderRequest extends BaseRequest {
  trans_token: string;
  provider_id: string;
}

export type ChangeBindedProviderResponse = BaseRequest

export interface QueryUserProfileReq extends BaseRequest {
  appended_params: string;
}
export interface SignInRequest {
  username?: string;
  password?: string;
  verification_code?: string;
  verification_token?: string;
}

export interface SignInWithProviderRequest {
  provider_token: string;
  provider_id?: string;
}

export interface SignUpRequest {
  phone_number?: string;
  email?: string;

  verification_code?: string;
  verification_token?: string;
  provider_token?: string;

  password?: string;
  name?: string;
  gender?: string;
  picture?: string;
  locale?: string;
}

export interface GetVerificationRequest {
  phone_number?: string;
  email?: string;
  target?: string | 'ANY';
  usage?: string;
}

export interface GetVerificationResponse {
  verification_id?: string;
  is_user?: boolean | false;
}

export interface VerifyResponse {
  verification_token?: string;
}

export interface VerifyRequest {
  verification_code: string;
  verification_id?: string;
}

export interface ProviderBindRequest {
  provider_token: string;
}

export interface GrantProviderTokenRequest {
  provider_id: string;
  provider_redirect_uri?: string;
  provider_code?: string;
  provider_access_token?: string;
  provider_id_token?: string;
}

export interface GrantProviderTokenResponse {
  provider_token: string;
  expires_in: number;
}

export interface PatchProviderTokenRequest {
  provider_token: string;
  provider_params: {
    encryptedData: string;
    iv: string;
  };
}

export interface PatchProviderTokenResponse {
  provider_token: string;
  expires_in: number;
  provider_profile: ProviderProfile;
}

export interface GenProviderRedirectUriRequest {
  provider_id: string;
  provider_redirect_uri: string;
  state: string;
  other_params?: {
    sign_out_uri?: string;
  };
}

export interface GenProviderRedirectUriResponse {
  uri: string;
  signout_uri?: string;
}

export interface BindWithProviderRequest {
  provider_token: string;
}

export interface BindWithProviderRequest {
  provider_token: string;
}

export interface UserProfileProvider {
  id?: string;
  provider_user_id?: string;
  name?: string;
}

export interface UserProfile {
  name?: string;
  picture?: string;
  username?: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  providers?: [UserProfileProvider];
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  created_from?: string;
}

export interface ProviderProfile {
  provider_id: string;
  phone_number?: string;
}

export interface TransByProviderRequest {
  provider_token: string;
}

export interface GrantTokenRequest {
  client_secret?: string;
  code?: string;
  grant_type?: string;
  redirect_uri?: string;
  nonce?: string;
  refresh_token?: string;
  scope?: string;
}

export interface UnbindProviderRequest {
  provider_id: string;
}

export interface CheckPasswordrRequest {
  password: string;
}

export interface BindPhoneRequest {
  phone_number: string;
  sudo_token: string;
  verification_token: string;
}

export interface SetPasswordRequest {
  new_password: string;
  sudo_token: string;
}


export interface SetPasswordRequest {
  new_password: string;
  sudo_token: string;
}

export interface UpdatePasswordRequest {
  old_password: string;
  new_password: string;
}

// password 和 verification_token 而选一，如果绑定了手机号，则必须使用verification_token 进行sudo
export interface SudoRequest {
  password?: string;
  verification_token?: string
}

export interface SudoResponse {
  sudo_token?: string
}


export interface ChangeBoundProviderRequest {
  trans_token: string;
  provider_id: string;
}

export interface ChangeBoundProviderResponse {
  client_id: string;
}

export interface QueryUserProfileReq {
  appended_params: string;
}
