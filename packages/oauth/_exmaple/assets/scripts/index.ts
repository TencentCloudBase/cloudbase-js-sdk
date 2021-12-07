import { client, fn } from "./request";

async function init() {
  try {
    signInWithUserNameAndPassword()
  } catch (error) {
    // 获取用户信息失败
    console.log('test  error: ', error);
  }

  // try {
  //     console.log("rest password")
  //     const verificationToken = await client.auth.getVerification({
  //         phone_number: "+86 16622002084",
  //     })
  //     console.log(verificationToken.verification_id, verificationToken.is_user)
  // } catch (error) {
  //     // 获取用户信息失败
  //     console.log('发送失败  error: ', error);
  // }
  try {
    signInWithProviderToken()
  } catch (error) {
    // 获取用户信息失败
    console.log('grant error  error: ', error);
  }

  const resp = await fn.callFunction({
    name: "test", data: {
      name: "ok"
    }
  })
  console.log(resp.result)
}

init();



async function signInWithUserNameAndPassword(): Promise<void> {
  // 判断是否已经登录过了
  const loginState = await client.auth.hasLoginState()
  if (!loginState) {
    // 用户名密码登录
    await client.auth.signIn({
      username: "leenanxi",
      password: "qw0000"
    })
  }
  // 获取用户信息，相当于 auth.signInWithUsernameAndPassword
  const userInfoA = await client.auth.getUserProfile()
  console.log(userInfoA)

  // 修改密码

}


async function signInWithProviderToken(): Promise<void> {
  // 判断是否已经登录过了
  const loginState = await client.auth.hasLoginState()

  console.log("test", loginState)

  return

  // if (!loginState) {
  //     const crd = await  client.auth.signInAnonymously()
  //     console.log(crd)
  // }

  const userInfoA = await client.auth.getUserProfile()
  console.log(userInfoA)
  //
  // // 获取provider token
  // const providerToken = await client.auth.grantProviderToken({
  //     provider_id: "weda",
  //     provider_access_token: "ya29.a0ARrdaM8nNGa2g3eNWok38QWChn5hcOMZIXIbV48LxcEIt7lSfOt2ERLVRMQh9-iOxMy9anVtVV20ONWWyIHKxeA68D8FlpSZIazLfscLDOY8X1IjzF7kfhLiQwVbPYVeVsj7prOacREaICaaYO632za8bLSp2RU",
  // });
  // // 用provider token 登录
  // client.auth.signInWithProvider({
  //     provider_token: providerToken.provider_token,
  // })

  // 调用云函数



  // 登录成功后，获取用户信息
  const userInfo = await client.auth.getUserProfile()
  console.log(userInfo)
  // 获取 accessToken
  const accessToken = await client.auth.credentialsClient.getAccessToken();
  console.log(accessToken)
  // 用 OIDC 请求信息
  // export interface ExampleData {
  //     result?: string;
  // }
  // const data = await client.oAuth2Client.request<ExampleData>("https://example.com", {withCredentials:true})
  // console.log(data.result)
}