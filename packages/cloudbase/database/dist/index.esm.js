var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Db } from '@cloudbase/database';
import { constants } from '@cloudbase/utilities';
var getSdkName = constants.getSdkName, ERRORS = constants.ERRORS;
var COMPONENT_NAME = 'database';
function database(dbConfig) {
    if (!this.authInstance) {
        console.warn("[" + getSdkName() + "][" + ERRORS.INVALID_OPERATION + "] not login ");
        return;
    }
    var _a = this.platform, adapter = _a.adapter, runtime = _a.runtime;
    Db.reqClass = this.request.constructor;
    Db.wsClass = adapter.wsClass;
    Db.getAccessToken = this.authInstance.getAccessToken.bind(this.authInstance);
    Db.runtime = runtime;
    if (!Db.ws) {
        Db.ws = null;
    }
    return new Db(__assign(__assign({}, this.config), dbConfig));
}
var component = {
    name: COMPONENT_NAME,
    entity: {
        database: database
    }
};
try {
    cloudbase.registerComponent(component);
}
catch (e) { }
export function registerDatabase(app) {
    app.registerComponent(component);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQU16QyxJQUFBLFVBQVUsR0FBWSxTQUFTLFdBQXJCLEVBQUMsTUFBTSxHQUFLLFNBQVMsT0FBZCxDQUFlO0FBRXhDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFFBQVEsQ0FBQyxRQUFpQjtJQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQUksVUFBVSxFQUFFLFVBQUssTUFBTSxDQUFDLGlCQUFpQixpQkFBYyxDQUFDLENBQUM7UUFDMUUsT0FBTztLQUNSO0lBRUssSUFBQSxLQUFzQixJQUFJLENBQUMsUUFBUSxFQUFqQyxPQUFPLGFBQUEsRUFBQyxPQUFPLGFBQWtCLENBQUM7SUFFMUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUV2QyxFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDN0IsRUFBRSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdFLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBRXJCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxFQUFFLHVCQUFNLElBQUksQ0FBQyxNQUFNLEdBQUssUUFBUSxFQUFHLENBQUM7QUFDakQsQ0FBQztBQUVELElBQU0sU0FBUyxHQUF1QjtJQUNwQyxJQUFJLEVBQUUsY0FBYztJQUNwQixNQUFNLEVBQUU7UUFDTixRQUFRLFVBQUE7S0FDVDtDQUNGLENBQUE7QUFDRCxJQUFHO0lBQ0QsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDO0FBQUEsT0FBTSxDQUFDLEVBQUMsR0FBRTtBQUVYLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFjO0lBQzdDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxDQUFDIiwiZmlsZSI6ImluZGV4LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERiIH0gZnJvbSAnQGNsb3VkYmFzZS9kYXRhYmFzZSc7XG5pbXBvcnQgeyBjb25zdGFudHMgfSBmcm9tICdAY2xvdWRiYXNlL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgeyBnZXRTZGtOYW1lLEVSUk9SUyB9ID0gY29uc3RhbnRzO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdkYXRhYmFzZSc7XG5cbmZ1bmN0aW9uIGRhdGFiYXNlKGRiQ29uZmlnPzogb2JqZWN0KSB7XG4gIGlmICghdGhpcy5hdXRoSW5zdGFuY2UpIHtcbiAgICBjb25zb2xlLndhcm4oYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLklOVkFMSURfT1BFUkFUSU9OfV0gbm90IGxvZ2luIGApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgYWRhcHRlcixydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuICBcbiAgRGIucmVxQ2xhc3MgPSB0aGlzLnJlcXVlc3QuY29uc3RydWN0b3I7XG4gIFxuICBEYi53c0NsYXNzID0gYWRhcHRlci53c0NsYXNzO1xuICBEYi5nZXRBY2Nlc3NUb2tlbiA9IHRoaXMuYXV0aEluc3RhbmNlLmdldEFjY2Vzc1Rva2VuLmJpbmQodGhpcy5hdXRoSW5zdGFuY2UpO1xuICBEYi5ydW50aW1lID0gcnVudGltZTtcblxuICBpZiAoIURiLndzKSB7XG4gICAgRGIud3MgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYih7IC4uLnRoaXMuY29uZmlnLCAuLi5kYkNvbmZpZyB9KTtcbn1cblxuY29uc3QgY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBlbnRpdHk6IHtcbiAgICBkYXRhYmFzZVxuICB9XG59XG50cnl7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufWNhdGNoKGUpe31cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGF0YWJhc2UoYXBwOklDbG91ZGJhc2Upe1xuICBhcHAucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn0iXX0=
