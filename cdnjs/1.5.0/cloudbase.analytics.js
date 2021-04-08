!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("cloudbase_analytics",[],e):"object"==typeof exports?exports.cloudbase_analytics=e():t.cloudbase_analytics=e()}("undefined"!=typeof window?window:this,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6)}([function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.transformPhone=e.sleep=e.printGroupLog=e.throwError=e.printInfo=e.printError=e.printWarn=e.execCallback=e.createPromiseCallback=e.removeParam=e.getHash=e.getQuery=e.toQueryString=e.createSign=e.formatUrl=e.genSeqId=e.isFormData=e.isInstanceOf=e.isNull=e.isPalinObject=e.isUndefined=e.isString=e.isArray=void 0;var o=n(r(11)),i=n(r(14)),s=n(r(15)),a=r(2);function c(t){var e=i.default.stringify(t);return e=(e=(e=e.replace(/=+$/,"")).replace(/\+/g,"-")).replace(/\//g,"_")}e.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},e.isString=function(t){return"string"==typeof t},e.isUndefined=function(t){return void 0===t},e.isPalinObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},e.isNull=function(t){return"[object Null]"===Object.prototype.toString.call(t)},e.isInstanceOf=function(t,e){return t instanceof e},e.isFormData=function(t){return"[object FormData]"===Object.prototype.toString.call(t)},e.genSeqId=function(){return Math.random().toString(16).slice(2)},e.formatUrl=function(t,e,r){void 0===r&&(r={});var n=/\?/.test(e),o="";for(var i in r)""===o?!n&&(e+="?"):o+="&",o+=i+"="+encodeURIComponent(r[i]);return/^http(s)?\:\/\//.test(e+=o)?e:""+t+e},e.createSign=function(t,e){var r=c(s.default.parse(JSON.stringify({alg:"HS256",typ:"JWT"})))+"."+c(s.default.parse(JSON.stringify(t)));return r+"."+c(o.default(r,e))},e.toQueryString=function(t){void 0===t&&(t={});var e=[];for(var r in t)e.push(r+"="+encodeURIComponent(t[r]));return e.join("&")},e.getQuery=function(t,e){if("undefined"==typeof window)return!1;var r=e||window.location.search,n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=r.substr(r.indexOf("?")+1).match(n);return null!=o?o[2]:""},e.getHash=function(t){if("undefined"==typeof window)return"";var e=window.location.hash.match(new RegExp("[#?&/]"+t+"=([^&#]*)"));return e?e[1]:""},e.removeParam=function(t,e){var r=e.split("?")[0],n=[],o=-1!==e.indexOf("?")?e.split("?")[1]:"";if(""!==o){for(var i=(n=o.split("&")).length-1;i>=0;i-=1)n[i].split("=")[0]===t&&n.splice(i,1);r=r+"?"+n.join("&")}return r},e.createPromiseCallback=function(){var t;if(!Promise){(t=function(){}).promise={};var e=function(){throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.')};return Object.defineProperty(t.promise,"then",{get:e}),Object.defineProperty(t.promise,"catch",{get:e}),t}var r=new Promise((function(e,r){t=function(t,n){return t?r(t):e(n)}}));return t.promise=r,t},e.execCallback=function(t,e,r){if(void 0===r&&(r=null),t&&"function"==typeof t)return t(e,r);if(e)throw e;return r},e.printWarn=function(t,e){console.warn("["+a.getSdkName()+"]["+t+"]:"+e)},e.printError=function(t,e){console.error({code:t,msg:"["+a.getSdkName()+"]["+t+"]:"+e})},e.printInfo=function(t,e){console.log("["+a.getSdkName()+"]["+t+"]:"+e)},e.throwError=function(t,e){throw new Error(JSON.stringify({code:t,msg:"["+a.getSdkName()+"]["+t+"]:"+e}))},e.printGroupLog=function(t){var e=t.title,r=t.subtitle,n=void 0===r?"":r,o=t.content,i=void 0===o?[]:o,s=t.printTrace,a=void 0!==s&&s,c=t.collapsed;void 0!==c&&c?console.groupCollapsed(e,n):console.group(e,n);for(var u=0,l=i;u<l.length;u++){var f=l[u],p=f.type,d=f.body;switch(p){case"info":console.log(d);break;case"warn":console.warn(d);break;case"error":console.error(d)}}a&&console.trace("stack trace:"),console.groupEnd()},e.sleep=function(t){return void 0===t&&(t=0),new Promise((function(e){return setTimeout(e,t)}))},e.transformPhone=function(t){return"+86"+t}},function(t,e,r){var n;t.exports=(n=n||function(t,e){var r=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),n={},o=n.lib={},i=o.Base={extend:function(t){var e=r(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},s=o.WordArray=i.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,o=t.sigBytes;if(this.clamp(),n%4)for(var i=0;i<o;i++){var s=r[i>>>2]>>>24-i%4*8&255;e[n+i>>>2]|=s<<24-(n+i)%4*8}else for(i=0;i<o;i+=4)e[n+i>>>2]=r[i>>>2];return this.sigBytes+=o,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r,n=[],o=function(e){e=e;var r=987654321,n=4294967295;return function(){var o=((r=36969*(65535&r)+(r>>16)&n)<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n;return o/=4294967296,(o+=.5)*(t.random()>.5?1:-1)}},i=0;i<e;i+=4){var a=o(4294967296*(r||t.random()));r=987654071*a(),n.push(4294967296*a()|0)}return new s.init(n,e)}}),a=n.enc={},c=a.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],o=0;o<r;o++){var i=e[o>>>2]>>>24-o%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new s.init(r,e/2)}},u=a.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],o=0;o<r;o++){var i=e[o>>>2]>>>24-o%4*8&255;n.push(String.fromCharCode(i))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new s.init(r,e)}},l=a.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},f=o.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,n=r.words,o=r.sigBytes,i=this.blockSize,a=o/(4*i),c=(a=e?t.ceil(a):t.max((0|a)-this._minBufferSize,0))*i,u=t.min(4*c,o);if(c){for(var l=0;l<c;l+=i)this._doProcessBlock(n,l);var f=n.splice(0,c);r.sigBytes-=u}return new s.init(f,u)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),p=(o.Hasher=f.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new p.HMAC.init(t,r).finalize(e)}}}),n.algo={});return n}(Math),n)},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||e.hasOwnProperty(r)||n(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),o(r(4),e),o(r(8),e)},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.hasOwnProperty.call(t,r)&&n(e,t,r);return o(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.helpers=e.utils=e.events=e.cache=e.adapters=e.constants=void 0;var s=i(r(2));e.constants=s;var a=i(r(9));e.adapters=a;var c=i(r(16));e.cache=c;var u=i(r(18));e.events=u;var l=i(r(0));e.utils=l;var f=i(r(19));e.helpers=f},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.COMMUNITY_SITE_URL=e.IS_DEBUG_MODE=e.getProtocol=e.setProtocol=e.getSdkName=e.setSdkName=void 0;var n="@cloudbase/js-sdk";e.setSdkName=function(t){n=t},e.getSdkName=function(){return n};var o="undefined"!=typeof location&&"http:"===location.protocol?"http:":"https:";e.setProtocol=function(t){o=t},e.getProtocol=function(){return o},e.IS_DEBUG_MODE=!1,e.COMMUNITY_SITE_URL="https://support.qq.com/products/148793"},function(t,e,r){"use strict";var n;r.r(e),r.d(e,"StorageType",(function(){return n})),r.d(e,"AbstractSDKRequest",(function(){return o})),r.d(e,"AbstractStorage",(function(){return i})),r.d(e,"formatUrl",(function(){return s})),function(t){t.local="local",t.none="none",t.session="session"}(n||(n={}));var o=function(){},i=function(){};function s(t,e,r){void 0===r&&(r={});var n=/\?/.test(e),o="";for(var i in r)""===o?!n&&(e+="?"):o+="&",o+=i+"="+encodeURIComponent(r[i]);return/^http(s)?\:\/\//.test(e+=o)?e:""+t+e}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.registerAnalytics=void 0;var n=r(7);e.registerAnalytics=n.registerAnalytics},function(t,e,r){"use strict";r.r(e),r.d(e,"registerAnalytics",(function(){return d}));var n=r(3),o=function(t,e,r,n){var o,i=arguments.length,s=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s},i=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},s=function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function a(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())}))},a=function(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},c=n.constants.ERRORS,u=n.constants.COMMUNITY_SITE_URL,l=n.helpers.catchErrorsDecorator,f=["mall"];var p={name:"analytics",entity:{analytics:(new(function(){function t(){}return t.prototype.analytics=function(t){return s(this,void 0,void 0,(function(){var e,r,n;return a(this,(function(o){if(!function(t){if("Object"!==Object.prototype.toString.call(t).slice(8,-1))return!1;var e=t.report_data,r=t.report_type;return!1!==f.includes(r)&&("Object"===Object.prototype.toString.call(e).slice(8,-1)&&(!(void 0!==e.action_time&&!Number.isInteger(e.action_time))&&"string"==typeof e.action_type))}(t))throw new Error(JSON.stringify({code:c.INVALID_PARAMS,msg:"[analytics.analytics] invalid report data"}));return"analytics.report",e=void 0===t.report_data.action_time?Math.floor(Date.now()/1e3):t.report_data.action_time,r={analytics_scene:t.report_type,analytics_data:Object.assign({},t.report_data,{action_time:e})},n={requestData:r},this.request.send("analytics.report",n),[2]}))}))},o([l({customInfo:{className:"Cloudbase",methodName:"analytics"},title:"上报调用失败",messages:["请确认以下各项：","  1 - 调用 analytics() 的语法或参数是否正确","如果问题依然存在，建议到官方问答社区提问或寻找帮助："+u]}),i("design:type",Function),i("design:paramtypes",[Object]),i("design:returntype",Promise)],t.prototype,"analytics",null),t}())).analytics}};try{cloudbase.registerComponent(p)}catch(t){}function d(t){try{t.registerComponent(p)}catch(t){console.warn(t)}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ERRORS=void 0,e.ERRORS={INVALID_PARAMS:"INVALID_PARAMS",INVALID_SYNTAX:"INVALID_SYNTAX",INVALID_OPERATION:"INVALID_OPERATION",OPERATION_FAIL:"OPERATION_FAIL",NETWORK_ERROR:"NETWORK_ERROR",UNKOWN_ERROR:"UNKOWN_ERROR"}},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.hasOwnProperty.call(t,r)&&n(e,t,r);return o(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.useDefaultAdapter=e.useAdapters=e.RUNTIME=void 0;var s,a=i(r(10)),c=r(0);!function(t){t.WEB="web",t.WX_MP="wx_mp"}(s=e.RUNTIME||(e.RUNTIME={})),e.useAdapters=function(t){for(var e=0,r=c.isArray(t)?t:[t];e<r.length;e++){var n=r[e],o=n.isMatch,i=n.genAdapter,s=n.runtime;if(o())return{adapter:i(),runtime:s}}},e.useDefaultAdapter=function(){return{adapter:a.genAdapter(),runtime:s.WEB}}},function(t,e,r){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},s=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function a(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())}))},a=this&&this.__generator||function(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.WebRequest=e.genAdapter=void 0;var c=r(5),u=r(0),l=r(4),f=function(t){function e(e){var r=t.call(this)||this,n=e.timeout,o=e.timeoutMsg,i=e.restrictedMethods;return r._timeout=n||0,r._timeoutMsg=o||"请求超时",r._restrictedMethods=i||["get","post","upload","download"],r}return o(e,t),e.prototype.get=function(t){return this._request(i(i({},t),{method:"get"}),this._restrictedMethods.includes("get"))},e.prototype.post=function(t){return this._request(i(i({},t),{method:"post"}),this._restrictedMethods.includes("post"))},e.prototype.put=function(t){return this._request(i(i({},t),{method:"put"}))},e.prototype.upload=function(t){var e=t.data,r=t.file,n=t.name,o=new FormData;for(var s in e)o.append(s,e[s]);return o.append("key",n),o.append("file",r),this._request(i(i({},t),{data:o,method:"post"}),this._restrictedMethods.includes("upload"))},e.prototype.download=function(t){return s(this,void 0,void 0,(function(){var e,r,n,o;return a(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,this.get(i(i({},t),{headers:{},responseType:"blob"}))];case 1:return e=s.sent().data,r=window.URL.createObjectURL(new Blob([e])),n=decodeURIComponent(new URL(t.url).pathname.split("/").pop()||""),(o=document.createElement("a")).href=r,o.setAttribute("download",n),o.style.display="none",document.body.appendChild(o),o.click(),window.URL.revokeObjectURL(r),document.body.removeChild(o),[3,3];case 2:return s.sent(),[3,3];case 3:return[2,new Promise((function(e){e({statusCode:200,tempFilePath:t.url})}))]}}))}))},e.prototype._request=function(t,e){var r=this;void 0===e&&(e=!1);var n=String(t.method).toLowerCase()||"get";return new Promise((function(o){var i,s,a=t.url,c=t.headers,f=void 0===c?{}:c,p=t.data,d=t.responseType,h=t.withCredentials,v=t.body,y=t.onUploadProgress,_=u.formatUrl(l.getProtocol(),a,"get"===n?p:{}),g=new XMLHttpRequest;for(var m in g.open(n,_),d&&(g.responseType=d),f)g.setRequestHeader(m,f[m]);y&&g.upload.addEventListener("progress",y),g.onreadystatechange=function(){var t={};if(4===g.readyState){var e=g.getAllResponseHeaders().trim().split(/[\r\n]+/),r={};e.forEach((function(t){var e=t.split(": "),n=e.shift().toLowerCase(),o=e.join(": ");r[n]=o})),t.header=r,t.statusCode=g.status;try{t.data="blob"===d?g.response:JSON.parse(g.responseText)}catch(e){t.data="blob"===d?g.response:g.responseText}clearTimeout(i),o(t)}},e&&r._timeout&&(i=setTimeout((function(){console.warn(r._timeoutMsg),g.abort()}),r._timeout)),s=u.isFormData(p)?p:"application/x-www-form-urlencoded"===f["content-type"]?u.toQueryString(p):v||(p?JSON.stringify(p):void 0),h&&(g.withCredentials=!0),g.send(s)}))},e}(c.AbstractSDKRequest);e.WebRequest=f,e.genAdapter=function(){return{root:window,reqClass:f,wsClass:WebSocket,localStorage:localStorage,sessionStorage:sessionStorage}}},function(t,e,r){var n;t.exports=(n=r(1),r(12),r(13),n.HmacSHA256)},function(t,e,r){var n;t.exports=(n=r(1),function(t){var e=n,r=e.lib,o=r.WordArray,i=r.Hasher,s=e.algo,a=[],c=[];!function(){function e(e){for(var r=t.sqrt(e),n=2;n<=r;n++)if(!(e%n))return!1;return!0}function r(t){return 4294967296*(t-(0|t))|0}for(var n=2,o=0;o<64;)e(n)&&(o<8&&(a[o]=r(t.pow(n,.5))),c[o]=r(t.pow(n,1/3)),o++),n++}();var u=[],l=s.SHA256=i.extend({_doReset:function(){this._hash=new o.init(a.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,n=r[0],o=r[1],i=r[2],s=r[3],a=r[4],l=r[5],f=r[6],p=r[7],d=0;d<64;d++){if(d<16)u[d]=0|t[e+d];else{var h=u[d-15],v=(h<<25|h>>>7)^(h<<14|h>>>18)^h>>>3,y=u[d-2],_=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;u[d]=v+u[d-7]+_+u[d-16]}var g=n&o^n&i^o&i,m=(n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22),b=p+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&l^~a&f)+c[d]+u[d];p=f,f=l,l=a,a=s+b|0,s=i,i=o,o=n,n=b+(m+g)|0}r[0]=r[0]+n|0,r[1]=r[1]+o|0,r[2]=r[2]+i|0,r[3]=r[3]+s|0,r[4]=r[4]+a|0,r[5]=r[5]+l|0,r[6]=r[6]+f|0,r[7]=r[7]+p|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,o=8*e.sigBytes;return r[o>>>5]|=128<<24-o%32,r[14+(o+64>>>9<<4)]=t.floor(n/4294967296),r[15+(o+64>>>9<<4)]=n,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=i._createHelper(l),e.HmacSHA256=i._createHmacHelper(l)}(Math),n.SHA256)},function(t,e,r){var n,o,i,s;t.exports=(n=r(1),i=(o=n).lib.Base,s=o.enc.Utf8,void(o.algo.HMAC=i.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=s.parse(e));var r=t.blockSize,n=4*r;e.sigBytes>n&&(e=t.finalize(e)),e.clamp();for(var o=this._oKey=e.clone(),i=this._iKey=e.clone(),a=o.words,c=i.words,u=0;u<r;u++)a[u]^=1549556828,c[u]^=909522486;o.sigBytes=i.sigBytes=n,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,r=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(r))}})))},function(t,e,r){var n,o,i;t.exports=(i=r(1),o=(n=i).lib.WordArray,n.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp();for(var o=[],i=0;i<r;i+=3)for(var s=(e[i>>>2]>>>24-i%4*8&255)<<16|(e[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|e[i+2>>>2]>>>24-(i+2)%4*8&255,a=0;a<4&&i+.75*a<r;a++)o.push(n.charAt(s>>>6*(3-a)&63));var c=n.charAt(64);if(c)for(;o.length%4;)o.push(c);return o.join("")},parse:function(t){var e=t.length,r=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var i=0;i<r.length;i++)n[r.charCodeAt(i)]=i}var s=r.charAt(64);if(s){var a=t.indexOf(s);-1!==a&&(e=a)}return function(t,e,r){for(var n=[],i=0,s=0;s<e;s++)if(s%4){var a=r[t.charCodeAt(s-1)]<<s%4*2,c=r[t.charCodeAt(s)]>>>6-s%4*2;n[i>>>2]|=(a|c)<<24-i%4*8,i++}return o.create(n,i)}(t,e,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},i.enc.Base64)},function(t,e,r){var n;t.exports=(n=r(1),n.enc.Utf8)},function(t,e,r){"use strict";(function(t){var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function a(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())}))},s=this&&this.__generator||function(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.CloudbaseCache=void 0;var a=r(5),c=r(0),u=r(2),l=function(t){function e(e){var r=t.call(this)||this;return r._root=e,e.tcbCacheObject||(e.tcbCacheObject={}),r}return o(e,t),e.prototype.setItem=function(t,e){this._root.tcbCacheObject[t]=e},e.prototype.getItem=function(t){return this._root.tcbCacheObject[t]},e.prototype.removeItem=function(t){delete this._root.tcbCacheObject[t]},e.prototype.clear=function(){delete this._root.tcbCacheObject},e}(a.AbstractStorage);function f(t,e){switch(t){case"local":return e.localStorage?e.localStorage:(c.printWarn(u.ERRORS.INVALID_PARAMS,"localStorage is not supported on current platform"),new l(e.root));case"none":return new l(e.root);case"session":return e.sessionStorage?e.sessionStorage:(c.printWarn(u.ERRORS.INVALID_PARAMS,"sessionStorage is not supported on current platform"),new l(e.root));default:return e.localStorage?e.localStorage:(c.printWarn(u.ERRORS.INVALID_PARAMS,"localStorage is not supported on current platform"),new l(e.root))}}var p=function(){function e(t){this.keys={};var e=t.persistence,r=t.platformInfo,n=void 0===r?{}:r,o=t.keys,i=void 0===o?{}:o,s=t.alwaysLocalKeys,a=void 0===s?[]:s;this._platformInfo=n,this._alwaysLocalKeys=a,this._storage||(this._persistence=n.adapter.primaryStorage||e,this._storage=f(this._persistence,n.adapter),this.keys=i)}return Object.defineProperty(e.prototype,"mode",{get:function(){return this._storage.mode||"sync"},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"persistence",{get:function(){return this._persistence},enumerable:!1,configurable:!0}),e.prototype.updatePersistence=function(t){if("async"!==this.mode){if(t!==this._persistence){var e="local"===this._persistence;this._persistence=t;var r=f(t,this._platformInfo.adapter);for(var n in this.keys){var o=this.keys[n];if(!e||!this._alwaysLocalKeys.includes(n)){var i=this._storage.getItem(o);c.isUndefined(i)||c.isNull(i)||(r.setItem(o,i),this._storage.removeItem(o))}}this._storage=r}}else c.printWarn(u.ERRORS.INVALID_OPERATION,"current platform's storage is asynchronous, please use updatePersistenceAsync insteed")},e.prototype.updatePersistenceAsync=function(t){return i(this,void 0,void 0,(function(){var e,r,n,o,i,a,u,l;return s(this,(function(s){switch(s.label){case 0:if(t===this._persistence)return[2];for(o in e="local"===this._persistence,this._persistence=t,r=f(t,this._platformInfo.adapter),n=[],this.keys)n.push(o);i=0,s.label=1;case 1:return i<n.length?(a=n[i],u=this.keys[a],e&&this._alwaysLocalKeys.includes(a)?[3,4]:[4,this._storage.getItem(u)]):[3,5];case 2:return l=s.sent(),c.isUndefined(l)||c.isNull(l)?[3,4]:(r.setItem(u,l),[4,this._storage.removeItem(u)]);case 3:s.sent(),s.label=4;case 4:return i++,[3,1];case 5:return this._storage=r,[2]}}))}))},e.prototype.setStore=function(t,e,r){if("async"!==this.mode){if(this._storage)try{var n={version:r||"localCachev1",content:e};this._storage.setItem(t,JSON.stringify(n))}catch(t){throw new Error(JSON.stringify({code:u.ERRORS.OPERATION_FAIL,msg:"["+u.getSdkName()+"]["+u.ERRORS.OPERATION_FAIL+"]setStore failed",info:t}))}}else c.printWarn(u.ERRORS.INVALID_OPERATION,"current platform's storage is asynchronous, please use setStoreAsync insteed")},e.prototype.setStoreAsync=function(t,e,r){return i(this,void 0,void 0,(function(){var n;return s(this,(function(o){switch(o.label){case 0:if(!this._storage)return[2];o.label=1;case 1:return o.trys.push([1,3,,4]),n={version:r||"localCachev1",content:e},[4,this._storage.setItem(t,JSON.stringify(n))];case 2:return o.sent(),[3,4];case 3:return o.sent(),[2];case 4:return[2]}}))}))},e.prototype.getStore=function(e,r){var n;if("async"!==this.mode){try{if(void 0!==t&&(null===(n=t.env)||void 0===n?void 0:n.tcb_token))return t.env.tcb_token;if(!this._storage)return""}catch(t){return""}r=r||"localCachev1";var o=this._storage.getItem(e);return o&&o.indexOf(r)>=0?JSON.parse(o).content:""}c.printWarn(u.ERRORS.INVALID_OPERATION,"current platform's storage is asynchronous, please use getStoreAsync insteed")},e.prototype.getStoreAsync=function(e,r){var n;return i(this,void 0,void 0,(function(){var o;return s(this,(function(i){switch(i.label){case 0:try{if(void 0!==t&&(null===(n=t.env)||void 0===n?void 0:n.tcb_token))return[2,t.env.tcb_token];if(!this._storage)return[2,""]}catch(t){return[2,""]}return r=r||"localCachev1",[4,this._storage.getItem(e)];case 1:return(o=i.sent())&&o.indexOf(r)>=0?[2,JSON.parse(o).content]:[2,""]}}))}))},e.prototype.removeStore=function(t){"async"!==this.mode?this._storage.removeItem(t):c.printWarn(u.ERRORS.INVALID_OPERATION,"current platform's storage is asynchronous, please use removeStoreAsync insteed")},e.prototype.removeStoreAsync=function(t){return i(this,void 0,void 0,(function(){return s(this,(function(e){switch(e.label){case 0:return[4,this._storage.removeItem(t)];case 1:return e.sent(),[2]}}))}))},e}();e.CloudbaseCache=p}).call(this,r(17))},function(t,e){var r,n,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(t){r=i}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var c,u=[],l=!1,f=-1;function p(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&d())}function d(){if(!l){var t=a(p);l=!0;for(var e=u.length;e;){for(c=u,u=[];++f<e;)c&&c[f].run();f=-1,e=u.length}c=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function h(t,e){this.fun=t,this.array=e}function v(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new h(t,e)),1!==u.length||l||a(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e,r){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__spreadArrays||function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<r;e++)for(var i=arguments[e],s=0,a=i.length;s<a;s++,o++)n[o]=i[s];return n};Object.defineProperty(e,"__esModule",{value:!0}),e.removeEventListener=e.activateEvent=e.addEventListener=e.CloudbaseEventEmitter=e.IErrorEvent=e.CloudbaseEvent=void 0;var s=r(0);var a=function(t,e){this.data=e||null,this.name=t};e.CloudbaseEvent=a;var c=function(t){function e(e,r){var n=t.call(this,"error",{error:e,data:r})||this;return n.error=e,n}return o(e,t),e}(a);e.IErrorEvent=c;var u=function(){function t(){this._listeners={}}return t.prototype.on=function(t,e){return function(t,e,r){r[t]=r[t]||[],r[t].push(e)}(t,e,this._listeners),this},t.prototype.off=function(t,e){return function(t,e,r){if(null==r?void 0:r[t]){var n=r[t].indexOf(e);-1!==n&&r[t].splice(n,1)}}(t,e,this._listeners),this},t.prototype.fire=function(t,e){if(s.isInstanceOf(t,c))return console.error(t.error),this;var r=s.isString(t)?new a(t,e||{}):t,n=r.name;if(this._listens(n)){r.target=this;for(var o=0,u=this._listeners[n]?i(this._listeners[n]):[];o<u.length;o++){u[o].call(this,r)}}return this},t.prototype._listens=function(t){return this._listeners[t]&&this._listeners[t].length>0},t}();e.CloudbaseEventEmitter=u;var l=new u;e.addEventListener=function(t,e){l.on(t,e)},e.activateEvent=function(t,e){void 0===e&&(e={}),l.fire(t,e)},e.removeEventListener=function(t,e){l.off(t,e)}},function(t,e,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||e.hasOwnProperty(r)||n(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),o(r(20),e)},function(t,e,r){"use strict";var n=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function a(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.catchErrorsDecorator=void 0;var i=r(0),s=r(2),a=!1;"undefined"!=typeof navigator&&navigator.userAgent&&(a=-1!==navigator.userAgent.indexOf("Firefox"));var c=a?/(\.js\/)?__decorate(\$\d+)?<@.*\d$/:/(\/\w+\.js\.)?__decorate(\$\d+)?\s*\(.*\)$/,u=/https?\:\/\/.+\:\d*\/.*\.js\:\d+\:\d+/;function l(t){var e=t.err,r=t.className,n=t.methodName,o=t.sourceLink;if(!o)return null;var i,s=e.stack.split("\n"),c=a?/^catchErrorsDecorator\/<\/descriptor.value@.*\d$/:new RegExp(r+"\\.descriptor.value\\s*\\[as\\s"+n+"\\]\\s*\\(.*\\)$"),l=a?/^catchErrorsDecorator\/<\/descriptor.value/:new RegExp(r+"\\.descriptor.value\\s*\\[as\\s"+n+"\\]"),f=s.findIndex((function(t){return c.test(t)}));if(-1!==f){var p=s.filter((function(t,e){return e>f}));p.unshift(s[f].replace(l,r+"."+n).replace(u,o)),(i=new Error).stack=(a?"@debugger":"Error")+"\n"+p.join("\n")}return i}e.catchErrorsDecorator=function(t){var e=t.mode,r=void 0===e?"async":e,a=t.customInfo,f=void 0===a?{}:a,p=t.title,d=t.messages,h=void 0===d?[]:d;return function(t,e,a){if(s.IS_DEBUG_MODE){var d=f.className||t.constructor.name,v=f.methodName||e,y=a.value,_=function(t){var e="",r=t.stack.split("\n"),n=r.findIndex((function(t){return c.test(t)}));if(-1!==n){var o=u.exec(r[n+1]||"");e=o?o[0]:""}return e}(new Error);a.value="sync"===r?function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=l({err:new Error,className:d,methodName:v,sourceLink:_});try{return y.apply(this,t)}catch(t){var n=t,o=t.message,s={title:p||d+"."+v+" failed",content:[{type:"error",body:t}]};if(o&&/^\{.*\}$/.test(o)){var a=JSON.parse(o);s.subtitle=o,a.code&&(n=r||t,s.content=h.map((function(t){return{type:"info",body:t}})))}throw i.printGroupLog(s),n}}:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return n(this,void 0,void 0,(function(){var e,r,n,s,a,c;return o(this,(function(o){switch(o.label){case 0:e=l({err:new Error,className:d,methodName:v,sourceLink:_}),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,y.apply(this,t)];case 2:return[2,o.sent()];case 3:throw r=o.sent(),n=r,s=r.message,a={title:p||d+"."+v+" failed",content:[{type:"error",body:r}]},s&&/^\{.*\}$/.test(s)&&(c=JSON.parse(s),a.subtitle=c,c.code&&(n=e||r,a.content=h.map((function(t){return{type:"info",body:t}})))),i.printGroupLog(a),n;case 4:return[2]}}))}))}}}}}])}));