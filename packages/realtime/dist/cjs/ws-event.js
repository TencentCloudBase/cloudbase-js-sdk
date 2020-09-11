"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWSCloseError = exports.CLOSE_EVENT_CODE = exports.CLOSE_EVENT_CODE_INFO = void 0;
var error_1 = require("./error");
exports.CLOSE_EVENT_CODE_INFO = {
    1000: {
        code: 1000,
        name: 'Normal Closure',
        description: 'Normal closure; the connection successfully completed whatever purpose for which it was created.'
    },
    1001: {
        code: 1001,
        name: 'Going Away',
        description: 'The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.'
    },
    1002: {
        code: 1002,
        name: 'Protocol Error',
        description: 'The endpoint is terminating the connection due to a protocol error.'
    },
    1003: {
        code: 1003,
        name: 'Unsupported Data',
        description: 'The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).'
    },
    1005: {
        code: 1005,
        name: 'No Status Received',
        description: 'Indicates that no status code was provided even though one was expected.'
    },
    1006: {
        code: 1006,
        name: 'Abnormal Closure',
        description: 'Used to indicate that a connection was closed abnormally (that is, with no close frame being sent) when a status code is expected.'
    },
    1007: {
        code: 1007,
        name: 'Invalid frame payload data',
        description: 'The endpoint is terminating the connection because a message was received that contained inconsistent data (e.g., non-UTF-8 data within a text message).'
    },
    1008: {
        code: 1008,
        name: 'Policy Violation',
        description: 'The endpoint is terminating the connection because it received a message that violates its policy. This is a generic status code, used when codes 1003 and 1009 are not suitable.'
    },
    1009: {
        code: 1009,
        name: 'Message too big',
        description: 'The endpoint is terminating the connection because a data frame was received that is too large.'
    },
    1010: {
        code: 1010,
        name: 'Missing Extension',
        description: "The client is terminating the connection because it expected the server to negotiate one or more extension, but the server didn't."
    },
    1011: {
        code: 1011,
        name: 'Internal Error',
        description: 'The server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.'
    },
    1012: {
        code: 1012,
        name: 'Service Restart',
        description: 'The server is terminating the connection because it is restarting.'
    },
    1013: {
        code: 1013,
        name: 'Try Again Later',
        description: 'The server is terminating the connection due to a temporary condition, e.g. it is overloaded and is casting off some of its clients.'
    },
    1014: {
        code: 1014,
        name: 'Bad Gateway',
        description: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server. This is similar to 502 HTTP Status Code.'
    },
    1015: {
        code: 1015,
        name: 'TLS Handshake',
        description: "Indicates that the connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified)."
    },
    3000: {
        code: 3000,
        name: 'Reconnect WebSocket',
        description: 'The client is terminating the connection because it wants to reconnect'
    },
    3001: {
        code: 3001,
        name: 'No Realtime Listeners',
        description: 'The client is terminating the connection because no more realtime listeners exist'
    },
    3002: {
        code: 3002,
        name: 'Heartbeat Ping Error',
        description: 'The client is terminating the connection due to its failure in sending heartbeat messages'
    },
    3003: {
        code: 3003,
        name: 'Heartbeat Pong Timeout Error',
        description: 'The client is terminating the connection because no heartbeat response is received from the server'
    },
    3050: {
        code: 3050,
        name: 'Server Close',
        description: 'The client is terminating the connection because no heartbeat response is received from the server'
    }
};
var CLOSE_EVENT_CODE;
(function (CLOSE_EVENT_CODE) {
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NormalClosure"] = 1000] = "NormalClosure";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["GoingAway"] = 1001] = "GoingAway";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["ProtocolError"] = 1002] = "ProtocolError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["UnsupportedData"] = 1003] = "UnsupportedData";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NoStatusReceived"] = 1005] = "NoStatusReceived";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["AbnormalClosure"] = 1006] = "AbnormalClosure";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["InvalidFramePayloadData"] = 1007] = "InvalidFramePayloadData";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["PolicyViolation"] = 1008] = "PolicyViolation";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["MessageTooBig"] = 1009] = "MessageTooBig";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["MissingExtension"] = 1010] = "MissingExtension";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["InternalError"] = 1011] = "InternalError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["ServiceRestart"] = 1012] = "ServiceRestart";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["TryAgainLater"] = 1013] = "TryAgainLater";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["BadGateway"] = 1014] = "BadGateway";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["TLSHandshake"] = 1015] = "TLSHandshake";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["ReconnectWebSocket"] = 3000] = "ReconnectWebSocket";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NoRealtimeListeners"] = 3001] = "NoRealtimeListeners";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["HeartbeatPingError"] = 3002] = "HeartbeatPingError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["HeartbeatPongTimeoutError"] = 3003] = "HeartbeatPongTimeoutError";
    CLOSE_EVENT_CODE[CLOSE_EVENT_CODE["NoAuthentication"] = 3050] = "NoAuthentication";
})(CLOSE_EVENT_CODE = exports.CLOSE_EVENT_CODE || (exports.CLOSE_EVENT_CODE = {}));
exports.getWSCloseError = function (code, reason) {
    var info = exports.CLOSE_EVENT_CODE_INFO[code];
    var errMsg = !info
        ? "code " + code
        : info.name + ", code " + code + ", reason " + (reason || info.description);
    return new error_1.CloudSDKError({
        errCode: error_1.ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_CLOSED,
        errMsg: errMsg
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3MtZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd3MtZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlEO0FBRXBDLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFDVCxrR0FBa0c7S0FDckc7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxZQUFZO1FBQ2xCLFdBQVcsRUFDVCxvSkFBb0o7S0FDdko7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsV0FBVyxFQUNULHFFQUFxRTtLQUN4RTtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixXQUFXLEVBQ1QsNEpBQTRKO0tBQy9KO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLFdBQVcsRUFDVCwwRUFBMEU7S0FDN0U7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsV0FBVyxFQUNULG9JQUFvSTtLQUN2STtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLDRCQUE0QjtRQUNsQyxXQUFXLEVBQ1QsMEpBQTBKO0tBQzdKO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFdBQVcsRUFDVCxtTEFBbUw7S0FDdEw7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsV0FB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ZFNES0Vycm9yIH0gZnJvbSAnLi9lcnJvcidcblxuZXhwb3J0IGNvbnN0IENMT1NFX0VWRU5UX0NPREVfSU5GTyA9IHtcbiAgMTAwMDoge1xuICAgIGNvZGU6IDEwMDAsXG4gICAgbmFtZTogJ05vcm1hbCBDbG9zdXJlJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdOb3JtYWwgY2xvc3VyZTsgdGhlIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlZCB3aGF0ZXZlciBwdXJwb3NlIGZvciB3aGljaCBpdCB3YXMgY3JlYXRlZC4nXG4gIH0sXG4gIDEwMDE6IHtcbiAgICBjb2RlOiAxMDAxLFxuICAgIG5hbWU6ICdHb2luZyBBd2F5JyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgZW5kcG9pbnQgaXMgZ29pbmcgYXdheSwgZWl0aGVyIGJlY2F1c2Ugb2YgYSBzZXJ2ZXIgZmFpbHVyZSBvciBiZWNhdXNlIHRoZSBicm93c2VyIGlzIG5hdmlnYXRpbmcgYXdheSBmcm9tIHRoZSBwYWdlIHRoYXQgb3BlbmVkIHRoZSBjb25uZWN0aW9uLidcbiAgfSxcbiAgMTAwMjoge1xuICAgIGNvZGU6IDEwMDIsXG4gICAgbmFtZTogJ1Byb3RvY29sIEVycm9yJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgZW5kcG9pbnQgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gZHVlIHRvIGEgcHJvdG9jb2wgZXJyb3IuJ1xuICB9LFxuICAxMDAzOiB7XG4gICAgY29kZTogMTAwMyxcbiAgICBuYW1lOiAnVW5zdXBwb3J0ZWQgRGF0YScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGNvbm5lY3Rpb24gaXMgYmVpbmcgdGVybWluYXRlZCBiZWNhdXNlIHRoZSBlbmRwb2ludCByZWNlaXZlZCBkYXRhIG9mIGEgdHlwZSBpdCBjYW5ub3QgYWNjZXB0IChmb3IgZXhhbXBsZSwgYSB0ZXh0LW9ubHkgZW5kcG9pbnQgcmVjZWl2ZWQgYmluYXJ5IGRhdGEpLidcbiAgfSxcbiAgMTAwNToge1xuICAgIGNvZGU6IDEwMDUsXG4gICAgbmFtZTogJ05vIFN0YXR1cyBSZWNlaXZlZCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnSW5kaWNhdGVzIHRoYXQgbm8gc3RhdHVzIGNvZGUgd2FzIHByb3ZpZGVkIGV2ZW4gdGhvdWdoIG9uZSB3YXMgZXhwZWN0ZWQuJ1xuICB9LFxuICAxMDA2OiB7XG4gICAgY29kZTogMTAwNixcbiAgICBuYW1lOiAnQWJub3JtYWwgQ2xvc3VyZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVXNlZCB0byBpbmRpY2F0ZSB0aGF0IGEgY29ubmVjdGlvbiB3YXMgY2xvc2VkIGFibm9ybWFsbHkgKHRoYXQgaXMsIHdpdGggbm8gY2xvc2UgZnJhbWUgYmVpbmcgc2VudCkgd2hlbiBhIHN0YXR1cyBjb2RlIGlzIGV4cGVjdGVkLidcbiAgfSxcbiAgMTAwNzoge1xuICAgIGNvZGU6IDEwMDcsXG4gICAgbmFtZTogJ0ludmFsaWQgZnJhbWUgcGF5bG9hZCBkYXRhJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgZW5kcG9pbnQgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gYmVjYXVzZSBhIG1lc3NhZ2Ugd2FzIHJlY2VpdmVkIHRoYXQgY29udGFpbmVkIGluY29uc2lzdGVudCBkYXRhIChlLmcuLCBub24tVVRGLTggZGF0YSB3aXRoaW4gYSB0ZXh0IG1lc3NhZ2UpLidcbiAgfSxcbiAgMTAwODoge1xuICAgIGNvZGU6IDEwMDgsXG4gICAgbmFtZTogJ1BvbGljeSBWaW9sYXRpb24nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBlbmRwb2ludCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIGl0IHJlY2VpdmVkIGEgbWVzc2FnZSB0aGF0IHZpb2xhdGVzIGl0cyBwb2xpY3kuIFRoaXMgaXMgYSBnZW5lcmljIHN0YXR1cyBjb2RlLCB1c2VkIHdoZW4gY29kZXMgMTAwMyBhbmQgMTAwOSBhcmUgbm90IHN1aXRhYmxlLidcbiAgfSxcbiAgMTAwOToge1xuICAgIGNvZGU6IDEwMDksXG4gICAgbmFtZTogJ01lc3NhZ2UgdG9vIGJpZycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGVuZHBvaW50IGlzIHRlcm1pbmF0aW5nIHRoZSBjb25uZWN0aW9uIGJlY2F1c2UgYSBkYXRhIGZyYW1lIHdhcyByZWNlaXZlZCB0aGF0IGlzIHRvbyBsYXJnZS4nXG4gIH0sXG4gIDEwMTA6IHtcbiAgICBjb2RlOiAxMDEwLFxuICAgIG5hbWU6ICdNaXNzaW5nIEV4dGVuc2lvbicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlRoZSBjbGllbnQgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gYmVjYXVzZSBpdCBleHBlY3RlZCB0aGUgc2VydmVyIHRvIG5lZ290aWF0ZSBvbmUgb3IgbW9yZSBleHRlbnNpb24sIGJ1dCB0aGUgc2VydmVyIGRpZG4ndC5cIlxuICB9LFxuICAxMDExOiB7XG4gICAgY29kZTogMTAxMSxcbiAgICBuYW1lOiAnSW50ZXJuYWwgRXJyb3InLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBzZXJ2ZXIgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gYmVjYXVzZSBpdCBlbmNvdW50ZXJlZCBhbiB1bmV4cGVjdGVkIGNvbmRpdGlvbiB0aGF0IHByZXZlbnRlZCBpdCBmcm9tIGZ1bGZpbGxpbmcgdGhlIHJlcXVlc3QuJ1xuICB9LFxuICAxMDEyOiB7XG4gICAgY29kZTogMTAxMixcbiAgICBuYW1lOiAnU2VydmljZSBSZXN0YXJ0JyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgc2VydmVyIGlzIHRlcm1pbmF0aW5nIHRoZSBjb25uZWN0aW9uIGJlY2F1c2UgaXQgaXMgcmVzdGFydGluZy4nXG4gIH0sXG4gIDEwMTM6IHtcbiAgICBjb2RlOiAxMDEzLFxuICAgIG5hbWU6ICdUcnkgQWdhaW4gTGF0ZXInLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBzZXJ2ZXIgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gZHVlIHRvIGEgdGVtcG9yYXJ5IGNvbmRpdGlvbiwgZS5nLiBpdCBpcyBvdmVybG9hZGVkIGFuZCBpcyBjYXN0aW5nIG9mZiBzb21lIG9mIGl0cyBjbGllbnRzLidcbiAgfSxcbiAgMTAxNDoge1xuICAgIGNvZGU6IDEwMTQsXG4gICAgbmFtZTogJ0JhZCBHYXRld2F5JyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgc2VydmVyIHdhcyBhY3RpbmcgYXMgYSBnYXRld2F5IG9yIHByb3h5IGFuZCByZWNlaXZlZCBhbiBpbnZhbGlkIHJlc3BvbnNlIGZyb20gdGhlIHVwc3RyZWFtIHNlcnZlci4gVGhpcyBpcyBzaW1pbGFyIHRvIDUwMiBIVFRQIFN0YXR1cyBDb2RlLidcbiAgfSxcbiAgMTAxNToge1xuICAgIGNvZGU6IDEwMTUsXG4gICAgbmFtZTogJ1RMUyBIYW5kc2hha2UnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgXCJJbmRpY2F0ZXMgdGhhdCB0aGUgY29ubmVjdGlvbiB3YXMgY2xvc2VkIGR1ZSB0byBhIGZhaWx1cmUgdG8gcGVyZm9ybSBhIFRMUyBoYW5kc2hha2UgKGUuZy4sIHRoZSBzZXJ2ZXIgY2VydGlmaWNhdGUgY2FuJ3QgYmUgdmVyaWZpZWQpLlwiXG4gIH0sXG4gIC8vIGN1c3RvbVxuICAzMDAwOiB7XG4gICAgY29kZTogMzAwMCxcbiAgICBuYW1lOiAnUmVjb25uZWN0IFdlYlNvY2tldCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGNsaWVudCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIGl0IHdhbnRzIHRvIHJlY29ubmVjdCdcbiAgfSxcbiAgMzAwMToge1xuICAgIGNvZGU6IDMwMDEsXG4gICAgbmFtZTogJ05vIFJlYWx0aW1lIExpc3RlbmVycycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGNsaWVudCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIG5vIG1vcmUgcmVhbHRpbWUgbGlzdGVuZXJzIGV4aXN0J1xuICB9LFxuICAzMDAyOiB7XG4gICAgY29kZTogMzAwMixcbiAgICBuYW1lOiAnSGVhcnRiZWF0IFBpbmcgRXJyb3InLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBjbGllbnQgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gZHVlIHRvIGl0cyBmYWlsdXJlIGluIHNlbmRpbmcgaGVhcnRiZWF0IG1lc3NhZ2VzJ1xuICB9LFxuICAzMDAzOiB7XG4gICAgY29kZTogMzAwMyxcbiAgICBuYW1lOiAnSGVhcnRiZWF0IFBvbmcgVGltZW91dCBFcnJvcicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGNsaWVudCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIG5vIGhlYXJ0YmVhdCByZXNwb25zZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXInXG4gIH0sXG4gIDMwNTA6IHtcbiAgICBjb2RlOiAzMDUwLFxuICAgIG5hbWU6ICdTZXJ2ZXIgQ2xvc2UnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBjbGllbnQgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gYmVjYXVzZSBubyBoZWFydGJlYXQgcmVzcG9uc2UgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyJ1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIENMT1NFX0VWRU5UX0NPREUge1xuICAvLyBzcGVjXG4gIE5vcm1hbENsb3N1cmUgPSAxMDAwLFxuICBHb2luZ0F3YXkgPSAxMDAxLFxuICBQcm90b2NvbEVycm9yID0gMTAwMixcbiAgVW5zdXBwb3J0ZWREYXRhID0gMTAwMyxcbiAgTm9TdGF0dXNSZWNlaXZlZCA9IDEwMDUsXG4gIEFibm9ybWFsQ2xvc3VyZSA9IDEwMDYsXG4gIEludmFsaWRGcmFtZVBheWxvYWREYXRhID0gMTAwNyxcbiAgUG9saWN5VmlvbGF0aW9uID0gMTAwOCxcbiAgTWVzc2FnZVRvb0JpZyA9IDEwMDksXG4gIE1pc3NpbmdFeHRlbnNpb24gPSAxMDEwLFxuICBJbnRlcm5hbEVycm9yID0gMTAxMSxcbiAgU2VydmljZVJlc3RhcnQgPSAxMDEyLFxuICBUcnlBZ2FpbkxhdGVyID0gMTAxMyxcbiAgQmFkR2F0ZXdheSA9IDEwMTQsXG4gIFRMU0hhbmRzaGFrZSA9IDEwMTUsXG4gIC8vIGN1c3RvbSAtIGNsaWVudCBjbG9zZSBpdHNlbGZcbiAgUmVjb25uZWN0V2ViU29ja2V0ID0gMzAwMCxcbiAgTm9SZWFsdGltZUxpc3RlbmVycyA9IDMwMDEsXG4gIEhlYXJ0YmVhdFBpbmdFcnJvciA9IDMwMDIsXG4gIEhlYXJ0YmVhdFBvbmdUaW1lb3V0RXJyb3IgPSAzMDAzLFxuICAvLyBjdXN0b20gLSBzZXJ2ZXIgY2xvc2VcbiAgTm9BdXRoZW50aWNhdGlvbiA9IDMwNTBcbn1cblxuZXhwb3J0IGNvbnN0IGdldFdTQ2xvc2VFcnJvciA9IChjb2RlOiBDTE9TRV9FVkVOVF9DT0RFLCByZWFzb24/OiBzdHJpbmcpID0+IHtcbiAgY29uc3QgaW5mbyA9IENMT1NFX0VWRU5UX0NPREVfSU5GT1tjb2RlXVxuICBjb25zdCBlcnJNc2cgPSAhaW5mb1xuICAgID8gYGNvZGUgJHtjb2RlfWBcbiAgICA6IGAke2luZm8ubmFtZX0sIGNvZGUgJHtjb2RlfSwgcmVhc29uICR7cmVhc29uIHx8IGluZm8uZGVzY3JpcHRpb259YFxuICByZXR1cm4gbmV3IENsb3VkU0RLRXJyb3Ioe1xuICAgIGVyckNvZGU6IEVSUl9DT0RFLlNES19EQVRBQkFTRV9SRUFMVElNRV9MSVNURU5FUl9XRUJTT0NLRVRfQ09OTkVDVElPTl9DTE9TRUQgYXMgc3RyaW5nLFxuICAgIGVyck1zZ1xuICB9KVxufVxuIl19