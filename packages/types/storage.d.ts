export interface ICloudbaseUploadFileParams {
  cloudPath: string;
  filePath: string;
  onUploadProgress?: Function;
}

export interface ICloudbaseUploadFileResult {
  fileID: string;
  requestId: string;
}

export interface ICloudbaseUploadFile {
  (params: ICloudbaseUploadFileParams, callback?: Function): Promise<ICloudbaseUploadFileResult>;
}

export interface ICloudbaseGetUploadMetadataParams {
  cloudPath: string;
}

export interface ICloudbaseGetUploadMetadata {
  (params: ICloudbaseGetUploadMetadataParams, callback?: Function): Promise<any>;
}

export interface ICloudbaseDeleteFileParams {
  fileList: string[];
}

export interface ICloudbaseDeleteFile {
  (params: ICloudbaseDeleteFileParams, callback?: Function): Promise<ICloudbaseDeleteFileResult>;
}

export interface ICloudbaseDeleteFileResult {
  code?: string;
  message?: string;
  fileList?: {
    code?: string;
    fileID: string;
  }[];
  requestId?: string;
}

export interface ICloudbaseFileInfo {
  fileID: string;
  maxAge: number;
}

export interface ICloudbaseGetTempFileURLParams {
  fileList: string[] | ICloudbaseFileInfo[];
}

export interface ICloudbaseGetTempFileURLResult {
  code?: string;
  message?: string;
  fileList?: {
    code?: string;
    message?: string;
    fileID: string;
    tempFileURL: string;
    download_url?: string;
  }[];
  requestId?: string;
}

export interface ICloudbaseGetTempFileURL {
  (params: ICloudbaseGetTempFileURLParams, callback?: Function): Promise<ICloudbaseGetTempFileURLResult>;
}

export interface ICloudbaseDownloadFileParams {
  fileID: string;
  tempFilePath?: string;
}

export interface ICloudbaseDownloadFileResult {
  code?: string;
  message?: string;
  fileContent?: any;
  requestId?: string;
}

export interface ICloudbaseDownloadFile {
  (params: ICloudbaseDownloadFileParams, callback?: Function): Promise<ICloudbaseDownloadFileResult>;
}

export interface ICloudbaseFileMetaData {
  url: string;
  token: string;
  authorization: string;
  fileId: string;
  cosFileId: string;
  download_url: string
}

export interface ICloudbaseFileMetaDataRes {
  data: ICloudbaseFileMetaData;
  requestId: string;
}