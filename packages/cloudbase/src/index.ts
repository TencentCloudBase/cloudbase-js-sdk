import cloudbase from '@cloudbase/app';
import { registerAuth } from '@cloudbase/auth';
import { registerFunctions } from '@cloudbase/functions';
import { registerStorage } from '@cloudbase/storage';
import { registerRealtime } from '@cloudbase/realtime';
import { registerAnalytics } from '@cloudbase/analytics'
// @ts-ignore
import { registerDatabase } from './../database';
import pkg from '../package.json';
import { ICloudbase } from '@cloudbase/types';


const { version } = pkg;
cloudbase.registerVersion(version);

try {
  registerAuth(cloudbase);
  registerFunctions(cloudbase);
  registerStorage(cloudbase);
  registerDatabase(cloudbase);
  registerRealtime(cloudbase);
  registerAnalytics(cloudbase)
} catch (e) { }

declare global {
  interface Window {
    cloudbase: ICloudbase;
  }
}
try {
  (window as Window).cloudbase = cloudbase;
} catch (e) { }
// @ts-ignore
export = cloudbase;
export default cloudbase;