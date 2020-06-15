import * as assert from 'power-assert';
import { callbackWithTryCatch, catchCallback, isSuccess, register } from '../util';
import { Util } from '@cloudbase/database/dist/esm/util';

export function registerDocument(app, collName) {
  const docIDGenerated = Util.generateDocId();
  const db = app.database();
  const _ = db.command;
  const collection = db.collection(collName);

  register('database document: docID test', () => {
    const document = collection.doc(docIDGenerated);
    assert(document.id === docIDGenerated);
  });

  register('database document: API - set data in empty document', async () => {
    await new Promise(async resolve => {
      try {
        const document = collection.doc(docIDGenerated);
        await document.set({
          name: 'jude'
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }));

        let res = await collection.where({
          name: _.eq('jude')
        }).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && Array.isArray(res.data));

        res = await collection.where({
          name: _.eq('jude')
        }).remove().catch(callbackWithTryCatch(err => {
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

  register('database document: API - set data in document existed', async () => {
    await new Promise(async resolve => {
      try {
        let res = await collection.add({ data: 'test' }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const documents = await collection.limit(1).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        const docId = documents.data[0]._id;

        res = await collection.doc(docId).set({
          data: { type: 'set' }
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated === 1, { res });

        res = await collection.doc(docId).set({
          data: { arr: [1, 2, 3], foo: 123 },
          array: [0, 0, 0]
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated === 1, { res });

        res = await collection.doc(docId).update({
          data: { arr: db.command.push([4, 5, 6]), foo: db.command.inc(1) },
          array: db.command.pop()
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.updated === 1, { res });

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

  register('database document: API - remove document that not exist', async () => {
    await new Promise(async resolve => {
      try {
        const document = collection.doc(docIDGenerated);
        const res = await document.remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && !res.deleted, { res });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  register('database document: API - remove document should success', async () => {
    await new Promise(async resolve => {
      try {
        let res = await collection.add({ data: 'test' }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const documents = await collection.get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        const docId = documents.data[0]._id;

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
