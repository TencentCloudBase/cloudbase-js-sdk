import axios from "axios"
import { env, appid, authUsername, authPassword } from "../../test.config.js"
import {
  registerAuthCases,
  signInWeixin,
  signInCustom,
  signInAnonymous,
  signInWithUsername,
  signInByPhone,
  signWithOAuth2
} from "./cases/auth"
import { registerFunctionCases } from "./cases/function"
import { registerStorageCases } from "./cases/storage"
import { registerDatabaseCases } from "./cases/database"
import { runAllTestCases, runSelectedTestCase, printInfo } from "./util"

import cloudbase from "../../packages/cloudbase"

// import { OAuth2Client, Auth } from '../../packages/oauth'
// import cloudbase from '../../packages/cloudbase/app';
// import '../../packages/cloudbase/auth';
// import '../../packages/cloudbase/database';
// import '../../packages/cloudbase/realtime';
// import { test_ext_ci } from './ext_ci';

// import * as extCi from '@cloudbase/extension-ci';

let app
let auth
let loginState

cloudbase.registerEndPoint("//tcb-pre.tencentcloudapi.com/web")
// cloudbase.registerEndPoint("//exp.ap-guangzhou.tcb-api.tencentcloudapi.com/web")
// cloudbase.registerEndPoint("//127.0.0.1:8002/web")
// cloudbase.registerEndPoint("https://production-fv979.ap-shanghai.tcb-api.tencentcloudapi.com")

async function init() {
  printInfo("web test starting init")
  // 初始化
  app = cloudbase.init({
    env,
    region: 'ap-shanghai'
    // timeout: 150000
  })

  auth = app.auth({
    persistence: "local"
  })

  registerFunctionCases(app)
  registerStorageCases(app)
  registerDatabaseCases(app)
  // registerAnalytics(app);

  initTestCasesIndex()

  // 广告上报
  // app.analytics({
  //   report_type: "mall",
  //   report_data: {
  //     action_time: new Date().getTime(),
  //     action_type: "visit_store"
  //   }
  // })

  await auth.getCurrenUser()
  if (auth.currentUser) {
    document.querySelector('#userInfoName').textContent = auth.currentUser.uid
  }
  document.querySelector('#signout').onclick = async function dologin() {
    // auth.signOut()
  }
  document.querySelector('#signin').onclick = async function dologin() {
    console.log('dologin ...', auth.currentUser)
    if (!auth.hasLoginState()) {
      console.log('login start ...')
      // 公众号微信登录
      // await signInWeixin(auth, appid);

      // 匿名登录
      // await signInAnonymous(auth)

      await signWithOAuth2(auth)


      console.log('login end...')

      // 自定义登录
      // await signInCustom(auth);

      // 用户名登录
      // await signInWithUsername(auth,{
      //   username: authUsername,
      //   password: authPassword
      // });

      // 短信验证码登录
      // await signInByPhone(auth, '13024748409')
      // await signInByPhone(auth, "18202741638")
    }
    else {
      console.log('already login ...')
    }
  }



  document.querySelector('#oauth2signin').onclick = async function dologin() {
    // 初始化tcb
    const app = cloudbase.init({
      env: 'xbase-4gh5dh6nf62145a9',
      region: 'ap-shanghai'
    })

    const oauth = app.oauth()

    const auth = app.auth()

    const loginState = await auth.getLoginState()

    console.log("loginState", loginState)

    if (!loginState) {

      // 走oauth登录
      const crd = await oauth.signInAnonymously()
      console.log('crd', crd)

      // 走auth登录
      // const testAnony = await auth.anonymousAuthProvider().signIn();
      // console.log('testAnony', testAnony)

      // 调用函数
      try {

        const callRes = await app.callFunction({
          name: 'test',
          data: {}
        })
        console.log('callRes', callRes)
      } catch (e) {
        console.log('e', e)
      }
    } else {
      // getCurrenUser
      const currenUser = await auth.getCurrenUser()
      console.log('currenUser', currenUser)

      // SignOut
      setTimeout(async () => {
        console.log('登出')
        await auth.signOut()
      }, 3000)
    }
  }
}

/**
 * 初始化用例菜单
 */
export function initTestCasesIndex() {
  const $el_select = document.getElementById("testCaseSelect")
  const $el_run_selected = document.getElementById("runSelectedTestCase")
  const $el_run_all = document.getElementById("runAllTestCases")
  const $el_include_auth = document.getElementById("include_auth")

  $el_run_selected.onclick = async function () {
    const mod = $el_select.options[$el_select.selectedIndex].value
    runSelectedTestCase(mod)
  }

  $el_run_all.onclick = async function () {
    if ($el_include_auth.checked) {
      !window.testCaseList.auth && (await registerAuthCases(auth))
    } else {
      delete window.testCaseList.auth
    }
    runAllTestCases()
  }

  let htmlStr = ""
  for (const mod in window.testCaseList) {
    htmlStr += `<option value="${mod}">${mod}</option>`
  }
  $el_select.innerHTML = htmlStr
}
init()
