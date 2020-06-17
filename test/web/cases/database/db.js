// database db
import * as assert from 'power-assert';
import { registerCase } from '.';

export function registerDb(app, collName) {
  const db = app.database();

  registerCase('database db: get collection reference', () => {
    const collection = db.collection(collName);
    assert(collection.name === collName);
  });

  registerCase('database db: Error: get collection without collection name', () => {
    try {
      db.collection();
    } catch (e) {
      assert(e.message === 'Collection name is required');
    }
  });
}
