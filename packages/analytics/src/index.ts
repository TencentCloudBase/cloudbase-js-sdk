import { ICloudbase } from '@cloudbase/types';
import { ICloudbaseComponent } from '@cloudbase/types/component';
import { IReportData,IAnalyticsDataItem } from '@cloudbase/types/analytics';
import { constants,helpers } from '@cloudbase/utilities';

declare const cloudbase: ICloudbase;

const { ERRORS,COMMUNITY_SITE_URL } = constants;
const { catchErrorsDecorator } = helpers;

const COMPONENT_NAME = 'analytics';

const reportTypes = ['mall']

function validateAnalyticsData(data: IReportData): boolean {
  if(Object.prototype.toString.call(data).slice(8,-1) !== 'Object') {
    return false
  }

  const { report_data,report_type } = data

  if(reportTypes.includes(report_type) === false) {
    return false
  }

  if(Object.prototype.toString.call(report_data).slice(8,-1) !== 'Object') {
    return false
  }

  if(report_data.action_time !== undefined && !Number.isInteger(report_data.action_time)) {
    return false
  }

  if(typeof report_data.action_type !== 'string') {
    return false
  }
  return true
}

class CloudbaseAnalytics {
  @catchErrorsDecorator({
    customInfo: {
      className: 'Cloudbase',
      methodName: 'analytics'
    },
    title: '上报调用失败',
    messages: [
      '请确认以下各项：',
      '  1 - 调用 analytics() 的语法或参数是否正确',
      `如果问题依然存在，建议到官方问答社区提问或寻找帮助：${COMMUNITY_SITE_URL}`
    ]
  })
  public async analytics(requestData: IReportData) {
    if(!validateAnalyticsData(requestData)) {
      throw new Error(JSON.stringify({
        code: ERRORS.INVALID_PARAMS,
        msg: `[${COMPONENT_NAME}.analytics] invalid report data`
      }))
    }

    const action = 'analytics.report';

    const action_time = requestData.report_data.action_time === undefined ? Math.floor(Date.now() / 1000) : requestData.report_data.action_time
    const transformData: IAnalyticsDataItem = {
      analytics_scene: requestData.report_type,
      analytics_data: Object.assign({},requestData.report_data,{
        action_time
      })
    }

    const params = {
      requestData: transformData
    };
    // @ts-ignore
    const request = this.request;

    request.send(action,params);
  }
}

const cloudbaseAnalytics = new CloudbaseAnalytics();

const component: ICloudbaseComponent = {
  name: COMPONENT_NAME,
  entity: {
    analytics: cloudbaseAnalytics.analytics
  }
}
try {
  cloudbase.registerComponent(component);
} catch(e) { }

export function registerAnalytics(app: Pick<ICloudbase,'registerComponent'>) {
  try {
    app.registerComponent(component);
  } catch(e) {
    console.warn(e);
  }
}