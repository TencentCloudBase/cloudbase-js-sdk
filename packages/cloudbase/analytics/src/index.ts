import { registerAnalytics as registerAnalyticsOrigin } from '@cloudbase/analytics';
import cloudbase from '../../index';

export const registerAnalytics = registerAnalyticsOrigin as (app: typeof cloudbase) => void;