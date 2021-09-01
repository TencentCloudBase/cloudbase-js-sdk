"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = exports.Syntax = void 0;
var Syntax;
(function (Syntax) {
    Syntax["CLIENT_ID"] = "client_id";
    Syntax["CLIENT_SECRET"] = "client_secret";
    Syntax["RESPONSE_TYPE"] = "response_type";
    Syntax["SCOPE"] = "scope";
    Syntax["STATE"] = "state";
    Syntax["REDIRECT_URI"] = "redirect_uri";
    Syntax["ERROR"] = "error";
    Syntax["ERROR_DESCRIPTION"] = "error_description";
    Syntax["ERROR_URI"] = "error_uri";
    Syntax["GRANT_TYPE"] = "grant_type";
    Syntax["CODE"] = "code";
    Syntax["ACCESS_TOKEN"] = "access_token";
    Syntax["TOKEN_TYPE"] = "token_type";
    Syntax["EXPIRES_IN"] = "expires_in";
    Syntax["USERNAME"] = "username";
    Syntax["PASSWORD"] = "password";
    Syntax["REFRESH_TOKEN"] = "refresh_token";
})(Syntax = exports.Syntax || (exports.Syntax = {}));
var ErrorType;
(function (ErrorType) {
    ErrorType["UNREACHABLE"] = "unreachable";
    ErrorType["LOCAL"] = "local";
    ErrorType["CANCELLED"] = "cancelled";
    ErrorType["UNKNOWN"] = "unknown";
    ErrorType["INVALID_ARGUMENT"] = "invalid_argument";
    ErrorType["DEADLINE_EXCEEDED"] = "deadline_exceeded";
    ErrorType["NOT_FOUND"] = "not_found";
    ErrorType["ALREADY_EXISTS"] = "already_exists";
    ErrorType["PERMISSION_DENIED"] = "permission_denied";
    ErrorType["UNAUTHENTICATED"] = "unauthenticated";
    ErrorType["RESOURCE_EXHAUSTED"] = "resource_exhausted";
    ErrorType["FAILED_PRECONDITION"] = "failed_precondition";
    ErrorType["ABORTED"] = "aborted";
    ErrorType["OUT_OF_RANGE"] = "out_of_range";
    ErrorType["UNIMPLEMENTED"] = "unimplemented";
    ErrorType["INTERNAL"] = "internal";
    ErrorType["UNAVAILABLE"] = "unavailable";
    ErrorType["DATA_LOSS"] = "data_loss";
    ErrorType["CAPTCHA_REQUIRED"] = "captcha_required";
    ErrorType["CAPTCHA_INVALID"] = "captcha_invalid";
    ErrorType["INVALID_PASSWORD"] = "invalid_password";
    ErrorType["INVALID_STATUS"] = "invalid_status";
    ErrorType["USER_PENDING"] = "user_pending";
    ErrorType["USER_BLOCKED"] = "user_blocked";
    ErrorType["INVALID_VERIFICATION_CODE"] = "invalid_verification_code";
    ErrorType["TWO_FACTOR_REQUIRED"] = "two_factor_required";
    ErrorType["INVALID_TWO_FACTOR"] = "invalid_two_factor";
    ErrorType["INVALID_TWO_FACTOR_RECOVERY"] = "invalid_two_factor_recovery";
    ErrorType["UNDER_REVIEW"] = "under_review";
    ErrorType["INVALID_REQUEST"] = "invalid_request";
    ErrorType["UNAUTHORIZED_CLIENT"] = "unauthorized_client";
    ErrorType["ACCESS_DENIED"] = "access_denied";
    ErrorType["UNSUPPORTED_RESPONSE_TYPE"] = "unsupported_response_type";
    ErrorType["INVALID_SCOPE"] = "invalid_scope";
    ErrorType["INVALID_GRANT"] = "invalid_grant";
    ErrorType["SERVER_ERROR"] = "server_error";
    ErrorType["TEMPORARILY_UNAVAILABLE"] = "temporarily_unavailable";
    ErrorType["INTERACTION_REQUIRED"] = "interaction_required";
    ErrorType["LOGIN_REQUIRED"] = "login_required";
    ErrorType["ACCOUNT_SELECTION_REQUIRED"] = "account_selection_required";
    ErrorType["CONSENT_REQUIRED"] = "consent_required";
    ErrorType["INVALID_REQUEST_URI"] = "invalid_request_uri";
    ErrorType["INVALID_REQUEST_OBJECT"] = "invalid_request_object";
    ErrorType["REQUEST_NOT_SUPPORTED"] = "request_not_supported";
    ErrorType["REQUEST_URI_NOT_SUPPORTED"] = "request_uri_not_supported";
    ErrorType["REGISTRATION_NOT_SUPPORTED"] = "registration_not_supported";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29hdXRoMmNsaWVudC9jb25zdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSxNQWtCWDtBQWxCRCxXQUFZLE1BQU07SUFDaEIsaUNBQXVCLENBQUE7SUFDdkIseUNBQStCLENBQUE7SUFDL0IseUNBQStCLENBQUE7SUFDL0IseUJBQWUsQ0FBQTtJQUNmLHlCQUFlLENBQUE7SUFDZix1Q0FBNkIsQ0FBQTtJQUM3Qix5QkFBZSxDQUFBO0lBQ2YsaURBQXVDLENBQUE7SUFDdkMsaUNBQXVCLENBQUE7SUFDdkIsbUNBQXlCLENBQUE7SUFDekIsdUJBQWEsQ0FBQTtJQUNiLHVDQUE2QixDQUFBO0lBQzdCLG1DQUF5QixDQUFBO0lBQ3pCLG1DQUF5QixDQUFBO0lBQ3pCLCtCQUFxQixDQUFBO0lBQ3JCLCtCQUFxQixDQUFBO0lBQ3JCLHlDQUErQixDQUFBO0FBQ2pDLENBQUMsRUFsQlcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBa0JqQjtBQUVELElBQVksU0FnRFg7QUFoREQsV0FBWSxTQUFTO0lBQ25CLHdDQUEyQixDQUFBO0lBQzNCLDRCQUFlLENBQUE7SUFDZixvQ0FBdUIsQ0FBQTtJQUN2QixnQ0FBbUIsQ0FBQTtJQUNuQixrREFBcUMsQ0FBQTtJQUNyQyxvREFBdUMsQ0FBQTtJQUN2QyxvQ0FBdUIsQ0FBQTtJQUN2Qiw4Q0FBaUMsQ0FBQTtJQUNqQyxvREFBdUMsQ0FBQTtJQUN2QyxnREFBbUMsQ0FBQTtJQUNuQyxzREFBeUMsQ0FBQTtJQUN6Qyx3REFBMkMsQ0FBQTtJQUMzQyxnQ0FBbUIsQ0FBQTtJQUNuQiwwQ0FBNkIsQ0FBQTtJQUM3Qiw0Q0FBK0IsQ0FBQTtJQUMvQixrQ0FBcUIsQ0FBQTtJQUNyQix3Q0FBMkIsQ0FBQTtJQUMzQixvQ0FBdUIsQ0FBQTtJQUV2QixrREFBcUMsQ0FBQTtJQUNyQyxnREFBbUMsQ0FBQTtJQUNuQyxrREFBcUMsQ0FBQTtJQUNyQyw4Q0FBaUMsQ0FBQTtJQUNqQywwQ0FBNkIsQ0FBQTtJQUM3QiwwQ0FBNkIsQ0FBQTtJQUM3QixvRUFBdUQsQ0FBQTtJQUN2RCx3REFBMkMsQ0FBQTtJQUMzQyxzREFBeUMsQ0FBQTtJQUN6Qyx3RUFBMkQsQ0FBQTtJQUMzRCwwQ0FBNkIsQ0FBQTtJQUM3QixnREFBbUMsQ0FBQTtJQUNuQyx3REFBMkMsQ0FBQTtJQUMzQyw0Q0FBK0IsQ0FBQTtJQUMvQixvRUFBdUQsQ0FBQTtJQUN2RCw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUMvQiwwQ0FBNkIsQ0FBQTtJQUM3QixnRUFBbUQsQ0FBQTtJQUNuRCwwREFBNkMsQ0FBQTtJQUM3Qyw4Q0FBaUMsQ0FBQTtJQUNqQyxzRUFBeUQsQ0FBQTtJQUN6RCxrREFBcUMsQ0FBQTtJQUNyQyx3REFBMkMsQ0FBQTtJQUMzQyw4REFBaUQsQ0FBQTtJQUNqRCw0REFBK0MsQ0FBQTtJQUMvQyxvRUFBdUQsQ0FBQTtJQUN2RCxzRUFBeUQsQ0FBQTtBQUMzRCxDQUFDLEVBaERXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBZ0RwQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFN5bnRheCB7XG4gIENMSUVOVF9JRCA9ICdjbGllbnRfaWQnLFxuICBDTElFTlRfU0VDUkVUID0gJ2NsaWVudF9zZWNyZXQnLFxuICBSRVNQT05TRV9UWVBFID0gJ3Jlc3BvbnNlX3R5cGUnLFxuICBTQ09QRSA9ICdzY29wZScsXG4gIFNUQVRFID0gJ3N0YXRlJyxcbiAgUkVESVJFQ1RfVVJJID0gJ3JlZGlyZWN0X3VyaScsXG4gIEVSUk9SID0gJ2Vycm9yJyxcbiAgRVJST1JfREVTQ1JJUFRJT04gPSAnZXJyb3JfZGVzY3JpcHRpb24nLFxuICBFUlJPUl9VUkkgPSAnZXJyb3JfdXJpJyxcbiAgR1JBTlRfVFlQRSA9ICdncmFudF90eXBlJyxcbiAgQ09ERSA9ICdjb2RlJyxcbiAgQUNDRVNTX1RPS0VOID0gJ2FjY2Vzc190b2tlbicsXG4gIFRPS0VOX1RZUEUgPSAndG9rZW5fdHlwZScsXG4gIEVYUElSRVNfSU4gPSAnZXhwaXJlc19pbicsXG4gIFVTRVJOQU1FID0gJ3VzZXJuYW1lJyxcbiAgUEFTU1dPUkQgPSAncGFzc3dvcmQnLFxuICBSRUZSRVNIX1RPS0VOID0gJ3JlZnJlc2hfdG9rZW4nLFxufVxuXG5leHBvcnQgZW51bSBFcnJvclR5cGUge1xuICBVTlJFQUNIQUJMRSA9ICd1bnJlYWNoYWJsZScsXG4gIExPQ0FMID0gJ2xvY2FsJyxcbiAgQ0FOQ0VMTEVEID0gJ2NhbmNlbGxlZCcsXG4gIFVOS05PV04gPSAndW5rbm93bicsXG4gIElOVkFMSURfQVJHVU1FTlQgPSAnaW52YWxpZF9hcmd1bWVudCcsXG4gIERFQURMSU5FX0VYQ0VFREVEID0gJ2RlYWRsaW5lX2V4Y2VlZGVkJyxcbiAgTk9UX0ZPVU5EID0gJ25vdF9mb3VuZCcsXG4gIEFMUkVBRFlfRVhJU1RTID0gJ2FscmVhZHlfZXhpc3RzJyxcbiAgUEVSTUlTU0lPTl9ERU5JRUQgPSAncGVybWlzc2lvbl9kZW5pZWQnLFxuICBVTkFVVEhFTlRJQ0FURUQgPSAndW5hdXRoZW50aWNhdGVkJyxcbiAgUkVTT1VSQ0VfRVhIQVVTVEVEID0gJ3Jlc291cmNlX2V4aGF1c3RlZCcsXG4gIEZBSUxFRF9QUkVDT05ESVRJT04gPSAnZmFpbGVkX3ByZWNvbmRpdGlvbicsXG4gIEFCT1JURUQgPSAnYWJvcnRlZCcsXG4gIE9VVF9PRl9SQU5HRSA9ICdvdXRfb2ZfcmFuZ2UnLFxuICBVTklNUExFTUVOVEVEID0gJ3VuaW1wbGVtZW50ZWQnLFxuICBJTlRFUk5BTCA9ICdpbnRlcm5hbCcsXG4gIFVOQVZBSUxBQkxFID0gJ3VuYXZhaWxhYmxlJyxcbiAgREFUQV9MT1NTID0gJ2RhdGFfbG9zcycsXG4gIC8vIENvbW1vbkVycm9yXG4gIENBUFRDSEFfUkVRVUlSRUQgPSAnY2FwdGNoYV9yZXF1aXJlZCcsXG4gIENBUFRDSEFfSU5WQUxJRCA9ICdjYXB0Y2hhX2ludmFsaWQnLFxuICBJTlZBTElEX1BBU1NXT1JEID0gJ2ludmFsaWRfcGFzc3dvcmQnLFxuICBJTlZBTElEX1NUQVRVUyA9ICdpbnZhbGlkX3N0YXR1cycsXG4gIFVTRVJfUEVORElORyA9ICd1c2VyX3BlbmRpbmcnLFxuICBVU0VSX0JMT0NLRUQgPSAndXNlcl9ibG9ja2VkJyxcbiAgSU5WQUxJRF9WRVJJRklDQVRJT05fQ09ERSA9ICdpbnZhbGlkX3ZlcmlmaWNhdGlvbl9jb2RlJyxcbiAgVFdPX0ZBQ1RPUl9SRVFVSVJFRCA9ICd0d29fZmFjdG9yX3JlcXVpcmVkJyxcbiAgSU5WQUxJRF9UV09fRkFDVE9SID0gJ2ludmFsaWRfdHdvX2ZhY3RvcicsXG4gIElOVkFMSURfVFdPX0ZBQ1RPUl9SRUNPVkVSWSA9ICdpbnZhbGlkX3R3b19mYWN0b3JfcmVjb3ZlcnknLFxuICBVTkRFUl9SRVZJRVcgPSAndW5kZXJfcmV2aWV3JyxcbiAgSU5WQUxJRF9SRVFVRVNUID0gJ2ludmFsaWRfcmVxdWVzdCcsXG4gIFVOQVVUSE9SSVpFRF9DTElFTlQgPSAndW5hdXRob3JpemVkX2NsaWVudCcsXG4gIEFDQ0VTU19ERU5JRUQgPSAnYWNjZXNzX2RlbmllZCcsXG4gIFVOU1VQUE9SVEVEX1JFU1BPTlNFX1RZUEUgPSAndW5zdXBwb3J0ZWRfcmVzcG9uc2VfdHlwZScsXG4gIElOVkFMSURfU0NPUEUgPSAnaW52YWxpZF9zY29wZScsXG4gIElOVkFMSURfR1JBTlQgPSAnaW52YWxpZF9ncmFudCcsXG4gIFNFUlZFUl9FUlJPUiA9ICdzZXJ2ZXJfZXJyb3InLFxuICBURU1QT1JBUklMWV9VTkFWQUlMQUJMRSA9ICd0ZW1wb3JhcmlseV91bmF2YWlsYWJsZScsXG4gIElOVEVSQUNUSU9OX1JFUVVJUkVEID0gJ2ludGVyYWN0aW9uX3JlcXVpcmVkJyxcbiAgTE9HSU5fUkVRVUlSRUQgPSAnbG9naW5fcmVxdWlyZWQnLFxuICBBQ0NPVU5UX1NFTEVDVElPTl9SRVFVSVJFRCA9ICdhY2NvdW50X3NlbGVjdGlvbl9yZXF1aXJlZCcsXG4gIENPTlNFTlRfUkVRVUlSRUQgPSAnY29uc2VudF9yZXF1aXJlZCcsXG4gIElOVkFMSURfUkVRVUVTVF9VUkkgPSAnaW52YWxpZF9yZXF1ZXN0X3VyaScsXG4gIElOVkFMSURfUkVRVUVTVF9PQkpFQ1QgPSAnaW52YWxpZF9yZXF1ZXN0X29iamVjdCcsXG4gIFJFUVVFU1RfTk9UX1NVUFBPUlRFRCA9ICdyZXF1ZXN0X25vdF9zdXBwb3J0ZWQnLFxuICBSRVFVRVNUX1VSSV9OT1RfU1VQUE9SVEVEID0gJ3JlcXVlc3RfdXJpX25vdF9zdXBwb3J0ZWQnLFxuICBSRUdJU1RSQVRJT05fTk9UX1NVUFBPUlRFRCA9ICdyZWdpc3RyYXRpb25fbm90X3N1cHBvcnRlZCcsXG59XG4iXX0=