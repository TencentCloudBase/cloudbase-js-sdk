!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("cloudbase_analytics",[],e):"object"==typeof exports?exports.cloudbase_analytics=e():t.cloudbase_analytics=e()}("undefined"!=typeof window?window:this,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6)}([function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.transformPhone=e.sleep=e.printGroupLog=e.throwError=e.printInfo=e.printError=e.printWarn=e.execCallback=e.createPromiseCallback=e.removeParam=e.getHash=e.getQuery=e.toQueryString=e.createSign=e.formatUrl=e.genSeqId=e.isFormData=e.isInstanceOf=e.isNull=e.isPalinObject=e.isUndefined=e.isString=e.isArray=void 0;var o=n(r(11)),i=n(r(14)),a=n(r(15)),s=r(2);function c(t){var e=i.default.stringify(t);return e=(e=(e=e.replace(/=+$/,"")).replace(/\+/g,"-")).replace(/\//g,"_")}e.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},e.isString=function(t){return"string"==typeof t},e.isUndefined=function(t){return void 0===t},e.isPalinObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},e.isNull=function(t){return"[object Null]"===Object.prototype.toString.call(t)},e.isInstanceOf=function(t,e){return t instanceof e},e.isFormData=function(t){return"[object FormData]"===Object.prototype.toString.call(t)},e.genSeqId=function(){return Math.random().toString(16).slice(2)},e.formatUrl=function(t,e,r){void 0===r&&(r={});var n=/\?/.test(e),o="";for(var i in r)""===o?!n&&(e+="?"):o+="&",o+=i+"="+encodeURIComponent(r[i]);return/^http(s)?\:\/\//.test(e+=o)?e:""+t+e},e.createSign=function(t,e){var r=c(a.default.parse(JSON.stringify({alg:"HS256",typ:"JWT"})))+"."+c(a.default.parse(JSON.stringify(t)));return r+"."+c(o.default(r,e))},e.toQueryString=function(t){void 0===t&&(t={});var e=[];for(var r in t)e.push(r+"="+encodeURIComponent(t[r]));return e.join("&")},e.getQuery=function(t,e){if("undefined"==typeof window)return!1;var r=e||window.location.search,n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=r.substr(r.indexOf("?")+1).match(n);return null!=o?o[2]:""},e.getHash=function(t){if("undefined"==typeof window)return"";var e=window.location.hash.match(new RegExp("[#?&/]"+t+"=([^&#]*)"));return e?e[1]:""},e.removeParam=function(t,e){var r=e.split("?")[0],n=[],o=-1!==e.indexOf("?")?e.split("?")[1]:"";if(""!==o){for(var i=(n=o.split("&")).length-1;i>=0;i-=1)n[i].split("=")[0]===t&&n.splice(i,1);r=r+"?"+n.join("&")}return r},e.createPromiseCallback=function(){var t;if(!Promise){(t=function(){}).promise={};var e=function(){throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.')};return Object.defineProperty(t.promise,"then",{get:e}),Object.defineProperty(t.promise,"catch",{get:e}),t}var r=new Promise((function(e,r){t=function(t,n){return t?r(t):e(n)}}));return t.promise=r,t},e.execCallback=function(t,e,r){if(void 0===r&&(r=null),t&&"function"==typeof t)return t(e,r);if(e)throw e;return r},e.printWarn=function(t,e){console.warn("["+s.getSdkName()+"]["+t+"]:"+e)},e.printError=function(t,e){console.error({code:t,msg:"["+s.getSdkName()+"]["+t+"]:"+e})},e.printInfo=function(t,e){console.log("["+s.getSdkName()+"]["+t+"]:"+e)},e.throwError=function(t,e){throw new Error(JSON.stringify({code:t,msg:"["+s.getSdkName()+"]["+t+"]:"+e}))},e.printGroupLog=function(t){var e=t.title,r=t.subtitle,n=void 0===r?"":r,o=t.content,i=void 0===o?[]:o,a=t.printTrace,s=void 0!==a&&a,c=t.collapsed;void 0!==c&&c?console.groupCollapsed(e,n):console.group(e,n);for(var u=0,f=i;u<f.length;u++){var l=f[u],p=l.type,d=l.body;switch(p){case"info":console.log(d);break;case"warn":console.warn(d);break;case"error":console.error(d)}}s&&console.trace("stack trace:"),console.groupEnd()},e.sleep=function(t){return void 0===t&&(t=0),new Promise((function(e){return setTimeout(e,t)}))},e.transformPhone=function(t){return"+86"+t}},function(t,e,r){var n;t.exports=(n=n||function(t,e){var r=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),n={},o=n.lib={},i=o.Base={extend:function(t){var e=r(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=o.WordArray=i.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,o=t.sigBytes;if(this.clamp(),n%4)for(var i=0;i<o;i++){var a=r[i>>>2]>>>24-i%4*8&255;e[n+i>>>2]|=a<<24-(n+i)%4*8}else for(i=0;i<o;i+=4)e[n+i>>>2]=r[i>>>2];return this.sigBytes+=o,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r,n=[],o=function(e){e=e;var r=987654321,n=4294967295;return function(){var o=((r=36969*(65535&r)+(r>>16)&n)<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n;return o/=4294967296,(o+=.5)*(t.random()>.5?1:-1)}},i=0;i<e;i+=4){var s=o(4294967296*(r||t.random()));r=987654071*s(),n.push(4294967296*s()|0)}return new a.init(n,e)}}),s=n.enc={},c=s.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],o=0;o<r;o++){var i=e[o>>>2]>>>24-o%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new a.init(r,e/2)}},u=s.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],o=0;o<r;o++){var i=e[o>>>2]>>>24-o%4*8&255;n.push(String.fromCharCode(i))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new a.init(r,e)}},f=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},l=o.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,n=r.words,o=r.sigBytes,i=this.blockSize,s=o/(4*i),c=(s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0))*i,u=t.min(4*c,o);if(c){for(var f=0;f<c;f+=i)this._doProcessBlock(n,f);var l=n.splice(0,c);r.sigBytes-=u}return new a.init(l,u)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),p=(o.Hasher=l.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new p.HMAC.init(t,r).finalize(e)}}}),n.algo={});return n}(Math),n)},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||e.hasOwnProperty(r)||n(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),e.OATUH_LOGINTYPE=void 0,o(r(4),e),o(r(8),e),e.OATUH_LOGINTYPE="constants"},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.hasOwnProperty.call(t,r)&&n(e,t,r);return o(e,t),e},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.jwt=e.helpers=e.utils=e.events=e.cache=e.adapters=e.constants=void 0;var s=i(r(2));e.constants=s;var c=i(r(9));e.adapters=c;var u=i(r(16));e.cache=u;var f=i(r(18));e.events=f;var l=i(r(0));e.utils=l;var p=i(r(19));e.helpers=p;var d={decode:a(r(21)).default};e.jwt=d},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.COMMUNITY_SITE_URL=e.IS_DEBUG_MODE=e.getProtocol=e.setProtocol=e.getSdkName=e.setSdkName=void 0;var n="@cloudbase/js-sdk";e.setSdkName=function(t){n=t},e.getSdkName=function(){return n};var o="https:";e.setProtocol=function(t){o=t},e.getProtocol=function(){return o},e.IS_DEBUG_MODE=!1,e.COMMUNITY_SITE_URL="https://support.qq.com/products/148793"},function(t,e,r){"use strict";var n;r.r(e),r.d(e,"StorageType",(function(){return n})),r.d(e,"AbstractSDKRequest",(function(){return o})),r.d(e,"AbstractStorage",(function(){return i})),r.d(e,"formatUrl",(function(){return a})),function(t){t.local="local",t.none="none",t.session="session"}(n||(n={}));var o=function(){},i=function(){};function a(t,e,r){void 0===r&&(r={});var n=/\?/.test(e),o="";for(var i in r)""===o?!n&&(e+="?"):o+="&",o+=i+"="+encodeURIComponent(r[i]);return/^http(s)?\:\/\//.test(e+=o)?e:""+t+e}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.registerAnalytics=void 0;var n=r(7);e.registerAnalytics=n.registerAnalytics},function(t,e,r){"use strict";r.r(e),r.d(e,"registerAnalytics",(function(){return d}));var n=r(3),o=function(t,e,r,n){var o,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,r,a):o(e,r))||a);return i>3&&a&&Object.defineProperty(e,r,a),a},i=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},a=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},s=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},c=n.constants.ERRORS,u=n.constants.COMMUNITY_SITE_URL,f=n.helpers.catchErrorsDecorator,l=["mall"];var p={name:"analytics",entity:{analytics:(new(function(){function t(){}return t.prototype.analytics=function(t){return a(this,void 0,void 0,(function(){var e,r,n;return s(this,(function(o){if(!function(t){if("Object"!==Object.prototype.toString.call(t).slice(8,-1))return!1;var e=t.report_data,r=t.report_type;return!1!==l.includes(r)&&("Object"===Object.prototype.toString.call(e).slice(8,-1)&&(!(void 0!==e.action_time&&!Number.isInteger(e.action_time))&&"string"==typeof e.action_type))}(t))throw new Error(JSON.stringify({code:c.INVALID_PARAMS,msg:"[analytics.analytics] invalid report data"}));return"analytics.report",e=void 0===t.report_data.action_time?Math.floor(Date.now()/1e3):t.report_data.action_time,r={analytics_scene:t.report_type,analytics_data:Object.assign({},t.report_data,{action_time:e})},n={requestData:r},this.request.send("analytics.report",n),[2]}))}))},o([f({customInfo:{className:"Cloudbase",methodName:"analytics"},title:"上报调用失败",messages:["请确认以下各项：","  1 - 调用 analytics() 的语法或参数是否正确","如果问题依然存在，建议到官方问答社区提问或寻找帮助："+u]}),i("design:type",Function),i("design:paramtypes",[Object]),i("design:returntype",Promise)],t.prototype,"analytics",null),t}())).analytics}};try{cloudbase.registerComponent(p)}catch(t){}function d(t){try{t.registerComponent(p)}catch(t){console.warn(t)}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ERRORS=void 0,e.ERRORS={INVALID_PARAMS:"INVALID_PARAMS",INVALID_SYNTAX:"INVALID_SYNTAX",INVALID_OPERATION:"INVALID_OPERATION",OPERATION_FAIL:"OPERATION_FAIL",NETWORK_ERROR:"NETWORK_ERROR",UNKOWN_ERROR:"UNKOWN_ERROR"}},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.hasOwnProperty.call(t,r)&&n(e,t,r);return o(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.useDefaultAdapter=e.useAdapters=e.RUNTIME=void 0;var a,s=i(r(10)),c=r(0);!function(t){t.WEB="web",t.WX_MP="wx_mp"}(a=e.RUNTIME||(e.RUNTIME={})),e.useAdapters=function(t){for(var e=0,r=c.isArray(t)?t:[t];e<r.length;e++){var n=r[e],o=n.isMatch,i=n.genAdapter,a=n.runtime;if(o())return{adapter:i(),runtime:a}}},e.useDefaultAdapter=function(){return{adapter:s.genAdapter(),runtime:a.WEB}}},function(t,e,r){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},a=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},s=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.WebRequest=e.genAdapter=void 0;var c=r(5),u=r(0),f=r(4),l=function(t){function e(e){var r=t.call(this)||this,n=e.timeout,o=e.timeoutMsg,i=e.restrictedMethods;return r._timeout=n||0,r._timeoutMsg=o||"请求超时",r._restrictedMethods=i||["get","post","upload","download"],r}return o(e,t),e.prototype.get=function(t){return this._request(i(i({},t),{method:"get"}),this._restrictedMethods.includes("get"))},e.prototype.post=function(t){return this._request(i(i({},t),{method:"post"}),this._restrictedMethods.includes("post"))},e.prototype.put=function(t){return this._request(i(i({},t),{method:"put"}))},e.prototype.upload=function(t){var e=t.data,r=t.file,n=t.name,o=new FormData;for(var a in e)o.append(a,e[a]);return o.append("key",n),o.append("file",r),this._request(i(i({},t),{data:o,method:"post"}),this._restrictedMethods.includes("upload"))},e.prototype.download=function(t){return a(this,void 0,void 0,(function(){var e,r,n,o;return s(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,this.get(i(i({},t),{headers:{},responseType:"blob"}))];case 1:return e=a.sent().data,r=window.URL.createObjectURL(new Blob([e])),n=decodeURIComponent(new URL(t.url).pathname.split("/").pop()||""),(o=document.createElement("a")).href=r,o.setAttribute("download",n),o.style.display="none",document.body.appendChild(o),o.click(),window.URL.revokeObjectURL(r),document.body.removeChild(o),[3,3];case 2:return a.sent(),[3,3];case 3:return[2,new Promise((function(e){e({statusCode:200,tempFilePath:t.url})}))]}}))}))},e.prototype._request=function(t,e){var r=this;void 0===e&&(e=!1);var n=String(t.method).toLowerCase()||"get";return new Promise((function(o){var i,a,s=t.url,c=t.headers,l=void 0===c?{}:c,p=t.data,d=t.responseType,h=t.withCredentials,v=t.body,y=t.onUploadProgress,g=u.formatUrl(f.getProtocol(),s,"get"===n?p:{}),_=new XMLHttpRequest;for(var m in _.open(n,g),d&&(_.responseType=d),l)_.setRequestHeader(m,l[m]);y&&_.upload.addEventListener("progress",y),_.onreadystatechange=function(){var t={};if(4===_.readyState){var e=_.getAllResponseHeaders().trim().split(/[\r\n]+/),r={};e.forEach((function(t){var e=t.split(": "),n=e.shift().toLowerCase(),o=e.join(": ");r[n]=o})),t.header=r,t.statusCode=_.status;try{t.data="blob"===d?_.response:JSON.parse(_.responseText)}catch(e){t.data="blob"===d?_.response:_.responseText}clearTimeout(i),o(t)}},e&&r._timeout&&(i=setTimeout((function(){console.warn(r._timeoutMsg),_.abort()}),r._timeout)),a=u.isFormData(p)?p:"application/x-www-form-urlencoded"===l["content-type"]?u.toQueryString(p):v||(p?JSON.stringify(p):void 0),h&&(_.withCredentials=!0),_.send(a)}))},e}(c.AbstractSDKRequest);e.WebRequest=l,e.genAdapter=function(){return{root:window,reqClass:l,wsClass:WebSocket,localStorage:localStorage}}},function(t,e,r){var n;t.exports=(n=r(1),r(12),r(13),n.HmacSHA256)},function(t,e,r){var n;t.exports=(n=r(1),function(t){var e=n,r=e.lib,o=r.WordArray,i=r.Hasher,a=e.algo,s=[],c=[];!function(){function e(e){for(var r=t.sqrt(e),n=2;n<=r;n++)if(!(e%n))return!1;return!0}function r(t){return 4294967296*(t-(0|t))|0}for(var n=2,o=0;o<64;)e(n)&&(o<8&&(s[o]=r(t.pow(n,.5))),c[o]=r(t.pow(n,1/3)),o++),n++}();var u=[],f=a.SHA256=i.extend({_doReset:function(){this._hash=new o.init(s.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,n=r[0],o=r[1],i=r[2],a=r[3],s=r[4],f=r[5],l=r[6],p=r[7],d=0;d<64;d++){if(d<16)u[d]=0|t[e+d];else{var h=u[d-15],v=(h<<25|h>>>7)^(h<<14|h>>>18)^h>>>3,y=u[d-2],g=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;u[d]=v+u[d-7]+g+u[d-16]}var _=n&o^n&i^o&i,m=(n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22),b=p+((s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25))+(s&f^~s&l)+c[d]+u[d];p=l,l=f,f=s,s=a+b|0,a=i,i=o,o=n,n=b+(m+_)|0}r[0]=r[0]+n|0,r[1]=r[1]+o|0,r[2]=r[2]+i|0,r[3]=r[3]+a|0,r[4]=r[4]+s|0,r[5]=r[5]+f|0,r[6]=r[6]+l|0,r[7]=r[7]+p|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,o=8*e.sigBytes;return r[o>>>5]|=128<<24-o%32,r[14+(o+64>>>9<<4)]=t.floor(n/4294967296),r[15+(o+64>>>9<<4)]=n,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=i._createHelper(f),e.HmacSHA256=i._createHmacHelper(f)}(Math),n.SHA256)},function(t,e,r){var n,o,i,a;t.exports=(n=r(1),i=(o=n).lib.Base,a=o.enc.Utf8,void(o.algo.HMAC=i.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=a.parse(e));var r=t.blockSize,n=4*r;e.sigBytes>n&&(e=t.finalize(e)),e.clamp();for(var o=this._oKey=e.clone(),i=this._iKey=e.clone(),s=o.words,c=i.words,u=0;u<r;u++)s[u]^=1549556828,c[u]^=909522486;o.sigBytes=i.sigBytes=n,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,r=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(r))}})))},function(t,e,r){var n,o,i;t.exports=(i=r(1),o=(n=i).lib.WordArray,n.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp();for(var o=[],i=0;i<r;i+=3)for(var a=(e[i>>>2]>>>24-i%4*8&255)<<16|(e[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|e[i+2>>>2]>>>24-(i+2)%4*8&255,s=0;s<4&&i+.75*s<r;s++)o.push(n.charAt(a>>>6*(3-s)&63));var c=n.charAt(64);if(c)for(;o.length%4;)o.push(c);return o.join("")},parse:function(t){var e=t.length,r=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var i=0;i<r.length;i++)n[r.charCodeAt(i)]=i}var a=r.charAt(64);if(a){var s=t.indexOf(a);-1!==s&&(e=s)}return function(t,e,r){for(var n=[],i=0,a=0;a<e;a++)if(a%4){var s=r[t.charCodeAt(a-1)]<<a%4*2,c=r[t.charCodeAt(a)]>>>6-a%4*2;n[i>>>2]|=(s|c)<<24-i%4*8,i++}return o.create(n,i)}(t,e,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},i.enc.Base64)},function(t,e,r){var n;t.exports=(n=r(1),n.enc.Utf8)},function(t,e,r){"use strict";(function(t){var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},a=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.CloudbaseCache=void 0;var s=r(5),c=r(0),u=r(2),f=function(t){function e(e){var r=t.call(this)||this;return r._root=e,e.tcbCacheObject||(e.tcbCacheObject={}),r}return o(e,t),e.prototype.setItem=function(t,e){this._root.tcbCacheObject[t]=e},e.prototype.getItem=function(t){return this._root.tcbCacheObject[t]},e.prototype.removeItem=function(t){delete this._root.tcbCacheObject[t]},e.prototype.clear=function(){delete this._root.tcbCacheObject},e}(s.AbstractStorage);var l=function(){function e(t){this.keys={};var e=t.persistence,r=t.platformInfo,n=void 0===r?{}:r,o=t.keys,i=void 0===o?{}:o;this._platformInfo=n,this._storage||(this._persistence=this._platformInfo.adapter.primaryStorage||e,this._storage=function(t,e){switch(t){case"local":return e.localStorage?e.localStorage:(c.printWarn(u.ERRORS.INVALID_PARAMS,"localStorage is not supported on current platform"),new f(e.root));case"none":return new f(e.root);default:return e.localStorage?e.localStorage:(c.printWarn(u.ERRORS.INVALID_PARAMS,"localStorage is not supported on current platform"),new f(e.root))}}(this._persistence,this._platformInfo.adapter),this.keys=i)}return Object.defineProperty(e.prototype,"mode",{get:function(){return this._storage.mode||"sync"},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"persistence",{get:function(){return this._persistence},enumerable:!1,configurable:!0}),e.prototype.setStore=function(t,e,r){if("async"!==this.mode){if(this._storage)try{var n={version:r||"localCachev1",content:e};this._storage.setItem(t,JSON.stringify(n))}catch(t){throw new Error(JSON.stringify({code:u.ERRORS.OPERATION_FAIL,msg:"["+u.getSdkName()+"]["+u.ERRORS.OPERATION_FAIL+"]setStore failed",info:t}))}}else c.printWarn(u.ERRORS.INVALID_OPERATION,"current platform's storage is asynchronous, please use setStoreAsync insteed")},e.prototype.setStoreAsync=function(t,e,r){return i(this,void 0,void 0,(function(){var n;return a(this,(function(o){switch(o.label){case 0:if(!this._storage)return[2];o.label=1;case 1:return o.trys.push([1,3,,4]),n={version:r||"localCachev1",content:e},[4,this._storage.setItem(t,JSON.stringify(n))];case 2:return o.sent(),[3,4];case 3:return o.sent(),[2];case 4:return[2]}}))}))},e.prototype.getStore=function(e,r){var n;if("async"!==this.mode){try{if(void 0!==t&&(null===(n=t.env)||void 0===n?void 0:n.tcb_token))return t.env.tcb_token;if(!this._storage)return""}catch(t){return""}r=r||"localCachev1";var o=this._storage.getItem(e);return o&&o.indexOf(r)>=0?JSON.parse(o).content:""}c.printWarn(u.ERRORS.INVALID_OPERATION,"current platform's storage is asynchronous, please use getStoreAsync insteed")},e.prototype.getStoreAsync=function(e,r){var n;return i(this,void 0,void 0,(function(){var o;return a(this,(function(i){switch(i.label){case 0:try{if(void 0!==t&&(null===(n=t.env)||void 0===n?void 0:n.tcb_token))return[2,t.env.tcb_token];if(!this._storage)return[2,""]}catch(t){return[2,""]}return r=r||"localCachev1",[4,this._storage.getItem(e)];case 1:return(o=i.sent())&&o.indexOf(r)>=0?[2,JSON.parse(o).content]:[2,""]}}))}))},e.prototype.removeStore=function(t){"async"!==this.mode?this._storage.removeItem(t):c.printWarn(u.ERRORS.INVALID_OPERATION,"current platform's storage is asynchronous, please use removeStoreAsync insteed")},e.prototype.removeStoreAsync=function(t){return i(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,this._storage.removeItem(t)];case 1:return e.sent(),[2]}}))}))},e}();e.CloudbaseCache=l}).call(this,r(17))},function(t,e){var r,n,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(t){r=i}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(t){n=a}}();var c,u=[],f=!1,l=-1;function p(){f&&c&&(f=!1,c.length?u=c.concat(u):l=-1,u.length&&d())}function d(){if(!f){var t=s(p);f=!0;for(var e=u.length;e;){for(c=u,u=[];++l<e;)c&&c[l].run();l=-1,e=u.length}c=null,f=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function h(t,e){this.fun=t,this.array=e}function v(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new h(t,e)),1!==u.length||f||s(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e,r){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__spreadArrays||function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<r;e++)for(var i=arguments[e],a=0,s=i.length;a<s;a++,o++)n[o]=i[a];return n};Object.defineProperty(e,"__esModule",{value:!0}),e.removeEventListener=e.activateEvent=e.addEventListener=e.CloudbaseEventEmitter=e.IErrorEvent=e.CloudbaseEvent=void 0;var a=r(0);var s=function(t,e){this.data=e||null,this.name=t};e.CloudbaseEvent=s;var c=function(t){function e(e,r){var n=t.call(this,"error",{error:e,data:r})||this;return n.error=e,n}return o(e,t),e}(s);e.IErrorEvent=c;var u=function(){function t(){this._listeners={}}return t.prototype.on=function(t,e){return function(t,e,r){r[t]=r[t]||[],r[t].push(e)}(t,e,this._listeners),this},t.prototype.off=function(t,e){return function(t,e,r){if(null==r?void 0:r[t]){var n=r[t].indexOf(e);-1!==n&&r[t].splice(n,1)}}(t,e,this._listeners),this},t.prototype.fire=function(t,e){if(a.isInstanceOf(t,c))return console.error(t.error),this;var r=a.isString(t)?new s(t,e||{}):t,n=r.name;if(this._listens(n)){r.target=this;for(var o=0,u=this._listeners[n]?i(this._listeners[n]):[];o<u.length;o++){u[o].call(this,r)}}return this},t.prototype._listens=function(t){return this._listeners[t]&&this._listeners[t].length>0},t}();e.CloudbaseEventEmitter=u;var f=new u;e.addEventListener=function(t,e){f.on(t,e)},e.activateEvent=function(t,e){void 0===e&&(e={}),f.fire(t,e)},e.removeEventListener=function(t,e){f.off(t,e)}},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||e.hasOwnProperty(r)||n(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),o(r(20),e)},function(t,e,r){"use strict";var n=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{c(n.next(t))}catch(t){i(t)}}function s(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}c((n=n.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.catchErrorsDecorator=void 0;var i=r(0),a=r(2),s=!1;"undefined"!=typeof navigator&&navigator.userAgent&&(s=-1!==navigator.userAgent.indexOf("Firefox"));var c=s?/(\.js\/)?__decorate(\$\d+)?<@.*\d$/:/(\/\w+\.js\.)?__decorate(\$\d+)?\s*\(.*\)$/,u=/https?\:\/\/.+\:\d*\/.*\.js\:\d+\:\d+/;function f(t){var e=t.err,r=t.className,n=t.methodName,o=t.sourceLink;if(!o)return null;var i,a=e.stack.split("\n"),c=s?/^catchErrorsDecorator\/<\/descriptor.value@.*\d$/:new RegExp(r+"\\.descriptor.value\\s*\\[as\\s"+n+"\\]\\s*\\(.*\\)$"),f=s?/^catchErrorsDecorator\/<\/descriptor.value/:new RegExp(r+"\\.descriptor.value\\s*\\[as\\s"+n+"\\]"),l=a.findIndex((function(t){return c.test(t)}));if(-1!==l){var p=a.filter((function(t,e){return e>l}));p.unshift(a[l].replace(f,r+"."+n).replace(u,o)),(i=new Error).stack=(s?"@debugger":"Error")+"\n"+p.join("\n")}return i}e.catchErrorsDecorator=function(t){var e=t.mode,r=void 0===e?"async":e,s=t.customInfo,l=void 0===s?{}:s,p=t.title,d=t.messages,h=void 0===d?[]:d;return function(t,e,s){if(a.IS_DEBUG_MODE){var d=l.className||t.constructor.name,v=l.methodName||e,y=s.value,g=function(t){var e="",r=t.stack.split("\n"),n=r.findIndex((function(t){return c.test(t)}));if(-1!==n){var o=u.exec(r[n+1]||"");e=o?o[0]:""}return e}(new Error);s.value="sync"===r?function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=f({err:new Error,className:d,methodName:v,sourceLink:g});try{return y.apply(this,t)}catch(t){var n=t,o=t.message,a=t.error,s=t.error_description,c={title:p||d+"."+v+" failed",content:[{type:"error",body:t}]};if(o&&/^\{.*\}$/.test(o)){var u=JSON.parse(o);c.subtitle=o,u.code&&(r?(r.code=u.code,r.msg=u.msg):(t.code=u.code,t.message=u.msg),n=r||t,c.content=h.map((function(t){return{type:"info",body:t}})))}throw a&&s&&(c.subtitle=s,r?(r.code=a,r.msg=s):(t.code=a,t.message=s),n=r||t,c.content=h.map((function(t){return{type:"info",body:t}}))),i.printGroupLog(c),n}}:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return n(this,void 0,void 0,(function(){var e,r,n,a,s,c,u,l;return o(this,(function(o){switch(o.label){case 0:e=f({err:new Error,className:d,methodName:v,sourceLink:g}),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,y.apply(this,t)];case 2:return[2,o.sent()];case 3:throw r=o.sent(),n=r,a=r.message,s=r.error,c=r.error_description,u={title:p||d+"."+v+" failed",content:[{type:"error",body:r}]},a&&/^\{.*\}$/.test(a)&&(l=JSON.parse(a),u.subtitle=l,l.code&&(e?(e.code=l.code,e.message=l.msg):(r.code=l.code,r.message=l.msg),n=e||r,u.content=h.map((function(t){return{type:"info",body:t}})))),s&&c&&(u.subtitle=c,e?(e.code=s,e.msg=c):(r.code=s,r.message=c),n=e||r,u.content=h.map((function(t){return{type:"info",body:t}}))),i.printGroupLog(u),n;case 4:return[2]}}))}))}}}}},function(t,e,r){"use strict";function n(t){this.message=t}r.r(e),r.d(e,"InvalidTokenError",(function(){return a})),n.prototype=new Error,n.prototype.name="InvalidCharacterError";var o="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(t){var e=String(t).replace(/=+$/,"");if(e.length%4==1)throw new n("'atob' failed: The string to be decoded is not correctly encoded.");for(var r,o,i=0,a=0,s="";o=e.charAt(a++);~o&&(r=i%4?64*r+o:o,i++%4)?s+=String.fromCharCode(255&r>>(-2*i&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return s};function i(t){var e=t.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw"Illegal base64url string!"}try{return function(t){return decodeURIComponent(o(t).replace(/(.)/g,(function(t,e){var r=e.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r})))}(e)}catch(t){return o(e)}}function a(t){this.message=t}a.prototype=new Error,a.prototype.name="InvalidTokenError",e.default=function(t,e){if("string"!=typeof t)throw new a("Invalid token specified");var r=!0===(e=e||{}).header?0:1;try{return JSON.parse(i(t.split(".")[r]))}catch(t){throw new a("Invalid token specified: "+t.message)}}}])}));