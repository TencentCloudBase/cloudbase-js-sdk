import { CloudbaseAdapter } from '@cloudbase/adapter-interface';
import * as Web from './platforms/web';
import { isArray } from '../libs/util';

export enum RUNTIME {
  WEB = 'web',
  WX_MP = 'wx_mp' // 微信小程序
}

export function useAdapters(adapters: CloudbaseAdapter|CloudbaseAdapter[]) {
  const adapterList: CloudbaseAdapter[] = isArray(adapters) ? adapters as CloudbaseAdapter[] : [adapters as CloudbaseAdapter];
  for (const adapter of adapterList) {
    const { isMatch, genAdapter, runtime } = adapter;
    if (isMatch()) {
      return {
        adapter: genAdapter(),
        runtime
      };
    }
  }
}

export function useDefaultAdapter() {
  return {
    adapter: Web.genAdapter(),
    runtime: RUNTIME.WEB
  };
}
