import axios from "axios"
import { env, appid, authUsername, authPassword } from "../../test.config.js"
import {
  registerAuthCases,
  signInAnonymous,
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

// cloudbase.registerEndPoint("//tcb-pre.tencentcloudapi.com/web")
// cloudbase.registerEndPoint("//exp.ap-guangzhou.tcb-api.tencentcloudapi.com/web")
// cloudbase.registerEndPoint("//127.0.0.1:8002/web")
// cloudbase.registerEndPoint("https://production-fv979.ap-shanghai.tcb-api.tencentcloudapi.com")

async function init() {
  printInfo("web test starting init")
  // 初始化
  if (!app) {
    app = cloudbase.init({
      env: 'luke-postpay-env-8ajra',
      // region: 'ap-shanghai'
    })
  }

  auth = app.auth()

  const db = app.database()
  const collection = db.collection('test')

  registerFunctionCases(app)
  registerStorageCases(app)
  registerDatabaseCases(app)


  initTestCasesIndex()

  // 广告上报
  // app.analytics({
  //   report_type: "mall",
  //   report_data: {
  //     action_time: new Date().getTime(),
  //     action_type: "visit_store"
  //   }
  // })

  let verification_id

  await auth.getCurrentUser()
  if (auth.currentUser) {
    document.querySelector('#userInfoName').textContent = auth.currentUser.username
  }
  document.querySelector('#signout').onclick = async function dologin() {
    // auth.signOut()
  }
  document.querySelector('#signin').onclick = async function dologin() {
    console.log('dologin ...', auth.currentUser)
    if (!auth.hasLoginState()) {
      const name = document.querySelector('#name').value;
      // 获取密码
      const password = document.querySelector('#password').value;

      await auth.signIn({
        username: `+86 ${name}`,
        password
      })

      const user = await auth.getCurrentUser()
      console.log('user', user)

      // call Functiion
      const callRes = await app.callFunction({
        name: 'test',
        data: {}
      })
      console.log('callRes', callRes)
    }
    else {
      console.log('already login ...')
    }
  }

  document.querySelector('#signup').onclick = async function dosignup() {
    // 获取手机号，邮箱
    const name = document.querySelector('#name').value;
    // 获取用户名
    const username = document.querySelector('#username').value;
    // 获取验证码
    const code = document.querySelector('#code').value;
    // 获取密码
    const password = document.querySelector('#password').value;

    // 获取 verification_token
    const verificationToken = await auth.verify({
      verification_id: verification_id,
      verification_code: code
    })

    await auth.signUp({
      phone_number: `+86 ${name}`,
      // verification_code: verificationCode,
      verification_token: verificationToken.verification_token,
      // 可选，设置昵称
      name: "nicknick",
      // 可选，设置密码
      password: password,
      // 可选，设置登录用户名
      username: username
    })

    const user = await auth.getCurrentUser()
    console.log('user', user)
  }

  document.querySelector('#getCode').onclick = async function dogetCode() {
    const verificationRes = await auth.getVerification({
      phone_number: `+86 ${document.querySelector('#name').value}`
    })
    console.log('verification_id', verificationRes)
    verification_id = verificationRes.verification_id
  }

  document.querySelector('#mockAddDoc11').onclick = async function () {
    const addRes = await collection.add({
      a: 1
    })
    console.log('addRes', addRes)
  }

  document.querySelector('#oauth2signin').onclick = async function dologin() {
    // 初始化tcb
    // const app = cloudbase.init({
    //   env: 'xbase-4gh5dh6nf62145a9',
    //   // region: 'ap-shanghai'
    // })

    // const oauth = app.oauth()

    // const auth = app.auth()

    const loginState = await auth.getLoginState()

    console.log("loginState", loginState)

    if (!loginState) {

      // 走oauth登录
      // const crd = await auth.setCustomSignFunc(() => { return '8ccc482a-4d14-4093-9229-0466a056180a/@@/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJSUzI1NiIsImVudiI6Imx1a2UtcG9zdHBheS1lbnYtOGFqcmEiLCJpYXQiOjE2NDE0NzAzMTMwMzYsImV4cCI6MTY0MTQ3MDkxMzAzNiwidWlkIjoibHVrZWp5aHVhbmciLCJyZWZyZXNoIjozNjAwMDAwLCJleHBpcmUiOjE2NDIwNzUxMTMwMzZ9.W51pRsCCT0KqsuRfZ3l8t9jnD6JwvJ4IV3CP0cWow9yN3b3Nf8OXxqL_xW4xW8oKE3Xa9eTQUu9oy89h0H-URW1sQ2wm0ldYDSon2Xbm8jBZ_SejJtzlbIc9jbbRDadWfGxAaM4h8K0jitZT05ku2PeQHV-oTJwWSC8GnA7lq4c' })
      // console.log('crd', crd)

      // let res = await auth.signInWithCustomTicket();
      // console.log('custom sign in res:', res)
      await auth.signInAnonymously()

      // 调用函数
      try {
        const callRes = await app.callFunction({
          name: 'getTicket',
          data: {}
        })
        console.log('callRes', callRes)

        // const db = app.database()
        // 开启watch
        // const ref = collection.where({}).watch({
        //   onChange: (snapshot) => {
        //     console.log("收到snapshot**********", snapshot);
        //   },
        //   onError: (error) => {
        //     console.log("收到error**********", error);
        //   }
        // })

      } catch (e) {
        console.log('e', e)
      }
    } else {
      // getCurrenUser
      const currenUser = await auth.getCurrentUser()
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
