type KV<T> = {
  [key: string]: T;
};

type ExcludeOf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * module
 */
declare namespace cloudbase {
  interface ICloudbaseAppSecret {
    appAccessKeyId: string;
    appAccessKey: string;
  }

  interface ICloudbaseConfig {
    env: string;
    timeout?: number;
    persistence?: cloudbase.auth.Persistence;
    appSecret?: ICloudbaseAppSecret;
    appSign?: string;
    debug?:boolean;
  }
  /**
   * 初始化Cloudbase
   * 
   * @example
   * ```javascript
   * const app = cloudbase.init({
   *   env: 'your-envid',                     
   *   timeout: 15000,                        
   *   appSign: 'your-appSign',               
   *   appSecret: {
   *     appAccessKeyId: 'your-appAccessKeyId'
   *     appAccessKey: 'your-appAccessKey'    
   *   }
   * });
   * ```
   * 
   * @param config 初始化配置
   * @param config.env 环境ID
   * @param config.timeout 【可选】网络请求超时上限，单位`ms`，默认值`15000`
   * @param config.appSign 【可选】安全应用标识，在非浏览器环境下必须配置，文档{@link https://docs.cloudbase.net/api-reference/webv2/adapter.html#jie-ru-liu-cheng}
   * @param config.appSecret 【可选】安全应用凭证，在非浏览器环境下必须配置，文档{@link https://docs.cloudbase.net/api-reference/webv2/adapter.html#jie-ru-liu-cheng}
   * 
   * @return {!cloudbase.app.App} 初始化成功的Cloudbase实例
   */
  function init(config: ICloudbaseConfig):cloudbase.app.App;
  /**
   * 使用适配器，使用方式参考 {@link https://docs.cloudbase.net/api-reference/webv2/adapter.html#di-1-bu-an-zhuang-bing-yin-ru-gua-pei-qi}
   * 
   * @example
   * ```javascript
   * cloudbase.useAdapters(adapter); // 使用单个适配器
   * cloudbase.useAdapters([         // 使用多个适配器
   *   adapterA,
   *   adapterB
   * ]); 
   * ```
   * 
   * @param adapters 适配器对象，入参可以为单个适配器对象，也可以是多个适配器对象的数组
   */
  function useAdapters(adapters: CloudbaseAdapter|CloudbaseAdapter[]):void;
  /**
   * 注册扩展能力插件，使用方式参考 {@link https://docs.cloudbase.net/extension/abilities/image-examination.html#shi-yong-kuo-zhan}
   * 
   * @example
   * ```javascript
   * cloudbase.registerExtension(ext);
   * ```
   * 
   * @param ext 扩展能力插件对象
   */
  function registerExtension(ext:ICloudbaseExtension):void;
  /**
   * 【谨慎操作】注册SDK的版本
   * 
   * @example
   * ```javascript
   * cloudbase.registerVersion('1.2.1');
   * ```
   * 
   * @param version SDK版本
   */
  function registerVersion(version:string):void;
  /**
   * 【谨慎操作】注册SDK的名称
   * 
   * @example
   * ```javascript
   * cloudbase.registerSdkName('cloudbase-js-sdk');
   * ```
   * 
   * @param name SDK名称
   */
  function registerSdkName(name:string):void;
  /**
   * 【谨慎操作】修改SDK请求的云开发服务地址
   * 
   * @example
   * ```javascript
   * cloudbase.registerEndPoint('url','https');
   * ```
   * 
   * @param url 服务地址
   * @param protocol 【可选】强制使用某种协议，默认与主站协议一致
   */
  function registerEndPoint(url:string,protocol?:'http'|'https'):void;
}
/**
 * instance
 */
