"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var getSdkName = utilities_1.constants.getSdkName, ERRORS = utilities_1.constants.ERRORS, COMMUNITY_SITE_URL = utilities_1.constants.COMMUNITY_SITE_URL;
var isArray = utilities_1.utils.isArray, isString = utilities_1.utils.isString, isPalinObject = utilities_1.utils.isPalinObject, execCallback = utilities_1.utils.execCallback;
var catchErrorsDecorator = utilities_1.helpers.catchErrorsDecorator;
var COMPONENT_NAME = 'storage';
var CloudbaseStorage = (function () {
    function CloudbaseStorage() {
    }
    CloudbaseStorage.prototype.uploadFile = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var cloudPath, filePath, onUploadProgress, action, request, metaData, _a, url, authorization, token, fileId, cosFileId, requestId, data, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cloudPath = params.cloudPath, filePath = params.filePath, onUploadProgress = params.onUploadProgress;
                        if (!isString(cloudPath) || !filePath) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "[" + COMPONENT_NAME + ".uploadFile] invalid params"
                            }));
                        }
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
    CloudbaseStorage.prototype.getUploadMetadata = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var cloudPath, request, action, metaData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cloudPath = params.cloudPath;
                        if (!isString(cloudPath)) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "[" + COMPONENT_NAME + ".getUploadMetadata] invalid cloudPath"
                            }));
                        }
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
    CloudbaseStorage.prototype.deleteFile = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var fileList, _i, fileList_1, fileId, action, request, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileList = params.fileList;
                        if (!fileList || !isArray(fileList) || fileList.length === 0) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "[" + COMPONENT_NAME + ".deleteFile] fileList must not be empty"
                            }));
                        }
                        for (_i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
                            fileId = fileList_1[_i];
                            if (!fileId || !isString(fileId)) {
                                throw new Error(JSON.stringify({
                                    code: ERRORS.INVALID_PARAMS,
                                    msg: "[" + COMPONENT_NAME + ".deleteFile] fileID must be string"
                                }));
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
    CloudbaseStorage.prototype.getTempFileURL = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var fileList, file_list, _i, fileList_2, file, action, request, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileList = params.fileList;
                        if (!fileList || !isArray(fileList) || fileList.length === 0) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "[" + COMPONENT_NAME + ".getTempFileURL] fileList must not be empty"
                            }));
                        }
                        file_list = [];
                        for (_i = 0, fileList_2 = fileList; _i < fileList_2.length; _i++) {
                            file = fileList_2[_i];
                            if (isPalinObject(file)) {
                                if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
                                    throw new Error(JSON.stringify({
                                        code: ERRORS.INVALID_PARAMS,
                                        msg: "[" + COMPONENT_NAME + ".getTempFileURL] file info must include fileID and maxAge"
                                    }));
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
                                throw new Error(JSON.stringify({
                                    code: ERRORS.INVALID_PARAMS,
                                    msg: "[" + COMPONENT_NAME + ".getTempFileURL] invalid fileList"
                                }));
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
    CloudbaseStorage.prototype.downloadFile = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var fileID, tmpUrlRes, res, request, tmpUrl, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileID = params.fileID;
                        if (!isString(fileID)) {
                            throw new Error(JSON.stringify({
                                code: ERRORS.INVALID_PARAMS,
                                msg: "[" + COMPONENT_NAME + ".getTempFileURL] fileID must be string"
                            }));
                        }
                        return [4, this.getTempFileURL.call(this, {
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
    __decorate([
        catchErrorsDecorator({
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
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", Promise)
    ], CloudbaseStorage.prototype, "uploadFile", null);
    __decorate([
        catchErrorsDecorator({
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
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", Promise)
    ], CloudbaseStorage.prototype, "getUploadMetadata", null);
    __decorate([
        catchErrorsDecorator({
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
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", Promise)
    ], CloudbaseStorage.prototype, "deleteFile", null);
    __decorate([
        catchErrorsDecorator({
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
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", Promise)
    ], CloudbaseStorage.prototype, "getTempFileURL", null);
    __decorate([
        catchErrorsDecorator({
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
                "\u5982\u679C\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u5EFA\u8BAE\u5230\u5B98\u65B9\u95EE\u7B54\u793E\u533A\u63D0\u95EE\u6216\u5BFB\u627E\u5E2E\u52A9\uFF1A" + COMMUNITY_SITE_URL
            ]
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", Promise)
    ], CloudbaseStorage.prototype, "downloadFile", null);
    return CloudbaseStorage;
}());
var cloudbaseStorage = new CloudbaseStorage();
var component = {
    name: COMPONENT_NAME,
    entity: {
        uploadFile: cloudbaseStorage.uploadFile,
        deleteFile: cloudbaseStorage.deleteFile,
        getTempFileURL: cloudbaseStorage.getTempFileURL,
        downloadFile: cloudbaseStorage.downloadFile,
        getUploadMetadata: cloudbaseStorage.getUploadMetadata
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
function registerStorage(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
exports.registerStorage = registerStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQWlFO0FBbUJ6RCxJQUFBLFVBQVUsR0FBaUMscUJBQVMsV0FBMUMsRUFBRSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUNyRCxJQUFBLE9BQU8sR0FBMkMsaUJBQUssUUFBaEQsRUFBRSxRQUFRLEdBQWlDLGlCQUFLLFNBQXRDLEVBQUUsYUFBYSxHQUFrQixpQkFBSyxjQUF2QixFQUFDLFlBQVksR0FBSyxpQkFBSyxhQUFWLENBQVc7QUFDeEQsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUVqQztJQUFBO0lBNFFBLENBQUM7SUE3UGMscUNBQVUsR0FBdkIsVUFDRSxNQUFpQyxFQUNqQyxRQUFrQjs7Ozs7O3dCQUVWLFNBQVMsR0FBaUMsTUFBTSxVQUF2QyxFQUFFLFFBQVEsR0FBdUIsTUFBTSxTQUE3QixFQUFFLGdCQUFnQixHQUFLLE1BQU0saUJBQVgsQ0FBWTt3QkFDekQsSUFBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBRSxDQUFDLFFBQVEsRUFBQzs0QkFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0NBQzNCLEdBQUcsRUFBRSxNQUFJLGNBQWMsZ0NBQTZCOzZCQUNyRCxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFDSyxNQUFNLEdBQUcsMkJBQTJCLENBQUM7d0JBRXJDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNjLFdBQU0sT0FBTyxDQUFDLElBQUksQ0FB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QjtBQUNILENBQUM7QUFORCwwQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnN0YW50cywgdXRpbHMsIGhlbHBlcnMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IHsgXG4gIElDbG91ZGJhc2VGaWxlTWV0YURhdGFSZXMsXG4gIElDbG91ZGJhc2VGaWxlSW5mbyxcbiAgSUNsb3VkYmFzZVVwbG9hZEZpbGVQYXJhbXMsXG4gIElDbG91ZGJhc2VVcGxvYWRGaWxlUmVzdWx0LFxuICBJQ2xvdWRiYXNlR2V0VXBsb2FkTWV0YWRhdGFQYXJhbXMsXG4gIElDbG91ZGJhc2VEZWxldGVGaWxlUGFyYW1zLFxuICBJQ2xvdWRiYXNlRGVsZXRlRmlsZVJlc3VsdCxcbiAgSUNsb3VkYmFzZUdldFRlbXBGaWxlVVJMUmVzdWx0LFxuICBJQ2xvdWRiYXNlR2V0VGVtcEZpbGVVUkxQYXJhbXMsXG4gIElDbG91ZGJhc2VEb3dubG9hZEZpbGVSZXN1bHQsXG4gIElDbG91ZGJhc2VEb3dubG9hZEZpbGVQYXJhbXNcbn0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9zdG9yYWdlJztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IHsgZ2V0U2RrTmFtZSwgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgaXNBcnJheSwgaXNTdHJpbmcsIGlzUGFsaW5PYmplY3QsZXhlY0NhbGxiYWNrIH0gPSB1dGlscztcbmNvbnN0IHsgY2F0Y2hFcnJvcnNEZWNvcmF0b3IgfSA9IGhlbHBlcnM7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ3N0b3JhZ2UnO1xuXG5jbGFzcyBDbG91ZGJhc2VTdG9yYWdle1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAndXBsb2FkRmlsZSdcbiAgICB9LFxuICAgIHRpdGxlOiAn5LiK5Lyg5paH5Lu25aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIHVwbG9hZEZpbGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeWfn+WQjeaYr+WQpuWcqOWuieWFqOWfn+WQjeWIl+ihqOS4re+8mmh0dHBzOi8vY29uc29sZS5jbG91ZC50ZW5jZW50LmNvbS90Y2IvZW52L3NhZmV0eScsXG4gICAgICAnICAzIC0g5LqR5a2Y5YKo5a6J5YWo6KeE5YiZ5piv5ZCm6ZmQ5Yi25LqG5b2T5YmN55m75b2V54q25oCB6K6/6ZeuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgdXBsb2FkRmlsZSAoXG4gICAgcGFyYW1zOklDbG91ZGJhc2VVcGxvYWRGaWxlUGFyYW1zLFxuICAgIGNhbGxiYWNrPzpGdW5jdGlvblxuICApOlByb21pc2U8SUNsb3VkYmFzZVVwbG9hZEZpbGVSZXN1bHQ+IHtcbiAgICBjb25zdCB7IGNsb3VkUGF0aCwgZmlsZVBhdGgsIG9uVXBsb2FkUHJvZ3Jlc3MgfSA9IHBhcmFtcztcbiAgICBpZighaXNTdHJpbmcoY2xvdWRQYXRoKXx8IWZpbGVQYXRoKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LnVwbG9hZEZpbGVdIGludmFsaWQgcGFyYW1zYFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCBhY3Rpb24gPSAnc3RvcmFnZS5nZXRVcGxvYWRNZXRhZGF0YSc7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gICAgY29uc3QgbWV0YURhdGE6SUNsb3VkYmFzZUZpbGVNZXRhRGF0YVJlcyA9IGF3YWl0IHJlcXVlc3Quc2VuZChhY3Rpb24sIHtcbiAgICAgIHBhdGg6IGNsb3VkUGF0aFxuICAgIH0pO1xuICBcbiAgICBjb25zdCB7XG4gICAgICBkYXRhOiB7IHVybCwgYXV0aG9yaXphdGlvbiwgdG9rZW4sIGZpbGVJZCwgY29zRmlsZUlkIH0sXG4gICAgICByZXF1ZXN0SWRcbiAgICB9ID0gbWV0YURhdGE7XG4gICAgXG4gICAgLy8g5L2/55So5Li05pe25a+G5YyZ5LiK5Lyg5paH5Lu2XG4gICAgLy8gQHNlZSBodHRwczovL2Nsb3VkLnRlbmNlbnQuY29tL2RvY3VtZW50L3Byb2R1Y3QvNDM2LzE0MDQ4XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGtleTogY2xvdWRQYXRoLFxuICAgICAgc2lnbmF0dXJlOiBhdXRob3JpemF0aW9uLFxuICAgICAgJ3gtY29zLW1ldGEtZmlsZWlkJzogY29zRmlsZUlkLFxuICAgICAgJ3N1Y2Nlc3NfYWN0aW9uX3N0YXR1cyc6ICcyMDEnLFxuICAgICAgJ3gtY29zLXNlY3VyaXR5LXRva2VuJzogdG9rZW5cbiAgICB9O1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3QudXBsb2FkKHtcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgICBmaWxlOiBmaWxlUGF0aCxcbiAgICAgIG5hbWU6IGNsb3VkUGF0aCxcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3NcbiAgICB9KTtcbiAgXG4gICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDEpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCx7XG4gICAgICAgIGZpbGVJRDogZmlsZUlkLFxuICAgICAgICByZXF1ZXN0SWRcbiAgICAgIH0pO1xuICAgIH1lbHNle1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLk9QRVJBVElPTl9GQUlMfV1bJHtDT01QT05FTlRfTkFNRX1dOiR7cmVzLmRhdGF9YCkpO1xuICAgIH1cbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAnZ2V0VXBsb2FkTWV0YWRhdGEnXG4gICAgfSxcbiAgICB0aXRsZTogJ+iOt+WPluS4iuS8oOWFg+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBnZXRVcGxvYWRNZXRhZGF0YSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRVcGxvYWRNZXRhZGF0YSAoXG4gICAgcGFyYW1zOklDbG91ZGJhc2VHZXRVcGxvYWRNZXRhZGF0YVBhcmFtcyxcbiAgICBjYWxsYmFjaz86IEZ1bmN0aW9uXG4gICk6UHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB7IGNsb3VkUGF0aCB9ID0gcGFyYW1zO1xuICAgIGlmKCFpc1N0cmluZyhjbG91ZFBhdGgpKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmdldFVwbG9hZE1ldGFkYXRhXSBpbnZhbGlkIGNsb3VkUGF0aGBcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gICAgY29uc3QgYWN0aW9uID0gJ3N0b3JhZ2UuZ2V0VXBsb2FkTWV0YWRhdGEnO1xuICBcbiAgICB0cnl7XG4gICAgICBjb25zdCBtZXRhRGF0YSA9IGF3YWl0IHJlcXVlc3Quc2VuZChhY3Rpb24sIHtcbiAgICAgICAgcGF0aDogY2xvdWRQYXRoXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCxtZXRhRGF0YSk7XG4gICAgfWNhdGNoKGVycil7XG4gICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLGVycik7XG4gICAgfVxuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICdkZWxldGVGaWxlJ1xuICAgIH0sXG4gICAgdGl0bGU6ICfliKDpmaTmlofku7blpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggZGVsZXRlRmlsZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBkZWxldGVGaWxlKFxuICAgIHBhcmFtczpJQ2xvdWRiYXNlRGVsZXRlRmlsZVBhcmFtcyxcbiAgICBjYWxsYmFjaz86IEZ1bmN0aW9uXG4gICk6UHJvbWlzZTxJQ2xvdWRiYXNlRGVsZXRlRmlsZVJlc3VsdD57XG4gICAgY29uc3QgeyBmaWxlTGlzdCB9ID0gcGFyYW1zO1xuICBcbiAgICBpZiAoIWZpbGVMaXN0IHx8ICFpc0FycmF5KGZpbGVMaXN0KSB8fCBmaWxlTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmRlbGV0ZUZpbGVdIGZpbGVMaXN0IG11c3Qgbm90IGJlIGVtcHR5YFxuICAgICAgfSkpO1xuICAgIH1cbiAgXG4gICAgZm9yIChjb25zdCBmaWxlSWQgb2YgZmlsZUxpc3QpIHtcbiAgICAgIGlmICghZmlsZUlkIHx8ICFpc1N0cmluZyhmaWxlSWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5kZWxldGVGaWxlXSBmaWxlSUQgbXVzdCBiZSBzdHJpbmdgXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvbnN0IGFjdGlvbiA9ICdzdG9yYWdlLmJhdGNoRGVsZXRlRmlsZSc7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdC5zZW5kKGFjdGlvbiwge1xuICAgICAgZmlsZWlkX2xpc3Q6IGZpbGVMaXN0XG4gICAgfSk7XG4gIFxuICAgIGlmIChyZXMuY29kZSl7XG4gICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLG51bGwscmVzKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGZpbGVMaXN0OiByZXMuZGF0YS5kZWxldGVfbGlzdCxcbiAgICAgIHJlcXVlc3RJZDogcmVzLnJlcXVlc3RJZFxuICAgIH07XG4gICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxudWxsLGRhdGEpOztcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAnZ2V0VGVtcEZpbGVVUkwnXG4gICAgfSxcbiAgICB0aXRsZTogJ+iOt+WPluaWh+S7tuS4i+i9vemTvuaOpScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBnZXRUZW1wRmlsZVVSTCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRUZW1wRmlsZVVSTChcbiAgICBwYXJhbXM6SUNsb3VkYmFzZUdldFRlbXBGaWxlVVJMUGFyYW1zLFxuICAgIGNhbGxiYWNrPzogRnVuY3Rpb25cbiAgKTpQcm9taXNlPElDbG91ZGJhc2VHZXRUZW1wRmlsZVVSTFJlc3VsdD57XG4gICAgY29uc3QgeyBmaWxlTGlzdCB9ID0gcGFyYW1zO1xuICBcbiAgICBpZiAoIWZpbGVMaXN0IHx8ICFpc0FycmF5KGZpbGVMaXN0KSB8fCBmaWxlTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmdldFRlbXBGaWxlVVJMXSBmaWxlTGlzdCBtdXN0IG5vdCBiZSBlbXB0eWBcbiAgICAgIH0pKTtcbiAgICB9XG4gIFxuICAgIGNvbnN0IGZpbGVfbGlzdCA9IFtdO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlTGlzdCkge1xuICAgICAgaWYgKGlzUGFsaW5PYmplY3QoZmlsZSkpIHtcbiAgICAgICAgaWYgKCFmaWxlLmhhc093blByb3BlcnR5KCdmaWxlSUQnKSB8fCAhZmlsZS5oYXNPd25Qcm9wZXJ0eSgnbWF4QWdlJykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmdldFRlbXBGaWxlVVJMXSBmaWxlIGluZm8gbXVzdCBpbmNsdWRlIGZpbGVJRCBhbmQgbWF4QWdlYFxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgZmlsZV9saXN0LnB1c2goe1xuICAgICAgICAgIGZpbGVpZDogKGZpbGUgYXMgSUNsb3VkYmFzZUZpbGVJbmZvKS5maWxlSUQsXG4gICAgICAgICAgbWF4X2FnZTogKGZpbGUgYXMgSUNsb3VkYmFzZUZpbGVJbmZvKS5tYXhBZ2VcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGZpbGUpKSB7XG4gICAgICAgIGZpbGVfbGlzdC5wdXNoKHtcbiAgICAgICAgICBmaWxlaWQ6IGZpbGVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZ2V0VGVtcEZpbGVVUkxdIGludmFsaWQgZmlsZUxpc3RgXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGNvbnN0IGFjdGlvbiA9ICdzdG9yYWdlLmJhdGNoR2V0RG93bmxvYWRVcmwnO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0O1xuICBcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0LnNlbmQoYWN0aW9uLCB7IGZpbGVfbGlzdCB9KTtcbiAgXG4gICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLG51bGwscmVzKTtcbiAgICB9XG4gIFxuICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCx7XG4gICAgICBmaWxlTGlzdDogcmVzLmRhdGEuZG93bmxvYWRfbGlzdCxcbiAgICAgIHJlcXVlc3RJZDogcmVzLnJlcXVlc3RJZFxuICAgIH0pO1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICdkb3dubG9hZEZpbGUnXG4gICAgfSxcbiAgICB0aXRsZTogJ+S4i+i9veaWh+S7tuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBkb3dubG9hZEZpbGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeWfn+WQjeaYr+WQpuWcqOWuieWFqOWfn+WQjeWIl+ihqOS4re+8mmh0dHBzOi8vY29uc29sZS5jbG91ZC50ZW5jZW50LmNvbS90Y2IvZW52L3NhZmV0eScsXG4gICAgICAnICAzIC0g5LqR5a2Y5YKo5a6J5YWo6KeE5YiZ5piv5ZCm6ZmQ5Yi25LqG5b2T5YmN55m75b2V54q25oCB6K6/6ZeuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZG93bmxvYWRGaWxlKFxuICAgIHBhcmFtczpJQ2xvdWRiYXNlRG93bmxvYWRGaWxlUGFyYW1zLFxuICAgIGNhbGxiYWNrPzpGdW5jdGlvblxuICApOlByb21pc2U8SUNsb3VkYmFzZURvd25sb2FkRmlsZVJlc3VsdD57XG4gICAgY29uc3QgeyBmaWxlSUQgfSA9IHBhcmFtcztcbiAgICBpZighaXNTdHJpbmcoZmlsZUlEKSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5nZXRUZW1wRmlsZVVSTF0gZmlsZUlEIG11c3QgYmUgc3RyaW5nYFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB0bXBVcmxSZXMgPSBhd2FpdCB0aGlzLmdldFRlbXBGaWxlVVJMLmNhbGwodGhpcywge1xuICAgICAgZmlsZUxpc3Q6IFt7XG4gICAgICAgIGZpbGVJRCxcbiAgICAgICAgbWF4QWdlOiA2MDBcbiAgICAgIH1dXG4gICAgfSk7XG4gIFxuICAgIGNvbnN0IHJlcyA9IHRtcFVybFJlcy5maWxlTGlzdFswXTtcbiAgXG4gICAgaWYgKHJlcy5jb2RlICE9PSAnU1VDQ0VTUycpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2sscmVzKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gIFxuICAgIGNvbnN0IHRtcFVybCA9IGVuY29kZVVSSShyZXMuZG93bmxvYWRfdXJsKTtcbiAgXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxdWVzdC5kb3dubG9hZCh7IHVybDogdG1wVXJsIH0pO1xuICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCxyZXN1bHQpO1xuICB9XG59XG5cbmNvbnN0IGNsb3VkYmFzZVN0b3JhZ2UgPSBuZXcgQ2xvdWRiYXNlU3RvcmFnZSgpO1xuY29uc3QgY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBlbnRpdHk6IHtcbiAgICB1cGxvYWRGaWxlOiBjbG91ZGJhc2VTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgZGVsZXRlRmlsZTogY2xvdWRiYXNlU3RvcmFnZS5kZWxldGVGaWxlLFxuICAgIGdldFRlbXBGaWxlVVJMOiBjbG91ZGJhc2VTdG9yYWdlLmdldFRlbXBGaWxlVVJMLFxuICAgIGRvd25sb2FkRmlsZTogY2xvdWRiYXNlU3RvcmFnZS5kb3dubG9hZEZpbGUsXG4gICAgZ2V0VXBsb2FkTWV0YWRhdGE6IGNsb3VkYmFzZVN0b3JhZ2UuZ2V0VXBsb2FkTWV0YWRhdGFcbiAgfVxufVxuXG50cnl7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufWNhdGNoKGUpe31cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU3RvcmFnZShhcHA6UGljazxJQ2xvdWRiYXNlLCAncmVnaXN0ZXJDb21wb25lbnQnPil7XG4gIHRyeXtcbiAgICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfWNhdGNoKGUpe1xuICAgIGNvbnNvbGUud2FybihlKTtcbiAgfVxufSJdfQ==