// database command
import * as assert from 'power-assert';
import { callbackWithTryCatch, catchCallback, isSuccess, register } from '../util';

export function registerCommand(app, collName) {
  const db = app.database();
  const collection = db.collection(collName);
  const _ = db.command;

  register('database command: eq', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 'eq' }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.eq('eq')
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: neq', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 'eq' }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.neq('neq')
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: gt', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.gt(10)
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: gte', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.gte(100)
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: lt', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.lt(111)
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: lte', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.lte(100)
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: in', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: [100, 10000] }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.in([10000, 1000])
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where({ test: [100, 10000] }).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: nin', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: [100, 10000] }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.nin([1000, 100000])
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where({ test: [100, 10000] }).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: and with flow', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.gt(10).and(_.lt(1000))
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: and with preset', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.and(_.gt(10), _.lt(1000))
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: or with flow', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.gt(1000).or(_.lt(1111))
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: or with preset', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: 100 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const query = {
          test: _.or(_.gt(1000), _.lt(111))
        };

        res = await collection.where(query).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.data.length >= 1, { res });

        res = await collection.where(query).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: set', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ data: { a: 1, b: 2, c: 3 }}).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          data: _.set({ a: 1, b: 2 })
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: inc', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ count: 0 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          count: _.inc(2)
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }));
        assert(isSuccess(0, res), { res });
        assert.deepStrictEqual(res.data[0].count, 2, { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: mul', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ count: 3 }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          count: _.mul(2.5)
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }));
        assert(isSuccess(0, res), { res });
        assert.deepStrictEqual(res.data[0].count, 7.5, { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: remove', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ data: { a: 1, b: 2, c: 3 }}).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          data: { c: _.remove() }
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: push', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: [100, 10000] }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          test: _.push(1000)
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }));
        console.log(res);
        assert(isSuccess(0, res), { res });
        assert.deepStrictEqual(res.data[0].test, [100, 10000, 1000], { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: pop', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: [100, 10000] }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          test: _.pop()
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }));
        assert(isSuccess(0, res), { res });
        assert.deepStrictEqual(res.data[0].test, [100], { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: unshift', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: [100, 10000] }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          test: _.unshift(1000)
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }));
        assert(isSuccess(0, res), { res });
        assert.deepStrictEqual(res.data[0].test, [1000, 100, 10000], { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database command: shift', async () => {
    return new Promise(async resolve => {
      try {
        let res = await collection.add({ test: [100, 10000] }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const docId = res.id;
        const update = {
          test: _.shift()
        };

        res = await collection.doc(docId).update(update).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated >= 1, { res });

        res = await collection.doc(docId).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }));
        assert(isSuccess(0, res), { res });
        assert.deepStrictEqual(res.data[0].test, [10000], { res });

        res = await collection.doc(docId).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.deleted >= 1, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}