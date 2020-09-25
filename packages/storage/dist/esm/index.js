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
export function registerStorage(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFtQnpELElBQUEsVUFBVSxHQUFpQyxTQUFTLFdBQTFDLEVBQUUsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsa0JBQWtCLEdBQUssU0FBUyxtQkFBZCxDQUFlO0FBQ3JELElBQUEsT0FBTyxHQUEyQyxLQUFLLFFBQWhELEVBQUUsUUFBUSxHQUFpQyxLQUFLLFNBQXRDLEVBQUUsYUFBYSxHQUFrQixLQUFLLGNBQXZCLEVBQUMsWUFBWSxHQUFLLEtBQUssYUFBVixDQUFXO0FBQ3hELElBQUEsb0JBQW9CLEdBQUssT0FBTyxxQkFBWixDQUFhO0FBRXpDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUVqQztJQUFBO0lBNFFBLENBQUM7SUE3UGMscUNBQVUsR0FBdkIsVUFDRSxNQUFpQyxFQUNqQyxRQUFrQjs7Ozs7O3dCQUVWLFNBQVMsR0FBaUMsTUFBTSxVQUF2QyxFQUFFLFFBQVEsR0FBdUIsTUFBTSxTQUE3QixFQUFFLGdCQUFnQixHQUFLLE1BQU0saUJBQVgsQ0FBWTt3QkFDekQsSUFBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBRSxDQUFDLFFBQVEsRUFBQzs0QkFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWM7Z0NBQzNCLEdBQUcsRUFBRSxNQUFJLGNBQWMsZ0NBQTZCOzZCQUNyRCxDQUFDLENBQUMsQ0FBQzt5QkFDTDt3QkFDSyxNQUFNLEdBQUcsMkJBQTJCLENBQUM7d0JBRXJDLE9BQU8sR0FBRyxJQUFJLENBQUMs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QUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uc3RhbnRzLCB1dGlscywgaGVscGVycyB9IGZyb20gJ0BjbG91ZGJhc2UvdXRpbGl0aWVzJztcbmltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcbmltcG9ydCB7IElDbG91ZGJhc2VDb21wb25lbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBcbiAgSUNsb3VkYmFzZUZpbGVNZXRhRGF0YVJlcyxcbiAgSUNsb3VkYmFzZUZpbGVJbmZvLFxuICBJQ2xvdWRiYXNlVXBsb2FkRmlsZVBhcmFtcyxcbiAgSUNsb3VkYmFzZVVwbG9hZEZpbGVSZXN1bHQsXG4gIElDbG91ZGJhc2VHZXRVcGxvYWRNZXRhZGF0YVBhcmFtcyxcbiAgSUNsb3VkYmFzZURlbGV0ZUZpbGVQYXJhbXMsXG4gIElDbG91ZGJhc2VEZWxldGVGaWxlUmVzdWx0LFxuICBJQ2xvdWRiYXNlR2V0VGVtcEZpbGVVUkxSZXN1bHQsXG4gIElDbG91ZGJhc2VHZXRUZW1wRmlsZVVSTFBhcmFtcyxcbiAgSUNsb3VkYmFzZURvd25sb2FkRmlsZVJlc3VsdCxcbiAgSUNsb3VkYmFzZURvd25sb2FkRmlsZVBhcmFtc1xufSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3N0b3JhZ2UnO1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBnZXRTZGtOYW1lLCBFUlJPUlMsIENPTU1VTklUWV9TSVRFX1VSTCB9ID0gY29uc3RhbnRzO1xuY29uc3QgeyBpc0FycmF5LCBpc1N0cmluZywgaXNQYWxpbk9iamVjdCxleGVjQ2FsbGJhY2sgfSA9IHV0aWxzO1xuY29uc3QgeyBjYXRjaEVycm9yc0RlY29yYXRvciB9ID0gaGVscGVycztcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnc3RvcmFnZSc7XG5cbmNsYXNzIENsb3VkYmFzZVN0b3JhZ2V7XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICd1cGxvYWRGaWxlJ1xuICAgIH0sXG4gICAgdGl0bGU6ICfkuIrkvKDmlofku7blpLHotKUnLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICAn6K+356Gu6K6k5Lul5LiL5ZCE6aG577yaJyxcbiAgICAgICcgIDEgLSDosIPnlKggdXBsb2FkRmlsZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyB1cGxvYWRGaWxlIChcbiAgICBwYXJhbXM6SUNsb3VkYmFzZVVwbG9hZEZpbGVQYXJhbXMsXG4gICAgY2FsbGJhY2s/OkZ1bmN0aW9uXG4gICk6UHJvbWlzZTxJQ2xvdWRiYXNlVXBsb2FkRmlsZVJlc3VsdD4ge1xuICAgIGNvbnN0IHsgY2xvdWRQYXRoLCBmaWxlUGF0aCwgb25VcGxvYWRQcm9ncmVzcyB9ID0gcGFyYW1zO1xuICAgIGlmKCFpc1N0cmluZyhjbG91ZFBhdGgpfHwhZmlsZVBhdGgpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0udXBsb2FkRmlsZV0gaW52YWxpZCBwYXJhbXNgXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGNvbnN0IGFjdGlvbiA9ICdzdG9yYWdlLmdldFVwbG9hZE1ldGFkYXRhJztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcbiAgICBjb25zdCBtZXRhRGF0YTpJQ2xvdWRiYXNlRmlsZU1ldGFEYXRhUmVzID0gYXdhaXQgcmVxdWVzdC5zZW5kKGFjdGlvbiwge1xuICAgICAgcGF0aDogY2xvdWRQYXRoXG4gICAgfSk7XG4gIFxuICAgIGNvbnN0IHtcbiAgICAgIGRhdGE6IHsgdXJsLCBhdXRob3JpemF0aW9uLCB0b2tlbiwgZmlsZUlkLCBjb3NGaWxlSWQgfSxcbiAgICAgIHJlcXVlc3RJZFxuICAgIH0gPSBtZXRhRGF0YTtcbiAgICBcbiAgICAvLyDkvb/nlKjkuLTml7blr4bljJnkuIrkvKDmlofku7ZcbiAgICAvLyBAc2VlIGh0dHBzOi8vY2xvdWQudGVuY2VudC5jb20vZG9jdW1lbnQvcHJvZHVjdC80MzYvMTQwNDhcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAga2V5OiBjbG91ZFBhdGgsXG4gICAgICBzaWduYXR1cmU6IGF1dGhvcml6YXRpb24sXG4gICAgICAneC1jb3MtbWV0YS1maWxlaWQnOiBjb3NGaWxlSWQsXG4gICAgICAnc3VjY2Vzc19hY3Rpb25fc3RhdHVzJzogJzIwMScsXG4gICAgICAneC1jb3Mtc2VjdXJpdHktdG9rZW4nOiB0b2tlblxuICAgIH07XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdC51cGxvYWQoe1xuICAgICAgdXJsLFxuICAgICAgZGF0YSxcbiAgICAgIGZpbGU6IGZpbGVQYXRoLFxuICAgICAgbmFtZTogY2xvdWRQYXRoLFxuICAgICAgb25VcGxvYWRQcm9ncmVzc1xuICAgIH0pO1xuICBcbiAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMSkge1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxudWxsLHtcbiAgICAgICAgZmlsZUlEOiBmaWxlSWQsXG4gICAgICAgIHJlcXVlc3RJZFxuICAgICAgfSk7XG4gICAgfWVsc2V7XG4gICAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLG5ldyBFcnJvcihgWyR7Z2V0U2RrTmFtZSgpfV1bJHtFUlJPUlMuT1BFUkFUSU9OX0ZBSUx9XVske0NPTVBPTkVOVF9OQU1FfV06JHtyZXMuZGF0YX1gKSk7XG4gICAgfVxuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICdnZXRVcGxvYWRNZXRhZGF0YSdcbiAgICB9LFxuICAgIHRpdGxlOiAn6I635Y+W5LiK5Lyg5YWD5L+h5oGv5aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGdldFVwbG9hZE1ldGFkYXRhKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3ln5/lkI3mmK/lkKblnKjlronlhajln5/lkI3liJfooajkuK3vvJpodHRwczovL2NvbnNvbGUuY2xvdWQudGVuY2VudC5jb20vdGNiL2Vudi9zYWZldHknLFxuICAgICAgJyAgMyAtIOS6keWtmOWCqOWuieWFqOinhOWImeaYr+WQpumZkOWItuS6huW9k+WJjeeZu+W9leeKtuaAgeiuv+mXricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFVwbG9hZE1ldGFkYXRhIChcbiAgICBwYXJhbXM6SUNsb3VkYmFzZUdldFVwbG9hZE1ldGFkYXRhUGFyYW1zLFxuICAgIGNhbGxiYWNrPzogRnVuY3Rpb25cbiAgKTpQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgY2xvdWRQYXRoIH0gPSBwYXJhbXM7XG4gICAgaWYoIWlzU3RyaW5nKGNsb3VkUGF0aCkpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZ2V0VXBsb2FkTWV0YWRhdGFdIGludmFsaWQgY2xvdWRQYXRoYFxuICAgICAgfSkpO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcbiAgICBjb25zdCBhY3Rpb24gPSAnc3RvcmFnZS5nZXRVcGxvYWRNZXRhZGF0YSc7XG4gIFxuICAgIHRyeXtcbiAgICAgIGNvbnN0IG1ldGFEYXRhID0gYXdhaXQgcmVxdWVzdC5zZW5kKGFjdGlvbiwge1xuICAgICAgICBwYXRoOiBjbG91ZFBhdGhcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxudWxsLG1ldGFEYXRhKTtcbiAgICB9Y2F0Y2goZXJyKXtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssZXJyKTtcbiAgICB9XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBjdXN0b21JbmZvOiB7XG4gICAgICBjbGFzc05hbWU6ICdDbG91ZGJhc2UnLFxuICAgICAgbWV0aG9kTmFtZTogJ2RlbGV0ZUZpbGUnXG4gICAgfSxcbiAgICB0aXRsZTogJ+WIoOmZpOaWh+S7tuWksei0pScsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgICfor7fnoa7orqTku6XkuIvlkITpobnvvJonLFxuICAgICAgJyAgMSAtIOiwg+eUqCBkZWxldGVGaWxlKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3ln5/lkI3mmK/lkKblnKjlronlhajln5/lkI3liJfooajkuK3vvJpodHRwczovL2NvbnNvbGUuY2xvdWQudGVuY2VudC5jb20vdGNiL2Vudi9zYWZldHknLFxuICAgICAgJyAgMyAtIOS6keWtmOWCqOWuieWFqOinhOWImeaYr+WQpumZkOWItuS6huW9k+WJjeeZu+W9leeKtuaAgeiuv+mXricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGRlbGV0ZUZpbGUoXG4gICAgcGFyYW1zOklDbG91ZGJhc2VEZWxldGVGaWxlUGFyYW1zLFxuICAgIGNhbGxiYWNrPzogRnVuY3Rpb25cbiAgKTpQcm9taXNlPElDbG91ZGJhc2VEZWxldGVGaWxlUmVzdWx0PntcbiAgICBjb25zdCB7IGZpbGVMaXN0IH0gPSBwYXJhbXM7XG4gIFxuICAgIGlmICghZmlsZUxpc3QgfHwgIWlzQXJyYXkoZmlsZUxpc3QpIHx8IGZpbGVMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZGVsZXRlRmlsZV0gZmlsZUxpc3QgbXVzdCBub3QgYmUgZW1wdHlgXG4gICAgICB9KSk7XG4gICAgfVxuICBcbiAgICBmb3IgKGNvbnN0IGZpbGVJZCBvZiBmaWxlTGlzdCkge1xuICAgICAgaWYgKCFmaWxlSWQgfHwgIWlzU3RyaW5nKGZpbGVJZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmRlbGV0ZUZpbGVdIGZpbGVJRCBtdXN0IGJlIHN0cmluZ2BcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgY29uc3QgYWN0aW9uID0gJ3N0b3JhZ2UuYmF0Y2hEZWxldGVGaWxlJztcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0LnNlbmQoYWN0aW9uLCB7XG4gICAgICBmaWxlaWRfbGlzdDogZmlsZUxpc3RcbiAgICB9KTtcbiAgXG4gICAgaWYgKHJlcy5jb2RlKXtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCxyZXMpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgZmlsZUxpc3Q6IHJlcy5kYXRhLmRlbGV0ZV9saXN0LFxuICAgICAgcmVxdWVzdElkOiByZXMucmVxdWVzdElkXG4gICAgfTtcbiAgICByZXR1cm4gZXhlY0NhbGxiYWNrKGNhbGxiYWNrLG51bGwsZGF0YSk7O1xuICB9XG4gIEBjYXRjaEVycm9yc0RlY29yYXRvcih7XG4gICAgY3VzdG9tSW5mbzoge1xuICAgICAgY2xhc3NOYW1lOiAnQ2xvdWRiYXNlJyxcbiAgICAgIG1ldGhvZE5hbWU6ICdnZXRUZW1wRmlsZVVSTCdcbiAgICB9LFxuICAgIHRpdGxlOiAn6I635Y+W5paH5Lu25LiL6L296ZO+5o6lJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGdldFRlbXBGaWxlVVJMKCkg55qE6K+t5rOV5oiW5Y+C5pWw5piv5ZCm5q2j56GuJyxcbiAgICAgICcgIDIgLSDlvZPliY3ln5/lkI3mmK/lkKblnKjlronlhajln5/lkI3liJfooajkuK3vvJpodHRwczovL2NvbnNvbGUuY2xvdWQudGVuY2VudC5jb20vdGNiL2Vudi9zYWZldHknLFxuICAgICAgJyAgMyAtIOS6keWtmOWCqOWuieWFqOinhOWImeaYr+WQpumZkOWItuS6huW9k+WJjeeZu+W9leeKtuaAgeiuv+mXricsXG4gICAgICBg5aaC5p6c6Zeu6aKY5L6d54S25a2Y5Zyo77yM5bu66K6u5Yiw5a6Y5pa56Zeu562U56S+5Yy65o+Q6Zeu5oiW5a+75om+5biu5Yqp77yaJHtDT01NVU5JVFlfU0lURV9VUkx9YFxuICAgIF1cbiAgfSlcbiAgcHVibGljIGFzeW5jIGdldFRlbXBGaWxlVVJMKFxuICAgIHBhcmFtczpJQ2xvdWRiYXNlR2V0VGVtcEZpbGVVUkxQYXJhbXMsXG4gICAgY2FsbGJhY2s/OiBGdW5jdGlvblxuICApOlByb21pc2U8SUNsb3VkYmFzZUdldFRlbXBGaWxlVVJMUmVzdWx0PntcbiAgICBjb25zdCB7IGZpbGVMaXN0IH0gPSBwYXJhbXM7XG4gIFxuICAgIGlmICghZmlsZUxpc3QgfHwgIWlzQXJyYXkoZmlsZUxpc3QpIHx8IGZpbGVMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZ2V0VGVtcEZpbGVVUkxdIGZpbGVMaXN0IG11c3Qgbm90IGJlIGVtcHR5YFxuICAgICAgfSkpO1xuICAgIH1cbiAgXG4gICAgY29uc3QgZmlsZV9saXN0ID0gW107XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVMaXN0KSB7XG4gICAgICBpZiAoaXNQYWxpbk9iamVjdChmaWxlKSkge1xuICAgICAgICBpZiAoIWZpbGUuaGFzT3duUHJvcGVydHkoJ2ZpbGVJRCcpIHx8ICFmaWxlLmhhc093blByb3BlcnR5KCdtYXhBZ2UnKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBjb2RlOiBFUlJPUlMuSU5WQUxJRF9QQVJBTVMsXG4gICAgICAgICAgICBtc2c6IGBbJHtDT01QT05FTlRfTkFNRX0uZ2V0VGVtcEZpbGVVUkxdIGZpbGUgaW5mbyBtdXN0IGluY2x1ZGUgZmlsZUlEIGFuZCBtYXhBZ2VgXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gIFxuICAgICAgICBmaWxlX2xpc3QucHVzaCh7XG4gICAgICAgICAgZmlsZWlkOiAoZmlsZSBhcyBJQ2xvdWRiYXNlRmlsZUluZm8pLmZpbGVJRCxcbiAgICAgICAgICBtYXhfYWdlOiAoZmlsZSBhcyBJQ2xvdWRiYXNlRmlsZUluZm8pLm1heEFnZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoZmlsZSkpIHtcbiAgICAgICAgZmlsZV9saXN0LnB1c2goe1xuICAgICAgICAgIGZpbGVpZDogZmlsZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY29kZTogRVJST1JTLklOVkFMSURfUEFSQU1TLFxuICAgICAgICAgIG1zZzogYFske0NPTVBPTkVOVF9OQU1FfS5nZXRUZW1wRmlsZVVSTF0gaW52YWxpZCBmaWxlTGlzdGBcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgY29uc3QgYWN0aW9uID0gJ3N0b3JhZ2UuYmF0Y2hHZXREb3dubG9hZFVybCc7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gIFxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJlcXVlc3Quc2VuZChhY3Rpb24sIHsgZmlsZV9saXN0IH0pO1xuICBcbiAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgIHJldHVybiBleGVjQ2FsbGJhY2soY2FsbGJhY2ssbnVsbCxyZXMpO1xuICAgIH1cbiAgXG4gICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxudWxsLHtcbiAgICAgIGZpbGVMaXN0OiByZXMuZGF0YS5kb3dubG9hZF9saXN0LFxuICAgICAgcmVxdWVzdElkOiByZXMucmVxdWVzdElkXG4gICAgfSk7XG4gIH1cbiAgQGNhdGNoRXJyb3JzRGVjb3JhdG9yKHtcbiAgICBjdXN0b21JbmZvOiB7XG4gICAgICBjbGFzc05hbWU6ICdDbG91ZGJhc2UnLFxuICAgICAgbWV0aG9kTmFtZTogJ2Rvd25sb2FkRmlsZSdcbiAgICB9LFxuICAgIHRpdGxlOiAn5LiL6L295paH5Lu25aSx6LSlJyxcbiAgICBtZXNzYWdlczogW1xuICAgICAgJ+ivt+ehruiupOS7peS4i+WQhOmhue+8micsXG4gICAgICAnICAxIC0g6LCD55SoIGRvd25sb2FkRmlsZSgpIOeahOivreazleaIluWPguaVsOaYr+WQpuato+ehricsXG4gICAgICAnICAyIC0g5b2T5YmN5Z+f5ZCN5piv5ZCm5Zyo5a6J5YWo5Z+f5ZCN5YiX6KGo5Lit77yaaHR0cHM6Ly9jb25zb2xlLmNsb3VkLnRlbmNlbnQuY29tL3RjYi9lbnYvc2FmZXR5JyxcbiAgICAgICcgIDMgLSDkupHlrZjlgqjlronlhajop4TliJnmmK/lkKbpmZDliLbkuoblvZPliY3nmbvlvZXnirbmgIHorr/pl64nLFxuICAgICAgYOWmguaenOmXrumimOS+neeEtuWtmOWcqO+8jOW7uuiuruWIsOWumOaWuemXruetlOekvuWMuuaPkOmXruaIluWvu+aJvuW4ruWKqe+8miR7Q09NTVVOSVRZX1NJVEVfVVJMfWBcbiAgICBdXG4gIH0pXG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZEZpbGUoXG4gICAgcGFyYW1zOklDbG91ZGJhc2VEb3dubG9hZEZpbGVQYXJhbXMsXG4gICAgY2FsbGJhY2s/OkZ1bmN0aW9uXG4gICk6UHJvbWlzZTxJQ2xvdWRiYXNlRG93bmxvYWRGaWxlUmVzdWx0PntcbiAgICBjb25zdCB7IGZpbGVJRCB9ID0gcGFyYW1zO1xuICAgIGlmKCFpc1N0cmluZyhmaWxlSUQpKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvZGU6IEVSUk9SUy5JTlZBTElEX1BBUkFNUyxcbiAgICAgICAgbXNnOiBgWyR7Q09NUE9ORU5UX05BTUV9LmdldFRlbXBGaWxlVVJMXSBmaWxlSUQgbXVzdCBiZSBzdHJpbmdgXG4gICAgICB9KSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHRtcFVybFJlcyA9IGF3YWl0IHRoaXMuZ2V0VGVtcEZpbGVVUkwuY2FsbCh0aGlzLCB7XG4gICAgICBmaWxlTGlzdDogW3tcbiAgICAgICAgZmlsZUlELFxuICAgICAgICBtYXhBZ2U6IDYwMFxuICAgICAgfV1cbiAgICB9KTtcbiAgXG4gICAgY29uc3QgcmVzID0gdG1wVXJsUmVzLmZpbGVMaXN0WzBdO1xuICBcbiAgICBpZiAocmVzLmNvZGUgIT09ICdTVUNDRVNTJykge1xuICAgICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxyZXMpO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcbiAgXG4gICAgY29uc3QgdG1wVXJsID0gZW5jb2RlVVJJKHJlcy5kb3dubG9hZF91cmwpO1xuICBcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0LmRvd25sb2FkKHsgdXJsOiB0bXBVcmwgfSk7XG4gICAgcmV0dXJuIGV4ZWNDYWxsYmFjayhjYWxsYmFjayxudWxsLHJlc3VsdCk7XG4gIH1cbn1cblxuY29uc3QgY2xvdWRiYXNlU3RvcmFnZSA9IG5ldyBDbG91ZGJhc2VTdG9yYWdlKCk7XG5jb25zdCBjb21wb25lbnQ6SUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIHVwbG9hZEZpbGU6IGNsb3VkYmFzZVN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICBkZWxldGVGaWxlOiBjbG91ZGJhc2VTdG9yYWdlLmRlbGV0ZUZpbGUsXG4gICAgZ2V0VGVtcEZpbGVVUkw6IGNsb3VkYmFzZVN0b3JhZ2UuZ2V0VGVtcEZpbGVVUkwsXG4gICAgZG93bmxvYWRGaWxlOiBjbG91ZGJhc2VTdG9yYWdlLmRvd25sb2FkRmlsZSxcbiAgICBnZXRVcGxvYWRNZXRhZGF0YTogY2xvdWRiYXNlU3RvcmFnZS5nZXRVcGxvYWRNZXRhZGF0YVxuICB9XG59XG5cbnRyeXtcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59Y2F0Y2goZSl7fVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTdG9yYWdlKGFwcDpQaWNrPElDbG91ZGJhc2UsICdyZWdpc3RlckNvbXBvbmVudCc+KXtcbiAgdHJ5e1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9Y2F0Y2goZSl7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59Il19