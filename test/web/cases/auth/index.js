// auth
import axios from 'axios';
import * as assert from 'power-assert';
import { authFnUrl, env } from '../../../../test.config.js';
import { register, callbackWithTryCatch, isSuccess, printSuccess } from '../../util';

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

export async function registerAuthCases(auth, ...args) {
  const loginState = await auth.getLoginState();
  switch (true) {
    case loginState.isAnonymousAuth:
      return registerAuthCasesOfAnonymous(auth, ...args);
    case loginState.isCustomAuth:
      return registerAuthCasesOfCustom(auth, ...args);
    case loginState.isWeixinAuth:
      return registerAuthCasesOfWxWeb(auth, ...args);
    case loginState.isUsernameAuth:
      return registerAuthCasesOfUsername(auth, ...args);
  }
}
function registerCase(msg, fn) {
  register('auth', msg, fn);
}

function registerAuthCasesOfWxWeb(auth) {
  registerCase('auth: weixin loginState', async () => {
    const loginState = await auth.getLoginState();
    assert(isSuccess(0, loginState), { loginState });
    assert(loginState.isWeixinAuth === true, { loginState });
    assert(loginState.user.loginType === 'CUSTOM', { loginState });
  });
}
function registerAuthCasesOfCustom(auth) {
  registerCase('auth: custom loginState', async () => {
    const loginState = await auth.getLoginState();
    assert(isSuccess(0, loginState), { loginState });
    assert(loginState.isCustomAuth === true, { loginState });
    assert(loginState.user.loginType === 'CUSTOM', { loginState });
  });

  registerCase('auth: anonymous storage info', () => {
    const loginTypeInfo = localStorage.getItem(`login_type_${env}`);
    assert(loginTypeInfo && JSON.parse(loginTypeInfo).content === 'CUSTOM');
  });
}
function registerAuthCasesOfAnonymous(auth) {
  registerCase('auth: anonymous loginState', async () => {
    const loginState = await auth.getLoginState();
    assert(isSuccess(0, loginState), { loginState });
    assert(loginState.isAnonymousAuth === true, { loginState });
    assert(loginState.user.loginType === 'ANONYMOUS', { loginState });
  });

  registerCase('auth: anonymous storage info', () => {
    const uidInfo = localStorage.getItem(`anonymous_uuid_${env}`);
    const loginTypeInfo = localStorage.getItem(`login_type_${env}`);
    assert(uidInfo && JSON.parse(uidInfo).content.length > 0);
    assert(loginTypeInfo && JSON.parse(loginTypeInfo).content === 'ANONYMOUS');
  });

  registerCase('auth: anonymous cant\'t signOut', async () => {
    let res;
    try {
      await auth.signOut();
    } catch (e) {
      res = e;
    }
    assert.strictEqual(JSON.parse(res.message).code, 'INVALID_OPERATION', { res });
  });
}
function registerAuthCasesOfUsername(auth, username) {
  registerCase('auth: username basic info', async () => {
    const userinfo = await auth.getUserInfo();
    assert(userinfo.loginType === 'USERNAME', { userinfo });
    assert(userinfo.username === username, { userinfo });
  });
}

async function getTicket() {
  return (await axios.get(authFnUrl)).data;
}

export async function signInCustom(auth) {
  const loginState = await auth.getLoginState();
  if (loginState && !loginState.isCustomAuth) {
    alert('当前已有其他登录类型的登录态，请清空localstorage后重新发起测试');
    return;
  }
  const ticket = await getTicket();
  await auth.customAuthProvider().signIn(ticket);
}

export async function signInAnonymous(auth) {
  const loginState = await auth.getLoginState();
  if (loginState && !loginState.isAnonymousAuth) {
    alert('当前已有其他登录类型的登录态，请清空localstorage后重新发起测试');
    return;
  }
  await auth.anonymousAuthProvider().signIn();
}

export async function signInByPhone(auth, phoneNumber) {
  const loginState = await auth.getLoginState();
  if (loginState && !loginState.isPhoneAuth) {
    alert('当前已有其他登录类型的登录态，请清空localstorage后重新发起测试');
    return;
  }
  // await auth.anonymousAuthProvider().signIn();

  console.log('auth', auth)

  // 1. 发送验证码
  // const getCodeRes = await auth.phoneAuthProvider().sendPhoneCode(phoneNumber)
  // console.log('getCodeRes', getCodeRes)
  // 2. 验证码+密码注册
  // const signUpRes = await auth.phoneAuthProvider().signUpWithPhoneCode(phoneNumber, '437662', '33333333ll')
  // console.log('signInRes', signUpRes)
  // 3. 验证码登录
  // const signInRes1 = await auth.phoneAuthProvider().signIn({
  //   phoneNumber,
  //   phoneCode: '605689'
  // })
  // 4. 密码登录
  // const signInRes2 = await auth.phoneAuthProvider().signIn({
  //   phoneNumber,
  //   password: '33333333ll'
  // })
  // console.log('signInRes2', signInRes2)
  // console.log('signInRes1', signInRes1)

  // 5. 更新手机号
  const user = await auth.getCurrenUser()
  // console.log('auth', auth)
  // console.log('user', user)
  // const updatePhoneRes1 = await user.updatePhoneNumber(18202741638, '892693')
  // console.log('updatePhoneRes1', updatePhoneRes1)
  // const updateUseInfo1 = await auth.getUserInfo()
  // console.log('updateUseInfo1', updateUseInfo1)

  // 6. 解绑手机号
  const unlinkRes = await user.unlink('PHONE')
  console.log('unlinkRes', unlinkRes)
}

export async function signInWeixin(auth, appid) {
  const provider = auth.weixinAuthProvider({
    appid,
    scope: 'snsapi_base'
  });
  const result = await provider.getRedirectResult();
  if (result) {
    printSuccess(result);
  } else {
    provider.signInWithRedirect();
  }
}

export async function signInWithUsername(auth, { username, password }) {
  if (!username || !password) {
    throw new Error('请配置用户名&密码');
  }
  const loginState = await auth.getLoginState();
  if (loginState && !loginState.isAnonymousAuth) {
    alert('当前已有其他登录类型的登录态，请清空localstorage后重新发起测试');
    return;
  }
  // 检查用户名是否绑定过
  if (!(await auth.isUsernameRegistered(username))) {
    await signInCustom(auth)
    await auth.currentUser.updateUsername(username); // 绑定用户名
  } else {
    await auth.signInWithUsernameAndPassword(username, password);
  }
}

export async function clearLoginState() {
  try {
    await auth.signOut();
  } catch (e) {
    localStorage.clear();
  }
}