declare namespace cloudbase.app {
  interface App{
    /**
     * 创建Auth对象
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#app-auth}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * const auth = app.auth({
     *   persistence: 'local'
     * });
     * ```
     * 
     * @param options Auth初始化配置
     * @param options.persistence 本地登录态保留期限
     * 
     * @return {!cloudbase.auth.App} Auth实例
     */
    auth(options: {
      persistence: cloudbase.auth.Persistence
    }): cloudbase.auth.App;
    /**
     * 调用云函数
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/functions.html#callfunction}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.callFunction({
     *   name: 'function-name' 
     *   data: {  
     *     a: 1,
     *     b: 2
     *   }
     * }).then(res=>{
     *   console.log(res.result); 
     * }});
     * ```
     * 
     * @param options 被调用的云函数信息
     * @param options.name 云函数的名称 
     * @param options.data 【可选】云函数的参数，默认为空
     * @param options.parse 【可选】设置为 `true` 时，当函数返回值为对象时，API 请求会返回解析对象，而不是 JSON 字符串，默认为`false`
     * 
     * @return Promise-函数执行结果
     */
    callFunction(options: cloudbase.functions.ICallFunctionOptions):Promise<ICallFunctionResponse>;
    /**
     * 云存储-上传文件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/storage.html#uploadfile}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.uploadFile({
     *   cloudPath: 'cloudPath', 
     *   filePath: 'filePath',   
     *   onUploadProgress: function(event){} 
     * });
     * ```
     * 
     * @param params
     * @param params.cloudPath 文件上传到云端后的绝对路径，包含文件名
     * @param params.filePath 被上传的文件对象
     * @param params.onUploadProgress 【可选】上传进度回调函数
     * 
     * @return Promise-上传结果
     */
    uploadFile(params:ICloudbaseUploadFileParams):Promise<ICloudbaseUploadFileResult>;
    /**
     * 云存储-下载文件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/storage.html#downloadfile}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.downloadFile({
     *   fileID: 'cloudPath'
     * });
     * ```
     * 
     * @param params 
     * @param params.fileID 要下载的文件的 `id`，在控制台云存储中查看
     * 
     * @return Promise-下载结果
     */
    downloadFile(params:ICloudbaseDownloadFileParams):Promise<ICloudbaseDownloadFileResult>;
    /**
     * 云存储-获取文件的下载链接
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/storage.html#gettempfileurl}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.getTempFileURL({
     *   fileList: [
     *     '文件A的fileID',
     *     {
     *       fileID: '文件B的fileID',
     *       maxAge: 600 // 文件B的链接有效期，单位`ms`
     *     }
     *   ]
     * });
     * ```
     * 
     * @param params 
     * @param params.fileList 要下载的文件数组，数组元素可以是`string`或`Object`，如果是`string`代表文件ID，如果是`Object`可配置以下信息
     * @param params.fileList[].fileID 要下载的文件ID
     * @param params.fileList[].maxAge 下载链接的有效期，单位`ms`
     * 
     * @return Promise-文件下载链接
     */
    getTempFileURL(params:ICloudbaseGetTempFileURLParams):Promise<ICloudbaseGetTempFileURLResult>;
    /**
     * 云存储-删除文件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/storage.html#deletefile}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.deleteFile({
     *   fileList: [
     *     '文件A的fileID',
     *     '文件B的fileID'
     *   ]
     * });
     * ```
     * 
     * @param params 
     * @param params.fileList 要删除的文件ID数组
     * 
     * @return Promise-删除结果
     */
    deleteFile(params:ICloudbaseDeleteFileParams):Promise<ICloudbaseDeleteFileResult>;
    /**
     * 获取数据库实例
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#huo-qu-shu-ju-ku-shi-li}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * const db = app.database();
     * ```
     * 
     * @return 数据库实例
     */
    database(): cloudbase.database.App;
    /**
     * 调用扩展能力插件功能，使用方式参考 {@link https://docs.cloudbase.net/extension/abilities/image-examination.html#shi-yong-kuo-zhan}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * // 调用前需要先注册
     * app.registerExtension(ext);
     * 
     * app.invokeExtension('扩展能力插件名称'，{
     *   // ...扩展能力插件的入参
     * });
     * ```
     * 
     * @param name 扩展能力插件的名称
     * @param opts 【可选】扩展能力插件的参数，根据插件具体需求而定
     * 
     * @return Promise-扩展能力插件执行结果
     */
    invokeExtension(name:string,opts:any):Promise<any>;
  }
}
/**
 * auth
 */
declare namespace cloudbase.auth{
  type Persistence = 'local' | 'session' | 'none';

  interface IAccessTokenInfo {
    accessToken: string;
    env: string;
  }

  interface ILoginState {
    /**
     * 当前登录用户的信息
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#loginstate-user}
     */
    user: IUser;
    /**
     * 当前是否为匿名登录
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#loginstate-isanonymousauth}
     */
    isAnonymousAuth: boolean;
    /**
     * 当前是否为自定义登录
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#loginstate-iscustomauth}
     */
    isCustomAuth: boolean;
    /**
     * 当前是否为微信登录
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#loginstate-isweixinauth}
     */
    isWeixinAuth: boolean;
    /**
     * 当前是否为用户名密码登录
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#loginstate-isusernameauth}
     */
    isUsernameAuth: boolean;
    /**
     * 当前的登录类型
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#loginstate-logintype}
     */
    loginType: string;
  }

  interface IWeixinAuthProvider {
    /**
     * 跳转到微信登录页面
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#weixinauthprovider-signinwithredirect}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().weixinAuthProvider({
     *   appid: "...",
     *   scope: "snsapi_base"
     * }).signInWithRedirect();
     * ```
     * 
     */
    signInWithRedirect():void;
    /**
     * 微信登录页面重定向回来后，使用重定向的返回值登录，并获取登录态
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#weixinauthprovider-getredirectresult}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app
     *   .auth()
     *   .weixinAuthProvider({
     *     appid: "...",
     *     scope: "snsapi_base"
     *   })
     *   .getRedirectResult()
     *   .then(loginState=>{
     *     // ...
     *   });
     * ```
     *
     * @param options
     * @param options.createUser 【可选】当微信 openid 没有对应的云开发用户时，是否自动创建一个新的云开发用户，默认`true`
     * @param options.syncUserInfo 【可选】同步微信账号信息作为云开发用户信息，默认`false`
     * 
     * @return Promise-登录态信息
     */
    getRedirectResult(options?:{ 
      createUser?: boolean; 
      syncUserInfo?: boolean 
    }):Promise<ILoginState>;
    /**
     * 获取微信重定向绑定结果
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#weixinauthprovider-getlinkredirectresult}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * // 用户以任意一种登录方式（除微信登录）登录云开发之后
     * const provider = auth.weixinAuthProvider({
     *   appid: "....",
     *   scope: "snsapi_base"
     * });
     * // 重定向到提供方的页面进行登录
     * auth.currentUser.linkWithRedirect(provider);
     * // 用户在微信的页面登录之后，会被重定向回您的页面。然后，可以在页面加载时通过调用 Provider.getLinkRedirectResult() 来获取关联结果：
     * provider
     *   .getLinkRedirectResult()
     *   .then((result) => {
     *     // 关联成功
     *   });
     * ```
     *
     * @param options
     * @param options.withUnionId 【可选】如果为 `true`，且存在微信 UnionID，则会一同绑定微信 UnionID
     * 
     * @return Promise-登录态信息
     */
    getLinkRedirectResult(options?:{
      withUnionId?: boolean
    }): Promise<void>;
  }

