import { registerAuth, registerAuthProvider } from '@cloudbase/auth';
import { WeixinAuthProvider } from '@cloudbase/provider-mp';
registerAuthProvider('weixinAuthProvider', WeixinAuthProvider);
export { registerAuth };
