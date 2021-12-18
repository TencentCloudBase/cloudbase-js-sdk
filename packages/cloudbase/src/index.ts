import cloudbase from '../app';
import { registerAuth } from '@cloudbase/auth';
import { registerFunctions } from '@cloudbase/functions';
import { registerStorage } from '@cloudbase/storage';
import { registerRealtime } from '@cloudbase/realtime';
import { registerAnalytics } from '@cloudbase/analytics'
// @ts-ignore
import { registerDatabase } from './../database';

try {
  registerAuth(cloudbase);
  registerFunctions(cloudbase);
  registerStorage(cloudbase);
  registerDatabase(cloudbase);
  registerRealtime(cloudbase);
  registerAnalytics(cloudbase)
} catch(e) { }

// @ts-ignore
export = cloudbase;
export default cloudbase;