  interface ICustomAuthProvider {
    /**
     * 使用自定义登录凭据 `ticket` 登录云开发
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#customauthprovider-signin}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth()
     * // 获取自定义登录 ticket
     * // 将 your-api 替换成获取 ticket 的 URL
     * const ticket = await fetch("your-api");
     * auth
     *   .customAuthProvider()
     *   .signIn(ticket)
     *   .then(loginState=>{
     *     // ...
     *   });
     * ```
     *
     * @param ticket 自定义登录凭据
     * 
     * @return Promise-登录态信息
     */
    signIn(ticket:string):Promise<ILoginState>;
  }

  interface IAnonymousAuthProvider {
    /**
     * 匿名登录云开发
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#anonymousauthprovider-signin}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth()
     * auth
     *   .anonymousAuthProvider()
     *   .signIn()
     *   .then(loginState=>{
     *     // ...
     *   });
     * ```
     * 
     * @return Promise-登录态信息
     */
    signIn():Promise<ILoginState>;
  }
  /**
   * User Info
   */
  interface IUserInfo {
    /**
     * 云开发用户的全局唯一 ID
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-uid}
     */
    uid?: string;
    /**
     * 表示当前的登录类型
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-logintype}
     */
    loginType?: string;
    /**
     * 此用户绑定的微信 openid
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-openid}
     */
    openid?: string;
    /**
     * 此用户绑定的微信 openid
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-wxopenid}
     */
    wxOpenId?: string;
    /**
     * 此用户绑定的微信开放平台 openid
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-wxpublicid}
     */
    wxPublicId?: string;
    /**
     * 此用户绑定的微信 unionid
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-unionid}
     */
    unionId?: string;
    /**
     * 此用户对应的 QQ 小程序 openid
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-qqminiopenid}
     */
    qqMiniOpenId?: string;
    /**
     * 此用户绑定的自定义登录 customUserId
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-customuserid}
     */
    customUserId?: string;
    /**
     * 用户昵称
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-nickname}
     */
    nickName?: string;
    /**
     * 用户性别
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-gender}
     */
    gender?: string;
    /**
     * 用户头像图片URL
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-avatarurl}
     */
    avatarUrl?: string;
    /**
     * 用户邮箱
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-email}
     */
    email?: string;
    /**
     * 用户名
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-username}
     */
    username?: string;
    /**
     * 是否设置了密码
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-haspassword}
     */
    hasPassword?: boolean;
    /**
     * 用户地理位置
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-location}
     */
    location?: {
      /**
       * 国家
       */
      country?: string;
      /**
       * 省
       */
      province?: string;
      /**
       * 城市
       */
      city?: string;
    };
  }

