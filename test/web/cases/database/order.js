// database order
import * as assert from 'power-assert';
import { catchCallback, isSuccess, callbackWithTryCatch } from '../../util';
import { registerCase } from '.';

export function registerOrder(app, collName) {
  const db = app.database();
  const collection = db.collection(collName);
  // const nameList = ["f", "b", "e", "d", "a", "c"];

  registerCase('database order: Document - OrderBy', async () => {
    await new Promise(async resolve => {
      try {
        // Create
        for (let i = 0; i < 7; i++) {
          const res = await collection.add({
            category: '类别B',
            value: Math.random()
          }).catch(callbackWithTryCatch(err => {
            assert(false, { err });
          }, () => {
            resolve();
          }));
          assert(isSuccess(0, res) && res.id, { res });
        }

        for (let i = 0; i < 3; i++) {
          const res = await collection.add({
            category: '类别C',
            value: Math.random()
          }).catch(callbackWithTryCatch(err => {
            assert(false, { err });
          }, () => {
            resolve();
          }));
          assert(isSuccess(0, res) && res.id, { res });
        }

        await collection.add({
          category: '类别A',
          value: Math.random()
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));

        // Read
        let result = await collection
          .where({
            category: /^类别/i
          })
          .orderBy('category', 'asc')
          .get().catch(callbackWithTryCatch(err => {
            assert(false, { err });
          }, () => {
            resolve();
          }));
        assert(isSuccess(0, result) && result.data.length >= 11, { res: result });
        assert(isSuccess(0, result) && result.data[0].category === '类别A', { res: result });
        assert(isSuccess(0, result) && result.data[result.data.length - 1].category === '类别C', { res: result });

        // Delete
        const deleteRes = await collection
          .where({
            category: db.RegExp({
              regexp: '^类别'
            })
          })
          .remove().catch(callbackWithTryCatch(err => {
            assert(false, { err });
          }, () => {
            resolve();
          }));
        assert(isSuccess(0, deleteRes) && deleteRes.deleted >= 11, { res: deleteRes });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}
