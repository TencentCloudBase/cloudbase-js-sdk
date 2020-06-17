// database geo
import * as assert from 'power-assert';
import { catchCallback, isSuccess, callbackWithTryCatch } from '../../util';
import { registerCase } from '.';

export function registerGeo(app, collName) {
  const db = app.database();
  const collection = db.collection(collName);
  // const nameList = ["f", "b", "e", "d", "a", "c"];

  const longitude = -180;
  const latitude = 20;
  const point = new db.Geo.Point(longitude, latitude);
  const initialData = {
    point,
    pointArr: [point, point, point],
    uuid: '416a4700-e0d3-11e8-911a-8888888888',
    string: '新增单个string字段1。新增单个string字段1。',
    due: new Date('2018-09-01'),
    int: 100,
    geo: new db.Geo.Point(90, 23),
    array: [
      {
        string: '99999999',
        due: new Date('2018-09-01'),
        geo: new db.Geo.Point(90, 23),
      },
      {
        string: '0000000',
        geo: new db.Geo.Point(90, 23),
        null: null,
      }
    ],
  };
  registerCase('database geo: GEO Point - CRUD', async () => {
    await new Promise(async resolve => {
      try {
        // Create
        let res = await collection.add(initialData).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res) && res.id, { res });

        const res2 = await collection.doc(res.id).set(initialData).catch(callbackWithTryCatch(err => {
          assert(false, { err });
        }, () => {
          resolve();
        }));
        assert(isSuccess(0, res2) && res2.updated >= 1, { res: res2 });

        // Read
        let result = await collection
          .where({
            _id: res.id
          })
          .get().catch(callbackWithTryCatch(err => {
            assert(false, { err });
          }, () => {
            resolve();
          }));
        assert(isSuccess(0, result) && result.data.length > 0, { res: result });
        assert.deepEqual(result.data[0].point, { longitude, latitude });

        // TODO: 现在对 GEO 进行 $eq 操作，小概率会查不到，需要修改查询的底层结构
        // result = await collection
        //     .where({
        //         point: db.command.eq(point)
        //     })
        //     .get();
        // console.log(point, result);
        // assert(result.data.length > 0);

        // result = await collection
        //     .where({
        //         point: db.command.or(db.command.eq(point))
        //     })
        //     .get();
        // console.log(point, result);
        // assert(result.data.length > 0);

        // result = await collection
        //     .where({
        //         point: point
        //     })
        //     .get();
        // console.log(result);
        // assert(result.data.length > 0);

        // Delete
        const deleteRes = await collection
          .where({
            _id: res.id
          })
          .remove();
        assert(isSuccess(0, deleteRes) && deleteRes.deleted === 1, { res: deleteRes });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}