  interface IUser extends IUserInfo{
    /**
     * 将当前账户与自定义登录 `ticket` 进行绑定，绑定之后便可以通过自定义登录登录当前云开发账户
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-linkwithticket}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const user = app.auth().currentUser;
     * // ticket 为获取到的自定义登录 Ticket
     * user
     *   .linkWithTicket(ticket)
     *   .then(() => {
     *     // 绑定成功
     *   });
     * ```
     * 
     * @param ticket 自定义登录凭证
     * 
     * @return Promise
     */
    linkWithTicket(ticket:string): Promise<void>;
    /**
     * 将当前账户与第三方鉴权提供方，以重定向的形式，进行绑定，绑定之后便可以通过第三方鉴权提供方登录当前的云开发账户
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-linkwithredirect}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * const provider = auth.weixinAuthProvider({
     *   appid: "",
     *   scope: ""
     * });
     *  // 调用之后，网页会被重定向至第三方登录页面
     * user.linkWithRedirect(provider);
     * ```
     * 
     * @param provider 第三方鉴权Provider实例
     * 
     */
    linkWithRedirect(provider:IAuthProvider):void;
    /**
     * 获取已绑定的用户信息
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user
     *   .getLinkedUidList()
     *   .then(info=>{});
     * ```
     * 
     * @param provider 第三方鉴权Provider实例
     * 
     * @return Promise-已绑定的用户信息
     */
    getLinkedUidList(): Promise<{ hasPrimaryUid: boolean, users: IUserInfo[] }>;
    /**
     * 设置微信主账号，通常搭配和 User.getLinkedUidList() 使用，用于在同个微信 UnionID 对应的多个云开发账号中，设置其中一个为主账号
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user.setPrimaryUid('your-uid').then(()=>{});
     * ```
     * 
     * @param uid 云开发用户的唯一ID
     * 
     * @return Promise
     */
    setPrimaryUid(uid:string):Promise<void>;
    /**
     * 解绑某个登录方式
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-unlink}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     *  // 解绑自定义登录
     * user.unlink('CUSTOM');
     * ```
     * 
     * @param loginType 被解绑的登录方式
     * 
     * @return Promise
     * 
     */
    unlink(loginType: 'CUSTOM'| 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'WECHAT-UNION' | 'EMAIL'):Promise<void>;
    /**
     * 更新用户信息
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-update}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user.update({
     *   nickName: '新昵称'
     * }).then(()=>{});
     * ```
     * 
     * @param userinfo 用户信息
     * 
     * @return Promise
     * 
     */
    update(userinfo:IUserInfo):Promise<void>;
    /**
     * 刷新本地用户信息
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-refresh}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user.refresh().then(()=>{});
     * ```
     * 
     * @return Promise-刷新后的用户信息
     * 
     */
    refresh():Promise<IUserInfo>;
    /**
     * 修改密码。如果用户之前没有设置过密码，那么无需填写 oldPassword
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-updatepassword}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user
     *   .updatePassword("new_password", "old_password")
     *   .then(()=>{});
     * ```
     * 
     * @param newPassword 新密码
     * @param oldPassword 旧密码
     * 
     * @return Promise
     */
    updatePassword(newPassword: string, oldPassword?: string): Promise<void>;
    /**
     * 修改登录邮箱
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-updateemail}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user
     *   .updateEmail("new_email@foo.com")
     *   .then(()=>{});
     * ```
     * 
     * @param newEmail 新邮箱地址
     * 
     * @return Promise
     */
    updateEmail(newEmail: string): Promise<void>;
    /**
     * 修改用户名
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-updateusername}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user
     *   .updateUsername("new_username")
     *   .then(()=>{});
     * ```
     * 
     * @param username 新用户名
     * 
     * @return Promise
     */
    updateUsername(username: string): Promise<void>;
  }

