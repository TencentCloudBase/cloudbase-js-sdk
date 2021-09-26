import {initializeClient} from '@cloudbase/cloudbase';
import {getFunction} from './function/function';

export const config = {
    apiOrigin: "https://xbase-4gh5dh6nf62145a9.ap-shanghai.tcb-api.tencentcloudapi.com",
    clientId: "xbase-4gh5dh6nf62145a9",
};
const client = initializeClient(config);
const fn = getFunction(client.app);

export {client, fn}
