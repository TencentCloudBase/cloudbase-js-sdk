import cloudbase from '@cloudbase/app';
import { registerAuth } from '@cloudbase/auth';
import { registerFunctions } from '@cloudbase/functions';
import { registerStorage } from '@cloudbase/storage';
import { registerDatabase } from './../database';
import * as pkg from '../package.json';
var version = pkg.version;
cloudbase.registerVersion(version);
try {
    registerAuth(cloudbase);
    registerFunctions(cloudbase);
    registerStorage(cloudbase);
    registerDatabase(cloudbase);
}
catch (e) { }
try {
    window.cloudbase = cloudbase;
}
catch (e) { }
export default cloudbase;
