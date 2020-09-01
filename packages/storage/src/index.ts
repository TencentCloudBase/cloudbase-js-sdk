import { constants, utils, helpers } from '@cloudbase/utilities';
import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseComponent } from '@cloudbase/types/component';
import { 
  ICloudbaseFileMetaDataRes,
  ICloudbaseFileInfo,
  ICloudbaseUploadFileParams,
  ICloudbaseUploadFileResult,
  ICloudbaseGetUploadMetadataParams,
  ICloudbaseDeleteFileParams,
  ICloudbaseDeleteFileResult,
  ICloudbaseGetTempFileURLResult,
  ICloudbaseGetTempFileURLParams,
  ICloudbaseDownloadFileResult,
  ICloudbaseDownloadFileParams
} from '@cloudbase/types/storage';

declare const cloudbase: ICloudbase;

const { getSdkName, ERRORS, COMMUNITY_SITE_URL } = constants;
const { isArray, isString, isPalinObject,execCallback } = utils;
const { catchErrorsDecorator } = helpers;

const COMPONENT_NAME = 'storage';

class CloudbaseStorage{
  @catchErrorsDecorator({
    customInfo: {
      className: 'Cloudbase',
      methodName: 'uploadFile'
    },
    title: '上传文件失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 uploadFile() 的语法或参数是否正确',
      '  2 - 当前域名是否在安全域名列表中：https://console.cloud.tencent.com/tcb/env/safety',
      '  3 - 云存储安全规则是否限制了当前登录状态访问',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async uploadFile (
    params:ICloudbaseUploadFileParams,
    callback?:Function
  ):Promise<ICloudbaseUploadFileResult> {
    const { cloudPath, filePath, onUploadProgress } = params;
    if(!isString(cloudPath)||!filePath){
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.uploadFile] invalid params`
      }));
    }
    const action = 'storage.getUploadMetadata';
    // @ts-ignore
    const request = this.request;
    const metaData:ICloudbaseFileMetaDataRes = await request.send(action, {
      path: cloudPath
    });
  
    const {
      data: { url, authorization, token, fileId, cosFileId },
      requestId
    } = metaData;
    
    // 使用临时密匙上传文件
    // @see https://cloud.tencent.com/document/product/436/14048
    const data = {
      key: cloudPath,
      signature: authorization,
      'x-cos-meta-fileid': cosFileId,
      'success_action_status': '201',
      'x-cos-security-token': token
    };
    const res = await request.upload({
      url,
      data,
      file: filePath,
      name: cloudPath,
      onUploadProgress
    });
  
    if (res.statusCode === 201) {
      return execCallback(callback,null,{
        fileID: fileId,
        requestId
      });
    }else{
      return execCallback(callback,new Error(`[${getSdkName()}][${ERRORS.OPERATION_FAIL}][${COMPONENT_NAME}]:${res.data}`));
    }
  }
  @catchErrorsDecorator({
    customInfo: {
      className: 'Cloudbase',
      methodName: 'getUploadMetadata'
    },
    title: '获取上传元信息失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 getUploadMetadata() 的语法或参数是否正确',
      '  2 - 当前域名是否在安全域名列表中：https://console.cloud.tencent.com/tcb/env/safety',
      '  3 - 云存储安全规则是否限制了当前登录状态访问',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getUploadMetadata (
    params:ICloudbaseGetUploadMetadataParams,
    callback?: Function
  ):Promise<any> {
    const { cloudPath } = params;
    if(!isString(cloudPath)){
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.getUploadMetadata] invalid cloudPath`
      }));
    }
    // @ts-ignore
    const request = this.request;
    const action = 'storage.getUploadMetadata';
  
    try{
      const metaData = await request.send(action, {
        path: cloudPath
      });
      return execCallback(callback,null,metaData);
    }catch(err){
      return execCallback(callback,err);
    }
  }
  @catchErrorsDecorator({
    customInfo: {
      className: 'Cloudbase',
      methodName: 'deleteFile'
    },
    title: '删除文件失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 deleteFile() 的语法或参数是否正确',
      '  2 - 当前域名是否在安全域名列表中：https://console.cloud.tencent.com/tcb/env/safety',
      '  3 - 云存储安全规则是否限制了当前登录状态访问',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async deleteFile(
    params:ICloudbaseDeleteFileParams,
    callback?: Function
  ):Promise<ICloudbaseDeleteFileResult>{
    const { fileList } = params;
  
    if (!fileList || !isArray(fileList) || fileList.length === 0) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.deleteFile] fileList must not be empty`
      }));
    }
  
    for (const fileId of fileList) {
      if (!fileId || !isString(fileId)) {
        throw new Error(JSON.stringify({
          code: ERRORS.INVALID_PARAMS,
          msg: `[${COMPONENT_NAME}.deleteFile] fileID must be string`
        }));
      }
    }
  
    const action = 'storage.batchDeleteFile';
    // @ts-ignore
    const request = this.request;
    const res = await request.send(action, {
      fileid_list: fileList
    });
  
    if (res.code){
      return execCallback(callback,null,res);
    }
    const data = {
      fileList: res.data.delete_list,
      requestId: res.requestId
    };
    return execCallback(callback,null,data);;
  }
  @catchErrorsDecorator({
    customInfo: {
      className: 'Cloudbase',
      methodName: 'getTempFileURL'
    },
    title: '获取文件下载链接',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 getTempFileURL() 的语法或参数是否正确',
      '  2 - 当前域名是否在安全域名列表中：https://console.cloud.tencent.com/tcb/env/safety',
      '  3 - 云存储安全规则是否限制了当前登录状态访问',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async getTempFileURL(
    params:ICloudbaseGetTempFileURLParams,
    callback?: Function
  ):Promise<ICloudbaseGetTempFileURLResult>{
    const { fileList } = params;
  
    if (!fileList || !isArray(fileList) || fileList.length === 0) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.getTempFileURL] fileList must not be empty`
      }));
    }
  
    const file_list = [];
    for (const file of fileList) {
      if (isPalinObject(file)) {
        if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
          throw new Error(JSON.stringify({
            code: ERRORS.INVALID_PARAMS,
            msg: `[${COMPONENT_NAME}.getTempFileURL] file info must include fileID and maxAge`
          }));
        }
  
        file_list.push({
          fileid: (file as ICloudbaseFileInfo).fileID,
          max_age: (file as ICloudbaseFileInfo).maxAge
        });
      } else if (isString(file)) {
        file_list.push({
          fileid: file
        });
      } else {
        throw new Error(JSON.stringify({
          code: ERRORS.INVALID_PARAMS,
          msg: `[${COMPONENT_NAME}.getTempFileURL] invalid fileList`
        }));
      }
    }
  
    const action = 'storage.batchGetDownloadUrl';
    // @ts-ignore
    const request = this.request;
  
    const res = await request.send(action, { file_list });
  
    if (res.code) {
      return execCallback(callback,null,res);
    }
  
    return execCallback(callback,null,{
      fileList: res.data.download_list,
      requestId: res.requestId
    });
  }
  @catchErrorsDecorator({
    customInfo: {
      className: 'Cloudbase',
      methodName: 'downloadFile'
    },
    title: '下载文件失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 downloadFile() 的语法或参数是否正确',
      '  2 - 当前域名是否在安全域名列表中：https://console.cloud.tencent.com/tcb/env/safety',
      '  3 - 云存储安全规则是否限制了当前登录状态访问',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async downloadFile(
    params:ICloudbaseDownloadFileParams,
    callback?:Function
  ):Promise<ICloudbaseDownloadFileResult>{
    const { fileID } = params;
    if(!isString(fileID)){
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.getTempFileURL] fileID must be string`
      }));
    }
    
    const tmpUrlRes = await this.getTempFileURL.call(this, {
      fileList: [{
        fileID,
        maxAge: 600
      }]
    });
  
    const res = tmpUrlRes.fileList[0];
  
    if (res.code !== 'SUCCESS') {
      return execCallback(callback,res);
    }
    // @ts-ignore
    const request = this.request;
  
    const tmpUrl = encodeURI(res.download_url);
  
    const result = await request.download({ url: tmpUrl });
    return execCallback(callback,null,result);
  }
}

const cloudbaseStorage = new CloudbaseStorage();
const component:ICloudbaseComponent = {
  name: COMPONENT_NAME,
  entity: {
    uploadFile: cloudbaseStorage.uploadFile,
    deleteFile: cloudbaseStorage.deleteFile,
    getTempFileURL: cloudbaseStorage.getTempFileURL,
    downloadFile: cloudbaseStorage.downloadFile,
    getUploadMetadata: cloudbaseStorage.getUploadMetadata
  }
}

try{
  cloudbase.registerComponent(component);
}catch(e){}

export function registerStorage(app:ICloudbase){
  app.registerComponent(component);
}