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
    database_1.Db.getAccessToken = this.authInstance.getAccessToken.bind(this.authInstance);
    database_1.Db.runtime = runtime;
    if (this.wsClientClass) {
        database_1.Db.wsClass = adapter.wsClass;
        database_1.Db.wsClientClass = this.wsClientClass;
    }
    if (!database_1.Db.ws) {
        database_1.Db.ws = null;
    }
    return new database_1.Db(__assign(__assign({}, this.config), dbConfig));
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
    app.registerComponent(component);
}
exports.registerDatabase = registerDatabase;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXlDO0FBTXpDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFFBQVEsQ0FBQyxRQUFpQjtJQU0zQixJQUFBLEtBQXNCLElBQUksQ0FBQyxRQUFRLEVBQWpDLE9BQU8sYUFBQSxFQUFDLE9BQU8sYUFBa0IsQ0FBQztJQUUxQyxhQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBRXZDLGFBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RSxhQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7UUFDcEIsYUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdCLGFBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN2QztJQUVELElBQUksQ0FBQyxhQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsYUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxhQUFFLHVCQUFNLElBQUksQ0FBQyxNQUFNLEdBQUssUUFBUSxFQUFHLENBQUM7QUFDakQsQ0FBQztBQUVELElBQU0sU0FBUyxHQUF1QjtJQUNwQyxJQUFJLEVBQUUsY0FBYztJQUNwQixNQUFNLEVBQUU7UUFDTixRQUFRLFVBQUE7S0FDVDtDQUNGLENBQUE7QUFDRCxJQUFHO0lBQ0QsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDO0FBQUEsT0FBTSxDQUFDLEVBQUMsR0FBRTtBQUVYLFNBQWdCLGdCQUFnQixDQUFDLEdBQWM7SUFDN0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCw0Q0FFQyIsImZpbGUiOiJpbmRleC5janMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYiB9IGZyb20gJ0BjbG91ZGJhc2UvZGF0YWJhc2UnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcblxuZGVjbGFyZSBjb25zdCBjbG91ZGJhc2U6IElDbG91ZGJhc2U7XG5cbmNvbnN0IENPTVBPTkVOVF9OQU1FID0gJ2RhdGFiYXNlJztcblxuZnVuY3Rpb24gZGF0YWJhc2UoZGJDb25maWc/OiBvYmplY3QpIHtcbiAgLy8gaWYgKCF0aGlzLmF1dGhJbnN0YW5jZSkge1xuICAvLyAgIGNvbnNvbGUud2FybihgWyR7Z2V0U2RrTmFtZSgpfV1bJHtFUlJPUlMuSU5WQUxJRF9PUEVSQVRJT059XSBub3QgbG9naW4gYCk7XG4gIC8vICAgcmV0dXJuO1xuICAvLyB9XG5cbiAgY29uc3QgeyBhZGFwdGVyLHJ1bnRpbWUgfSA9IHRoaXMucGxhdGZvcm07XG4gIFxuICBEYi5yZXFDbGFzcyA9IHRoaXMucmVxdWVzdC5jb25zdHJ1Y3RvcjtcbiAgXG4gIERiLmdldEFjY2Vzc1Rva2VuID0gdGhpcy5hdXRoSW5zdGFuY2UuZ2V0QWNjZXNzVG9rZW4uYmluZCh0aGlzLmF1dGhJbnN0YW5jZSk7XG4gIERiLnJ1bnRpbWUgPSBydW50aW1lO1xuICBpZih0aGlzLndzQ2xpZW50Q2xhc3Mpe1xuICAgIERiLndzQ2xhc3MgPSBhZGFwdGVyLndzQ2xhc3M7XG4gICAgRGIud3NDbGllbnRDbGFzcyA9IHRoaXMud3NDbGllbnRDbGFzcztcbiAgfVxuXG4gIGlmICghRGIud3MpIHtcbiAgICBEYi53cyA9IG51bGw7XG4gIH1cblxuICByZXR1cm4gbmV3IERiKHsgLi4udGhpcy5jb25maWcsIC4uLmRiQ29uZmlnIH0pO1xufVxuXG5jb25zdCBjb21wb25lbnQ6SUNsb3VkYmFzZUNvbXBvbmVudCA9IHtcbiAgbmFtZTogQ09NUE9ORU5UX05BTUUsXG4gIGVudGl0eToge1xuICAgIGRhdGFiYXNlXG4gIH1cbn1cbnRyeXtcbiAgY2xvdWRiYXNlLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59Y2F0Y2goZSl7fVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEYXRhYmFzZShhcHA6SUNsb3VkYmFzZSl7XG4gIGFwcC5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufSJdfQ==
