import axios from 'axios';
import { env, appid } from '../../test.config.js';
import { signInWithWeixin } from '../cases/auth';
import { registerFunctionCases } from '../cases/function';
import { registerStorageCases } from '../cases/storage';
// import { test_database } from './database';
import { runAllTestCases, runSelectedTestCase, printInfo } from './util';

import tcb from '../../packages/js-sdk';
// import { test_ext_ci } from './ext_ci';
// 默认情况下不测试登录
import { signInCustom } from '../cases/auth';

// import * as extCi from '@cloudbase/extension-ci';

let app;
let auth;
let loginState;

async function init () {
  printInfo('web test starting init');
  // 初始化
  app = tcb.init({
    env,
    timeout: 150000
  });

  auth = app.auth({
    persistence: 'local'
  });
  
  // app.registerExtension(extCi);

  // await test_auth(app, appid);

  
  // 公众号微信登录
  // await signInWithWeixin(auth);
  // await auth.weixinAuthProvider({
  //   appid,
  //   scope: 'snsapi_base'
  // }).signIn();
  
  // 自定义登录
  // await signInCustom(auth)

  // 匿名登录
  // await auth.anonymousAuthProvider().signIn()

  // await test_ext_ci(app);

  // storage 有需要手动上传文件的测试用例，无法自动跑完
  // await test_storage(app);

  // await test_function(app);

  // await test_database(app);
  // registerFunctionCases(app);
  registerStorageCases(app);

  initTestCasesIndex();
};

async function getLoginState(){
  loginState = await auth.getLoginState();
}
/**
 * 初始化用例菜单
 */
function initTestCasesIndex() {
  const $el_select = document.getElementById('testCaseSelect');
  const $el_run_selected = document.getElementById('runSelectedTestCase');
  const $el_run_all = document.getElementById('runAllTestCases');

  $el_run_selected.onclick = async function() {
    if(await checkLoginType()){
      const selectIndex = $el_select.options[$el_select.selectedIndex].value;
      runSelectedTestCase(selectIndex);
    }
  };
  
  $el_run_all.onclick = async function() {
    if(await checkLoginType()){
      runAllTestCases();
    }
  };

  let htmlStr = '';
  window['testCaseList'].forEach(({ msg }, index) => {
    htmlStr += `<option value="${index}">${msg}</option>`;
  });
  $el_select.innerHTML = htmlStr;
};
/**
 * 检查登录类型
 */
async function checkLoginType(){
  const $el_selected = document.querySelectorAll('input[name=loginType]:checked')[0];
  if(!$el_selected){
    alert('请选择登录类型');
    return false;
  }
  const loginType = $el_selected.value;
  switch(loginType){
    case 'wx_web':
      break;
    case 'custom':
      break;
    case 'anonymous':
      break;
  }
  return true;
}

init();
