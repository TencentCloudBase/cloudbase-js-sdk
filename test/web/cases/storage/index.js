// storage cases
import * as assert from 'power-assert';
import { callbackWithTryCatch, catchCallback, isSuccess, register, printInfo } from '../../util';

window['fileIdList'] = [];

// const $el_input_file = document.getElementById('file');

function registerCase(msg,fn){
  register('storage',msg,fn);
}

export function registerStorageCases(app) {
  let file = new File(['foo'], 'foo.txt', {
    type: 'text/plain',
  });

  registerCase('storage: uploadFile, getTempFileURL, downloadFile and deleteFile with callback', async () => {
    await new Promise(resolve => {
      app.uploadFile({
        filePath: file,
        cloudPath: 'test'+Date.now(),
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          printInfo('uploadFile progress: ' + percentCompleted, progressEvent);
        }
      }, async (err, res) => {
        try {
          assert(isSuccess(err, res) && res.fileID, { err, res });

          let fileId = res.fileID;

          await Promise.all([
            new Promise(resolve1 => {
              app.getTempFileURL({ fileList: [fileId] }, callbackWithTryCatch((err, res) => {
                assert(isSuccess(err, res) && res.fileList, { err, res });
              }, () => {
                resolve1();
              }));
            }),
            //TODO 下载的实现未确定
            /*new Promise(resolve2 => {
              app.downloadFile({ fileId }, callbackWithTryCatch((err, res) => {
                assert(isSuccess(err, res), { err, res });
              }, () => {
                resolve2();
              }));
            })*/
          ]);

          app.deleteFile({ fileList: [fileId] }, callbackWithTryCatch((err, res) => {
            assert(isSuccess(err, res) && res.fileList.every(ret => ret.code === 'SUCCESS'), { err, res });
          }));
        } catch (e) {
          catchCallback(e);
        } finally {
          resolve();
        }
      });
    });
  });

  registerCase('storage: uploadFile, getTempFileURL, downloadFile and deleteFile with promise', async () => {
    await new Promise(async resolve => {
      await app.uploadFile({
        filePath: file,
        cloudPath: 'test'+Date.now(),
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          printInfo('uploadFile progress: ' + percentCompleted, progressEvent);
        }
      }).then(async res => {
        try {
          assert(isSuccess(0, res) && res.fileID, { res });

          let fileId = res.fileID;

          await Promise.all([
            new Promise(resolve1 => {
              app.getTempFileURL({ fileList: [fileId] },callbackWithTryCatch((err,res) => {
                assert(isSuccess(err, res) && res.fileList, { res });
              }, () => {
                resolve1();
              }))
            }),
            //TODO 下载的实现未确定
            /*new Promise(resolve2 => {
              app.downloadFile({ fileId }).then(callbackWithTryCatch(res => {
                assert(isSuccess(0, res), { res });
              }, () => {
                resolve2();
              })).catch(callbackWithTryCatch(err => {
                assert(false, { err });
              }, () => {
                resolve2();
              }));
            })*/
          ]);

          app.deleteFile({ fileList: [fileId] }).then(callbackWithTryCatch(res => {
            assert(isSuccess(0, res) && res.fileList.every(ret => ret.code === 'SUCCESS'), { res });
          })).catch(callbackWithTryCatch(err => {
            assert(false && res.fileList, { err });
          }));
        } catch (e) {
          catchCallback(e);
        } finally {
          resolve();
        }
      }).catch(callbackWithTryCatch((err) => {
        assert(false, { err });
      }, () => {
        resolve();
      }));
    });
  });

  registerCase('storage(manual select file): uploadFile, getTempFileURL, downloadFile and deleteFile with callback', async () => {
    await new Promise(resolve => {
      const fileInput = document.getElementById('selectFile');
      const file = fileInput.files[0];
      if (!file) {
        assert(false, 'Please select file first');
      }
      app.uploadFile({
        filePath: file,
        cloudPath: file.name,
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          printInfo('uploadFile progress: ' + percentCompleted, progressEvent);
        }
      }, async (err, res) => {
        try {
          assert(isSuccess(err, res) && res.fileID, { err, res });

          const fileId = res.fileID;

          await Promise.all([
            new Promise(resolve1 => {
              app.getTempFileURL({ fileList: [fileId] }, callbackWithTryCatch((err, res) => {
                assert(isSuccess(err, res) && res.fileList, { err, res });
              }, () => {
                resolve1();
              }));
            })
          ]);

          app.deleteFile({ fileList: [fileId] }, callbackWithTryCatch((err, res) => {
            assert(isSuccess(err, res) && res.fileList.every(ret => ret.code === 'SUCCESS'), { err, res });
          }));
        } catch (e) {
          catchCallback(e);
        } finally {
          resolve();
        }
      });
    });
  });

  registerCase('storage(manual select file): uploadFile, getTempFileURL, downloadFile and deleteFile with promise', async () => {
    await new Promise(async resolve => {
      const fileInput = document.getElementById('selectFile');
      const file = fileInput.files[0];
      if (!file) {
        assert(false, 'Please select file first');
      }
      await app.uploadFile({
        filePath: file,
        cloudPath: file.name,
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          printInfo('uploadFile progress: ' + percentCompleted, progressEvent);
        }
      }).then(async res => {
        try {
          assert(isSuccess(0, res) && res.fileID, { res });

          const fileId = res.fileID;

          await Promise.all([
            new Promise(resolve1 => {
              app.getTempFileURL({ fileList: [fileId] },callbackWithTryCatch((err,res) => {
                assert(isSuccess(err, res) && res.fileList, { res });
              }, () => {
                resolve1();
              }))
            })
          ]);

          app.deleteFile({ fileList: [fileId] }).then(callbackWithTryCatch(res => {
            assert(isSuccess(0, res) && res.fileList.every(ret => ret.code === 'SUCCESS'), { res });
          })).catch(callbackWithTryCatch(err => {
            assert(false && res.fileList, { err });
          }));
        } catch (e) {
          catchCallback(e);
        } finally {
          resolve();
        }
      }).catch(callbackWithTryCatch((err) => {
        assert(false, { err });
      }, () => {
        resolve();
      }));
    });
  });
}