// function
import * as assert from 'power-assert';
import { register, callbackWithTryCatch, isSuccess } from './util';

export function test_function(app) {
  register('function: callFunction in callback parse and query', async () => {
    let data = {
      'key1': '1',
      'key2': '2',
      'userInfo': {
        'openId': 'ojiig0eH8cPwLHlPym--FUE0Lp_g',
        'appId': 'wx388a2dcdc79c3238'

      }
    };
    await new Promise(resolve => {
      app.callFunction(
        {
          name: 'test',
          data,
          parse: true,
          query: {
            env: 'test',
            action: 'call_function',
            field: '中文'
          },
          search: '&exxxxxx'
        },
        callbackWithTryCatch(
          (err, res) => {
            assert(isSuccess(err, res), {
              err,
              res
            });
          },
          () => {
            resolve();
          }
        )
      );
    });
  });

  register('function: callFunction in callback', async () => {
    let data = {
      'key1': '1',
      'key2': '2',
      'userInfo': {
        'openId': 'ojiig0eH8cPwLHlPym--FUE0Lp_g',
        'appId': 'wx388a2dcdc79c3238'

      }
    };
    await new Promise(resolve => {
      app.callFunction({ name: 'test', data }, callbackWithTryCatch((err, res) => {
        assert(isSuccess(err, res), {
          err,
          res
        });
      }, () => {
        resolve();
      }));
    });
  });

  register('function: callFunction in promise', async () => {
    await app.callFunction({ name: 'test', data: { hello: 'world' }}).then(callbackWithTryCatch((res) => {
      assert(isSuccess(0, res), { res });
    })).catch(callbackWithTryCatch((err) => {
      assert(false, { err });
    }));
  });
}