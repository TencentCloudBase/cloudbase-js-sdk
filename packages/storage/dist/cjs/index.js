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
            var cloudPath, filePath, onUploadProgress, action, request, metaData, _a, url, authorization, token, fileId, cosFileId, download_url, requestId, data, res;
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
                        _a = metaData.data, url = _a.url, authorization = _a.authorization, token = _a.token, fileId = _a.fileId, cosFileId = _a.cosFileId, download_url = _a.download_url, requestId = metaData.requestId;
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
                                    download_url: download_url,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQWlFO0FBbUJ6RCxJQUFBLFVBQVUsR0FBaUMscUJBQVMsV0FBMUMsRUFBRSxNQUFNLEdBQXlCLHFCQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUsscUJBQVMsbUJBQWQsQ0FBZTtBQUNyRCxJQUFBLE9BQU8sR0FBNEMsaUJBQUssUUFBakQsRUFBRSxRQUFRLEdBQWtDLGlCQUFLLFNBQXZDLEVBQUUsYUFBYSxHQUFtQixpQkFBSyxjQUF4QixFQUFFLFlBQVksR0FBSyxpQkFBSyxhQUFWLENBQVc7QUFDekQsSUFBQSxvQkFBb0IsR0FBSyxtQkFBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUVqQztJQUFBO0lBOFFBLENBQUM7SUEvUGMscUNBQVUsR0FBdkIsVUFDRSxNQUFrQyxFQUNsQyxRQUFtQjs7Ozs7O3dCQUVYLFNBQVMsR0FBaUMsTUFBTSxVQUF2QyxFQUFFLFFBQVEsR0FBdUIsTUFBTSxTQUE3QixFQUFFLGdCQUFnQixHQUFLLE1BQU0saUJBQVgsQ0FBWTt3QkFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0NBQzNCLEdBQUcsRUFBRSxNQUFJLGNBQWMsZ0NBQTZCOzZCQUNyRCxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFDSyxNQUFNLEdBQUcsMkJBQTJCLENBQUM7d0JBRXJDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNlLFdBQU0sT0FBTyxDQUFDLElBQUksQ0FB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QUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQU5ELDBDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQge1xuICBJQ2xvdWRiYXNlRmlsZU1ldGFEYXRhUmVzLFxuICBJQ2xvdWRiYXNlRmlsZUluZm8sXG4gIElDbG91ZGJhc2VVcGxvYWRGaWxlUGFyYW1zLFxuICBJQ2xvdWRiYXNlVXBsb2FkRmlsZVJlc3VsdCxcbiAgSUNsb3VkYmFzZUdldFVwbG9hZE1ldGFkYXRhUGFyYW1zLFxuICBJQ2xvdWRiYXNlRGVsZXRlRmlsZVBhcmFtcyxcbiAgSUNsb3VkYmFzZURlbGV0ZUZpbGVSZXN1bHQsXG4gIElDbG91ZGJhc2VHZXRUZW1wRmlsZVVSTFJlc3VsdCxcbiAgSUNsb3VkYmFzZUdldFRlbXBGaWxlVVJMUGFyYW1zLFxuICBJQ2xvdWRiYXNlRG93bmxvYWRGaWxlUmVzdWx0LFxuICBJQ2xvdWRiYXNlRG93bmxvYWRGaWxlUGFyYW1zXG59IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvc3RvcmFnZSc7XG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuXG5jb25zdCB7IGdldFNka05hbWUsIEVSUk9SUywgQ09NTVVOSVRZX1NJVEVfVVJMIH0gPSBjb25zdGFudHM7XG5jb25zdCB7IGlzQXJyYXksIGlzU3RyaW5nLCBpc1BhbGluT2JqZWN0LCBleGVjQ2FsbGJhY2sgfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnc3RvcmFnZSc7XG5cbmNsYXNzIENsb3VkYmFzZVN0b3JhZ2Uge1xuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAndXBsb2FkRmlsZSdcbiAgICB9LFxuICAgIHRpdGxlOiAn5LiK5Lyg5paH5Lu25aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIHVwbG9hZEZpbGUoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeWfn+WQjeaYr+WQpuWcqOWuieWFqOWfn+WQjeWIl+ihqOS4re+8mmh0dHBzOi8vY29uc29sZS5jbG91ZC50ZW5jZW50LmNvbS90Y2IvZW52L3NhZmV0eScsXG4gICAgICAnICAzIC0g5LqR5a2Y5YKo5a6J5YWo6KeE5YiZ5piv5ZCm6ZmQ5Yi25LqG5b2T5YmN55m75b2V54q25oCB6K6/6ZeuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgdXBsb2FkRmlsZShcbiAgICBwYXJhbXM6IElDbG91ZGJhc2VVcGxvYWRGaWxlUGFyYW1zLFxuICAgIGNhbGxiYWNrPzogRnVuY3Rpb25cbiAgKTogUHJvbWlzZTxJQ2xvdWRiYXNlVXBsb2FkRmlsZVJlc3VsdD4ge1xuICAgIGNvbnN0IHsgY2xvdWRQYXRoLCBmaWxlUGF0aCwgb25VcGxvYWRQcm9ncmVzcyB9ID0gcGFyYW1zO1xuICAgIGlmICghaXNTdHJpbmcoY2xvdWRQYXRoKSB8fCAhZmlsZVBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LnVwbG9hZEZpbGVdIGludmFsaWQgcGFyYW1zYFxuICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdCBhY3Rpb24gPSAnc3RvcmFnZS5nZXRVcGxvYWRNZXRhZGF0YSc7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gICAgY29uc3QgbWV0YURhdGE6IElDbG91ZGJhc2VGaWxlTWV0YURhdGFSZXMgPSBhd2FpdCByZXF1ZXN0LnNlbmQoYWN0aW9uLCB7XG4gICAgICBwYXRoOiBjbG91ZFBhdGhcbiAgICB9KTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGRhdGE6IHsgdXJsLCBhdXRob3JpemF0aW9uLCB0b2tlbiwgZmlsZUlkLCBjb3NGaWxlSWQsIGRvd25sb2FkX3VybCB9LFxuICAgICAgcmVxdWVzdElkXG4gICAgfSA9IG1ldGFEYXRhO1xuXG5cbiAgICAvLyDkvb/nlKjkuLTml7blr4bljJnkuIrkvKDmlofku7ZcbiAgICAvLyBAc2VlIGh0dHBzOi8vY2xvdWQudGVuY2VudC5jb20vZG9jdW1lbnQvcHJvZHVjdC80MzYvMTQwNDhcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAga2V5OiBjbG91ZFBhdGgsXG4gICAgICBzaWduYXR1cmU6IGF1dGhvcml6YXRpb24sXG4gICAgICAneC1jb3MtbWV0YS1maWxlaWQnOiBjb3NGaWxlSWQsXG4gICAgICAnc3VjY2Vzc19hY3Rpb25fc3RhdHVzJzogJzIwMScsXG4gICAgICAneC1jb3Mtc2VjdXJpdHktdG9rZW4nOiB0b2tlblxuICAgIH07XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdC51cGxvYWQoe1xuICAgICAgdXJsLFxuICAgICAgZGF0YSxcbiAgICAgIGZpbGU6IGZpbGVQYXRoLFxuICAgICAgbmFtZTogY2xvdWRQYXRoLFxuICAgICAgb25VcGxvYWRQcm9ncmVzc1xuICAgIH0pO1xuXG4gICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDEpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIHtcbiAgICAgICAgZmlsZUlEOiBmaWxlSWQsXG4gICAgICAgIGRvd25sb2FkX3VybCxcbiAgICAgICAgcmVxdWVzdElkXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbmV3IEVycm9yKGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5PUEVSQVRJT05fRkFJTH1dWyR7Q09NUE9ORU5UX05BTUV9XToke3Jlcy5kYXRhfWApKTtcbiAgICB9XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBjdXN0b21JbmZvOiB7XG4gICAgICBjbGFzc05hbWU6ICdDbG91ZGJhc2UnLFxuICAgICAgbWV0aG9kTmFtZTogJ2dldFVwbG9hZE1ldGFkYXRhJ1xuICAgIH0sXG4gICAgdGl0bGU6ICfojrflj5bkuIrkvKDlhYPkv6Hmga/lpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggZ2V0VXBsb2FkTWV0YWRhdGEoKSDnmoTor63ms5XmiJblj4LmlbDmmK/lkKbmraPnoa4nLFxuICAgICAgJyAgMiAtIOW9k+WJjeWfn+WQjeaYr+WQpuWcqOWuieWFqOWfn+WQjeWIl+ihqOS4re+8mmh0dHBzOi8vY29uc29sZS5jbG91ZC50ZW5jZW50LmNvbS90Y2IvZW52L3NhZmV0eScsXG4gICAgICAnICAzIC0g5LqR5a2Y5YKo5a6J5YWo6KeE5YiZ5piv5ZCm6ZmQ5Yi25LqG5b2T5YmN55m75b2V54q25oCB6K6/6ZeuJyxcbiAgICAgIGDlpoLmnpzpl67popjkvp3nhLblrZjlnKjvvIzlu7rorq7liLDlrpjmlrnpl67nrZTnpL7ljLrmj5Dpl67miJblr7vmib7luK7liqnvvJoke0NPTU1VTklUWV9TSVRFX1VSTH1gXG4gICAgXVxuICB9KVxuICBwdWJsaWMgYXN5bmMgZ2V0VXBsb2FkTWV0YWRhdGEoXG4gICAgcGFyYW1zOiBJQ2xvdWRiYXNlR2V0VXBsb2FkTWV0YWRhdGFQYXJhbXMsXG4gICAgY2FsbGJhY2s/OiBGdW5jdGlvblxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgY2xvdWRQYXRoIH0gPSBwYXJhbXM7XG4gICAgaWYgKCFpc1N0cmluZyhjbG91ZFBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5nZXRVcGxvYWRNZXRhZGF0YV0gaW52YWxpZCBjbG91ZFBhdGhgXG4gICAgICB9KSk7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0O1xuICAgIGNvbnN0IGFjdGlvbiA9ICdzdG9yYWdlLmdldFVwbG9hZE1ldGFkYXRhJztcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXRhRGF0YSA9IGF3YWl0IHJlcXVlc3Quc2VuZChhY3Rpb24sIHtcbiAgICAgICAgcGF0aDogY2xvdWRQYXRoXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIG1ldGFEYXRhKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIGVycik7XG4gICAgfVxuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICdkZWxldGVGaWxlJ1xuICAgIH0sXG4gICAgdGl0bGU6ICfliKDpmaTmlofku7blpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggZGVsZXRlRmlsZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBkZWxldGVGaWxlKFxuICAgIHBhcmFtczogSUNsb3VkYmFzZURlbGV0ZUZpbGVQYXJhbXMsXG4gICAgY2FsbGJhY2s/OiBGdW5jdGlvblxuICApOiBQcm9taXNlPElDbG91ZGJhc2VEZWxldGVGaWxlUmVzdWx0PiB7XG4gICAgY29uc3QgeyBmaWxlTGlzdCB9ID0gcGFyYW1zO1xuXG4gICAgaWYgKCFmaWxlTGlzdCB8fCAhaXNBcnJheShmaWxlTGlzdCkgfHwgZmlsZUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5kZWxldGVGaWxlXSBmaWxlTGlzdCBtdXN0IG5vdCBiZSBlbXB0eWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGZpbGVJZCBvZiBmaWxlTGlzdCkge1xuICAgICAgaWYgKCFmaWxlSWQgfHwgIWlzU3RyaW5nKGZpbGVJZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmRlbGV0ZUZpbGVdIGZpbGVJRCBtdXN0IGJlIHN0cmluZ2BcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvbiA9ICdzdG9yYWdlLmJhdGNoRGVsZXRlRmlsZSc7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdC5zZW5kKGFjdGlvbiwge1xuICAgICAgZmlsZWlkX2xpc3Q6IGZpbGVMaXN0XG4gICAgfSk7XG5cbiAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIHJlcyk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBmaWxlTGlzdDogcmVzLmRhdGEuZGVsZXRlX2xpc3QsXG4gICAgICByZXF1ZXN0SWQ6IHJlcy5yZXF1ZXN0SWRcbiAgICB9O1xuICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIGRhdGEpOztcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAnZ2V0VGVtcEZpbGVVUkwnXG4gICAgfSxcbiAgICB0aXRsZTogJ+iOt+WPluaWh+S7tuS4i+i9vemTvuaOpScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBnZXRUZW1wRmlsZVVSTCgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRUZW1wRmlsZVVSTChcbiAgICBwYXJhbXM6IElDbG91ZGJhc2VHZXRUZW1wRmlsZVVSTFBhcmFtcyxcbiAgICBjYWxsYmFjaz86IEZ1bmN0aW9uXG4gICk6IFByb21pc2U8SUNsb3VkYmFzZUdldFRlbXBGaWxlVVJMUmVzdWx0PiB7XG4gICAgY29uc3QgeyBmaWxlTGlzdCB9ID0gcGFyYW1zO1xuXG4gICAgaWYgKCFmaWxlTGlzdCB8fCAhaXNBcnJheShmaWxlTGlzdCkgfHwgZmlsZUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5nZXRUZW1wRmlsZVVSTF0gZmlsZUxpc3QgbXVzdCBub3QgYmUgZW1wdHlgXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZV9saXN0ID0gW107XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVMaXN0KSB7XG4gICAgICBpZiAoaXNQYWxpbk9iamVjdChmaWxlKSkge1xuICAgICAgICBpZiAoIWZpbGUuaGFzT3duUHJvcGVydHkoJ2ZpbGVJRCcpIHx8ICFmaWxlLmhhc093blByb3BlcnR5KCdtYXhBZ2UnKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZ2V0VGVtcEZpbGVVUkxdIGZpbGUgaW5mbyBtdXN0IGluY2x1ZGUgZmlsZUlEIGFuZCBtYXhBZ2VgXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmlsZV9saXN0LnB1c2goe1xuICAgICAgICAgIGZpbGVpZDogKGZpbGUgYXMgSUNsb3VkYmFzZUZpbGVJbmZvKS5maWxlSUQsXG4gICAgICAgICAgbWF4X2FnZTogKGZpbGUgYXMgSUNsb3VkYmFzZUZpbGVJbmZvKS5tYXhBZ2VcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGZpbGUpKSB7XG4gICAgICAgIGZpbGVfbGlzdC5wdXNoKHtcbiAgICAgICAgICBmaWxlaWQ6IGZpbGVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZ2V0VGVtcEZpbGVVUkxdIGludmFsaWQgZmlsZUxpc3RgXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb24gPSAnc3RvcmFnZS5iYXRjaEdldERvd25sb2FkVXJsJztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3Quc2VuZChhY3Rpb24sIHsgZmlsZV9saXN0IH0pO1xuXG4gICAgaWYgKHJlcy5jb2RlKSB7XG4gICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLCBudWxsLCByZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIHtcbiAgICAgIGZpbGVMaXN0OiByZXMuZGF0YS5kb3dubG9hZF9saXN0LFxuICAgICAgcmVxdWVzdElkOiByZXMucmVxdWVzdElkXG4gICAgfSk7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBjdXN0b21JbmZvOiB7XG4gICAgICBjbGFzc05hbWU6ICdDbG91ZGJhc2UnLFxuICAgICAgbWV0aG9kTmFtZTogJ2Rvd25sb2FkRmlsZSdcbiAgICB9LFxuICAgIHRpdGxlOiAn5LiL6L295paH5Lu25aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGRvd25sb2FkRmlsZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZEZpbGUoXG4gICAgcGFyYW1zOiBJQ2xvdWRiYXNlRG93bmxvYWRGaWxlUGFyYW1zLFxuICAgIGNhbGxiYWNrPzogRnVuY3Rpb25cbiAgKTogUHJvbWlzZTxJQ2xvdWRiYXNlRG93bmxvYWRGaWxlUmVzdWx0PiB7XG4gICAgY29uc3QgeyBmaWxlSUQgfSA9IHBhcmFtcztcbiAgICBpZiAoIWlzU3RyaW5nKGZpbGVJRCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmdldFRlbXBGaWxlVVJMXSBmaWxlSUQgbXVzdCBiZSBzdHJpbmdgXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG1wVXJsUmVzID0gYXdhaXQgdGhpcy5nZXRUZW1wRmlsZVVSTC5jYWxsKHRoaXMsIHtcbiAgICAgIGZpbGVMaXN0OiBbe1xuICAgICAgICBmaWxlSUQsXG4gICAgICAgIG1heEFnZTogNjAwXG4gICAgICB9XVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzID0gdG1wVXJsUmVzLmZpbGVMaXN0WzBdO1xuXG4gICAgaWYgKHJlcy5jb2RlICE9PSAnU1VDQ0VTUycpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIHJlcyk7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0O1xuXG4gICAgY29uc3QgdG1wVXJsID0gZW5jb2RlVVJJKHJlcy5kb3dubG9hZF91cmwpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxdWVzdC5kb3dubG9hZCh7IHVybDogdG1wVXJsIH0pO1xuICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIHJlc3VsdCk7XG4gIH1cbn1cblxuY29uc3QgY2xvdWRiYXNlU3RvcmFnZSA9IG5ldyBDbG91ZGJhc2VTdG9yYWdlKCk7XG5jb25zdCBjb21wb25lbnQ6IElDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBlbnRpdHk6IHtcbiAgICB1cGxvYWRGaWxlOiBjbG91ZGJhc2VTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgZGVsZXRlRmlsZTogY2xvdWRiYXNlU3RvcmFnZS5kZWxldGVGaWxlLFxuICAgIGdldFRlbXBGaWxlVVJMOiBjbG91ZGJhc2VTdG9yYWdlLmdldFRlbXBGaWxlVVJMLFxuICAgIGRvd25sb2FkRmlsZTogY2xvdWRiYXNlU3RvcmFnZS5kb3dubG9hZEZpbGUsXG4gICAgZ2V0VXBsb2FkTWV0YWRhdGE6IGNsb3VkYmFzZVN0b3JhZ2UuZ2V0VXBsb2FkTWV0YWRhdGFcbiAgfVxufVxuXG50cnkge1xuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0gY2F0Y2ggKGUpIHsgfVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTdG9yYWdlKGFwcDogUGljazxJQ2xvdWRiYXNlLCAncmVnaXN0ZXJDb21wb25lbnQnPikge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59Il19