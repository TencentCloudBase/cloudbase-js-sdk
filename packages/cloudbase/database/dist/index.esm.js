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
    Db.getAccessToken = this.authInstance.getAccessToken.bind(this.authInstance);
    Db.runtime = runtime;
    if (this.wsClientClass) {
        Db.wsClass = adapter.wsClass;
        Db.wsClientClass = this.wsClientClass;
    }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTXpDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFFBQVEsQ0FBQyxRQUFpQjtJQU0zQixJQUFBLEtBQXNCLElBQUksQ0FBQyxRQUFRLEVBQWpDLE9BQU8sYUFBQSxFQUFDLE9BQU8sYUFBa0IsQ0FBQztJQUUxQyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBRXZDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RSxFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7UUFDcEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN2QztJQUVELElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxFQUFFLHVCQUFNLElBQUksQ0FBQyxNQUFNLEdBQUssUUFBUSxFQUFHLENBQUM7QUFDakQsQ0FBQztBQUVELElBQU0sU0FBUyxHQUF1QjtJQUNwQyxJQUFJLEVBQUUsY0FBYztJQUNwQixNQUFNLEVBQUU7UUFDTixRQUFRLFVBQUE7S0FDVDtDQUNGLENBQUE7QUFDRCxJQUFHO0lBQ0QsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDO0FBQUEsT0FBTSxDQUFDLEVBQUMsR0FBRTtBQUVYLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFjO0lBQzdDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxDQUFDIiwiZmlsZSI6ImluZGV4LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERiIH0gZnJvbSAnQGNsb3VkYmFzZS9kYXRhYmFzZSc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlIH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcyc7XG5pbXBvcnQgeyBJQ2xvdWRiYXNlQ29tcG9uZW50IH0gZnJvbSAnQGNsb3VkYmFzZS90eXBlcy9jb21wb25lbnQnO1xuXG5kZWNsYXJlIGNvbnN0IGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcblxuY29uc3QgQ09NUE9ORU5UX05BTUUgPSAnZGF0YWJhc2UnO1xuXG5mdW5jdGlvbiBkYXRhYmFzZShkYkNvbmZpZz86IG9iamVjdCkge1xuICAvLyBpZiAoIXRoaXMuYXV0aEluc3RhbmNlKSB7XG4gIC8vICAgY29uc29sZS53YXJuKGBbJHtnZXRTZGtOYW1lKCl9XVske0VSUk9SUy5JTlZBTElEX09QRVJBVElPTn1dIG5vdCBsb2dpbiBgKTtcbiAgLy8gICByZXR1cm47XG4gIC8vIH1cblxuICBjb25zdCB7IGFkYXB0ZXIscnVudGltZSB9ID0gdGhpcy5wbGF0Zm9ybTtcbiAgXG4gIERiLnJlcUNsYXNzID0gdGhpcy5yZXF1ZXN0LmNvbnN0cnVjdG9yO1xuICBcbiAgRGIuZ2V0QWNjZXNzVG9rZW4gPSB0aGlzLmF1dGhJbnN0YW5jZS5nZXRBY2Nlc3NUb2tlbi5iaW5kKHRoaXMuYXV0aEluc3RhbmNlKTtcbiAgRGIucnVudGltZSA9IHJ1bnRpbWU7XG4gIGlmKHRoaXMud3NDbGllbnRDbGFzcyl7XG4gICAgRGIud3NDbGFzcyA9IGFkYXB0ZXIud3NDbGFzcztcbiAgICBEYi53c0NsaWVudENsYXNzID0gdGhpcy53c0NsaWVudENsYXNzO1xuICB9XG5cbiAgaWYgKCFEYi53cykge1xuICAgIERiLndzID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGIoeyAuLi50aGlzLmNvbmZpZywgLi4uZGJDb25maWcgfSk7XG59XG5cbmNvbnN0IGNvbXBvbmVudDpJQ2xvdWRiYXNlQ29tcG9uZW50ID0ge1xuICBuYW1lOiBDT01QT05FTlRfTkFNRSxcbiAgZW50aXR5OiB7XG4gICAgZGF0YWJhc2VcbiAgfVxufVxudHJ5e1xuICBjbG91ZGJhc2UucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbn1jYXRjaChlKXt9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRhdGFiYXNlKGFwcDpJQ2xvdWRiYXNlKXtcbiAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG59Il19
