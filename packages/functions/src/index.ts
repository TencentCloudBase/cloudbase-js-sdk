import { constants,utils } from '@cloudbase/utilities';
import { ICloudbase } from '@cloudbase/types';
import { ICallFunction,ICallFunctionOptions,ICallFunctionResponse } from '@cloudbase/types/functions';
import { ICloudbaseComponent } from '@cloudbase/types/component';

declare const cloudbase: ICloudbase;

const { SDK_NAME,ERRORS } = constants;
const { execCallback } = utils;

const COMPONENT_NAME = 'functions';

const callFunction:ICallFunction = async function (options: ICallFunctionOptions,callback?:Function):Promise<ICallFunctionResponse> {
  const { name, data, query, parse, search } = options;
  if (!name) {
    execCallback(callback,new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.callFunction] invalid name`));
  }
  let jsonData;
  try {
    jsonData = data ? JSON.stringify(data) : '';
  } catch (e) {
    execCallback(callback, new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.callFunction] invalid data`));
  }

  const action = 'functions.invokeFunction';

  const params = {
    inQuery: query,
    parse,
    search,
    function_name: name,
    request_data: jsonData
  };
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
          execCallback(callback, new Error(`[${SDK_NAME}][${ERRORS.INVALID_PARAMS}][${COMPONENT_NAME}.callFunction] response data must be json`));
        }
      }
    }
  }catch(e){
    execCallback(callback,e);
  }
};

const component:ICloudbaseComponent = {
  name: COMPONENT_NAME,
  entity: {
    callFunction
  }
}
try{
  cloudbase.registerComponent(component);
}catch(e){}

export function registerFunctions(app:ICloudbase){
  app.registerComponent(component);
}