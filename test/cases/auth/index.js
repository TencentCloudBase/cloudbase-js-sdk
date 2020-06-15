// auth
import axios from 'axios';
import * as assert from 'power-assert';
import { authFnUrl } from '../../../test.config.js';
import { register, callbackWithTryCatch, isSuccess } from '../../web/util';

function registerAuthTest(app, appid, scope) {
  let auth = app.auth({
    persistence: 'local'
  });

  // register('auth: signIn in callback, scope: ' + scope, async () => {
  //   await new Promise((resolve) => {
  //     auth.weixinAuthProvider({ appid, scope }).signIn(callbackWithTryCatch((err, res) => {
  //       assert(isSuccess(err, res), { err, res });
  //     }, () => {
  //       resolve();
  //     }));
  //   });
  // });

  // register('auth: signIn in promise, scope: ' + scope, async () => {
  //   await auth.weixinAuthProvider({ appid, scope }).signIn().then(callbackWithTryCatch((res) => {
  //     assert(isSuccess(0, res), { res });
  //   })).catch(callbackWithTryCatch((err) => {
  //     assert(false, { err });
  //   }));
  // });

  register('auth: getUserInfo, scope: ' + scope, async () => {
    await auth.getUserInfo().then(callbackWithTryCatch((res) => {
      assert(isSuccess(0, res) && res.appid, { res });
    })).catch(callbackWithTryCatch((err) => {
      assert(false, { err });
    }));
  });

  register('auth: signOut, scope: ' + scope, async () => {
    await auth.signOut().then(callbackWithTryCatch((res) => {
      assert(isSuccess(0, res) && res.appid, { res });
    })).catch(callbackWithTryCatch((err) => {
      assert(false, { err });
    }));
  });

  register('auth: signIn with ticket', async () => {
    await signInCustom(auth);
  });
}

export function test_auth(app, appid) {
  let AllowedScopes = ['snsapi_base', 'snsapi_userinfo', 'snsapi_login'];
  let i;
  let scope;

  for (i = 0; i < AllowedScopes.length; i++) {
    scope = AllowedScopes[i];

    registerAuthTest(app, appid, scope);
  }
}
export function registerAuthCasesOfWxWeb(){

}
export function registerAuthCasesOfCustom(){
  
}
export function registerAuthCasesOfAnonymous(){
  
}

async function getTicket(){
  return (await axios.get(authFnUrl)).data;
}

export async function signInCustom(auth){
  const ticket = await getTicket();
  await auth.customAuthProvider().signIn(ticket);
}

export async function signInWithWeixin(auth){
  const provider = auth.weixinAuthProvider({
    appid,
    scope: 'snsapi_base'
  });
  const loginState = await provider.getRedirectResult();
  if(loginState){
    printSuccess(`微信登录成功: ${JSON.stringify(loginState)}`);
  }else{
    provider.signInWithRedirect();
  }
}