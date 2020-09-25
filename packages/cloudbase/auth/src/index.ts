import { registerAuth as registerAuthOrigin, registerProvider as registerProviderOrigin } from '@cloudbase/auth';
import cloudbase from '../../index';

export const registerAuth = registerAuthOrigin as (app:typeof cloudbase)=>void;
export const registerProvider = registerProviderOrigin as (name:string,provider:any)=>void;