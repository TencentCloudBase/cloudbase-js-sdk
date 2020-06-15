// database db
import * as assert from 'power-assert';
import { register } from '../util';

export function registerDb(app, collName) {
  const db = app.database();

  register('database db: get collection reference', () => {
    const collection = db.collection(collName);
    assert(collection.name === collName);
  });

  register('database db: Error: get collection without collection name', () => {
    try {
      db.collection();
    } catch (e) {
      assert(e.message === 'Collection name is required');
    }
  });
}
