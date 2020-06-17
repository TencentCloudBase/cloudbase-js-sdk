/*eslint max-nested-callbacks: 0 */
import * as assert from 'power-assert';
import { isSuccess, callbackWithTryCatch, catchCallback } from '../../util';
import { registerCase } from '.';

export function registerCollection(app, collName) {
  const db = app.database();
  console.log(db);
  const collection = db.collection(collName);

  registerCase('database collection: name test', callbackWithTryCatch(() => {
    assert(collection.name === collName);
  }));

  registerCase('database collection: add one doc, update and remove with callback', async () => {
    await new Promise(resolve => {
      collection.add({ a: 1 }, (err, res) => {
        try {
          assert(isSuccess(err, res), { err, res });
          assert(isSuccess(0, res) && res.id, { err, res });
          assert(isSuccess(0, res) && res.requestId, { err, res });

          let id = res.id;

          collection.doc(id).update({ age: 18 }, (err, res) => {
            try {
              assert(isSuccess(err, res), { err, res });
              assert(isSuccess(0, res) && res.updated > 0, { err, res });

              collection.doc(id).remove(callbackWithTryCatch((err, res) => {
                assert(isSuccess(err, res), { err, res });
                assert(isSuccess(0, res) && res.deleted, { err, res });
                assert(isSuccess(0, res) && res.requestId, { err, res });
              }, () => {
                resolve();
              }));
            } catch (e) {
              catchCallback(e);
              resolve();
            }
          });
        } catch (e) {
          catchCallback(e);
          resolve();
        }
      });
    });
  });

  registerCase('database collection: add one doc, update and remove with promise', async () => {
    await new Promise(async resolve => {
      await collection.add({ a: 1 }).then(res => {
        try {
          assert(isSuccess(0, res), { res });
          assert(isSuccess(0, res) && res.id, { res });
          assert(isSuccess(0, res) && res.requestId, { res });

          let id = res.id;
          collection.doc(id).update({ age: 18 }).then(res => {
            try {
              assert(isSuccess(0, res), { res });
              assert(isSuccess(0, res) && res.updated > 0, { res });

              collection.doc(id).remove().then(callbackWithTryCatch(res => {
                assert(isSuccess(0, res), { res });
                assert(isSuccess(0, res) && res.deleted, { res });
                assert(isSuccess(0, res) && res.requestId, { res });
              }, () => {
                resolve();
              })).catch(callbackWithTryCatch(err => {
                assert(false, { err });
              }, () => {
                resolve();
              }));
            } catch (e) {
              catchCallback(e);
              resolve();
            }
          }).catch(callbackWithTryCatch(err => {
            assert(false, { err });
          }, () => {
            resolve();
          }));
        } catch (e) {
          catchCallback(e);
          resolve();
        }
      }).catch(callbackWithTryCatch(err => {
        assert(false, { err });
      }, () => {
        resolve();
      }));
    });
  });

  registerCase('database collection: API - get all data', async () => {
    await collection.get().then(callbackWithTryCatch(res => {
      assert(Array.isArray(res.data), { res });
    })).catch(callbackWithTryCatch(err => {
      assert(false, { err });
    }));
  });

  registerCase('database collection: API - use orderBy', async () => {
    const field = 'huming';
    const direction = 'asc';
    await collection.orderBy(field, direction).get().then(callbackWithTryCatch(res => {
      assert(Array.isArray(res.data), { res });
    })).catch(callbackWithTryCatch(err => {
      assert(false, { err });
    }));
  });

  registerCase('database collection: API - use limit', async () => {
    const limit = 1;
    await collection.limit(limit).get().then(callbackWithTryCatch(res => {
      assert(Array.isArray(res.data), { res });
    })).catch(callbackWithTryCatch(err => {
      assert(false, { err });
    }));
  });

  registerCase('database collection: API - use offset', async () => {
    const offset = 2;
    await collection.skip(offset).get().then(callbackWithTryCatch(res => {
      assert(Array.isArray(res.data), { res });
    })).catch(callbackWithTryCatch(err => {
      assert(false, { err });
    }));
  });

  registerCase('database collection: API - use field', async () => {
    await collection.field({ 'age': 1 }).get().then(callbackWithTryCatch(res => {
      assert(Array.isArray(res.data), { res });
    })).catch(callbackWithTryCatch(err => {
      assert(false, { err });
    }));
  });

  registerCase('database collection: API - add and remove with skip', async () => {
    return new Promise(async resolve => {
      try {
        const text = 'test for add and remove with skip';
        let i = 0;
        while (i++ < 10) {
          await collection.add({
            text
          });
        }

        let res = await collection.where({
          text
        }).get();

        assert(isSuccess(0, res) && res.data.length > 0, { res });

        await collection.where({
          text
        }).remove();

        res = await collection.where({
          text
        }).get();

        assert(isSuccess(0, res) && res.data.length === 0, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}