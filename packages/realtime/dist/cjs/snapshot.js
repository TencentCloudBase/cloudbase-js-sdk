"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snapshot = void 0;
var Snapshot = (function () {
    function Snapshot(options) {
        var id = options.id, docChanges = options.docChanges, docs = options.docs, msgType = options.msgType, type = options.type;
        var cachedDocChanges;
        var cachedDocs;
        Object.defineProperties(this, {
            id: {
                get: function () { return id; },
                enumerable: true
            },
            docChanges: {
                get: function () {
                    if (!cachedDocChanges) {
                        cachedDocChanges = JSON.parse(JSON.stringify(docChanges));
                    }
                    return cachedDocChanges;
                },
                enumerable: true
            },
            docs: {
                get: function () {
                    if (!cachedDocs) {
                        cachedDocs = JSON.parse(JSON.stringify(docs));
                    }
                    return cachedDocs;
                },
                enumerable: true
            },
            msgType: {
                get: function () { return msgType; },
                enumerable: true
            },
            type: {
                get: function () { return type; },
                enumerable: true
            }
        });
    }
    return Snapshot;
}());
exports.Snapshot = Snapshot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc25hcHNob3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBY0E7SUFPRSxrQkFBWSxPQUFvQztRQUN0QyxJQUFBLEVBQUUsR0FBc0MsT0FBTyxHQUE3QyxFQUFFLFVBQVUsR0FBMEIsT0FBTyxXQUFqQyxFQUFFLElBQUksR0FBb0IsT0FBTyxLQUEzQixFQUFFLE9BQU8sR0FBVyxPQUFPLFFBQWxCLEVBQUUsSUFBSSxHQUFLLE9BQU8sS0FBWixDQUFZO1FBRXZELElBQUksZ0JBQWtDLENBQUE7UUFDdEMsSUFBSSxVQUFpQyxDQUFBO1FBRXJDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7WUFDNUIsRUFBRSxFQUFFO2dCQUNGLEdBQUcsRUFBRSxjQUFNLE9BQUEsRUFBRSxFQUFGLENBQUU7Z0JBQ2IsVUFBVSxFQUFFLElBQUk7YUFDakI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFO29CQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDckIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7cUJBQzFEO29CQUNELE9BQU8sZ0JBQWdCLENBQUE7Z0JBQ3pCLENBQUM7Z0JBQ0QsVUFBVSxFQUFFLElBQUk7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxFQUFFO29CQUNILElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQ2YsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO3FCQUM5QztvQkFDRCxPQUFPLFVBQVUsQ0FBQTtnQkFDbkIsQ0FBQztnQkFDRCxVQUFVLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxHQUFHLEVBQUUsY0FBTSxPQUFBLE9BQU8sRUFBUCxDQUFPO2dCQUNsQixVQUFVLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDSixHQUFHLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJO2dCQUNmLFVBQVUsRUFBRSxJQUFJO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDO0FBOUNZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU25hcHNob3RUeXBlLCBJU25hcHNob3QgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL3JlYWx0aW1lJ1xuaW1wb3J0IHsgSVNpbmdsZURCRXZlbnQgfSBmcm9tICdAY2xvdWRiYXNlL3R5cGVzL2RhdGFiYXNlJ1xuXG4vLyA9PT09PT09PT09PT09PT0gUmVhbHRpbWUgU25hcHNob3QgLyBDaGFuZ2UgRXZlbnQgKFB1YmxpYykgPT09PT09PT09PT09PT09PT09PT1cblxuaW50ZXJmYWNlIElTbmFwc2hvdENvbnN0cnVjdG9yT3B0aW9ucyB7XG4gIGlkOiBudW1iZXJcbiAgZG9jQ2hhbmdlczogSVNpbmdsZURCRXZlbnRbXVxuICBkb2NzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+W11cbiAgdHlwZT86IFNuYXBzaG90VHlwZVxuICAvLyBFSlNPTjogYW55XG4gIG1zZ1R5cGU/OiBTdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIFNuYXBzaG90IGltcGxlbWVudHMgSVNuYXBzaG90IHtcbiAgaWQhOiBudW1iZXJcbiAgZG9jQ2hhbmdlcyE6IElTaW5nbGVEQkV2ZW50W11cbiAgZG9jcyE6IFJlY29yZDxzdHJpbmcsIGFueT5bXVxuICB0eXBlPzogJ2luaXQnXG4gIC8vIEVKU09OOiBhbnlcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJU25hcHNob3RDb25zdHJ1Y3Rvck9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGlkLCBkb2NDaGFuZ2VzLCBkb2NzLCBtc2dUeXBlLCB0eXBlIH0gPSBvcHRpb25zXG5cbiAgICBsZXQgY2FjaGVkRG9jQ2hhbmdlczogSVNpbmdsZURCRXZlbnRbXVxuICAgIGxldCBjYWNoZWREb2NzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+W11cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIGlkOiB7XG4gICAgICAgIGdldDogKCkgPT4gaWQsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBkb2NDaGFuZ2VzOiB7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIGlmICghY2FjaGVkRG9jQ2hhbmdlcykge1xuICAgICAgICAgICAgY2FjaGVkRG9jQ2hhbmdlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jQ2hhbmdlcykpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjYWNoZWREb2NDaGFuZ2VzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBkb2NzOiB7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIGlmICghY2FjaGVkRG9jcykge1xuICAgICAgICAgICAgY2FjaGVkRG9jcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZG9jcykpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjYWNoZWREb2NzXG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0sXG4gICAgICBtc2dUeXBlOiB7XG4gICAgICAgIGdldDogKCkgPT4gbXNnVHlwZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHR5cGU6IHtcbiAgICAgICAgZ2V0OiAoKSA9PiB0eXBlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19