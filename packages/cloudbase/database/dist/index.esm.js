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
    try {
        app.registerComponent(component);
    }
    catch (e) {
        console.warn(e);
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBT3pDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUVsQyxTQUFTLFFBQVEsQ0FBQyxRQUFpQjtJQU0zQixJQUFBLEtBQXNCLElBQUksQ0FBQyxRQUFRLEVBQWpDLE9BQU8sYUFBQSxFQUFDLE9BQU8sYUFBa0IsQ0FBQztJQUUxQyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBRXZDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUM7SUFDRixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNyQixJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7UUFDcEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN2QztJQUVELElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ1YsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxFQUFFLHVCQUFNLElBQUksQ0FBQyxNQUFNLEdBQUssUUFBUSxFQUFHLENBQUM7QUFDakQsQ0FBQztBQUVELElBQU0sU0FBUyxHQUF1QjtJQUNwQyxJQUFJLEVBQUUsY0FBYztJQUNwQixNQUFNLEVBQUU7UUFDTixRQUFRLFVBQUE7S0FDVDtDQUNGLENBQUE7QUFDRCxJQUFHO0lBQ0QsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0NBQ3hDO0FBQUEsT0FBTSxDQUFDLEVBQUMsR0FBRTtBQUVYLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFtQztJQUNsRSxJQUFHO1FBQ0QsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBQUEsT0FBTSxDQUFDLEVBQUM7UUFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQyIsImZpbGUiOiJpbmRleC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYiB9IGZyb20gJ0BjbG91ZGJhc2UvZGF0YWJhc2UnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuaW1wb3J0IHsgSUNsb3VkYmFzZUNvbXBvbmVudCB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvY29tcG9uZW50JztcbmltcG9ydCBjbG91ZGJhc2VOUyBmcm9tICcuLi8uLi9pbmRleCc7XG5cbmRlY2xhcmUgY29uc3QgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuXG5jb25zdCBDT01QT05FTlRfTkFNRSA9ICdkYXRhYmFzZSc7XG5cbmZ1bmN0aW9uIGRhdGFiYXNlKGRiQ29uZmlnPzogb2JqZWN0KSB7XG4gIC8vIGlmICghdGhpcy5hdXRoSW5zdGFuY2UpIHtcbiAgLy8gICBjb25zb2xlLndhcm4oYFske2dldFNka05hbWUoKX1dWyR7RVJST1JTLklOVkFMSURfT1BFUkFUSU9OfV0gbm90IGxvZ2luIGApO1xuICAvLyAgIHJldHVybjtcbiAgLy8gfVxuXG4gIGNvbnN0IHsgYWRhcHRlcixydW50aW1lIH0gPSB0aGlzLnBsYXRmb3JtO1xuICBcbiAgRGIucmVxQ2xhc3MgPSB0aGlzLnJlcXVlc3QuY29uc3RydWN0b3I7XG4gIC8vIOacqueZu+W9leaDheWGteS4i+S8oOWFpeepuuWHveaVsFxuICBEYi5nZXRBY2Nlc3NUb2tlbiA9IHRoaXMuYXV0aEluc3RhbmNlID8gdGhpcy5hdXRoSW5zdGFuY2UuZ2V0QWNjZXNzVG9rZW4uYmluZCh0aGlzLmF1dGhJbnN0YW5jZSkgOiAoKSA9PiB7XG4gICAgcmV0dXJuICcnO1xuICB9O1xuICBEYi5ydW50aW1lID0gcnVudGltZTtcbiAgaWYodGhpcy53c0NsaWVudENsYXNzKXtcbiAgICBEYi53c0NsYXNzID0gYWRhcHRlci53c0NsYXNzO1xuICAgIERiLndzQ2xpZW50Q2xhc3MgPSB0aGlzLndzQ2xpZW50Q2xhc3M7XG4gIH1cblxuICBpZiAoIURiLndzKSB7XG4gICAgRGIud3MgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYih7IC4uLnRoaXMuY29uZmlnLCAuLi5kYkNvbmZpZyB9KTtcbn1cblxuY29uc3QgY29tcG9uZW50OklDbG91ZGJhc2VDb21wb25lbnQgPSB7XG4gIG5hbWU6IENPTVBPTkVOVF9OQU1FLFxuICBlbnRpdHk6IHtcbiAgICBkYXRhYmFzZVxuICB9XG59XG50cnl7XG4gIGNsb3VkYmFzZS5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xufWNhdGNoKGUpe31cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGF0YWJhc2UoYXBwOklDbG91ZGJhc2UgfCB0eXBlb2YgY2xvdWRiYXNlTlMpe1xuICB0cnl7XG4gICAgYXBwLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gIH1jYXRjaChlKXtcbiAgICBjb25zb2xlLndhcm4oZSk7XG4gIH1cbn0iXX0=
