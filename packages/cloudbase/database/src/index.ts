import { Db } from '@cloudbase/database';
import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseComponent } from '@cloudbase/types/component';
import cloudbaseNS from '../../index';

declare const cloudbase: ICloudbase;

const COMPONENT_NAME = 'database';

function database(dbConfig?: object) {
  const { adapter, runtime } = this.platform;

  Db.reqClass = this.request.constructor;
  // 未登录情况下传入空函数
  Db.getAccessToken = this.authInstance ? this.authInstance.getAccessToken.bind(this.authInstance) : () => {
    return '';
  };
  Db.runtime = runtime;
  if (this.wsClientClass) {
    Db.wsClass = adapter.wsClass;
    Db.wsClientClass = this.wsClientClass;
  }

  if (!Db.ws) {
    Db.ws = null;
  }

  return new Db({ ...this.config, ...dbConfig });
}

const component: ICloudbaseComponent = {
  name: COMPONENT_NAME,
  entity: {
    database
  }
}
try {
  cloudbase.registerComponent(component);
} catch (e) { }

export function registerDatabase(app: ICloudbase | typeof cloudbaseNS) {
  try {
    app.registerComponent(component);
  } catch (e) {
    console.warn(e);
  }
}