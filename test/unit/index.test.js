const {cloudbase} = require('../../packages/app');

const registerFunctions = jest.fn(function(app){
  app.registerComponent({
    name: 'functions',
    entity: {
      callFunction: jest.fn(function (...args) {
        return {
          this: this,
          args: args
        };
      })
    }
  });
});

const registerStorage = jest.fn(function(app){
  app.registerComponent({
    name: 'storage',
    entity: {
      uploadFile: jest.fn(function (...args) {
        return {
          this: this,
          args: args
        };
      }),
      deleteFile: jest.fn(function (...args) {
        return {
          this: this,
          args: args
        };
      }),
      getTempFileURL: jest.fn(function (...args) {
        return {
          this: this,
          args: args
        };
      }),
      downloadFile: jest.fn(function (...args) {
        return {
          this: this,
          args: args
        };
      })
    }
  });
})
registerFunctions(cloudbase);
registerStorage(cloudbase);

const app = cloudbase.init({
  env: 'env-id',
  timeout: 20000
});

test('tcb.init()', () => {
  expect(app).toHaveProperty('_config');
  expect(app).toHaveProperty('authInstance');
});

test('callFunction', () => {
  const result = app.callFunction(1, 2);
  expect(result.this).toEqual(app);
  expect(result.args).toEqual([1, 2]);
});

test('deleteFile', () => {
  const result = app.deleteFile(1, 2);
  expect(result.this).toEqual(app);
  expect(result.args).toEqual([1, 2]);
});

test('getTempFileURL', () => {
  const result = app.getTempFileURL(1, 2);
  expect(result.this).toEqual(app);
  expect(result.args).toEqual([1, 2]);
});

test('downloadFile', () => {
  const result = app.downloadFile(1, 2);
  expect(result.this).toEqual(app);
  expect(result.args).toEqual([1, 2]);
});

test('uploadFile', () => {
  const result = app.uploadFile(1, 2);
  expect(result.this).toEqual(app);
  expect(result.args).toEqual([1, 2]);
});