import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseComponent } from '@cloudbase/types/component';
import { ICallFunctionOptions } from '@cloudbase/types/functions';
import { constants,utils,helpers } from '@cloudbase/utilities';

declare const cloudbase: ICloudbase;

const { getSdkName ,ERRORS, COMMUNITY_SITE_URL } = constants;
const { execCallback } = utils;
const { catchErrorsDecorator } = helpers;

const COMPONENT_NAME = 'functions';

class CloudbaseFunctions{
  @catchErrorsDecorator({
    customInfo: {
      className: 'Cloudbase',
      methodName: 'callFunction'
    },
    title: '函数调用失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 callFunction() 的语法或参数是否正确',
      '  2 - 当前环境下是否存在此函数',
      '  3 - 函数安全规则是否限制了当前登录状态访问',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async callFunction(options:ICallFunctionOptions,callback?:Function){
    const { name, data, query, parse, search } = options;
    if (!name) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.callFunction] invalid function name`
      }));
    }
    let jsonData;
    try {
      jsonData = data ? JSON.stringify(data) : '';
    } catch (e) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.callFunction] invalid data`
      }));
    }

    const action = 'functions.invokeFunction';

    const params = {
      inQuery: query,
      parse,
      search,
      function_name: name,
      request_data: jsonData
    };
    // @ts-ignore
    const request = this.request;

    try{
      const res = await request.send(action, params);
      if (res.code) {
        return execCallback(callback,null,res);
      } else {
        let result = res.data.response_data;
        // parse 为 true 时服务端解析 JSON，SDK 不再次解析
        if (parse) {
          return execCallback(callback,null, {
            result,
            requestId: res.requestId
          });
        } else {
          try {
            result = JSON.parse(res.data.response_data);
            return execCallback(callback, null, {
              result,
              requestId: res.requestId
            });
          } catch (e) {
            execCallback(callback, new Error(`[${getSdkName()}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.callFunction] response data must be json`));
          }
        }
      }
    }catch(e){
      execCallback(callback,e);
    }
  }
}

const cloudbaseFunctions = new CloudbaseFunctions();

const component:ICloudbaseComponent = {
  name: COMPONENT_NAME,
  entity: {
    callFunction: cloudbaseFunctions.callFunction
  }
}
try{
  cloudbase.registerComponent(component);
}catch(e){}

export function registerFunctions(app:Pick<ICloudbase, 'registerComponent'>){
  try{
    app.registerComponent(component);
  }catch(e){
    console.warn(e);
  }
}