  interface App{
    /**
     * 获取当前登录的用户信息-同步操作
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-hasloginstate}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const userInfo = app.auth().currentUser;
     * ```
     * 
     * @return 用户信息，如果未登录返回`null`
     */
    currentUser: IUser|null;
    /**
     * 获取当前登录的用户信息-异步操作，文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-hasloginstate}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().getCurrenUser().then(userInfo=>{
     *   // ...
     * });
     * ```
     * 
     * @return Promise-用户信息，如果未登录返回`null`
     */
    getCurrenUser():Promise<IUser|null>
    /**
     * 获取本地登录态-同步操作
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-hasloginstate}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const loginState = app.auth().hasLoginState();
     * ```
     * 
     * @return 登录态信息，如果未登录返回`null`
     */
    hasLoginState(): ILoginState|null;
    /**
     * 获取本地登录态-异步操作
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-getloginstate}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().getLoginState().then(loginState=>{
     *   // ...
     * });
     * ```
     * 
     * @return Promise-登录态信息，如果未登录返回`null`
     */
    getLoginState(): Promise<ILoginState|null>;
    /**
     * 获取 HTTP 鉴权header-同步操作
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-getauthheader}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const authHeader = app.auth().getAuthHeader();
     * ```
     * 
     * @return HTTP鉴权header
     */
    getAuthHeader(): { 'x-cloudbase-credentials': string } | null;
    /**
     * 获取 HTTP 鉴权header-异步操作
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-getauthheaderasync}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().getAuthHeaderAsync().then(authHeader=>{
     *   // ...
     * });
     * ```
     * 
     * @return Promise-HTTP鉴权header
     */
    getAuthHeaderAsync(): Promise<{ 'x-cloudbase-credentials': string } | null>;
    /**
     * 监听登录状态改变事件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-onloginstatechanged}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().onLoginStateChanged(loginState=>{
     *   // ...
     * });
     * ```
     * 
     * @param callback 回调函数，当登录状态改变后被执行
     */
    onLoginStateChanged(callback:Function):void;
    /**
     * 监听登录态过期事件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-onloginstateexpired}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().onLoginStateExpired(()=>{
     *   // ...
     * });
     * ```
     * 
     * @param callback 回调函数，当登录态过期后被执行
     */
    onLoginStateExpired(callback: Function):void;
    /**
     * 监听令牌刷新事件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-onaccesstokenrefreshed}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().onAccessTokenRefreshed(()=>{
     *   // ...
     * });
     * ```
     * 
     * @param callback 回调函数，当access_token刷新后被执行
     */
    onAccessTokenRefreshed(callback: Function):void;
    /**
     * 监听匿名转正事件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-onanonymousconverted}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().onAnonymousConverted(()=>{
     *   // ...
     * });
     * ```
     * 
     * @param callback 回调函数，当匿名用户被转化为正式用户后被执行
     */
    onAnonymousConverted(callback: Function):void;
    /**
     * 监听登录类型改变事件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-onlogintypechanged}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().onLoginTypeChanged(()=>{
     *   // ...
     * });
     * ```
     * 
     * @param callback 回调函数，当登录类型改变后被执行
     */
    onLoginTypeChanged(callback: Function):void;
    /**
     * 接收一个回调函数，并且会在刷新短期访问令牌前调用此回调函数，根据返回值决定是否要刷新短期访问令牌。
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-shouldrefreshaccesstoken}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().shouldRefreshAccessToken(()=>{
     *   // ...
     * });
     * ```
     * 
     * @param callback 在刷新短期访问令牌前调用此回调函数
     */
    shouldRefreshAccessToken(hook:Function):void;
    /**
     * 创建微信登录Provider实例
     * 
     * {@link https://docs.cloudbase.net/authentication/wechat-login.html#wei-xin-deng-lu-liu-cheng}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const provider = app.auth().weixinAuthProvider({
     *   appid: 'AppId',
     *   scope: '授权类型'
     * });
     * ```
     * 
     * @param options
     * @param options.appid 微信公众平台/开放平台的 AppId
     * @param options.scope 授权类型
     * 
     * @return 微信登录Provider实例
     */
    weixinAuthProvider(options:{
      appid: string;
      scope: 'snsapi_base'|'snsapi_userinfo'|'snsapi_login';
    }):IWeixinAuthProvider;
    /**
     * 创建自定义登录Provider实例
     * 
     * {@link https://docs.cloudbase.net/authentication/wechat-login.html#wei-xin-deng-lu-liu-cheng}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const provider = app.auth().customAuthProvider();
     * ```
     * 
     * @return 自定义登录Provider实例
     */
    customAuthProvider():ICustomAuthProvider;
    /**
     * 创建匿名登录Provider实例
     * 
     * {@link https://docs.cloudbase.net/authentication/wechat-login.html#wei-xin-deng-lu-liu-cheng}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const provider = app.auth().anonymousAuthProvider();
     * ```
     * 
     * @return 匿名登录Provider实例
     */
    anonymousAuthProvider():IAnonymousAuthProvider;
    /**
     * 退出登录，请注意，匿名登录不支持退出
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-signout}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().signOut().then(()=>{});
     * ```
     * 
     * @return Promise
     */
    signOut():Promise<void>;
    /**
     * 使用邮箱和密码登录云开发
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-signinwithemailandpassword}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const email = "foo@bar.com";
     * const password = "your_awesome_password";
     * auth.signInWithEmailAndPassword(email, password).then(loginState=>{
     *   // ...
     * });
     * ```
     * 
     * @param email 邮箱地址
     * @param password 登录密码
     * 
     * @return Promise-登录态信息
     */
    signInWithEmailAndPassword(email: string, password: string): Promise<ILoginState>;
    /**
     * 使用邮箱和密码注册一个云开发账户，调用后，会自动向注册邮箱发送邮箱验证邮件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-signupwithemailandpassword}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const email = "foo@bar.com";
     * const password = "your_awesome_password";
     * auth.signUpWithEmailAndPassword(email, password).then(()=>{
     *   // ...
     * });
     * ```
     * 
     * @param email 邮箱地址
     * @param password 登录密码
     * 
     * @return Promise
     */
    signUpWithEmailAndPassword(email:string, password:string): Promise<void>;
    /**
     * 发送重置密码的邮件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-sendpasswordresetemail}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const email = "foo@bar.com";
     * auth.sendPasswordResetEmail(email).then(()=>{
     *   // ...
     * });
     * ```
     * 
     * @param email 邮箱地址
     * 
     * @return Promise
     */
    sendPasswordResetEmail(email: string): Promise<void>;
    /**
     * 使用用户名密码登录云开发
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-signinwithusernameandpassword}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const username = "your_awesome_username";
     * const password = "your_awesome_password";
     * auth.signInWithUsernameAndPassword(username, password).then(loginState=>{
     *   // ...
     * });
     * ```
     * 
     * @param username 用户名
     * @param password 登录密码
     * 
     * @return Promise-登录态信息
     */
    signInWithUsernameAndPassword(username: string, password: string): Promise<ILoginState>;
    /**
     * 检查用户名是否被绑定过
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-isusernameregistered}
     * 
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const username = "your_awesome_username";
     * auth.isUsernameRegistered(username).then(registered=>{
     *   // ...
     * });
     * ```
     * 
     * @param username 用户名
     * 
     * @return Promise-用户是否被绑定
     */
    isUsernameRegistered(username: string): Promise<boolean>;
  }
}
/**
 * functions
 */
declare namespace cloudbase.functions {
  interface ICallFunctionOptions {
    name: string;
    data?: KV<any>;
    query?: KV<any>;
    search?: string;
    parse?: boolean;
  }
  
  interface ICallFunctionResponse {
    requestId: string;
    result: any;
  }
}
/**
 * storage
 */
declare namespace cloudbase.storage {
  interface ICloudbaseUploadFileParams {
    cloudPath: string;
    filePath: string;
    onUploadProgress?: Function;
  }
  interface ICloudbaseUploadFileResult {
    fileID: string;
    requestId: string;
  }
  interface ICloudbaseGetUploadMetadataParams {
    cloudPath: string;
  }
  interface ICloudbaseDeleteFileParams {
    fileList: string[];
  }
  interface ICloudbaseDeleteFileResult {
    code?: string;
    message?: string;
    fileList?: {
      code?: string;
      fileID: string;
    }[];
    requestId?: string;
  }
  
