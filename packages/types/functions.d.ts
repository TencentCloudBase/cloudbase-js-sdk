import { KV } from ".";

export interface ICallFunctionOptions {
  name: string;
  data?: KV<any>;
  query?: KV<any>;
  search?: string;
  parse?: boolean;
}

export interface ICallFunctionResponse {
  requestId: string;
  result: any;
}

export interface ICallFunction{
  (options: ICallFunctionOptions,callback?: Function):Promise<ICallFunctionResponse>;
}