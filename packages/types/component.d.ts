import { ICloudbaseEventEmitter } from './events';

export interface ICloudbaseComponent {
  name: string;
  namespace?:string;
  entity:any;
  injectEvents?:{
    bus: ICloudbaseEventEmitter,
    events: string[];
  };
}