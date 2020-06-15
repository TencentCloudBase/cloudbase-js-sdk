import cloudbase from '@cloudbase/app';
import * as pkg from '../../package.json';
var version = pkg.version;
cloudbase.registerVersion(version);
try {
    window.cloudbase = cloudbase;
}
catch (e) { }
export default cloudbase;
