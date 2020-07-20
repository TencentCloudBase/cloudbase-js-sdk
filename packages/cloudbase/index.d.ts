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

  function init(config: ICloudbaseConfig):cloudbase.app.App;
}
/**
 * instance
 */
declare namespace cloudbase.app {
  interface App{
    /**
     * auth API
     */
    auth(options: {
      persistence: cloudbase.auth.Persistence
    }): cloudbase.auth.App;
    /**
     * functions API
     */
    callFunction(options: cloudbase.functions.ICallFunctionOptions):Promise<ICallFunctionResponse>;
    /**
     * storage API
     */
    uploadFile(params:ICloudbaseUploadFileParams):Promise<ICloudbaseUploadFileResult>;

    downloadFile(params:ICloudbaseDownloadFileParams):Promise<ICloudbaseDownloadFileResult>;

    getTempFileURL(params:ICloudbaseGetTempFileURLParams):Promise<ICloudbaseGetTempFileURLResult>;

    deleteFile(params:ICloudbaseDeleteFileParams):Promise<ICloudbaseDeleteFileResult>;
    /**
     * database API
     */
    database(): cloudbase.database.App;
    /**
     * extenstions API
     */
    registerExtension(ext:ICloudbaseExtension):void;

    invokeExtension(name:string,opts:any):Promise<any>;
    /**
     * adapters API
     */
    useAdapters(adapters: CloudbaseAdapter|CloudbaseAdapter[]):void;
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
    credential: ICredential;
    user: IUser;
    isAnonymousAuth: boolean;
    isCustomAuth: boolean;
    isWeixinAuth: boolean;
    isUsernameAuth: boolean;
    loginType: string;
  }

  interface IWeixinAuthProvider {
    signIn():Promise<ILoginState>;
    signInWithRedirect():void;
    getRedirectResult():Promise<ILoginState>;
  }

  interface ICustomAuthProvider {
    signIn(ticket:string):Promise<ILoginState>;
  }

  interface IAnonymousAuthProvider {
    signIn():Promise<ILoginState>;
    linkAndRetrieveDataWithTicket(ticket: string):Promise<ILoginState>;
  }
  /**
   * User Info
   */
  interface IUserInfo {
    uid?: string;
    loginType?: string;
    openid?: string;
    wxOpenId?: string;
    wxPublicId?: string;
    unionId?: string;
    qqMiniOpenId?: string;
    customUserId?: string;
    nickName?: string;
    gender?: string;
    avatarUrl?: string;
    email?: string;
    hasPassword?: boolean;
    location?: {
      country?: string;
      province?: string;
      city?: string;
    };
    country?: string;
    province?: string;
    city?: string;
  }

  interface IUser extends IUserInfo{
    checkLocalInfo(): void;
    checkLocalInfoAsync(): Promise<void>;
    linkWithTicket(ticket:string): Promise<void>;
    linkWithRedirect(provider:IAuthProvider):void;
    getLinkedUidList(): Promise<{ hasPrimaryUid: boolean, users: IUserInfo[] }>;
    setPrimaryUid(uid:string):Promise<void>;
    unlink(loginType: 'CUSTOM'| 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'WECHAT-UNION'):Promise<void>;
    update(userinfo:IUserInfo):Promise<void>;
    refresh():Promise<IUserInfo>;
    updatePassword(newPassword: string, oldPassword?: string): Promise<void>;
    updateEmail(newEmail: string): Promise<void>;
  }

  interface App{
    currentUser: IUser;
    /**
     * getters 
     */
    getLoginState(): Promise<ILoginState|null>;
    hasLoginState(): Promise<ILoginState|null>;
    getUserInfo(): Promise<any>;
    getAuthHeader(): Promise<KV<string>>;
    /**
     * events 
     */
    onLoginStateChanged(callback:Function):void;
    onLoginStateExpired(callback: Function):void;
    onAccessTokenRefreshed(callback: Function):void;
    onAnonymousConverted(callback: Function):void;
    onLoginTypeChanged(callback: Function):void;
    /**
     * controllers 
     */
    shouldRefreshAccessToken(hook:Function):void;
    /**
     * providers 
     */
    weixinAuthProvider():IWeixinAuthProvider;
    customAuthProvider():ICustomAuthProvider;
    anonymousAuthProvider():IAnonymousAuthProvider;
    /**
     * actions 
     */
    signOut():Promise<void>;
    signInWithEmailAndPassword(email: string, password: string): Promise<ILoginState>;
    signUpWithEmailAndPassword(email:string, password:string): Promise<void>;
    signInWithEmailAndPassword(email: string, password: string): Promise<ILoginState>;
    sendPasswordResetEmail(email: string): Promise<void>;
    signInWithUsernameAndPassword(username: string, password: string): Promise<ILoginState>;
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
    // "And Now His Watch Is Ended"
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
    watch(options: IWatchOptions): DBRealtimeListener;
  }
  /**
   * collection types 
   */
  interface ICollection extends IQuery {
    add(data:object):Promise<Pick<SetRes, 'code'|'message'>>;
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
     * query commands
     */
    eq(val:number|string|boolean|object|any[]):any;
    neq(val:number|string|boolean|object|any[]):any;
    gt(val:number):any;
    gte(val:number):any;
    lt(val:number):any;
    lte(val:number):any;
    in(list:any[]):any;
    nin(list:any[]):any;
    and(...args:any[]):any;
    or(...args:any[]):any;
    /**
     * update commands
     */
    set(val:any):any;
    inc(val:number):any;
    mul(val:number):any;
    remove():any;
    push(val:any): any;
    pop():any;
    unshift(val:any): any;
    shift(val:any): any;
    /**
     * geo commands
     */
    geoNear(options: IGeoNearOptions):any;
    geoWithin(options: IGeoWithinOptions):any;
    geoIntersects(options: IGeoIntersectsOptions):any;
  }
  /**
   * document types 
   */
  interface IDocument extends IWatchable{
    set(data:object):Promise<SetRes>;
    get():Promise<GetRes>;
    update(data:object):Promise<SetRes>;
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
    get(callback?:Function): Promise<GetRes>;
    count(callback?:Function): Promise<any>;
    where(query:object): ExcludeOf<IQuery, 'where'>;
    limit(limit:number): ExcludeOf<IQuery, 'where'>;
    skip(offset: number): ExcludeOf<IQuery, 'where'>;
    orderBy(field:string,orderType:string): ExcludeOf<IQuery, 'where'>;
    field(projection:object): ExcludeOf<IQuery, 'where'>;
    remove(callback?:Function): Promise<any>;
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
    Point: {
      new(longitude: number, latitude: number): IPoint;
    };
    LineString: {
      new(points: IPoint[]): ILineString;
    }
    Polygon: {
      new(lines: ILineString[]): IPolygon;
    }
    MultiPoint: {
      new(points: IPoint[]):IMultiPoint;
    }
    MultiLineString: {
      new(lines: ILineString[]): IMultiLineString;
    }
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
    command: ICommand;
    Geo: IGeo;
    RegExp: IRegExp;
    collection(name:string):ICollection;
  }
}

export = cloudbase;
export as namespace cloudbase;