import cloudbase from '@cloudbase/app';
import { registerAuth } from '@cloudbase/auth';
import { registerFunctions } from '@cloudbase/functions';
import { registerStorage } from '@cloudbase/storage';
import { registerRealtime } from '@cloudbase/realtime';
import { registerAnalytics } from '@cloudbase/analytics';
import { registerDatabase } from './../database';
import pkg from '../package.json';
var version = pkg.version;
cloudbase.registerVersion(version);
try {
    registerAuth(cloudbase);
    registerFunctions(cloudbase);
    registerStorage(cloudbase);
    registerDatabase(cloudbase);
    registerRealtime(cloudbase);
    registerAnalytics(cloudbase);
}
catch (e) { }
try {
    window.cloudbase = cloudbase;
}
catch (e) { }
export default cloudbase;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFFeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFDO0FBSTFCLElBQUEsT0FBTyxHQUFLLEdBQUcsUUFBUixDQUFTO0FBQ3hCLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbkMsSUFBSTtJQUNGLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QixpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUIsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUIsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUE7Q0FDN0I7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0FBT2YsSUFBSTtJQUNELE1BQWlCLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztDQUMxQztBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7QUFHZixlQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiJpbmRleC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvdWRiYXNlIGZyb20gJ0BjbG91ZGJhc2UvYXBwJztcbmltcG9ydCB7IHJlZ2lzdGVyQXV0aCB9IGZyb20gJ0BjbG91ZGJhc2UvYXV0aCc7XG5pbXBvcnQgeyByZWdpc3RlckZ1bmN0aW9ucyB9IGZyb20gJ0BjbG91ZGJhc2UvZnVuY3Rpb25zJztcbmltcG9ydCB7IHJlZ2lzdGVyU3RvcmFnZSB9IGZyb20gJ0BjbG91ZGJhc2Uvc3RvcmFnZSc7XG5pbXBvcnQgeyByZWdpc3RlclJlYWx0aW1lIH0gZnJvbSAnQGNsb3VkYmFzZS9yZWFsdGltZSc7XG5pbXBvcnQgeyByZWdpc3RlckFuYWx5dGljcyB9IGZyb20gJ0BjbG91ZGJhc2UvYW5hbHl0aWNzJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgcmVnaXN0ZXJEYXRhYmFzZSB9IGZyb20gJy4vLi4vZGF0YWJhc2UnO1xuaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgSUNsb3VkYmFzZSB9IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMnO1xuXG5cbmNvbnN0IHsgdmVyc2lvbiB9ID0gcGtnO1xuY2xvdWRiYXNlLnJlZ2lzdGVyVmVyc2lvbih2ZXJzaW9uKTtcblxudHJ5IHtcbiAgcmVnaXN0ZXJBdXRoKGNsb3VkYmFzZSk7XG4gIHJlZ2lzdGVyRnVuY3Rpb25zKGNsb3VkYmFzZSk7XG4gIHJlZ2lzdGVyU3RvcmFnZShjbG91ZGJhc2UpO1xuICByZWdpc3RlckRhdGFiYXNlKGNsb3VkYmFzZSk7XG4gIHJlZ2lzdGVyUmVhbHRpbWUoY2xvdWRiYXNlKTtcbiAgcmVnaXN0ZXJBbmFseXRpY3MoY2xvdWRiYXNlKVxufSBjYXRjaCAoZSkgeyB9XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgY2xvdWRiYXNlOiBJQ2xvdWRiYXNlO1xuICB9XG59XG50cnkge1xuICAod2luZG93IGFzIFdpbmRvdykuY2xvdWRiYXNlID0gY2xvdWRiYXNlO1xufSBjYXRjaCAoZSkgeyB9XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBjbG91ZGJhc2U7XG5leHBvcnQgZGVmYXVsdCBjbG91ZGJhc2U7Il19
