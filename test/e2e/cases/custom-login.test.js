/* eslint-disable max-nested-callbacks */
const axios = require('axios');
const path = require('path');
beforeEach(async () => {
  const { data: { ticket }} = await axios.get('http://service-m1w79cyz-1257776809.ap-shanghai.apigateway.myqcloud.com/release/');
  // await sleep(3600 * 1000);
  const refreshToken = await page.evaluate((ticket) => {
    app = window.cloudbase.init({
      env: 'starkwang-e850e3'
    });

    return app.auth({ persistence: 'local' }).customAuthProvider().signIn(ticket).then(() => {
      return window.localStorage['refresh_token_starkwang-e850e3'];
    });
  }, ticket);

  expect(refreshToken).toBeDefined();
});
describe('鉴权', () => {
  it('自定义登录后应该有access token', async () => {
    const result = await page.evaluate(() => {
      return localStorage.getItem('access_token_starkwang-e850e3');
    });

    expect(result).toBeDefined();
  });
  it('获取Auth Header', async () => {
    const result = await page.evaluate(() => {
      return app.auth().getAuthHeader();
    });
    expect(result['x-cloudbase-credentials']).toBeDefined();
  });
  it('getLoginState', async () => {
    const page = global.page;
    let result = await page.evaluate(() => {
      return app.auth().getLoginState();
    });

    expect(typeof result.credential.refreshToken === 'string').toBeTruthy();
    expect(typeof result.credential.accessToken === 'string').toBeTruthy();

    result = await page.evaluate(() => {
      return app.auth().signOut().then(() => {
        return app.auth().getLoginState();
      });
    });
    expect(result).toEqual(null);
  });
  it('signOut', async () => {
    const page = global.page;
    let result = await page.evaluate(() => {
      return app.auth().signOut();
    });
    expect(result).toBeDefined();
    expect(result.code).toBeUndefined();
  });
  it('onLoginStateChanged在绑定事件时立即触发', async () => {
    const page = global.page;
    let result = await page.evaluate(() => {
      return new Promise(resolve => {
        app.auth().onLoginStateChanged(loginState => {
          resolve(loginState);
        });
      });
    });
    expect(result).toBeDefined();
    expect(result.isAnonymous).toBeFalsy();
    expect(result.credential).toBeDefined();
  });
  it('重复登录，之前的refresh token应该失效', async () => {
    const page = global.page;
    const oldRefreshToken = await page.evaluate(() => {
      return localStorage.getItem('refresh_token_starkwang-e850e3');
    });
    expect(oldRefreshToken).toBeDefined();

    // 拉取新的ticket，第二次登录
    const { data: { ticket }} = await axios.get('http://service-m1w79cyz-1257776809.ap-shanghai.apigateway.myqcloud.com/release/');
    const newRefreshToken = await page.evaluate((ticket) => {
      app = window.cloudbase.init({
        env: 'starkwang-e850e3'
      });

      return app.auth({ persistence: 'local' }).customAuthProvider().signIn(ticket).then(() => {
        return window.localStorage['refresh_token_starkwang-e850e3'];
      });
    }, ticket);
    expect(newRefreshToken).toBeDefined();

    // 清理第二次的登录态，改成第一次的登陆态
    let result = await page.evaluate((oldRefreshToken) => {
      window.localStorage.clear();
      window.localStorage['refresh_token_starkwang-e850e3'] = oldRefreshToken;
      return app.auth({ persistence: 'local' }).getLoginState();
    }, oldRefreshToken);
    expect(result).toEqual(null);
  });
});
