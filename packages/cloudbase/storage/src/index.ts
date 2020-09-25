import { registerStorage as registerStorageOrigin } from '@cloudbase/storage';
import cloudbase from '../../index';

export const registerStorage = registerStorageOrigin as (app:typeof cloudbase)=>void;