// auth
import axios from 'axios';
import * as assert from 'power-assert';
import { authFnUrl, env } from '../../../../test.config.js';
import { register, callbackWithTryCatch, isSuccess,printSuccess } from '../../util';

function registerAuthTest(app, appid, scope) {
  let auth = app.auth({
    persistence: 'local'
  });

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
}

export async function registerAuthCases(auth,...args){
  const loginState = await auth.getLoginState();
  switch(true){
    case loginState.isAnonymousAuth:
      return registerAuthCasesOfAnonymous(auth,...args);
    case loginState.isCustomAuth:
      return registerAuthCasesOfCustom(auth,...args);
    case loginState.isWeixinAuth:
      return registerAuthCasesOfWxWeb(auth,...args);
    case loginState.isUsernameAuth:
      return registerAuthCasesOfUsername(auth,...args);
  }
}
function registerCase(msg,fn){
  register('auth',msg,fn);
}

function registerAuthCasesOfWxWeb(auth){
  registerCase('auth: weixin loginState', async () => {
    const loginState = await auth.getLoginState();
    assert(isSuccess(0, loginState), { loginState });
    assert(loginState.isWeixinAuth===true, { loginState });
    assert(loginState.user.loginType==='CUSTOM', { loginState });
  });
}
function registerAuthCasesOfCustom(auth){
  registerCase('auth: custom loginState', async () => {
    const loginState = await auth.getLoginState();
    assert(isSuccess(0, loginState), { loginState });
    assert(loginState.isCustomAuth===true, { loginState });
    assert(loginState.user.loginType==='CUSTOM', { loginState });
  });

  registerCase('auth: anonymous storage info', ()=>{
    const loginTypeInfo = localStorage.getItem(`login_type_${env}`);
    assert(loginTypeInfo&&JSON.parse(loginTypeInfo).content==='CUSTOM');
  });
}
function registerAuthCasesOfAnonymous(auth){
  registerCase('auth: anonymous loginState', async () => {
    const loginState = await auth.getLoginState();
    assert(isSuccess(0, loginState), { loginState });
    assert(loginState.isAnonymousAuth===true, { loginState });
    assert(loginState.user.loginType==='ANONYMOUS', { loginState });
  });

  registerCase('auth: anonymous storage info', ()=>{
    const uidInfo = localStorage.getItem(`anonymous_uuid_${env}`);
    const loginTypeInfo = localStorage.getItem(`login_type_${env}`);
    assert(uidInfo&&JSON.parse(uidInfo).content.length>0);
    assert(loginTypeInfo&&JSON.parse(loginTypeInfo).content==='ANONYMOUS');
  });

  registerCase('auth: anonymous cant\'t signOut', async () =>{
    let res;
    try{
      await auth.signOut();
    }catch(e){
      res = e;
    }
    assert.strictEqual(JSON.parse(res.message).code, 'INVALID_OPERATION', { res });
  });
}
function registerAuthCasesOfUsername(auth,username){
  registerCase('auth: username basic info', async () => {
    const userinfo = await auth.getUserInfo();
    assert(userinfo.loginType==='USERNAME', { userinfo });
    assert(userinfo.username===username, { userinfo });
  });
}

async function getTicket(){
  return (await axios.get(authFnUrl)).data;
}

export async function signInCustom(auth){
  const loginState = await auth.getLoginState();
  if(loginState&&!loginState.isCustomAuth){
    alert('当前已有其他登录类型的登录态，请清空localstorage后重新发起测试');
    return;
  }
  const ticket = await getTicket();
  await auth.customAuthProvider().signIn(ticket);
}

export async function signInAnonymous(auth){
  const loginState = await auth.getLoginState();
  if(loginState&&!loginState.isAnonymousAuth){
    alert('当前已有其他登录类型的登录态，请清空localstorage后重新发起测试');
    return;
  }
  await auth.anonymousAuthProvider().signIn();
}

export async function signInWeixin(auth,appid){
  const provider = auth.weixinAuthProvider({
    appid,
    scope: 'snsapi_base'
  });
  const result = await provider.getRedirectResult();
  if(result){
    printSuccess(result);
  }else{
    provider.signInWithRedirect();
  }
}

export async function signInWithUsername(auth,{username,password}){
  if(!username||!password){
    throw new Error('请配置用户名&密码');
  }
  const loginState = await auth.getLoginState();
  if(loginState&&!loginState.isAnonymousAuth){
    alert('当前已有其他登录类型的登录态，请清空localstorage后重新发起测试');
    return;
  }
  // 检查用户名是否绑定过
  if (!(await auth.isUsernameRegistered(username))) {
    await signInCustom(auth)
    await auth.currentUser.updateUsername(username); // 绑定用户名
  }else{
    await auth.signInWithUsernameAndPassword(username,password);
  }
}

export async function clearLoginState(){
  try{
    await auth.signOut();
  }catch(e){
    localStorage.clear();
  }
}