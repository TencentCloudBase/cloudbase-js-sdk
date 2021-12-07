import { registerAuth as registerAuthOrigin } from '@cloudbase/auth';
import cloudbase from '../../index';

export const registerAuth = registerAuthOrigin as (app: typeof cloudbase) => void;