import { ICloudbase } from '@cloudbase/types';

export const checkFromAuthV2 = async (_fromApp: ICloudbase) => {
  // const authInstance = _fromApp.authInstance
  const oauthInstance = _fromApp.oauthInstance || (_fromApp as any).oauth()
  // const authLogin = authInstance && await authInstance.getLoginState()
  // if (authLogin) {
  //   return {
  //     authType: 'auth',
  //     instance: authInstance
  //   }
  // }
  const oauthLogin = oauthInstance && await oauthInstance.hasLoginState()
  if (oauthLogin) {
    return {
      authType: 'oauth',
      instance: oauthInstance
    }
  }
  return {}
}