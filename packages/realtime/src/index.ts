import { ICloudbase } from '@cloudbase/types';
import { RealtimeWebSocketClient } from './websocket-client';
import { setWsClass, setRuntime } from './common';
import { ICloudbaseComponent, ICloudbaseHook } from '@cloudbase/types/component';

declare const cloudbase: ICloudbase;

const hook:ICloudbaseHook = {
  target: 'database',
  entity: function(){
    const { adapter,runtime } = this.platform;
    setWsClass(adapter.wsClass);
    setRuntime(runtime);
  }
}

const component:ICloudbaseComponent = {
  name: 'realtime',
  IIFE: true,
  entity: function(){
    this.prototype.wsClientClass = RealtimeWebSocketClient;
  }
}

try{
  cloudbase.registerComponent(component);
  cloudbase.registerHook(hook);
}catch(e){}

export function registerRealtime(app:Pick<ICloudbase, 'registerComponent'|'registerHook'>){
  try{
    app.registerComponent(component);
    app.registerHook(hook);
  }catch(e){
    console.warn(e);
  }
}