  interface ICloudbaseFileInfo {
    fileID: string;
    maxAge: number;
  }
  
  interface ICloudbaseGetTempFileURLParams{
    fileList: string[]|ICloudbaseFileInfo[];
  }
  
  interface ICloudbaseGetTempFileURLResult {
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
  interface ICloudbaseDownloadFileParams {
    fileID: string;
    tempFilePath?: string;
  }
  interface ICloudbaseDownloadFileResult {
    code?: string;
    message?: string;
    fileContent?: any;
    requestId?: string;
  }
  interface ICloudbaseFileMetaData {
    url: string;
    token: string;
    authorization: string;
    fileId: string;
    cosFileId: string;
  }
  
  interface ICloudbaseFileMetaDataRes {
    data: ICloudbaseFileMetaData;
    requestId: string;
  }
}

declare namespace cloudbase.database {
  /**
   * realtime types
   */
  interface IWatchOptions {
    // server realtime data init & change event
    onChange: (snapshot: ISnapshot) => void
    // error while connecting / listening
    onError: (error: any) => void
  }
  interface DBRealtimeListener {
    /**
     * 关闭实时推送
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#shu-ju-ku-shi-shi-tui-song}
     * 
     * @example
     * // 启动监听
     * const ref = db
     *   .collection("collName")
     *   .where({ test: _.gt(0) })
     *   .watch({
     *     onChange: (snapshot) => {
     *       console.log("收到snapshot**********", snapshot);
     *     },
     *     onError: (error) => {
     *       console.log("收到error**********", error);
     *     }
     *   });
     * // 关闭监听
     * ref.close();
     */
    close: () => void
  }
  type DataType = 'init' | 'update' | 'add' | 'remove' | 'replace' | 'limit';
  type QueueType = 'init' | 'enqueue' | 'dequeue' | 'update';
  interface ISnapshot {
    id: number
    docChanges: ISingleDBEvent[]
    docs: Record<string, any>
    type?: SnapshotType
  }
  
  interface ISingleDBEvent {
    id: number
    dataType: DataType
    queueType: QueueType
    docId: string
    doc: Record<string, any>
    updatedFields?: any
    removedFields?: any
  }
  
  type SnapshotType = 'init';

