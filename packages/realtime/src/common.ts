let wsClass = null;
let runtime = 'web';

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