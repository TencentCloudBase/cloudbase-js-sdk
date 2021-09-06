import { ICloudbase } from '@cloudbase/types';
export declare const checkFromAuthV2: (_fromApp: ICloudbase) => Promise<{
    authType: string;
    instance: any;
} | {
    authType?: undefined;
    instance?: undefined;
}>;
