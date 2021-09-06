import { registerOAuth as registerOAuthOrigin } from '@cloudbase/oauth';
import cloudbase from '../../index';

export const registerOAuth = registerOAuthOrigin as (app: typeof cloudbase) => void;