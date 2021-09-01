function qsParse(qs) {
  return qs.split('&').reduce((a, c) => {
    const [key, value] = c.split('=')
    a[key] = value
    return a
  }, {})
}

// const qs = "state&access_token=ya29.a0ARrdaM9h5sgyFIa_BpbIoU_62A5JkMhZbOZhVzOea9DdfECGO6lThUTHvk3-QQh5qCGyWzgXYcO40_j3kmGtXBM9V7QMVccQ90hDhJUSGXWAe7g6dBwvo97-kOF5sU_KXwmnRWClUGiX7G7HrPCPCFo-zAkA&token_type=Bearer&expires_in=3599&scope=email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid&authuser=0&prompt=consent"

// // qsParse(decodeURIComponent((new URL(window.location.href).hash).replace('#', '')))


// const url = qsParse(decodeURIComponent((new URL(window.location.href).hash).replace('#', '')))

// const qs1 = 'state=eyJ0IjoxNjI4NDk5Mzc4MTY0LCJwcm92aWRlcl9pZCI6Imdvb2dsZSIsImNsaWVudF9pZCI6InByb2R1Y3Rpb24tZnY5NzkiLCJyb3V0ZUtleSI6IiJ9&access_token=ya29.a0ARrdaM8YTiBPL1Kdjw9dbtJwjQTVvHrbmM-gQQ9Lgg5Bav8i3OAyQp7WU8AZHhogAT6qnzp69FGTPneuGoPPX0hwiOPTogKd3l2k8YFVrwblv8Pti3BD3yxbQ24EGHukRfv_OSsuuzgqkKRgxsxrLnYYjx0wrw&token_type=Bearer&expires_in=3598&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20openid%20https://www.googleapis.com/auth/userinfo.profile&authuser=0&prompt=none'
const qs1 = 'state=eyJ0IjoxNjMwNDc2MzExNjA3LCJwcm92aWRlcl9pZCI6Imdvb2dsZSIsImNsaWVudF9pZCI6InByb2R1Y3Rpb24tZnY5NzkiLCJyb3V0ZUtleSI6IiJ9&access_token=ya29.a0ARrdaM_HNhiT7AWwn_4OApz6rQT44zpeWHPn-SoakKv3wB3x5j3AbPVMJdD21p8ZU1TsMYJKAfnc9CN9GJHuldHbXFBRCf1Q046U80RY_TFhxya2n0Rq4HbIDesIzDgloGD6MO8SE-5vPO8A8t1PnFeGnnYY&token_type=Bearer&expires_in=3599&scope=email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&authuser=0&prompt=consent'

console.log(qsParse(qs1))

// btoa(JSON.stringify({
//   t: Date.now(),
//   provider_id: 'google',
//   client_id: 'production-fv979'
// }))

window.opener.postMessage({
  source: 'cloudbase-login-redirect',
  callbackInfo: {
    state: 'eyJ0IjoxNjMwNDc2MzExNjA3LCJwcm92aWRlcl9pZCI6Imdvb2dsZSIsImNsaWVudF9pZCI6InByb2R1Y3Rpb24tZnY5NzkiLCJyb3V0ZUtleSI6IiJ9',
    access_token: 'ya29.a0ARrdaM_HNhiT7AWwn_4OApz6rQT44zpeWHPn-SoakKv3wB3x5j3AbPVMJdD21p8ZU1TsMYJKAfnc9CN9GJHuldHbXFBRCf1Q046U80RY_TFhxya2n0Rq4HbIDesIzDgloGD6MO8SE-5vPO8A8t1PnFeGnnYY',
    token_type: 'Bearer',
    expires_in: '3599',
    scope: 'email%20profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid',
    authuser: '0',
    prompt: 'consent'
  }
}, 'http://production-fv979-1258964769.ap-shanghai.app.tcloudbase.com/')