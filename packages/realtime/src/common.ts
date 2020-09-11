import { adapters } from "@cloudbase/utilities";

const { RUNTIME } = adapters;

let wsClass = null;
let runtime = RUNTIME.WEB as string;

export function getWsClass(){
  return wsClass;
}
export function setWsClass(val:any){
  wsClass = val;
}

export function getRuntime(){
  return runtime;
}
export function setRuntime(val:string){
  runtime = val;
}