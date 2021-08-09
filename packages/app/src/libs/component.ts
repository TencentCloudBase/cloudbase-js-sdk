import { KV } from '@cloudbase/types';
import { ICloudbaseComponent, ICloudbaseHook } from '@cloudbase/types/component';
import { constants } from '@cloudbase/utilities';

const { ERRORS } = constants;

const components:KV<ICloudbaseComponent> = {};

export function registerComponent(app:any,component:ICloudbaseComponent){
  const { name, namespace, entity, injectEvents, IIFE=false } = component;
  // 不允许重复注册或命名空间重名
  if(components[name]||(namespace&&app[namespace])){
    throw new Error(JSON.stringify({
      code: ERRORS.INVALID_OPERATION,
      msg: `Duplicate component ${name}`
    }));
  }
  // IIFE类型的组件以app为scope执行entity函数，不挂载到app.prototype上
  if(IIFE){
    if(!entity||typeof entity !== 'function'){
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: 'IIFE component\'s entity must be a function'
      }));
    }
    entity.call(app);
  }

  components[name] = component;

  if(namespace){
    (app as any).prototype[namespace] = entity;
  }else{
    deepExtend((app as any).prototype,entity);
  }
  if(injectEvents){
    const { bus, events } = injectEvents;
    if(!bus||!events||events.length===0){
      return
    }
    const originCallback = (app as any).prototype.fire || function(){};
    if(!(app as any).prototype.events){
      (app as any).prototype.events = {};
    }
    const originEvents:KV<any> = (app as any).prototype.events || {};
    if(originEvents[name]){
      (app as any).prototype.events[name].events = [...(app as any).prototype.events[name].events,...events];
    }else{
      (app as any).prototype.events[name] = {bus,events};
    }
    (app as any).prototype.fire = function(eventName:string,data?:any){
      originCallback(eventName,data);
      for(const name in this.events){
        const { bus, events:eventList } = this.events[name];
        if(eventList.includes(eventName)){
          bus.fire(eventName,data);
          break;
        }
      }
    }
  }
}

function deepExtend(target:any,source:any):KV<any>{
  if (!(source instanceof Object)) {
    return source;
  }

  switch (source.constructor) {
    case Date:
      const dateValue = source as Date;
      return new Date(dateValue.getTime());
    case Object:
      if (target === undefined) {
        target = {};
      }
      break;
    case Array:
      target = [];
      break;
    default:
      return source;
  }
  for (const key in source) {
    if (!source.hasOwnProperty(key)) {
      continue;
    }
    target[key] = deepExtend(target[key],source[key]);
  }

  return target;
}

export function registerHook(app:any,hook:ICloudbaseHook){
  const { entity, target } = hook;
  if(!app.prototype.hasOwnProperty(target)){
    throw new Error(JSON.stringify({
      code: ERRORS.INVALID_OPERATION,
      msg: `target:${target} is not exist`
    }));
  }
  const originMethod = app.prototype[target];
  if(typeof originMethod !== 'function'){
    throw new Error(JSON.stringify({
      code: ERRORS.INVALID_OPERATION,
      msg: `target:${target} is not a function which is the only type supports hook`
    }));
  }
  app.prototype[target] = function(...args:any){
    entity.call(this,...args);
    return originMethod.call(this,...args);
  }
}