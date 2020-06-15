// init storage
import * as assert from 'power-assert';
import { callbackWithTryCatch, catchCallback, isSuccess, register } from './util';

window['fileIdList'] = [];

export async function uploadFile(app, returnType) {
  switch (returnType) {
    case 'callback': {
      await app.uploadFile({
        filePath: (<HTMLInputElement>document.getElementById('file')).files[0],
        cloudPath: 'cos.jpeg',
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('uploadFile progress: ' + percentCompleted, progressEvent);
        }
      }, function (err, res) {
        let bool = isSuccess(err, res) && res.fileID;
        try {
          assert(bool, {
            method: 'storage: uploadFile', returnType: 'callback', err, res
          });
        } catch (e) {
          catchCallback(e);
        }

        if (bool) {
          let fileId = res.fileID;
          window['fileIdList'].push(fileId);
          document.getElementById('fileID').innerHTML = window['fileIdList'].join('<br/>');
          document.getElementById('output').innerText = '上传文件 测试成功';
        } else {
          document.getElementById('output').innerText = '上传文件 测试失败';
        }
      });
      break;
    }
    case 'promise': {
      await app.uploadFile({
        filePath: (<HTMLInputElement>document.getElementById('file')).files[0],
        cloudPath: 'cos.jpeg',
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('uploadFile progress: ' + percentCompleted, progressEvent);
        }
      }).then(function (res) {
        let bool = isSuccess(0, res) && res.fileID;
        try {
          assert(bool, {
            method: 'storage: uploadFile', returnType: 'promise', res
          });
        } catch (e) {
          catchCallback(e);
        }

        if (bool) {
          let fileId = res.fileID;
          window['fileIdList'].push(fileId);
          document.getElementById('fileID').innerHTML = window['fileIdList'].join('<br/>');
          document.getElementById('output').innerText = '上传文件 测试成功';
        } else {
          document.getElementById('output').innerText = '上传文件 测试失败';
        }
      }).catch(function (err) {
        try {
          assert(false, {
            method: 'storage: uploadFile', returnType: 'promise', err
          });
        } catch (e) {
          catchCallback(e);
        }
        document.getElementById('output').innerText = '上传文件 测试失败';
      });
      break;
    }
  }
}

export async function getTempFileURL(app, returnType) {
  if (!window['fileIdList'].length) {
    alert('Please upload file first.');
    return;
  }

  switch (returnType) {
    case 'callback': {
      app.getTempFileURL({
        fileList: window['fileIdList']
      }, (err, res) => {
        let bool = isSuccess(err, res) && res.fileList.length === window['fileIdList'].length;
        try {
          assert(bool, {
            method: 'storage: getTempFileUrl', returnType: 'callback', err, res
          });
        } catch (e) {
          catchCallback(e);
        }

        if (bool) {
          document.getElementById('output').innerHTML = '<p>获取文件下载链接 测试成功</p>' + (res && res.fileList && res.fileList.length
              && res.fileList.map(item => {
                return `<p><a href="${item.download_url}">${item.download_url}</a></p>`;
              }).join(''));
        } else {
          document.getElementById('output').innerText = '获取文件下载链接 测试失败';
        }
      });
      break;
    }
    case 'promise': {
      app.getTempFileURL({
        fileList: window['fileIdList']
      }).then(function (res) {
        let bool = isSuccess(0, res) && res.fileList.length === window['fileIdList'].length;
        try {
          assert(bool, {
            method: 'storage: getTempFileUrl', returnType: 'promise', res
          });
        } catch (e) {
          catchCallback(e);
        }

        if (bool) {
          document.getElementById('output').innerHTML = '<p>获取文件下载链接 测试成功</p>' + (res && res.fileList && res.fileList.length
              && res.fileList.map(item => {
                return `<p><a href="${item.download_url}">${item.download_url}</a></p>`;
              }));
        } else {
          document.getElementById('output').innerText = '获取文件下载链接 测试失败';
        }
      }).catch(err => {
        try {
          assert(false, {
            method: 'storage: getTempFileUrl', returnType: 'promise', err
          });
        } catch (e) {
          catchCallback(e);
        }
        document.getElementById('output').innerText = '获取文件下载链接 测试失败';
      });
    }
  }
}

