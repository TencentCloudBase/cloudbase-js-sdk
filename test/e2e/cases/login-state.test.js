/* eslint-disable max-nested-callbacks */
/**
 * 将LoginState类的loginType和/is.*Auth/属性以及
 * Auth类的currentUser和loginType属性
 * 从get属性改为普通属性，
 * 本例为测试改动后功能是否正常。
 * 主要思路是将改动后同步获得的属性与未改动过的异步获得的属性进行比较，如果相同则测试成功。
 */
const axios = require('axios');
const path = require('path');
beforeEach(async () => {
  const {
    data: { ticket }
  } = await axios.get('http://service-m1w79cyz-1257776809.ap-shanghai.apigateway.myqcloud.com/release/');

  const refreshToken = await page.evaluate(ticket => {
    app = window.cloudbase.init({
      env: 'starkwang-e850e3'
    });

    return app
      .auth({ persistence: 'local' })
      .customAuthProvider()
      .signIn(ticket)
      .then(() => {
        return window.localStorage['refresh_token_starkwang-e850e3'];
      });
  }, ticket);

  expect(refreshToken).toBeDefined();
});

describe('login后loginState、loginType和User是否正确', () => {
    it('custom sign in后loginState的isCustomLogin为真', async () => {
      const res = await page.evaluate(() => {
        return app
          .auth()
          .hasLoginState()
          .isCustomAuth
      });

      expect(res).toBeTruthy();
    })
    it('sign in后loginType是否正确', async () => {
      const res = await page.evaluate(() => {
        return app
          .auth()
          .getLoginType()
          .then(loginType => loginType === app.auth().loginType);
      });

      expect(res).toBeTruthy;
    })
    it('sign in后User是否正确', async () => {
      const res = await page.evaluate(() => {
        return app
          .auth()
          .getCurrenUser()
          .then(currentUser => currentUser.uid === app.auth().currentUser.uid);
      });
      
      expect(res).toBeTruthy();
    })
  }
)
/*登出后，loginState为null，无需测试 */
describe('sign out后loginType和User是否正确', () => {
  it('sign out后loginType是否正确', async () => {
    const res = await page.evaluate(() => {
      return app
        .auth()
        .signOut()
        .then(() => app.auth().getLoginType())
        .then(loginType => loginType === app.auth().loginType);
    });

    expect(res).toBeTruthy;
  })
  it('sign out后user是否正确', async () => {
    const res = await page.evaluate(() => {
      return app
        .auth()
        .signOut()
        .then(() => app.auth().currentUser === null);
    });

    expect(res).toBeTruthy();
  })
})