const axios = require('axios');
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

describe('数据库', () => {
  it('DB查询', async () => {
    const page = global.page;
    const result = await page.evaluate(() => {
      const db = app.database();
      return db.collection('test').where({
        text: /.*/
      }).get();
    });

    expect(result.data.length > 0).toBeTruthy();
  });

  it('插入Point', async () => {
    const page = global.page;
    let result = await page.evaluate(() => {
      const db = app.database();
      return db.collection('test').add({
        point: new db.Geo.Point(-180, -1)
      });
    });

    const { id } = result;
    expect(id).toBeDefined();

    result = await page.evaluate(() => {
      const db = app.database();
      return db.collection('test').where({
        point: new db.Geo.Point(-180, -1)
      }).get();
    });

    expect(result.data.length > 0).toBeTruthy();

    result = await page.evaluate((id) => {
      const db = app.database();
      return db.collection('test').where({
        _id: id
      }).remove();
    }, id);

    expect(result.deleted).toEqual(1);
  });
});