  interface IWatchable {
    /**
     * 开启实时推送
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#shu-ju-ku-shi-shi-tui-song}
     * 
     * @example
     * const ref = db
     *   .collection("collName")
     *   .where({ test: _.gt(0) })
     *   .watch({
     *     onChange: (snapshot) => {
     *       console.log("收到snapshot**********", snapshot);
     *     },
     *     onError: (error) => {
     *       console.log("收到error**********", error);
     *     }
     *   });
     * @param options
     * @param options.onChange 监听数据变化的回调函数
     * @param options.onError 监听出现错误的回调函数
     * 
     * @return 实时推送进程实例
     */
    watch(options: IWatchOptions): DBRealtimeListener;
  }
  /**
   * collection types 
   */
  interface ICollection extends IQuery {
    /**
     * 插入一条文档
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#add}
     * 
     * @param data 文档数据
     */
    add(data:object):Promise<Pick<SetRes, 'code'|'message'>>;
    /**
     * 获取一条文档的引用
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#record-document}
     * 
     * @param id 文档ID
     */
    doc(id:string):IDocument;
  }
  /**
   * command types 
   */
  interface IGeoNearOptions {
    geometry: Point // 点的地理位置
    maxDistance?: number // 选填，最大距离，米为单位
    minDistance?: number // 选填，最小距离，米为单位
  }
  interface IGeoWithinOptions {
    geometry: IPolygon | IMultiPolygon
  }
  interface IGeoIntersectsOptions {
    geometry: IPoint | ILineString | IMultiPoint | IMultiLineString | IPolygon | IMultiPolygon;
  }
  interface ICommand {
    /**
     * 表示字段等于某个值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#eq}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.eq(10)
     * })
     * 
     * @param val 接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`
     * 
     */
    eq(val:number|string|boolean|object|any[]):any;
    /**
     * 表示字段不等于某个值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#neq}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.neq(10)
     * })
     * 
     * @param val 接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`
     * 
     */
    neq(val:number|string|boolean|object|any[]):any;
    /**
     * 字段大于指定值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#gt}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.gt(10)
     * })
     * 
     * @param val 数字
     * 
     */
    gt(val:number):any;
    /**
     * 字段大于或等于指定值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#neq}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.gte(10)
     * })
     * 
     * @param val 数字
     * 
     */
    gte(val:number):any;
    /**
     * 字段小于指定值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#lt}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.lt(10)
     * })
     * 
     * @param val 数字
     * 
     */
    lt(val:number):any;
    /**
     * 字段小于或等于指定值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#lte}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.lte(10)
     * })
     * 
     * @param val 数字
     * 
     */
    lte(val:number):any;
    /**
     * 字段值在给定的数组中
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#in}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.in([1,2,3])
     * })
     * 
     * @param list 数组
     * 
     */
    in(list:any[]):any;
    /**
     * 字段值不在给定的数组中
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#nin}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.nin([1,2,3])
     * })
     * 
     * @param list 数组
     * 
     */
    nin(list:any[]):any;
    /**
     * 表示需同时满足指定的两个或以上的条件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#and}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.and(_.gt(4), _.lt(32))
     * })
     * 
     * @param args 多个条件
     * 
     */
    and(...args:any[]):any;
    /**
     * 表示需满足所有指定条件中的至少一个
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#or}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.or(_.gt(4), _.lt(32))
     * })
     * 
     * @param args 多个条件
     * 
     */
    or(...args:any[]):any;
    /**
     * 用于设定字段等于指定值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#set}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      data: {
     *        style: _.set({
     *          color: "red"
     *        })
     *      }
     *   });
     * 
     * @param val 被设定的属性对象
     * 
     */
    set(val:any):any;
    /**
     * 用于指示字段自增某个值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#inc}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      count: {
     *       favorites: _.inc(1)
     *     }
     *   });
     * 
     * @param val 自增的值
     * 
     */
    inc(val:number):any;
    /**
     * 用于指示字段自乘某个值
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#mul}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      count: {
     *       favorites: _.mul(21)
     *     }
     *   });
     * 
     * @param val 自乘的值
     * 
     */
    mul(val:number):any;
    /**
     * 用于表示删除某个字段
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#remove}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      rating: _.remove()
     *   });
     * 
     */
    remove():any;
    /**
     * 向数组尾部追加元素
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#remove}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.push(["aaa", "bbb"])
     *   });
     * 
     * @param val 支持传入单个元素或数组
     */
    push(val:any): any;
    /**
     * 删除数组尾部元素
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#remove}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.pop()
     *   });
     * 
     */
    pop():any;
    /**
     * 向数组头部添加元素
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#remove}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.unshift(["aaa", "bbb"])
     *   });
     * 
     * @param val 支持传入单个元素或数组
     */
    unshift(val:any): any;
    /**
     * 删除数组头部元素
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#remove}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.unshift()
     *   });
     * 
     */
    shift(): any;
    /**
     * 按从近到远的顺序，找出字段值在给定点的附近的文档
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#geo-cao-zuo-fu}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   location: _.geoNear({
     *     geometry: new db.Geo.Point(lngA, latA),
     *     maxDistance: 1000,
     *     minDistance: 0
     *   })
     * });
     * 
     * @param options
     * @param options.geometry 点的地理位置
     * @param options.maxDistance 【可选】最大距离，米为单位
     * @param options.minDistance 【可选】最小距离，米为单位
     */
    geoNear(options: IGeoNearOptions):any;
    /**
     * 找出字段值在指定 Polygon / MultiPolygon 内的文档，无排序
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#geo-cao-zuo-fu}
     * 
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   location: _.geoWithin({
     *     geometry: new Polygon({
     *       new LineString([...Points])
     *     }),
     *   })
     * });
     * 
     * @param options
     * @param options.geometry 地理位置
     */
    geoWithin(options: IGeoWithinOptions):any;
    /**
     * 找出字段值和给定的地理位置图形相交的文档
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#geo-cao-zuo-fu}
     * 
     * @example
     * const _ = db.command;
     * db.collection("user").where({
     *   location: _.geoNear({
     *     geometry: new LineString([new Point(lngA, latA), new Point(lngB, latB)]);
     *   })
     * });
     * 
     * @param options
     * @param options.geometry 地理位置
     */
    geoIntersects(options: IGeoIntersectsOptions):any;
  }
  /**
   * document types 
   */
  interface IDocument extends IWatchable{
    /**
     * 更新文档，如果要更新的文档不存在时新增一个文档
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#update-set}
     *
     * @example
     * collection
     *   .doc('docId')
     *   .set({name:'cloudbase'})
     *   .then(res=>{})
     * 
     * @param data 文档数据
     * 
     * @return Promise
     */
    set(data:object):Promise<SetRes>;
    /**
     * 获取查询结果
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#get}
     *
     * @example
     * collection
     *   .doc('docId')
     *   .get()
     *   .then(res=>{})
     * 
     * @return Promise-查询结果
     */
    get():Promise<GetRes>;
    /**
     * 更新文档，如果要更新的文档不存在什么也不会做
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#update-set}
     *
     * @example
     * collection
     *   .doc('docId')
     *   .update({name:'cloudbase'})
     *   .then(res=>{})
     * 
     * @param data 文档数据
     * 
     * @return Promise
     */
    update(data:object):Promise<SetRes>;
    /**
     * 删除一条文档
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#remove-2}
     * 
     * @example
     * collection
     *   .doc('docId')
     *   .remove()
     *   .then(res=>{})
     * 
     * @return Promise
     */
    remove(): Promise<any>;
  }
  /**
   * query types
   */
  interface SetRes {
    code?:string;
    message?:string;
    updated?:number;
    upsertedId?:number;
    requestId:string;
  }
  interface GetRes {
    data: any[]
    requestId: string
    total: number
    limit: number
    offset: number
  }
  
  interface QueryOrder {
    field?: string
    direction?: 'asc' | 'desc'
  }
  
