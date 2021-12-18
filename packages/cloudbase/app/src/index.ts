import cloudbase from '@cloudbase/app';
import pkg from '../../package.json';
import { ICloudbase } from '@cloudbase/types';

cloudbase.registerVersion(pkg.version);

declare global {
  interface Window {
    cloudbase: ICloudbase;
  }
}
try{
  (window as Window).cloudbase = cloudbase;
}catch(e){}
// @ts-ignore
export = cloudbase;
export default cloudbase;