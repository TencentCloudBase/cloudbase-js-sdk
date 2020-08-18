"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStorage = void 0;
var utilities_1 = require("@cloudbase/utilities");
var getSdkName = utilities_1.constants.getSdkName, ERRORS = utilities_1.constants.ERRORS;
var isArray = utilities_1.utils.isArray, isString = utilities_1.utils.isString, isPalinObject = utilities_1.utils.isPalinObject, execCallback = utilities_1.utils.execCallback;
var COMPONENT_NAME = 'storage';
var uploadFile = function (params, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var cloudPath, filePath, onUploadProgress, action, request, metaData, _a, url, authorization, token, fileId, cosFileId, requestId, data, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cloudPath = params.cloudPath, filePath = params.filePath, onUploadProgress = params.onUploadProgress;
                    action = 'storage.getUploadMetadata';
                    request = this.request;
                    return [4, request.send(action, {
                            path: cloudPath
                        })];
                case 1:
                    metaData = _b.sent();
                    _a = metaData.data, url = _a.url, authorization = _a.authorization, token = _a.token, fileId = _a.fileId, cosFileId = _a.cosFileId, requestId = metaData.requestId;
                    data = {
                        key: cloudPath,
                        signature: authorization,
                        'x-cos-meta-fileid': cosFileId,
                        'success_action_status': '201',
                        'x-cos-security-token': token
                    };
                    return [4, request.upload({
                            url: url,
                            data: data,
                            file: filePath,
                            name: cloudPath,
                            onUploadProgress: onUploadProgress
                        })];
                case 2:
                    res = _b.sent();
                    if (res.statusCode === 201) {
                        return [2, execCallback(callback, null, {
                                fileID: fileId,
                                requestId: requestId
                            })];
                    }
                    else {
                        return [2, execCallback(callback, new Error("[" + getSdkName() + "][" + ERRORS.OPERATION_FAIL + "][" + COMPONENT_NAME + "]:" + res.data))];
                    }
                    return [2];
            }
        });
    });
};
var getUploadMetadata = function (params, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var cloudPath, request, action, metaData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cloudPath = params.cloudPath;
                    request = this.request;
                    action = 'storage.getUploadMetadata';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, request.send(action, {
                            path: cloudPath
                        })];
                case 2:
                    metaData = _a.sent();
                    return [2, execCallback(callback, null, metaData)];
                case 3:
                    err_1 = _a.sent();
                    return [2, execCallback(callback, err_1)];
                case 4: return [2];
            }
        });
    });
};
var deleteFile = function (params, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var fileList, _i, fileList_1, fileId, action, request, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileList = params.fileList;
                    if (!fileList || !isArray(fileList) || fileList.length === 0) {
                        throw new Error("[" + getSdkName() + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".deleteFile] fileList must not be empty");
                    }
                    for (_i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
                        fileId = fileList_1[_i];
                        if (!fileId || !isString(fileId)) {
                            throw new Error("[" + getSdkName() + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".deleteFile] fileID must be string");
                        }
                    }
                    action = 'storage.batchDeleteFile';
                    request = this.request;
                    return [4, request.send(action, {
                            fileid_list: fileList
                        })];
                case 1:
                    res = _a.sent();
                    if (res.code) {
                        return [2, execCallback(callback, null, res)];
                    }
                    data = {
                        fileList: res.data.delete_list,
                        requestId: res.requestId
                    };
                    return [2, execCallback(callback, null, data)];
            }
        });
    });
};
var getTempFileURL = function (params, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var fileList, err, file_list, _i, fileList_2, file, err, err, action, request, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileList = params.fileList;
                    if (!fileList || !isArray(fileList) || fileList.length === 0) {
                        err = new Error("[" + getSdkName() + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".getTempFileURL] fileList must not be empty");
                        return [2, execCallback(callback, err)];
                    }
                    file_list = [];
                    for (_i = 0, fileList_2 = fileList; _i < fileList_2.length; _i++) {
                        file = fileList_2[_i];
                        if (isPalinObject(file)) {
                            if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
                                err = new Error("[" + getSdkName() + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".getTempFileURL] file info must include fileID and maxAge ");
                                return [2, execCallback(callback, err)];
                            }
                            file_list.push({
                                fileid: file.fileID,
                                max_age: file.maxAge
                            });
                        }
                        else if (isString(file)) {
                            file_list.push({
                                fileid: file
                            });
                        }
                        else {
                            err = new Error("[" + getSdkName() + "][" + ERRORS.INVALID_PARAMS + "][" + COMPONENT_NAME + ".getTempFileURL] invalid fileList");
                            return [2, execCallback(callback, err)];
                        }
                    }
                    action = 'storage.batchGetDownloadUrl';
                    request = this.request;
                    return [4, request.send(action, { file_list: file_list })];
                case 1:
                    res = _a.sent();
                    if (res.code) {
                        return [2, execCallback(callback, null, res)];
                    }
                    return [2, execCallback(callback, null, {
                            fileList: res.data.download_list,
                            requestId: res.requestId
                        })];
            }
        });
    });
};
var downloadFile = function (params, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var fileID, tmpUrlRes, res, request, tmpUrl, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileID = params.fileID;
                    return [4, getTempFileURL.call(this, {
                            fileList: [{
                                    fileID: fileID,
                                    maxAge: 600
                                }]
                        })];
                case 1:
                    tmpUrlRes = _a.sent();
                    res = tmpUrlRes.fileList[0];
                    if (res.code !== 'SUCCESS') {
                        return [2, execCallback(callback, res)];
                    }
                    request = this.request;
                    tmpUrl = encodeURI(res.download_url);
                    return [4, request.download({ url: tmpUrl })];
                case 2:
                    result = _a.sent();
                    return [2, execCallback(callback, null, result)];
            }
        });
    });
};
var component = {
    name: COMPONENT_NAME,
    entity: {
        uploadFile: uploadFile,
        deleteFile: deleteFile,
        getTempFileURL: getTempFileURL,
        downloadFile: downloadFile,
        getUploadMetadata: getUploadMetadata
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
function registerStorage(app) {
    app.registerComponent(component);
}
exports.registerStorage = registerStorage;
