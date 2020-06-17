import * as assert from 'power-assert';
import { catchCallback, isSuccess, callbackWithTryCatch } from '../../util';
import { registerCase } from '.';

export function registerGeoAdvanced(app, collName) {
  const db = app.database();
  const collection = db.collection(collName);

  const { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon } = db.Geo;
  function randomPoint() {
    return new Point(180 - 360 * Math.random(), 90 - 180 * Math.random());
  }

  const geoNearPoint = new Point(0, 0);
  const line = new LineString([randomPoint(), randomPoint()]);

  // “回”字的外环
  const point1 = new Point(-2, -2);
  const point2 = new Point(2, -2);
  const point3 = new Point(2, 2);
  const point4 = new Point(-2, 2);
  // “回”字的内环
  const point5 = new Point(-1, -1);
  const point6 = new Point(1, -1);
  const point7 = new Point(1, 1);
  const point8 = new Point(-1, 1);
  const polygon = new Polygon([
    new LineString([point1, point2, point3, point4, point1]),
    new LineString([point5, point6, point7, point8, point5])
  ]);

  const multiPoint = new MultiPoint([randomPoint(), randomPoint(), randomPoint(), randomPoint()]);
  const multiLineString = new MultiLineString([
    new LineString([randomPoint(), randomPoint()]),
    new LineString([randomPoint(), randomPoint()]),
    new LineString([randomPoint(), randomPoint()]),
    new LineString([randomPoint(), randomPoint()])
  ]);
  const multiPolygon = new MultiPolygon([
    new Polygon([new LineString([point1, point2, point3, point4, point1])]),
    new Polygon([new LineString([point5, point6, point7, point8, point5])])
  ]);

  const initialData = {
    point: randomPoint(),
    geoNearPoint,
    line,
    polygon,
    multiPoint,
    multiLineString,
    multiPolygon
  };

  registerCase('database geo: GEO Advanced - CRUD', async () => {
    await new Promise(async resolve => {
      try {
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
        assert(isSuccess(0, res) && res.requestId, { res });

        // Read
        const readRes = await collection
          .where({
            _id: res.id
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
        assert(isSuccess(0, readRes) && readRes.data.length > 0, { readRes });
        const data = readRes.data[0];

        assert(data.point instanceof Point);
        assert(data.line instanceof LineString);
        assert(data.polygon instanceof Polygon);
        assert(data.multiPoint instanceof MultiPoint);
        assert(data.multiLineString instanceof MultiLineString);
        assert(data.multiPolygon instanceof MultiPolygon);

        assert.deepStrictEqual(data.point, initialData.point);
        assert.deepStrictEqual(data.line, line);
        assert.deepStrictEqual(data.polygon, polygon);
        assert.deepStrictEqual(data.multiPoint, multiPoint);
        assert.deepStrictEqual(data.multiLineString, multiLineString);
        assert.deepStrictEqual(data.multiPolygon, multiPolygon);

        // Update
        let result = await collection
          .doc(res.id)
          .set(initialData)
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
        assert(isSuccess(0, result) && result.requestId, { result });
        assert.strictEqual(result.updated, 1);

        // Delete
        const deleteRes = await collection
          .where({
            _id: res.id
          })
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
        assert(isSuccess(0, deleteRes) && deleteRes.deleted >= 1, { deleteRes });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  registerCase('database geo: GEO - bad create', async () => {
    await new Promise(async resolve => {
      try {
        // bad Point
        assert.throws(() => new Point());
        assert.throws(() => new Point([], {}));

        // bad LineString
        assert.throws(() => new LineString({}));
        assert.throws(() => new LineString([]));
        assert.throws(() => new LineString([123, []]));

        // bad Polygon
        assert.throws(() => new Polygon(null));
        assert.throws(() => new Polygon([]));
        assert.throws(() => new Polygon([666, 789]));
        assert.throws(
          () => new Polygon([new LineString([point1, point2, point3, point4, point8])])
        );

        // bad MultiPoint
        assert.throws(() => new MultiPoint({}));
        assert.throws(() => new MultiPoint([]));
        assert.throws(() => new MultiPoint([{}, {}]));

        // bad MultiLineString
        assert.throws(() => new MultiLineString({}));
        assert.throws(() => new MultiLineString([]));
        assert.throws(() => new MultiLineString([123, null]));

        // bad MultiPolygon
        assert.throws(() => new MultiPolygon(123));
        assert.throws(() => new MultiPolygon([]));
        assert.throws(() => new MultiPolygon([666, 666]));
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  registerCase('database geo: GEO - geoNear', async () => {
    await new Promise(async resolve => {
      try {
        // Create
        const geoPoint = new Point(22, 33);
        const res = await collection
          .add({
            ...initialData,
            point: geoPoint
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
        assert(isSuccess(0, res) && res.id, { res });
        assert(res.requestId);

        // Read
        const readRes = await collection
          .where({
            point: db.command.geoNear({
              geometry: geoPoint,
              maxDistance: 1,
              minDistance: 0
            })
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
        assert(isSuccess(0, readRes) && readRes.data.length > 0, { readRes });
        assert.deepStrictEqual(readRes.data[0].point, geoPoint);

        // Delete
        const deleteRes = await collection
          .where({
            _id: res.id
          })
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
        assert(isSuccess(0, deleteRes) && deleteRes.deleted >= 1, { deleteRes });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });

  registerCase('database geo: GEO - geoWithin', async () => {
    await new Promise(async resolve => {
      try {
        // Create
        const res = await collection
          .add({
            ...initialData,
            point: new Point(0, 0)
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
        assert(isSuccess(0, res) && res.id, { res });

        // Read
        const readRes = await collection
          .where({
            point: db.command.geoWithin({
              geometry: new Polygon([new LineString([point1, point2, point3, point4, point1])])
            })
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
        assert(isSuccess(0, readRes) && readRes.data.length > 0, { readRes });
        assert.deepStrictEqual(readRes.data[0].point, new Point(0, 0));

        // Delete
        const deleteRes = await collection
          .where({
            point: db.command.geoWithin({
              geometry: new Polygon([new LineString([point1, point2, point3, point4, point1])])
            })
          })
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
        assert(isSuccess(0, deleteRes) && deleteRes.deleted >= 1, { deleteRes });
      } catch (e) {
        catchCallback(e);
      } finally {
        resolve();
      }
    });
  });
}
