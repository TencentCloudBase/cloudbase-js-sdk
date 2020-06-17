import * as assert from 'power-assert';
import { callbackWithTryCatch, catchCallback, isSuccess } from '../../util';
import * as util from 'util';
import { registerCase } from '.';

export function registerDate(app, collName) {
  const db = app.database();
  const collection = db.collection(collName);
  // const nameList = ["f", "b", "e", "d", "a", "c"];

  registerCase('database date: CRUD', async () => {
    const date = new Date();
    const offset = 60 * 1000;
    const timestamp = Math.floor(Number(new Date()) / 1000);
    const initialData = {
      name: 'test',
      date,
      // eslint-disable-next-line
      serverDate1: new db.serverDate(),
      serverDate2: db.serverDate({ offset }),
      timestamp: {
        $timestamp: timestamp
      },
      foo: {
        bar: db.serverDate({ offset })
      }
    };

    await new Promise(async resolve => {
      try {
        // Create
        const res = await collection.add(initialData).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });
        assert(isSuccess(0, res) && res.requestId, { res });

        // Read
        const { id } = res;
        let result = await collection.where({
          _id: id
        }).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert.strictEqual(result.data[0].date.getTime(), date.getTime());
        assert(util.isDate(result.data[0].foo.bar));
        assert.strictEqual(assert.strictEqual(result.data[0].serverDate1.getDate(), date.getDate()));
        assert.strictEqual(result.data[0].serverDate1.getTime() + offset, result.data[0].serverDate2.getTime());
        assert.strictEqual(result.data[0].timestamp.getTime(), timestamp * 1000);

        result = await collection.where({
          date: db.command.eq(date)
        }).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert.strictEqual(result.data[0].date.getTime(), date.getTime());

        result = await collection.where({
          date: db.command.lte(date)
        }).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(result.data.length > 0);

        result = await collection.where({
          date: db.command.lte(date).and(db.command.gte(date))
        }).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(result.data.length > 0);

        // Update
        const newDate = new Date();
        // eslint-disable-next-line
        const newServerDate = new db.serverDate({ offset: 1000 * 60 * 60 }); // offset一小时
        result = await collection.where({
          date: db.command.lte(date).and(db.command.gte(date))
        }).update({
          date: newDate,
          serverDate2: newServerDate
        }).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert.strictEqual(result.updated, 1);

        result = await collection.where({
          _id: id
        }).get().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert.strictEqual(result.data[0].date.getTime(), newDate.getTime());
        assert(result.data[0].serverDate2.getTime() - result.data[0].serverDate1.getTime() > 1000 * 60 * 60);

        // Delete
        const deleteRes = await collection.doc(id).remove().catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(deleteRes.deleted === 1, { res: deleteRes });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}