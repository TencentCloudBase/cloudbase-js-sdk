import { Db } from '@cloudbase/database';
import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseComponent } from '@cloudbase/types/component';

declare const cloudbase: ICloudbase;

const COMPONENT_NAME = 'database';

function database(dbConfig?: object) {
  // if (!this.authInstance) {
  //   console.warn(`[${getSdkName()}][${ERRORS.INVALID_OPERATION}] not login `);
  //   return;
  // }

  const { adapter,runtime } = this.platform;
  
  Db.reqClass = this.request.constructor;
  
  Db.getAccessToken = this.authInstance.getAccessToken.bind(this.authInstance);
  Db.runtime = runtime;
  if(this.wsClientClass){
    Db.wsClass = adapter.wsClass;
    Db.wsClientClass = this.wsClientClass;
  }

  if (!Db.ws) {
    Db.ws = null;
  }

  return new Db({ ...this.config, ...dbConfig });
}

const component:ICloudbaseComponent = {
  name: COMPONENT_NAME,
  entity: {
    database
  }
}
try{
  cloudbase.registerComponent(component);
}catch(e){}

export function registerDatabase(app:ICloudbase){
  app.registerComponent(component);
}