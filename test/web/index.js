import axios from 'axios';
import { env, appid } from '../../test.config.js';
import { signInWeixin, signInCustom, signInAnonymous, registerAuthCases } from './cases/auth';
import { registerFunctionCases } from './cases/function';
import { registerStorageCases } from './cases/storage';
import { registerDatabaseCases } from './cases/database';
import { runAllTestCases, runSelectedTestCase, printInfo } from './util';

import cloudbase from '../../packages/cloudbase';
// import { test_ext_ci } from './ext_ci';

// import * as extCi from '@cloudbase/extension-ci';

let app;
let auth;
let loginState;

async function init () {
  printInfo('web test starting init');
  // 初始化
  app = cloudbase.init({
    env,
    timeout: 150000
  });

  auth = app.auth({
    persistence: 'local'
  });

  // 公众号微信登录
  // await signInWeixin(auth,appid);

  // 匿名登录
  await signInAnonymous(auth);

  // 自定义登录
  // await signInCustom(auth);

  registerFunctionCases(app);
  registerStorageCases(app);
  registerDatabaseCases(app);

  initTestCasesIndex();
};

/**
 * 初始化用例菜单
 */
export function initTestCasesIndex() {
  const $el_select = document.getElementById('testCaseSelect');
  const $el_run_selected = document.getElementById('runSelectedTestCase');
  const $el_run_all = document.getElementById('runAllTestCases');
  const $el_include_auth = document.getElementById('include_auth');

  $el_run_selected.onclick = async function() {
    const mod = $el_select.options[$el_select.selectedIndex].value;
    runSelectedTestCase(mod);
  };
  
  $el_run_all.onclick = async function() {
    if($el_include_auth.checked){
      !window.testCaseList.auth&& (await registerAuthCases(auth));
    }else{
      delete window.testCaseList.auth;
    }
    runAllTestCases();
  };

  let htmlStr = '';
  for(const mod in window.testCaseList){
    htmlStr += `<option value="${mod}">${mod}</option>`;
  }
  $el_select.innerHTML = htmlStr;
};
init();