  interface QueryOption {
    // 查询数量
    limit?: number
    // 偏移量
    offset?: number
    // 指定显示或者不显示哪些字段
    projection?: Object
  }
  interface IQuery extends IWatchable{
    /**
     * 获取数据库查询结果
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#get}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .get()
     *   .then(res=>{})
     * 
     * @return Promise-查询结果
     */
    get(): Promise<GetRes>;
    /**
     * 获取数据库查询结果的数目
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#count}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .count()
     *   .then(res=>{})
     * 
     * @return Promise-查询结果
     */
    count(): Promise<any>;
    /**
     * 设置过滤条件
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#where}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     * 
     * @param query 可接收对象作为参数，表示筛选出拥有和传入对象相同的 key-value 的文档
     * 
     */
    where(query:object): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定查询结果集数量上限
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#limit}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .limit(1)
     * 
     * @param limit 查询结果数量上限
     */
    limit(limit:number): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定查询返回结果时从指定序列后的结果开始返回，常用于分页 
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#skip}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .skip(4)
     * 
     * @param offset 跳过的条目数量
     */
    skip(offset: number): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定查询排序条件 
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#orderby}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .orderBy("name", "asc")
     * 
     * @param field 排序的字段
     * @param orderType 排序的顺序，升序(asc) 或 降序(desc)
     */
    orderBy(field:string,orderType:string): ExcludeOf<IQuery, 'where'>;
    /**
     * 指定返回结果中文档需返回的字段 
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#field}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .field({ age: true })
     * 
     * @param projection 要过滤的字段集合，不返回传 false，返回传 true
     */
    field(projection:object): ExcludeOf<IQuery, 'where'>;
    /**
     * 删除查询到的结果 
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#field}
     * 
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .remove()
     * 
     * @return Promise
     */
    remove(): Promise<any>;
  }
  /**
   * geo types
   */
  interface IPoint {};
  interface ILineString {};
  interface IPolygon {};
  interface IMultiPoint {};
  interface IMultiLineString {};
  interface IMultiPolygon {};
  interface IGeo {
    /**
     * 用于表示地理位置点
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#point}
     * 
     * @example
     * const point = new db.Geo.Point(lng,lat);
     * 
     * @param longitude 经度
     * @param latitude 纬度
     * 
     * @return Point
     */
    Point: {
      new(longitude: number, latitude: number): IPoint;
    };
    /**
     * 用于表示地理路径，是由两个或者更多的 Point 组成的线段
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#linestring}
     * 
     * @example
     * const point = new db.Geo.LineString([pointA,pointB]);
     * 
     * @param points Point数组
     * 
     * @return LineString
     */
    LineString: {
      new(points: IPoint[]): ILineString;
    }
    /**
     * 用于表示地理上的一个多边形
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#polygon}
     * 
     * @example
     * const point = new db.Geo.Polygon([lineStringA,lineStringB]);
     * 
     * @param lines LineString数组
     * 
     * @return Polygon
     */
    Polygon: {
      new(lines: ILineString[]): IPolygon;
    }
    /**
     * 用于表示多个点 Point 的集合
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#multipoint}
     * 
     * @example
     * const point = new db.Geo.MultiPoint([pointA,pointB]);
     * 
     * @param points Point数组
     * 
     * @return MultiPoint
     */
    MultiPoint: {
      new(points: IPoint[]):IMultiPoint;
    }
    /**
     * 用于表示多个地理路径 LineString 的集合
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#multilinestring}
     * 
     * @example
     * const point = new db.Geo.MultiLineString([lineA,lineB]);
     * 
     * @param lines LineString数组
     * 
     * @return MultiLineString
     */
    MultiLineString: {
      new(lines: ILineString[]): IMultiLineString;
    }
    /**
     * 用于表示多个地理多边形 Polygon 的集合
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#multipolygon}
     * 
     * @example
     * const point = new db.Geo.MultiPolygon([polygonA,polygonB]);
     * 
     * @param polygons Polygon数组
     * 
     * @return MultiPolygon
     */
    MultiPolygon: {
      new(polygons: IPolygon[]):IMultiPolygon;
    }
  }
  /**
   * regexp types
   */
  interface IRegExpOptions {
    regexp: string;
    options?: string;
  }
  interface IRegExp {
    (options:IRegExpOptions):any;
  }
  /**
   * instance types
   */
  interface App{
    /**
     * 数据库指令
     *
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#query-command}
     */
    command: ICommand;
    /**
     * 数据库Geo地理位置
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#geo-shu-ju-lei-xing}
     */
    Geo: IGeo;
    /**
     * 根据正则表达式进行筛选
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#regexp}
     * 
     * @example
     * db.collection('articles').where({
     *   version: new db.RegExp({
     *     regexp: '^\\ds'   // 正则表达式为 /^\ds/，转义后变成 '^\\ds'
     *     options: 'i'    // i表示忽略大小写
     *   })
     * })
     * 
     * @param options
     * @param options.regexp 正则表达式Pattern
     * @param options.options 正则表达式Flags
     */
    RegExp: IRegExp;
    /**
     * 创建集合的引用
     * 
     * {@link https://docs.cloudbase.net/api-reference/webv2/database.html#collection}
     * 
     * @example
     * const coll = db.collection('demo');
     * 
     * @param name 集合名称
     * 
     * @return 集合的引用
     */
    collection(name:string):ICollection;
  }
}

export = cloudbase;
export as namespace cloudbase;