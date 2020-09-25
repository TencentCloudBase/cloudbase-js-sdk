import { registerFunctions as registerFunctionsOrigin } from '@cloudbase/functions';
import cloudbase from '../../index';

export const registerFunctions = registerFunctionsOrigin as (app:typeof cloudbase)=>void;