"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDatabase = void 0;
var database_1 = require("@cloudbase/database");
var COMPONENT_NAME = 'database';
function database(dbConfig) {
    var _a = this.platform, adapter = _a.adapter, runtime = _a.runtime;
    database_1.Db.reqClass = this.request.constructor;
    database_1.Db.getAccessToken = this.authInstance ? this.authInstance.getAccessToken.bind(this.authInstance) : function () {
        return '';
    };
    database_1.Db.runtime = runtime;
    if (this.wsClientClass) {
        database_1.Db.wsClass = adapter.wsClass;
        database_1.Db.wsClientClass = this.wsClientClass;
    }
    if (!database_1.Db.ws) {
        database_1.Db.ws = null;
    }
    return new database_1.Db(__assign(__assign(__assign({}, this.config), { _fromApp: this }), dbConfig));
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
function registerDatabase(app) {
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}
exports.registerDatabase = registerDatabase;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXlDO0FBT3pDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFFBQVEsQ0FBQyxRQUFpQjtJQUMzQixJQUFBLEtBQXVCLElBQUksQ0FBQyxRQUFRLEVBQWxDLE9BQU8sYUFBQSxFQUFFLE9BQU8sYUFBa0IsQ0FBQztJQUUzQyxhQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBRXZDLGFBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUM7SUFDRixhQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDdEIsYUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdCLGFBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN2QztJQUVELElBQUksQ0FBQyxhQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsYUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxhQUFFLGdDQUFNLElBQUksQ0FBQyxNQUFNLEtBQUUsUUFBUSxFQUFFLElBQUksS0FBSyxRQUFRLEVBQUcsQ0FBQztBQUNqRSxDQUFDO0FBRUQsSUFBTSxTQUFTLEdBQXdCO0lBQ3JDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLFFBQVEsVUFBQTtLQUNUO0NBQ0YsQ0FBQTtBQUNELElBQUk7SUFDRixTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEM7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0FBRWYsU0FBZ0IsZ0JBQWdCLENBQUMsR0FBb0M7SUFDbkUsSUFBSTtRQUNGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFORCw0Q0FNQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERiIH0gZnJvbSAnQGNsb3VkYmFzZS9kYXRhYmFzZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IGNsb3VkYmFzZU5TIGZyb20gJy4uLy4uL2luZGV4JztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2RhdGFiYXNlJztcblxuZnVuY3Rpb24gZGF0YWJhc2UoZGJDb25maWc/OiBvYmplY3QpIHtcbiAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuXG4gIERiLnJlcUNsYXNzID0gdGhpcy5yZXF1ZXN0LmNvbnN0cnVjdG9yO1xuICAvLyDmnKrnmbvlvZXmg4XlhrXkuIvkvKDlhaXnqbrlh73mlbBcbiAgRGIuZ2V0QWNjZXNzVG9rZW4gPSB0aGlzLmF1dGhJbnN0YW5jZSA/IHRoaXMuYXV0aEluc3RhbmNlLmdldEFjY2Vzc1Rva2VuLmJpbmQodGhpcy5hdXRoSW5zdGFuY2UpIDogKCkgPT4ge1xuICAgIHJldHVybiAnJztcbiAgfTtcbiAgRGIucnVudGltZSA9IHJ1bnRpbWU7XG4gIGlmICh0aGlzLndzQ2xpZW50Q2xhc3MpIHtcbiAgICBEYi53c0NsYXNzID0gYWRhcHRlci53c0NsYXNzO1xuICAgIERiLndzQ2xpZW50Q2xhc3MgPSB0aGlzLndzQ2xpZW50Q2xhc3M7XG4gIH1cblxuICBpZiAoIURiLndzKSB7XG4gICAgRGIud3MgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYih7IC4uLnRoaXMuY29uZmlnLCBfZnJvbUFwcDogdGhpcywgLi4uZGJDb25maWcgfSk7XG59XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIGRhdGFiYXNlXG4gIH1cbn1cbnRyeSB7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaCAoZSkgeyB9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRhdGFiYXNlKGFwcDogSUNsb3VkYmFzZSB8IHR5cGVvZiBjbG91ZGJhc2VOUykge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59Il19

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXlDO0FBT3pDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFFBQVEsQ0FBQyxRQUFpQjtJQUMzQixJQUFBLEtBQXVCLElBQUksQ0FBQyxRQUFRLEVBQWxDLE9BQU8sYUFBQSxFQUFFLE9BQU8sYUFBa0IsQ0FBQztJQUUzQyxhQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBRXZDLGFBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUM7SUFDRixhQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDdEIsYUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdCLGFBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN2QztJQUVELElBQUksQ0FBQyxhQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsYUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxhQUFFLGdDQUFNLElBQUksQ0FBQyxNQUFNLEtBQUUsUUFBUSxFQUFFLElBQUksS0FBSyxRQUFRLEVBQUcsQ0FBQztBQUNqRSxDQUFDO0FBRUQsSUFBTSxTQUFTLEdBQXdCO0lBQ3JDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE1BQU0sRUFBRTtRQUNOLFFBQVEsVUFBQTtLQUNUO0NBQ0YsQ0FBQTtBQUNELElBQUk7SUFDRixTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDeEM7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0FBRWYsU0FBZ0IsZ0JBQWdCLENBQUMsR0FBb0M7SUFDbkUsSUFBSTtRQUNGLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFORCw0Q0FNQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERiIH0gZnJvbSAnQGNsb3VkYmFzZS9kYXRhYmFzZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuaW1wb3J0IGNsb3VkYmFzZU5TIGZyb20gJy4uLy4uL2luZGV4JztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2RhdGFiYXNlJztcblxuZnVuY3Rpb24gZGF0YWJhc2UoZGJDb25maWc/OiBvYmplY3QpIHtcbiAgY29uc3QgeyBhZGFwdGVyLCBydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuXG4gIERiLnJlcUNsYXNzID0gdGhpcy5yZXF1ZXN0LmNvbnN0cnVjdG9yO1xuICAvLyDmnKrnmbvlvZXmg4XlhrXkuIvkvKDlhaXnqbrlh73mlbBcbiAgRGIuZ2V0QWNjZXNzVG9rZW4gPSB0aGlzLmF1dGhJbnN0YW5jZSA/IHRoaXMuYXV0aEluc3RhbmNlLmdldEFjY2Vzc1Rva2VuLmJpbmQodGhpcy5hdXRoSW5zdGFuY2UpIDogKCkgPT4ge1xuICAgIHJldHVybiAnJztcbiAgfTtcbiAgRGIucnVudGltZSA9IHJ1bnRpbWU7XG4gIGlmICh0aGlzLndzQ2xpZW50Q2xhc3MpIHtcbiAgICBEYi53c0NsYXNzID0gYWRhcHRlci53c0NsYXNzO1xuICAgIERiLndzQ2xpZW50Q2xhc3MgPSB0aGlzLndzQ2xpZW50Q2xhc3M7XG4gIH1cblxuICBpZiAoIURiLndzKSB7XG4gICAgRGIud3MgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYih7IC4uLnRoaXMuY29uZmlnLCBfZnJvbUFwcDogdGhpcywgLi4uZGJDb25maWcgfSk7XG59XG5cbmNvbnN0IGNvbXBvbmVudDogSUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIGRhdGFiYXNlXG4gIH1cbn1cbnRyeSB7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSBjYXRjaCAoZSkgeyB9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRhdGFiYXNlKGFwcDogSUNsb3VkYmFzZSB8IHR5cGVvZiBjbG91ZGJhc2VOUykge1xuICB0cnkge1xuICAgIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKGUpO1xuICB9XG59Il19
