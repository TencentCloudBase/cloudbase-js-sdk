import { printGroupLog } from "../libs/util";
import { IS_DEBUG_MODE } from "../constants";

interface ICatchErrorsDecoratorOptions {
  mode?: 'sync' | 'async';
  customInfo?: {
    className?: string;
    methodName?: string;
  };
  title?: string;
  messages?: string[];
}
// firefox的stack格式与chrome不同
let isFirefox = false;
if (typeof navigator !== 'undefined' && navigator.userAgent) {
  isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
}
/**
 * decorate在stack中一般都特定的规范
 */
const REG_STACK_DECORATE = isFirefox ?
  /(\.js\/)?__decorate(\$\d+)?<@.*\d$/ :
  /(\/\w+\.js\.)?__decorate(\$\d+)?\s*\(.*\)$/;
const REG_STACK_LINK = /https?\:\/\/.+\:\d*\/.*\.js\:\d+\:\d+/;
/**
 * debug模式强化日志信息
 * @param options
 */
export function catchErrorsDecorator(options: ICatchErrorsDecoratorOptions) {

  const { mode = 'async', customInfo = {}, title, messages = [] } = options;

  return function (
    target: any,
    methodName: string,
    descriptor: TypedPropertyDescriptor<Function>
  ) {
    // 生产环境禁用
    if (!IS_DEBUG_MODE) {
      return;
    }
    const className = customInfo.className || target.constructor.name;
    const fnName = customInfo.methodName || methodName;
    const fn = descriptor.value;

    // 被decorator装饰的源码link
    // 在descriptor.value外部此处创建的stack层次可触达源码
    // 而descriptor.value内部有可能由于stack太深无法触达
    const sourceLink = getSourceLink(new Error());

    if (mode === 'sync') {
      descriptor.value = function (...args: any[]) {
        // 此处的stack作用主要是为了获取被decorator装饰的源码class和method名称
        const innerErr: any = getRewritedError({
          err: new Error(),
          className,
          methodName: fnName,
          sourceLink
        })
        try {
          return fn.apply(this, args);
        } catch (err) {
          let failErr = err;
          const { message: errMsg, error, error_description } = err;
          const logs: any = {
            title: title || `${className}.${fnName} failed`,
            content: [{
              type: 'error',
              body: err
            }]
          }
          // 只特殊处理SDK业务逻辑抛出的错误-JSON string
          if (errMsg && /^\{.*\}$/.test(errMsg)) {
            const msg = JSON.parse(errMsg);
            logs.subtitle = errMsg;
            if (msg.code) {
              if (innerErr) {
                innerErr.code = msg.code;
                innerErr.msg = msg.msg;
              } else {
                err.code = msg.code
                err.message = msg.msg
              }
              failErr = innerErr || err;
              logs.content = messages.map(msg => {
                return {
                  type: 'info',
                  body: msg
                }
              });
            }
          }

          // oauth 错误特殊处理
          if (error && error_description) {
            logs.subtitle = error_description;
            if (innerErr) {
              innerErr.code = error;
              innerErr.msg = error_description;
            } else {
              err.code = error
              err.message = error_description
            }
            failErr = innerErr || err;
            logs.content = messages.map(msg => {
              return {
                type: 'info',
                body: msg
              }
            });
          }
          printGroupLog(logs);
          throw failErr;
        }
      }
    } else {
      descriptor.value = async function (...args: any[]) {
        const innerErr: any = getRewritedError({
          err: new Error(),
          className,
          methodName: fnName,
          sourceLink
        })

        try {
          return await fn.apply(this, args);
        } catch (err) {
          let failErr = err;
          const { message: errMsg, error, error_description } = err;
          const logs: any = {
            title: title || `${className}.${fnName} failed`,
            content: [{
              type: 'error',
              body: err
            }]
          }
          // 只特殊处理SDK业务逻辑抛出的错误-JSON string
          if (errMsg && /^\{.*\}$/.test(errMsg)) {
            const msg = JSON.parse(errMsg);
            logs.subtitle = msg;
            if (msg.code) {
              if (innerErr) {
                innerErr.code = msg.code;
                innerErr.message = msg.msg;
              } else {
                err.code = msg.code
                err.message = msg.msg
              }
              failErr = innerErr || err;
              logs.content = messages.map(msg => {
                return {
                  type: 'info',
                  body: msg
                }
              });
            }
          }

          // oauth 错误特殊处理
          if (error && error_description) {
            logs.subtitle = error_description;
            if (innerErr) {
              innerErr.code = error;
              innerErr.msg = error_description;
            } else {
              err.code = error
              err.message = error_description
            }
            failErr = innerErr || err;
            logs.content = messages.map(msg => {
              return {
                type: 'info',
                body: msg
              }
            });
          }
          printGroupLog(logs);
          throw failErr;
        }
      }
    }

  };
}

/**
 * 在原始堆栈中查找装饰器条目并返回源码链接link
 * @param err
 */
function getSourceLink(err: Error) {
  let sourceLink = '';
  const outterErrStacks = err.stack.split('\n');
  const indexOfDecorator = outterErrStacks.findIndex(str => REG_STACK_DECORATE.test(str));

  if (indexOfDecorator !== -1) {
    const match = REG_STACK_LINK.exec(outterErrStacks[indexOfDecorator + 1] || '');

    sourceLink = match ? match[0] : '';
  }
  return sourceLink;
}

/**
 * 在原始堆栈中查找装饰器条目，剔除其后的无用堆栈，并将链接替换为源码link
 * @param options
 */
function getRewritedError(options: {
  err: Error;
  className: string;
  methodName: string;
  sourceLink: string;
}) {
  const { err, className, methodName, sourceLink } = options;
  // 找不到源码link返回null，后续逻辑将打印原堆栈信息
  if (!sourceLink) {
    return null;
  }

  const innerErrStack = err.stack.split('\n');
  const REG_STACK_INNER_METHOD = isFirefox ?
    /^catchErrorsDecorator\/<\/descriptor.value@.*\d$/ :
    new RegExp(`${className}\\.descriptor.value\\s*\\[as\\s${methodName}\\]\\s*\\(.*\\)$`);
  const REG_STACK_INNER_METHOD_WITHOUT_LINK = isFirefox ?
    /^catchErrorsDecorator\/<\/descriptor.value/ :
    new RegExp(`${className}\\.descriptor.value\\s*\\[as\\s${methodName}\\]`);
  const indexOfSource = innerErrStack.findIndex(str => REG_STACK_INNER_METHOD.test(str));
  let innerErr: Error;
  if (indexOfSource !== -1) {
    // @ts-ignore
    const realErrStack = innerErrStack.filter((v, i) => {
      return i > indexOfSource
    });
    realErrStack.unshift(innerErrStack[indexOfSource]
      .replace(REG_STACK_INNER_METHOD_WITHOUT_LINK, `${className}.${methodName}`)
      .replace(REG_STACK_LINK, sourceLink));
    innerErr = new Error();
    innerErr.stack = `${isFirefox ? '@debugger' : 'Error'}\n${realErrStack.join('\n')}`;
  }
  return innerErr;
}