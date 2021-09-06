export declare enum ApiUrls {
    AUTH_SIGN_IN_URL = "/auth/v1/signin",
    AUTH_SIGN_IN_ANONYMOUSLY_URL = "/auth/v1/signin/anonymously",
    AUTH_SIGN_IN_WITH_PROVIDER_URL = "/auth/v1/signin/with/provider",
    AUTH_SIGN_UP_URL = "/auth/v1/signup",
    AUTH_TOKEN_URL = "/auth/v1/token",
    AUTH_REVOKE_URL = "/auth/v1/revoke",
    PROVIDER_BIND_URL = "/auth/v1/user/provider/bind",
    PROVIDER_TOKEN_URL = "/auth/v1/provider/token",
    PROVIDER_URI_URL = "/auth/v1/provider/uri",
    USER_ME_URL = "/auth/v1/user/me",
    USER_QUERY_URL = "/auth/v1/user/query",
    USER_PRIFILE_URL = "/auth/v1/user/profile",
    USER_TRANS_BY_PROVIDER_URL = "/auth/v1/user/trans/by/provider",
    VERIFICATION_URL = "/auth/v1/verification",
    VERIFY_URL = "/auth/v1/verification/verify",
    PROVIDER_LIST = "/auth/v1/user/provider",
    PROVIDER_UNBIND_URL = "/auth/v1/user/provider",
    CHECK_PWD_URL = "/auth/v1/user/sudo",
    BIND_PHONE_URL = "/auth/v1/user/contact",
    AUTH_SET_PASSWORD = "/auth/v1/user/password"
}
export declare enum VerificationUsages {
    REGISTER = "REGISTER",
    SIGN_IN = "SIGN_IN",
    PASSWORD_RESET = "PASSWORD_RESET",
    EMAIL_ADDRESS_CHANGE = "EMAIL_ADDRESS_CHANGE",
    PHONE_NUMBER_CHANGE = "PHONE_NUMBER_CHANGE"
}