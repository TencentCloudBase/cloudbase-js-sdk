"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeListener = void 0;
var RealtimeListener = (function () {
    function RealtimeListener(options) {
        this.close = options.close;
        this.onChange = options.onChange;
        this.onError = options.onError;
        if (options.debug) {
            Object.defineProperty(this, 'virtualClient', {
                get: function () {
                    return options.virtualClient;
                }
            });
        }
    }
    return RealtimeListener;
}());
exports.RealtimeListener = RealtimeListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBZ0JBO0lBS0UsMEJBQVksT0FBaUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUE7UUFFOUIsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtnQkFDM0MsR0FBRyxFQUFFO29CQUNILE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQTtnQkFDOUIsQ0FBQzthQUNGLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaXJ0dWFsV2ViU29ja2V0Q2xpZW50IH0gZnJvbSAnLi92aXJ0dWFsLXdlYnNvY2tldC1jbGllbnQnXG5pbXBvcnQge1xuICBJUmVhbHRpbWVMaXN0ZW5lckNvbnN0cnVjdG9yT3B0aW9ucyxcbiAgREJSZWFsdGltZUxpc3RlbmVyXG59IGZyb20gJ0BjbG91ZGJhc2UvdHlwZXMvcmVhbHRpbWUnXG5cbi8vID09PT09PT09PT09PT09PSBSZWFsdGltZSBMaXN0ZW5lciAoUHVibGljKSA9PT09PT09PT09PT09PT09PT09PVxuXG5pbnRlcmZhY2UgSVJlYWx0aW1lTGlzdGVuZXJPcHRpb25zIGV4dGVuZHMgSVJlYWx0aW1lTGlzdGVuZXJDb25zdHJ1Y3Rvck9wdGlvbnMge1xuICAvLyBpbml0XG4gIGNsb3NlOiAoKSA9PiB2b2lkXG4gIC8vIGRlYnVnXG4gIGRlYnVnPzogYm9vbGVhblxuICB2aXJ0dWFsQ2xpZW50PzogVmlydHVhbFdlYlNvY2tldENsaWVudFxufVxuXG5leHBvcnQgY2xhc3MgUmVhbHRpbWVMaXN0ZW5lciBpbXBsZW1lbnRzIERCUmVhbHRpbWVMaXN0ZW5lciB7XG4gIGNsb3NlOiAoKSA9PiB2b2lkXG4gIG9uQ2hhbmdlOiAocmVzOiBhbnkpID0+IHZvaWRcbiAgb25FcnJvcjogKGVycm9yOiBhbnkpID0+IHZvaWRcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJUmVhbHRpbWVMaXN0ZW5lck9wdGlvbnMpIHtcbiAgICB0aGlzLmNsb3NlID0gb3B0aW9ucy5jbG9zZVxuICAgIHRoaXMub25DaGFuZ2UgPSBvcHRpb25zLm9uQ2hhbmdlXG4gICAgdGhpcy5vbkVycm9yID0gb3B0aW9ucy5vbkVycm9yXG5cbiAgICBpZiAob3B0aW9ucy5kZWJ1Zykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd2aXJ0dWFsQ2xpZW50Jywge1xuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucy52aXJ0dWFsQ2xpZW50XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iXX0=