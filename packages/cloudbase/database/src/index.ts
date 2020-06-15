import { Db } from '@cloudbase/database';
import { constants,adapters,utils } from '@cloudbase/utilities';
import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseComponent } from '@cloudbase/types/component';

declare const cloudbase: ICloudbase;

const { SDK_NAME,ERRORS } = constants;
const { RUNTIME } = adapters;
const { createSign } = utils;

const COMPONENT_NAME = 'database';
const DATA_VERSION = '2020-01-10';

function database(dbConfig?: object) {
  if (!this.authInstance) {
    console.warn(`[${SDK_NAME}][${ERRORS.INVALID_OPERATION}] not login `);
    return;
  }

  const { adapter,runtime } = this.platform;
  
  Db.reqClass = this.request.constructor;
  
  Db.wsClass = adapter.wsClass;
  Db.getAccessToken = this.authInstance.getAccessToken.bind(this.authInstance);
  Db.runtime = runtime;

  if (runtime !== RUNTIME.WEB) {
    Db.dataVersion = DATA_VERSION;
    Db.createSign = createSign;

    Db.appSecretInfo = {
      appSign: this.config.appSign,
      ...this.config.appSecret
    };
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