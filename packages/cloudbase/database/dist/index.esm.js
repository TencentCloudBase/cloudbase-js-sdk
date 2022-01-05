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
var COMPONENT_NAME = 'database';
function database(dbConfig) {
    var _a = this.platform, adapter = _a.adapter, runtime = _a.runtime;
    Db.reqClass = this.request.constructor;
    Db.getAccessToken = this.authInstance ? this.authInstance.getAccessToken.bind(this.authInstance) : function () {
        return '';
    };
    Db.runtime = runtime;
    if (this.wsClientClass) {
        Db.wsClass = adapter.wsClass;
        Db.wsClientClass = this.wsClientClass;
    }
    if (!Db.ws) {
        Db.ws = null;
    }
    return new Db(__assign(__assign(__assign({}, this.config), { _fromApp: this }), dbConfig));
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
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBT3pDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFFBQVEsQ0FBQyxRQUFpQjtJQUMzQixJQUFBLEtBQXVCLElBQUksQ0FBQyxRQUFRLEVBQWxDLE9BQU8sYUFBQSxFQUFFLE9BQU8sYUFBa0IsQ0FBQztJQUUzQyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBRXZDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUM7SUFDRixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDdEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN2QztJQUVELElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxFQUFFLGdDQUFNLElBQUksQ0FBQyxNQUFNLEtBQUUsUUFBUSxFQUFFLElBQUksS0FBSyxRQUFRLEVBQUcsQ0FBQztBQUNqRSxDQUFDO0FBRUQsSUFBTSxTQUFTLEdBQXdCO0lBQ3JDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLFFBQVEsVUFBQTtLQUNUO0NBQ0YsQ0FBQTtBQUNELElBQUk7SUFDRixTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEM7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0FBRWYsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEdBQW9DO0lBQ25FLElBQUk7UUFDRixHQUFHLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDIiwiZmlsZSI6ImluZGV4LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERiIH0gZnJvbSAnQGNsb3VkYmFzZS9kYXRhYmFzZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IGNsb3VkYmFzZU5TIGZyb20gJy4uLy4uL2luZGV4JztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2RhdGFiYXNlJztcblxuZnVuY3Rpb24gZGF0YWJhc2UoZGJDb25maWc/OiBvYmplY3QpIHtcbiAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuXG4gIERiLnJlcUNsYXNzID0gdGhpcy5yZXF1ZXN0LmNvbnN0cnVjdG9yO1xuICAvLyDmnKrnmbvlvZXmg4XlhrXkuIvkvKDlhaXnqbrlh73mlbBcbiAgRGIuZ2V0QWNjZXNzVG9rZW4gPSB0aGlzLmF1dGhJbnN0YW5jZSA/IHRoaXMuYXV0aEluc3RhbmNlLmdldEFjY2Vzc1Rva2VuLmJpbmQodGhpcy5hdXRoSW5zdGFuY2UpIDogKCkgPT4ge1xuICAgIHJldHVybiAnJztcbiAgfTtcbiAgRGIucnVudGltZSA9IHJ1bnRpbWU7XG4gIGlmICh0aGlzLndzQ2xpZW50Q2xhc3MpIHtcbiAgICBEYi53c0NsYXNzID0gYWRhcHRlci53c0NsYXNzO1xuICAgIERiLndzQ2xpZW50Q2xhc3MgPSB0aGlzLndzQ2xpZW50Q2xhc3M7XG4gIH1cblxuICBpZiAoIURiLndzKSB7XG4gICAgRGIud3MgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYih7IC4uLnRoaXMuY29uZmlnLCBfZnJvbUFwcDogdGhpcywgLi4uZGJDb25maWcgfSk7XG59XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIGRhdGFiYXNlXG4gIH1cbn1cbnRyeSB7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaCAoZSkgeyB9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRhdGFiYXNlKGFwcDogSUNsb3VkYmFzZSB8IHR5cGVvZiBjbG91ZGJhc2VOUykge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59Il19
