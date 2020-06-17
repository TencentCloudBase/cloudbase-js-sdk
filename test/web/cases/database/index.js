// database
import * as assert from 'power-assert';

import {
  register,
  isSuccess,
  catchCallback,
  callbackWithTryCatch
} from '../../util';

import { registerCollection } from './collection';
import { registerCommand } from './command';
import { registerDate } from './date';
import { registerDb } from './db';
import { registerDocument } from './document';
import { registerGeo } from './geo';
import { registerGeoAdvanced } from './geo-advanced';
import { registerOrder } from './order';
import { registerRegex } from './regex';
import { registerRealtime } from './realtime';

export function registerCase(msg,fn){
  register('database',msg,fn);
}

export async function registerDatabaseCases(app) {
  const collName = 'coll-1';

  registerCollection(app, collName);
  registerCommand(app, collName);
  registerDate(app, collName);
  registerDb(app, collName);
  registerDocument(app, collName);
  registerGeo(app, collName);
  registerGeoAdvanced(app, collName);
  registerOrder(app, collName);
  registerRegex(app, collName);
  registerRealtime(app, collName);

  registerCase('Document - CRUD', async () => {
    // await new Promise(async resolve => {
    //   try {
        const db = app.database();
        const _ = db.command;
        const collection = db.collection(collName);
        const initialData = {
          name: 'aaa',
          array: [
            1,
            2,
            3,
            [4, 5, 6],
            { a: 1, b: { c: 'fjasklfljkas', d: false }}
          ],
          data: {
            a: 'a',
            b: 'b',
            c: 'c'
          },
          null: null,
          deepObject: {
            'l-02-01': {
              'l-03-01': {
                'l-04-01': {
                  level: 1,
                  name: 'l-01',
                  flag: '0'
                }
              }
            }
          }
        };

        // Create
        let res = await collection.add(initialData).catch(
          callbackWithTryCatch(
            err => {
              assert(false, { err });
            },
            () => {
              resolve();
            }
          )
        );
        assert(isSuccess(0, res) && res.id, { res });

        // Read
        const { id } = res;
        res = await collection
          .where({
            _id: id
          })
          .get()
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert.deepStrictEqual(res.data[0].name, initialData.name, { res });
        assert.deepStrictEqual(res.data[0].array, initialData.array, { res });
        assert.deepStrictEqual(res.data[0].deepObject, initialData.deepObject, {
          res
        });

        res = await collection
          .where({
            null: _.or(_.eq(null))
          })
          .get()
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert(res.data.length > 0);

        const doc = await collection
          .doc(id)
          .get()
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert.deepStrictEqual(doc.data[0].name, initialData.name, { res });
        assert.deepStrictEqual(doc.data[0].array, initialData.array, { res });
        assert.deepStrictEqual(doc.data[0].deepObject, initialData.deepObject, {
          res
        });

        // Update
        res = await collection
          .where({
            _id: id
          })
          .update({
            name: 'bbb',
            array: [{ a: 1, b: 2, c: 3 }]
          })
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert(res.updated > 0, { res });

        res = await collection
          .where({
            _id: id
          })
          .update({
            data: { a: null, b: null, c: null }
          })
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert(res.updated > 0, { res });

        res = await collection
          .where({ _id: id })
          .get()
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert(res.data[0], { res });
        assert.deepStrictEqual(
          res.data[0].data,
          { a: null, b: null, c: null },
          { res }
        );

        // 数组变为对象，mongo会报错
        res = await collection
          .where({
            _id: id
          })
          .update({
            array: { foo: 'bar' }
          })
        assert.strictEqual(res.code, 'DATABASE_REQUEST_FAILED', { res });

        res = await collection
          .where({
            _id: id
          })
          .get()
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert.deepStrictEqual(res.data[0].array, [{ a: 1, b: 2, c: 3 }], {
          res
        });

        // Delete
        const deleteRes = await collection
          .doc(id)
          .remove()
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert.strictEqual(deleteRes.deleted, 1, { res });
    //   } catch (e) {
    //     catchCallback(e);
    //   } finally {
    //     resolve();
    //   }
    // });
  });

  registerCase('Document - query', async () => {
    await new Promise(async resolve => {
      try {
        const db = app.database();
        const _ = db.command;
        const collection = db.collection(collName);

        // Query
        await Promise.all([
          collection.add({ a: 1, b: 100 }).catch(
            callbackWithTryCatch(err => {
              assert(false, { err });
            })
          ),
          collection.add({ a: 10, b: 1 }).catch(
            callbackWithTryCatch(err => {
              assert(false, { err });
            })
          )
        ]);

        const query = _.or([
          { b: _.and(_.gte(1), _.lte(10)) },
          { b: _.and(_.gt(99), _.lte(101)) }
        ]);
        let res = await collection
          .where(query)
          .get()
          .catch(
            callbackWithTryCatch(err => {
              assert(false, { err });
            })
          );
        assert(isSuccess(0, res) && res.data.length >= 2, { res });

        // Delete
        res = await collection
          .where(query)
          .remove()
          .catch(
            callbackWithTryCatch(
              err => {
                assert(false, { err });
              },
              () => {
                resolve();
              }
            )
          );
        assert(isSuccess(0, res) && res.deleted === 2, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}
