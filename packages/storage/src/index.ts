import { constants, utils } from '@cloudbase/utilities';
import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseComponent } from '@cloudbase/types/component';
import { 
  ICloudbaseFileMetaDataRes,
  ICloudbaseUploadFile, 
  ICloudbaseDeleteFile,
  ICloudbaseGetTempFileURL,
  ICloudbaseDownloadFile,
  ICloudbaseFileInfo,
  ICloudbaseGetUploadMetadata
} from '@cloudbase/types/storage';

declare const cloudbase: ICloudbase;

const { SDK_NAME, ERRORS } = constants;
const { isArray, isString, isPalinObject,execCallback } = utils;

const COMPONENT_NAME = 'storage';

const uploadFile:ICloudbaseUploadFile = async function (params,callback) {
  const { cloudPath, filePath, onUploadProgress } = params;
  const action = 'storage.getUploadMetadata';
  
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
    return execCallback(callback,new Error(`[${SDK_NAME}][${ERRORS.OPERATION_FAIL}][${COMPONENT_NAME}]:${res.data}`));
  }
};

const getUploadMetadata:ICloudbaseGetUploadMetadata = async function (params,callback?) {
  const { cloudPath } = params;

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
};

const deleteFile:ICloudbaseDeleteFile = async function (params,callback) {
  const { fileList } = params;

  if (!fileList || !isArray(fileList) || fileList.length === 0) {
    throw new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.deleteFile] fileList must not be empty`);
  }

  for (const fileId of fileList) {
    if (!fileId || !isString(fileId)) {
      throw new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.deleteFile] fileID must be string`);
    }
  }

  const action = 'storage.batchDeleteFile';
  
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
};

const getTempFileURL:ICloudbaseGetTempFileURL = async function (params,callback) {
  const { fileList } = params;

  if (!fileList || !isArray(fileList) || fileList.length === 0) {
    const err = new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.getTempFileURL] fileList must not be empty`);
    return execCallback(callback,err);
  }

  const file_list = [];
  for (const file of fileList) {
    if (isPalinObject(file)) {
      if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
        const err = new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.getTempFileURL] file info must include fileID and maxAge `);
        return execCallback(callback,err);
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
      const err = new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.getTempFileURL] invalid fileList`);
      return execCallback(callback,err);
    }
  }

  const action = 'storage.batchGetDownloadUrl';

  const request = this.request;

  const res = await request.send(action, { file_list });

  if (res.code) {
    return execCallback(callback,null,res);
  }

  return execCallback(callback,null,{
    fileList: res.data.download_list,
    requestId: res.requestId
  });
};

const downloadFile:ICloudbaseDownloadFile = async function (params,callback) {
  const { fileID } = params;
  
  const tmpUrlRes = await getTempFileURL.call(this, {
    fileList: [{
      fileID,
      maxAge: 600
    }]
  });

  const res = tmpUrlRes.fileList[0];

  if (res.code !== 'SUCCESS') {
    return execCallback(callback,res);
  }

  const request = this.request;

  const tmpUrl = encodeURI(res.download_url);

  const result = await request.download({ url: tmpUrl });
  return execCallback(callback,null,result);
};

const component:ICloudbaseComponent = {
  name: COMPONENT_NAME,
  entity: {
    uploadFile,
    deleteFile,
    getTempFileURL,
    downloadFile,
    getUploadMetadata
  }
}

try{
  cloudbase.registerComponent(component);
}catch(e){}

export function registerStorage(app:ICloudbase){
  app.registerComponent(component);
}