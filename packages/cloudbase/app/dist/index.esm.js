import cloudbase from '@cloudbase/app';
import pkg from '../../package.json';
var version = pkg.version;
cloudbase.registerVersion(version);
try {
    window.cloudbase = cloudbase;
}
catch (e) { }
export default cloudbase;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sR0FBRyxNQUFNLG9CQUFvQixDQUFDO0FBRzdCLElBQUEsT0FBTyxHQUFLLEdBQUcsUUFBUixDQUFTO0FBQ3hCLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7QUFPbkMsSUFBSTtJQUNELE1BQWlCLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztDQUMxQztBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7QUFHZixlQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiJpbmRleC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvdWRiYXNlIGZyb20gJ0BjbG91ZGJhc2UvYXBwJztcbmltcG9ydCBwa2cgZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7IElDbG91ZGJhc2UgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzJztcblxuY29uc3QgeyB2ZXJzaW9uIH0gPSBwa2c7XG5jbG91ZGJhc2UucmVnaXN0ZXJWZXJzaW9uKHZlcnNpb24pO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIGNsb3VkYmFzZTogSUNsb3VkYmFzZTtcbiAgfVxufVxudHJ5IHtcbiAgKHdpbmRvdyBhcyBXaW5kb3cpLmNsb3VkYmFzZSA9IGNsb3VkYmFzZTtcbn0gY2F0Y2ggKGUpIHsgfVxuLy8gQHRzLWlnbm9yZVxuZXhwb3J0ID0gY2xvdWRiYXNlO1xuZXhwb3J0IGRlZmF1bHQgY2xvdWRiYXNlOyJdfQ==