//TODO 下载的实现未确定
export async function downloadFile(app) {
  if (!window['fileIdList'].length) {
    alert('Please upload file first.');
    return;
  }
  if (window['fileIdList'].length > 1) {
    console.log('Only the first file will be downloaded.');
  }

  app.downloadFile({
    fileID: window['fileIdList'][0]
  });
}

export async function deleteFile(app, returnType) {
  if (!window['fileIdList'].length) {
    alert('Please upload file first.');
    return;
  }

  try {
    switch (returnType) {
      case 'callback': {
        app.deleteFile({
          fileList: window['fileIdList']
        }, function (err, res) {
          let bool = isSuccess(err, res);
          try {
            assert(bool, {
              method: 'storage: deleteFile', err, res
            });
          } catch (e) {
            catchCallback(e);
          }

          if (bool) {
            window['fileIdList'] = [];
            document.getElementById('fileID').innerText = '';
            document.getElementById('output').innerText = '删除文件 测试成功';
          } else {
            document.getElementById('output').innerText = '删除文件 测试失败';
          }
        });
        break;
      }
      case 'promise': {
        app.deleteFile({
          fileList: window['fileIdList']
        }).then(function (res) {
          let bool = isSuccess(0, res);
          try {
            assert(bool, {
              method: 'storage: deleteFile', res
            });
          } catch (e) {
            catchCallback(e);
          }

          if (bool) {
            window['fileIdList'] = [];
            document.getElementById('fileID').innerText = '';
            document.getElementById('output').innerText = '删除文件 测试成功';
          } else {
            document.getElementById('output').innerText = '删除 测试失败';
          }
        }).catch(err => {
          try {
            assert(false, {
              method: 'storage: deleteFile', err
            });
          } catch (e) {
            catchCallback(e);
          }
          document.getElementById('output').innerText = '删除 测试失败';
        });
        break;
      }
    }
  } catch (e) {
    catchCallback(e);
  }
}

export function test_storage(app) {
  let file = new File(['foo'], 'foo.txt', {
    type: 'text/plain',
  });

  register('storage: uploadFile, getTempFileURL, downloadFile and deleteFile with callback', async () => {
    await new Promise(resolve => {
      app.uploadFile({
        filePath: file,
        cloudPath: 'test'+Date.now(),
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('uploadFile progress: ' + percentCompleted, progressEvent);
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

  register('storage: uploadFile, getTempFileURL, downloadFile and deleteFile with promise', async () => {
    await new Promise(async resolve => {
      await app.uploadFile({
        filePath: file,
        cloudPath: 'test'+Date.now(),
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('uploadFile progress: ' + percentCompleted, progressEvent);
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

  register('storage(manual select file): uploadFile, getTempFileURL, downloadFile and deleteFile with callback', async () => {
    await new Promise(resolve => {
      const fileInput = <HTMLInputElement>document.getElementById('selectFile');
      const file = fileInput.files[0];
      if (!file) {
        assert(false, 'Please select file first');
      }
      app.uploadFile({
        filePath: file,
        cloudPath: file.name,
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('uploadFile progress: ' + percentCompleted, progressEvent);
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

  register('storage(manual select file): uploadFile, getTempFileURL, downloadFile and deleteFile with promise', async () => {
    await new Promise(async resolve => {
      const fileInput = <HTMLInputElement>document.getElementById('selectFile');
      const file = fileInput.files[0];
      if (!file) {
        assert(false, 'Please select file first');
      }
      await app.uploadFile({
        filePath: file,
        cloudPath: file.name,
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('uploadFile progress: ' + percentCompleted, progressEvent);
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