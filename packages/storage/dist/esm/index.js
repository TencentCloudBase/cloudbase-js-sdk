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
import { constants, utils, helpers } from '@cloudbase/utilities';
var getSdkName = constants.getSdkName, ERRORS = constants.ERRORS, COMMUNITY_SITE_URL = constants.COMMUNITY_SITE_URL;
var isArray = utils.isArray, isString = utils.isString, isPalinObject = utils.isPalinObject, execCallback = utils.execCallback;
var catchErrorsDecorator = helpers.catchErrorsDecorator;
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
export function registerStorage(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFtQnpELElBQUEsVUFBVSxHQUFpQyxTQUFTLFdBQTFDLEVBQUUsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3JELElBQUEsT0FBTyxHQUE0QyxLQUFLLFFBQWpELEVBQUUsUUFBUSxHQUFrQyxLQUFLLFNBQXZDLEVBQUUsYUFBYSxHQUFtQixLQUFLLGNBQXhCLEVBQUUsWUFBWSxHQUFLLEtBQUssYUFBVixDQUFXO0FBQ3pELElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUVqQztJQUFBO0lBOFFBLENBQUM7SUEvUGMscUNBQVUsR0FBdkIsVUFDRSxNQUFrQyxFQUNsQyxRQUFtQjs7Ozs7O3dCQUVYLFNBQVMsR0FBaUMsTUFBTSxVQUF2QyxFQUFFLFFBQVEsR0FBdUIsTUFBTSxTQUE3QixFQUFFLGdCQUFnQixHQUFLLE1BQU0saUJBQVgsQ0FBWTt3QkFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0NBQzNCLEdBQUcsRUFBRSxNQUFJLGNBQWMsZ0NBQTZCOzZCQUNyRCxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFDSyxNQUFNLEdBQUcsMkJBQTJCLENBQUM7d0JBRXJDLE9BQU8sR0FBRyxJQUFJLENBQUMs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Q0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25zdGFudHMsIHV0aWxzLCBoZWxwZXJzIH0gZnJvbSAnQGNsb3VkYmFzZS91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcbmltcG9ydCB7XG4gIElDbG91ZGJhc2VGaWxlTWV0YURhdGFSZXMsXG4gIElDbG91ZGJhc2VGaWxlSW5mbyxcbiAgSUNsb3VkYmFzZVVwbG9hZEZpbGVQYXJhbXMsXG4gIElDbG91ZGJhc2VVcGxvYWRGaWxlUmVzdWx0LFxuICBJQ2xvdWRiYXNlR2V0VXBsb2FkTWV0YWRhdGFQYXJhbXMsXG4gIElDbG91ZGJhc2VEZWxldGVGaWxlUGFyYW1zLFxuICBJQ2xvdWRiYXNlRGVsZXRlRmlsZVJlc3VsdCxcbiAgSUNsb3VkYmFzZUdldFRlbXBGaWxlVVJMUmVzdWx0LFxuICBJQ2xvdWRiYXNlR2V0VGVtcEZpbGVVUkxQYXJhbXMsXG4gIElDbG91ZGJhc2VEb3dubG9hZEZpbGVSZXN1bHQsXG4gIElDbG91ZGJhc2VEb3dubG9hZEZpbGVQYXJhbXNcbn0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9zdG9yYWdlJztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IHsgZ2V0U2RrTmFtZSwgRVJST1JTLCBDT01NVU5JVFlfU0lURV9VUkwgfSA9IGNvbnN0YW50cztcbmNvbnN0IHsgaXNBcnJheSwgaXNTdHJpbmcsIGlzUGFsaW5PYmplY3QsIGV4ZWNDYWxsYmFjayB9ID0gdXRpbHM7XG5jb25zdCB7IGNhdGNoRXJyb3JzRGVjb3JhdG9yIH0gPSBoZWxwZXJzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdzdG9yYWdlJztcblxuY2xhc3MgQ2xvdWRiYXNlU3RvcmFnZSB7XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICd1cGxvYWRGaWxlJ1xuICAgIH0sXG4gICAgdGl0bGU6ICfkuIrkvKDmlofku7blpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggdXBsb2FkRmlsZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGxvYWRGaWxlKFxuICAgIHBhcmFtczogSUNsb3VkYmFzZVVwbG9hZEZpbGVQYXJhbXMsXG4gICAgY2FsbGJhY2s/OiBGdW5jdGlvblxuICApOiBQcm9taXNlPElDbG91ZGJhc2VVcGxvYWRGaWxlUmVzdWx0PiB7XG4gICAgY29uc3QgeyBjbG91ZFBhdGgsIGZpbGVQYXRoLCBvblVwbG9hZFByb2dyZXNzIH0gPSBwYXJhbXM7XG4gICAgaWYgKCFpc1N0cmluZyhjbG91ZFBhdGgpIHx8ICFmaWxlUGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0udXBsb2FkRmlsZV0gaW52YWxpZCBwYXJhbXNgXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IGFjdGlvbiA9ICdzdG9yYWdlLmdldFVwbG9hZE1ldGFkYXRhJztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcbiAgICBjb25zdCBtZXRhRGF0YTogSUNsb3VkYmFzZUZpbGVNZXRhRGF0YVJlcyA9IGF3YWl0IHJlcXVlc3Quc2VuZChhY3Rpb24sIHtcbiAgICAgIHBhdGg6IGNsb3VkUGF0aFxuICAgIH0pO1xuXG4gICAgY29uc3Qge1xuICAgICAgZGF0YTogeyB1cmwsIGF1dGhvcml6YXRpb24sIHRva2VuLCBmaWxlSWQsIGNvc0ZpbGVJZCwgZG93bmxvYWRfdXJsIH0sXG4gICAgICByZXF1ZXN0SWRcbiAgICB9ID0gbWV0YURhdGE7XG5cblxuICAgIC8vIOS9v+eUqOS4tOaXtuWvhuWMmeS4iuS8oOaWh+S7tlxuICAgIC8vIEBzZWUgaHR0cHM6Ly9jbG91ZC50ZW5jZW50LmNvbS9kb2N1bWVudC9wcm9kdWN0LzQzNi8xNDA0OFxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBrZXk6IGNsb3VkUGF0aCxcbiAgICAgIHNpZ25hdHVyZTogYXV0aG9yaXphdGlvbixcbiAgICAgICd4LWNvcy1tZXRhLWZpbGVpZCc6IGNvc0ZpbGVJZCxcbiAgICAgICdzdWNjZXNzX2FjdGlvbl9zdGF0dXMnOiAnMjAxJyxcbiAgICAgICd4LWNvcy1zZWN1cml0eS10b2tlbic6IHRva2VuXG4gICAgfTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0LnVwbG9hZCh7XG4gICAgICB1cmwsXG4gICAgICBkYXRhLFxuICAgICAgZmlsZTogZmlsZVBhdGgsXG4gICAgICBuYW1lOiBjbG91ZFBhdGgsXG4gICAgICBvblVwbG9hZFByb2dyZXNzXG4gICAgfSk7XG5cbiAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMSkge1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbnVsbCwge1xuICAgICAgICBmaWxlSUQ6IGZpbGVJZCxcbiAgICAgICAgZG93bmxvYWRfdXJsLFxuICAgICAgICByZXF1ZXN0SWRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLCBuZXcgRXJyb3IoYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLk9QRVJBVElPTl9GQUlMfV1bJHtDT01QT05FTlRfTkFNRX1dOiR7cmVzLmRhdGF9YCkpO1xuICAgIH1cbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAnZ2V0VXBsb2FkTWV0YWRhdGEnXG4gICAgfSxcbiAgICB0aXRsZTogJ+iOt+WPluS4iuS8oOWFg+S/oeaBr+Wksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBnZXRVcGxvYWRNZXRhZGF0YSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBnZXRVcGxvYWRNZXRhZGF0YShcbiAgICBwYXJhbXM6IElDbG91ZGJhc2VHZXRVcGxvYWRNZXRhZGF0YVBhcmFtcyxcbiAgICBjYWxsYmFjaz86IEZ1bmN0aW9uXG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgeyBjbG91ZFBhdGggfSA9IHBhcmFtcztcbiAgICBpZiAoIWlzU3RyaW5nKGNsb3VkUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmdldFVwbG9hZE1ldGFkYXRhXSBpbnZhbGlkIGNsb3VkUGF0aGBcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gICAgY29uc3QgYWN0aW9uID0gJ3N0b3JhZ2UuZ2V0VXBsb2FkTWV0YWRhdGEnO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1ldGFEYXRhID0gYXdhaXQgcmVxdWVzdC5zZW5kKGFjdGlvbiwge1xuICAgICAgICBwYXRoOiBjbG91ZFBhdGhcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbnVsbCwgbWV0YURhdGEpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgZXJyKTtcbiAgICB9XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBjdXN0b21JbmZvOiB7XG4gICAgICBjbGFzc05hbWU6ICdDbG91ZGJhc2UnLFxuICAgICAgbWV0aG9kTmFtZTogJ2RlbGV0ZUZpbGUnXG4gICAgfSxcbiAgICB0aXRsZTogJ+WIoOmZpOaWh+S7tuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBkZWxldGVGaWxlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3ln5/lkI3mmK/lkKblnKjlronlhajln5/lkI3liJfooajkuK3vvJpodHRwczovL2NvbnNvbGUuY2xvdWQudGVuY2VudC5jb20vdGNiL2Vudi9zYWZldHknLFxuICAgICAgJyAgMyAtIOS6keWtmOWCqOWuieWFqOinhOWImeaYr+WQpumZkOWItuS6huW9k+WJjeeZu+W9leeKtuaAgeiuv+mXricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGRlbGV0ZUZpbGUoXG4gICAgcGFyYW1zOiBJQ2xvdWRiYXNlRGVsZXRlRmlsZVBhcmFtcyxcbiAgICBjYWxsYmFjaz86IEZ1bmN0aW9uXG4gICk6IFByb21pc2U8SUNsb3VkYmFzZURlbGV0ZUZpbGVSZXN1bHQ+IHtcbiAgICBjb25zdCB7IGZpbGVMaXN0IH0gPSBwYXJhbXM7XG5cbiAgICBpZiAoIWZpbGVMaXN0IHx8ICFpc0FycmF5KGZpbGVMaXN0KSB8fCBmaWxlTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmRlbGV0ZUZpbGVdIGZpbGVMaXN0IG11c3Qgbm90IGJlIGVtcHR5YFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgZmlsZUlkIG9mIGZpbGVMaXN0KSB7XG4gICAgICBpZiAoIWZpbGVJZCB8fCAhaXNTdHJpbmcoZmlsZUlkKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZGVsZXRlRmlsZV0gZmlsZUlEIG11c3QgYmUgc3RyaW5nYFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9uID0gJ3N0b3JhZ2UuYmF0Y2hEZWxldGVGaWxlJztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0LnNlbmQoYWN0aW9uLCB7XG4gICAgICBmaWxlaWRfbGlzdDogZmlsZUxpc3RcbiAgICB9KTtcblxuICAgIGlmIChyZXMuY29kZSkge1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbnVsbCwgcmVzKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGZpbGVMaXN0OiByZXMuZGF0YS5kZWxldGVfbGlzdCxcbiAgICAgIHJlcXVlc3RJZDogcmVzLnJlcXVlc3RJZFxuICAgIH07XG4gICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbnVsbCwgZGF0YSk7O1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICdnZXRUZW1wRmlsZVVSTCdcbiAgICB9LFxuICAgIHRpdGxlOiAn6I635Y+W5paH5Lu25LiL6L296ZO+5o6lJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGdldFRlbXBGaWxlVVJMKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3ln5/lkI3mmK/lkKblnKjlronlhajln5/lkI3liJfooajkuK3vvJpodHRwczovL2NvbnNvbGUuY2xvdWQudGVuY2VudC5jb20vdGNiL2Vudi9zYWZldHknLFxuICAgICAgJyAgMyAtIOS6keWtmOWCqOWuieWFqOinhOWImeaYr+WQpumZkOWItuS6huW9k+WJjeeZu+W9leeKtuaAgeiuv+mXricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFRlbXBGaWxlVVJMKFxuICAgIHBhcmFtczogSUNsb3VkYmFzZUdldFRlbXBGaWxlVVJMUGFyYW1zLFxuICAgIGNhbGxiYWNrPzogRnVuY3Rpb25cbiAgKTogUHJvbWlzZTxJQ2xvdWRiYXNlR2V0VGVtcEZpbGVVUkxSZXN1bHQ+IHtcbiAgICBjb25zdCB7IGZpbGVMaXN0IH0gPSBwYXJhbXM7XG5cbiAgICBpZiAoIWZpbGVMaXN0IHx8ICFpc0FycmF5KGZpbGVMaXN0KSB8fCBmaWxlTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmdldFRlbXBGaWxlVVJMXSBmaWxlTGlzdCBtdXN0IG5vdCBiZSBlbXB0eWBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlX2xpc3QgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZUxpc3QpIHtcbiAgICAgIGlmIChpc1BhbGluT2JqZWN0KGZpbGUpKSB7XG4gICAgICAgIGlmICghZmlsZS5oYXNPd25Qcm9wZXJ0eSgnZmlsZUlEJykgfHwgIWZpbGUuaGFzT3duUHJvcGVydHkoJ21heEFnZScpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5nZXRUZW1wRmlsZVVSTF0gZmlsZSBpbmZvIG11c3QgaW5jbHVkZSBmaWxlSUQgYW5kIG1heEFnZWBcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBmaWxlX2xpc3QucHVzaCh7XG4gICAgICAgICAgZmlsZWlkOiAoZmlsZSBhcyBJQ2xvdWRiYXNlRmlsZUluZm8pLmZpbGVJRCxcbiAgICAgICAgICBtYXhfYWdlOiAoZmlsZSBhcyBJQ2xvdWRiYXNlRmlsZUluZm8pLm1heEFnZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZmlsZSkpIHtcbiAgICAgICAgZmlsZV9saXN0LnB1c2goe1xuICAgICAgICAgIGZpbGVpZDogZmlsZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5nZXRUZW1wRmlsZVVSTF0gaW52YWxpZCBmaWxlTGlzdGBcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFjdGlvbiA9ICdzdG9yYWdlLmJhdGNoR2V0RG93bmxvYWRVcmwnO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0O1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdC5zZW5kKGFjdGlvbiwgeyBmaWxlX2xpc3QgfSk7XG5cbiAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssIG51bGwsIHJlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbnVsbCwge1xuICAgICAgZmlsZUxpc3Q6IHJlcy5kYXRhLmRvd25sb2FkX2xpc3QsXG4gICAgICByZXF1ZXN0SWQ6IHJlcy5yZXF1ZXN0SWRcbiAgICB9KTtcbiAgfVxuICBAY2F0Y2hFcnJvcnNEZWNvcmF0b3Ioe1xuICAgIGN1c3RvbUluZm86IHtcbiAgICAgIGNsYXNzTmFtZTogJ0Nsb3VkYmFzZScsXG4gICAgICBtZXRob2ROYW1lOiAnZG93bmxvYWRGaWxlJ1xuICAgIH0sXG4gICAgdGl0bGU6ICfkuIvovb3mlofku7blpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggZG93bmxvYWRGaWxlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3ln5/lkI3mmK/lkKblnKjlronlhajln5/lkI3liJfooajkuK3vvJpodHRwczovL2NvbnNvbGUuY2xvdWQudGVuY2VudC5jb20vdGNiL2Vudi9zYWZldHknLFxuICAgICAgJyAgMyAtIOS6keWtmOWCqOWuieWFqOinhOWImeaYr+WQpumZkOWItuS6huW9k+WJjeeZu+W9leeKtuaAgeiuv+mXricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGRvd25sb2FkRmlsZShcbiAgICBwYXJhbXM6IElDbG91ZGJhc2VEb3dubG9hZEZpbGVQYXJhbXMsXG4gICAgY2FsbGJhY2s/OiBGdW5jdGlvblxuICApOiBQcm9taXNlPElDbG91ZGJhc2VEb3dubG9hZEZpbGVSZXN1bHQ+IHtcbiAgICBjb25zdCB7IGZpbGVJRCB9ID0gcGFyYW1zO1xuICAgIGlmICghaXNTdHJpbmcoZmlsZUlEKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZ2V0VGVtcEZpbGVVUkxdIGZpbGVJRCBtdXN0IGJlIHN0cmluZ2BcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCB0bXBVcmxSZXMgPSBhd2FpdCB0aGlzLmdldFRlbXBGaWxlVVJMLmNhbGwodGhpcywge1xuICAgICAgZmlsZUxpc3Q6IFt7XG4gICAgICAgIGZpbGVJRCxcbiAgICAgICAgbWF4QWdlOiA2MDBcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXMgPSB0bXBVcmxSZXMuZmlsZUxpc3RbMF07XG5cbiAgICBpZiAocmVzLmNvZGUgIT09ICdTVUNDRVNTJykge1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgcmVzKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG5cbiAgICBjb25zdCB0bXBVcmwgPSBlbmNvZGVVUkkocmVzLmRvd25sb2FkX3VybCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0LmRvd25sb2FkKHsgdXJsOiB0bXBVcmwgfSk7XG4gICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjaywgbnVsbCwgcmVzdWx0KTtcbiAgfVxufVxuXG5jb25zdCBjbG91ZGJhc2VTdG9yYWdlID0gbmV3IENsb3VkYmFzZVN0b3JhZ2UoKTtcbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIHVwbG9hZEZpbGU6IGNsb3VkYmFzZVN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICBkZWxldGVGaWxlOiBjbG91ZGJhc2VTdG9yYWdlLmRlbGV0ZUZpbGUsXG4gICAgZ2V0VGVtcEZpbGVVUkw6IGNsb3VkYmFzZVN0b3JhZ2UuZ2V0VGVtcEZpbGVVUkwsXG4gICAgZG93bmxvYWRGaWxlOiBjbG91ZGJhc2VTdG9yYWdlLmRvd25sb2FkRmlsZSxcbiAgICBnZXRVcGxvYWRNZXRhZGF0YTogY2xvdWRiYXNlU3RvcmFnZS5nZXRVcGxvYWRNZXRhZGF0YVxuICB9XG59XG5cbnRyeSB7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaCAoZSkgeyB9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclN0b3JhZ2UoYXBwOiBQaWNrPElDbG91ZGJhc2UsICdyZWdpc3RlckNvbXBvbmVudCc+KSB7XG4gIHRyeSB7XG4gICAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oZSk7XG4gIH1cbn0iXX0=