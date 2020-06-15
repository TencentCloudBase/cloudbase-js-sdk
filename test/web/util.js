// test util
import * as assert from 'power-assert';

window['testCaseList'] = [];
let totalTestNum = 0;
let errorNum = 0;

export function register(msg, fn) {
  window['testCaseList'].push({
    msg,
    fn
  });
}

export async function runSelectedTestCase(i) {
  let { msg, fn } = window['testCaseList'][i];
  printPengding(`Testing: ${msg}`);

  await fn();

  printInfo(`Test case finish: ${msg}`);
}

export async function runAllTestCases() {
  totalTestNum = window['testCaseList'].length;
  errorNum = 0;

  for (let i = 0; i < window['testCaseList'].length; i++) {
    await runSelectedTestCase(i);
  }
  printSuccess(`All test cases end, ${errorNum} errors in total ${totalTestNum} test cases.`);
}

export function isSuccess(err, res) {
  return err !== null || err !== 0 || (res && res.code);
}

export function catchCallback(e) {
  if (e instanceof assert.AssertionError) {
    printError('Test failed: ', e.message, e.stack);
  } else {
    printError('Test failed: ', e);
  }
  errorNum++;
}

export function callbackWithTryCatch(callback, finallyCallback) {
  return function () {
    try {
      callback.apply(this, arguments);
    } catch (e) {
      catchCallback(e);
    } finally {
      if (finallyCallback) {
        finallyCallback();
      }
    }
  };
}


export function printWarn(msg){
  console.log(`${String.fromCodePoint(0x26a0)} ${msg}`);
}
export function printError(msg,stack){
  console.error(`${String.fromCodePoint(0x1f6ab)} ${msg} ${stack||''}`);
}
export function printPengding(msg){
  console.log(`${String.fromCodePoint(0x1f50e)} ${msg}`);
}
export function printSuccess(msg){
  console.log(`${String.fromCodePoint(0x2705)} ${msg}`);
}
export function printInfo(msg){
  console.log(`${String.fromCodePoint(0x1f9f7)} ${msg}`);
}