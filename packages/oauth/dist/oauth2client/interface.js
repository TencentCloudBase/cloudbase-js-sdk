"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClient = void 0;
var AuthClient = (function () {
    function AuthClient() {
    }
    return AuthClient;
}());
exports.AuthClient = AuthClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29hdXRoMmNsaWVudC9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0E7SUFBQTtJQW9CQSxDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJxQixnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENyZWRlbnRpYWxzLCBBdXRoQ2xpZW50UmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL21vZGVscyc7XG5cbi8qKlxuICogdGhlIGludGVyZmFjZSBmb3IgdGhlIE9hdXRoMkNsaWVudFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXV0aENsaWVudCB7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhdXRoIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0Q3JlZGVudGlhbHMoY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscyk6IHZvaWQ7XG4gIC8qKlxuICAgKiBQcm92aWRlcyBhbiBhbHRlcm5hdGl2ZSBmZXRjaCBhcGkgcmVxdWVzdCBpbXBsZW1lbnRhdGlvbiB3aXRoIGF1dGggY3JlZGVudGlhbHNcbiAgICogaWYgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM6dHJ1ZSwgdGhlIHJlcXVlc3Qgd2lsbCBhdXRvIGFkZCBBdXRob3JpemF0aW9uOiBCZWFyZXIgPEFjY2Vzc1Rva2VuPiBpbiB0aGUgcmVxdWVzdFxuICAgKiBlcnJvcjpcbiAgICogICAgIC0gdW5yZWFjaGFibGUsIHRoZSBuZXR3b3JrIGVycm9yIG9yIHJlc3BvbnNlIGlzIG5vdCBqc29uXG4gICAqICAgICAtIHVuYXV0aGVudGljYXRlZDogaGFzIG5vIHZhbGlkYXRlIGFjY2VzcyB0b2tlblxuICAgKi9cbiAgYWJzdHJhY3QgcmVxdWVzdDogUmVxdWVzdEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGN1cnJlbnQgYWNjZXNzVG9rZW4gZnJvbSBBdXRoQ2xpZW50LCB5b3UgY2FuIHVzZSB0aGlzIHRvIGRldGVjdCBsb2dpbiBzdGF0dXNcbiAgICogZXJyb3I6XG4gICAqICAgIC0gIHVuYXV0aGVudGljYXRlZDogaGFzIG5vIHZhbGlkYXRlIGFjY2VzcyB0b2tlblxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0QWNjZXNzVG9rZW4oKTogUHJvbWlzZTxzdHJpbmc+O1xufVxuXG5leHBvcnQgdHlwZSBSZXF1ZXN0RnVuY3Rpb24gPSA8VD4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBBdXRoQ2xpZW50UmVxdWVzdE9wdGlvbnMpID0+IFByb21pc2U8VD47XG5cbi8qKiBBbiBpbnRlcmZhY2Ugb2YgdGhlIFNpbXBsZSAgV2ViIFN0b3JhZ2UgQVBJICAqL1xuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVTdG9yYWdlIHtcbiAgLyoqXG4gICAqIHZhbHVlID0gc3RvcmFnZVtrZXldXG4gICAqL1xuICBnZXRJdGVtOiAoa2V5OiBzdHJpbmcpID0+IFByb21pc2U8c3RyaW5nIHwgbnVsbD47XG4gIC8qKlxuICAgKiBkZWxldGUgc3RvcmFnZVtrZXldXG4gICAqL1xuICByZW1vdmVJdGVtOiAoa2V5OiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG4gIC8qKlxuICAgKiBzdG9yYWdlW2tleV0gPSB2YWx1ZVxuICAgKi9cbiAgc2V0SXRlbTogKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiB2YWx1ZSA9IHN0b3JhZ2Vba2V5XVxuICAgKi9cbiAgZ2V0SXRlbVN5bmM6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nIHwgbnVsbDtcbiAgLyoqXG4gICAqIGRlbGV0ZSBzdG9yYWdlW2tleV1cbiAgICovXG4gIHJlbW92ZUl0ZW1TeW5jOiAoa2V5OiBzdHJpbmcpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBzdG9yYWdlW2tleV0gPSB2YWx1ZVxuICAgKi9cbiAgc2V0SXRlbVN5bmM6IChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn1cbiJdfQ==