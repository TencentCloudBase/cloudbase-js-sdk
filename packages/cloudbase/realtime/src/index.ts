import { registerRealtime as registerRealtimeOrigin } from '@cloudbase/realtime';
import cloudbase from '../../index';

export const registerRealtime = registerRealtimeOrigin as (app:typeof cloudbase)=>void;
