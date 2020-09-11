import { ERR_CODE, CloudSDKError } from './error';
export var CLOSE_EVENT_CODE_INFO = {
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
export var CLOSE_EVENT_CODE;
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
})(CLOSE_EVENT_CODE || (CLOSE_EVENT_CODE = {}));
export var getWSCloseError = function (code, reason) {
    var info = CLOSE_EVENT_CODE_INFO[code];
    var errMsg = !info
        ? "code " + code
        : info.name + ", code " + code + ", reason " + (reason || info.description);
    return new CloudSDKError({
        errCode: ERR_CODE.SDK_DATABASE_REALTIME_LISTENER_WEBSOCKET_CONNECTION_CLOSED,
        errMsg: errMsg
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3MtZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd3MtZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFakQsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQUc7SUFDbkMsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFdBQVcsRUFDVCxrR0FBa0c7S0FDckc7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxZQUFZO1FBQ2xCLFdBQVcsRUFDVCxvSkFBb0o7S0FDdko7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsV0FBVyxFQUNULHFFQUFxRTtLQUN4RTtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixXQUFXLEVBQ1QsNEpBQTRKO0tBQy9KO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLFdBQVcsRUFDVCwwRUFBMEU7S0FDN0U7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsV0FBVyxFQUNULG9JQUFvSTtLQUN2STtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLDRCQUE0QjtRQUNsQyxXQUFXLEVBQ1QsMEpBQTBKO0tBQzdKO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFdBQVcsRUFDVCxtTEFBbUw7S0FDdEw7SUFDRCxJQUFJLEVBQUU7UUFDSixJ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QyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRVJSX0NPREUsIENsb3VkU0RLRXJyb3IgfSBmcm9tICcuL2Vycm9yJ1xuXG5leHBvcnQgY29uc3QgQ0xPU0VfRVZFTlRfQ09ERV9JTkZPID0ge1xuICAxMDAwOiB7XG4gICAgY29kZTogMTAwMCxcbiAgICBuYW1lOiAnTm9ybWFsIENsb3N1cmUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ05vcm1hbCBjbG9zdXJlOyB0aGUgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkgY29tcGxldGVkIHdoYXRldmVyIHB1cnBvc2UgZm9yIHdoaWNoIGl0IHdhcyBjcmVhdGVkLidcbiAgfSxcbiAgMTAwMToge1xuICAgIGNvZGU6IDEwMDEsXG4gICAgbmFtZTogJ0dvaW5nIEF3YXknLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBlbmRwb2ludCBpcyBnb2luZyBhd2F5LCBlaXRoZXIgYmVjYXVzZSBvZiBhIHNlcnZlciBmYWlsdXJlIG9yIGJlY2F1c2UgdGhlIGJyb3dzZXIgaXMgbmF2aWdhdGluZyBhd2F5IGZyb20gdGhlIHBhZ2UgdGhhdCBvcGVuZWQgdGhlIGNvbm5lY3Rpb24uJ1xuICB9LFxuICAxMDAyOiB7XG4gICAgY29kZTogMTAwMixcbiAgICBuYW1lOiAnUHJvdG9jb2wgRXJyb3InLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBlbmRwb2ludCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBkdWUgdG8gYSBwcm90b2NvbCBlcnJvci4nXG4gIH0sXG4gIDEwMDM6IHtcbiAgICBjb2RlOiAxMDAzLFxuICAgIG5hbWU6ICdVbnN1cHBvcnRlZCBEYXRhJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgY29ubmVjdGlvbiBpcyBiZWluZyB0ZXJtaW5hdGVkIGJlY2F1c2UgdGhlIGVuZHBvaW50IHJlY2VpdmVkIGRhdGEgb2YgYSB0eXBlIGl0IGNhbm5vdCBhY2NlcHQgKGZvciBleGFtcGxlLCBhIHRleHQtb25seSBlbmRwb2ludCByZWNlaXZlZCBiaW5hcnkgZGF0YSkuJ1xuICB9LFxuICAxMDA1OiB7XG4gICAgY29kZTogMTAwNSxcbiAgICBuYW1lOiAnTm8gU3RhdHVzIFJlY2VpdmVkJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdJbmRpY2F0ZXMgdGhhdCBubyBzdGF0dXMgY29kZSB3YXMgcHJvdmlkZWQgZXZlbiB0aG91Z2ggb25lIHdhcyBleHBlY3RlZC4nXG4gIH0sXG4gIDEwMDY6IHtcbiAgICBjb2RlOiAxMDA2LFxuICAgIG5hbWU6ICdBYm5vcm1hbCBDbG9zdXJlJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdVc2VkIHRvIGluZGljYXRlIHRoYXQgYSBjb25uZWN0aW9uIHdhcyBjbG9zZWQgYWJub3JtYWxseSAodGhhdCBpcywgd2l0aCBubyBjbG9zZSBmcmFtZSBiZWluZyBzZW50KSB3aGVuIGEgc3RhdHVzIGNvZGUgaXMgZXhwZWN0ZWQuJ1xuICB9LFxuICAxMDA3OiB7XG4gICAgY29kZTogMTAwNyxcbiAgICBuYW1lOiAnSW52YWxpZCBmcmFtZSBwYXlsb2FkIGRhdGEnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBlbmRwb2ludCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIGEgbWVzc2FnZSB3YXMgcmVjZWl2ZWQgdGhhdCBjb250YWluZWQgaW5jb25zaXN0ZW50IGRhdGEgKGUuZy4sIG5vbi1VVEYtOCBkYXRhIHdpdGhpbiBhIHRleHQgbWVzc2FnZSkuJ1xuICB9LFxuICAxMDA4OiB7XG4gICAgY29kZTogMTAwOCxcbiAgICBuYW1lOiAnUG9saWN5IFZpb2xhdGlvbicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGVuZHBvaW50IGlzIHRlcm1pbmF0aW5nIHRoZSBjb25uZWN0aW9uIGJlY2F1c2UgaXQgcmVjZWl2ZWQgYSBtZXNzYWdlIHRoYXQgdmlvbGF0ZXMgaXRzIHBvbGljeS4gVGhpcyBpcyBhIGdlbmVyaWMgc3RhdHVzIGNvZGUsIHVzZWQgd2hlbiBjb2RlcyAxMDAzIGFuZCAxMDA5IGFyZSBub3Qgc3VpdGFibGUuJ1xuICB9LFxuICAxMDA5OiB7XG4gICAgY29kZTogMTAwOSxcbiAgICBuYW1lOiAnTWVzc2FnZSB0b28gYmlnJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgZW5kcG9pbnQgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gYmVjYXVzZSBhIGRhdGEgZnJhbWUgd2FzIHJlY2VpdmVkIHRoYXQgaXMgdG9vIGxhcmdlLidcbiAgfSxcbiAgMTAxMDoge1xuICAgIGNvZGU6IDEwMTAsXG4gICAgbmFtZTogJ01pc3NpbmcgRXh0ZW5zaW9uJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiVGhlIGNsaWVudCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIGl0IGV4cGVjdGVkIHRoZSBzZXJ2ZXIgdG8gbmVnb3RpYXRlIG9uZSBvciBtb3JlIGV4dGVuc2lvbiwgYnV0IHRoZSBzZXJ2ZXIgZGlkbid0LlwiXG4gIH0sXG4gIDEwMTE6IHtcbiAgICBjb2RlOiAxMDExLFxuICAgIG5hbWU6ICdJbnRlcm5hbCBFcnJvcicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIHNlcnZlciBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIGl0IGVuY291bnRlcmVkIGFuIHVuZXhwZWN0ZWQgY29uZGl0aW9uIHRoYXQgcHJldmVudGVkIGl0IGZyb20gZnVsZmlsbGluZyB0aGUgcmVxdWVzdC4nXG4gIH0sXG4gIDEwMTI6IHtcbiAgICBjb2RlOiAxMDEyLFxuICAgIG5hbWU6ICdTZXJ2aWNlIFJlc3RhcnQnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBzZXJ2ZXIgaXMgdGVybWluYXRpbmcgdGhlIGNvbm5lY3Rpb24gYmVjYXVzZSBpdCBpcyByZXN0YXJ0aW5nLidcbiAgfSxcbiAgMTAxMzoge1xuICAgIGNvZGU6IDEwMTMsXG4gICAgbmFtZTogJ1RyeSBBZ2FpbiBMYXRlcicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIHNlcnZlciBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBkdWUgdG8gYSB0ZW1wb3JhcnkgY29uZGl0aW9uLCBlLmcuIGl0IGlzIG92ZXJsb2FkZWQgYW5kIGlzIGNhc3Rpbmcgb2ZmIHNvbWUgb2YgaXRzIGNsaWVudHMuJ1xuICB9LFxuICAxMDE0OiB7XG4gICAgY29kZTogMTAxNCxcbiAgICBuYW1lOiAnQmFkIEdhdGV3YXknLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1RoZSBzZXJ2ZXIgd2FzIGFjdGluZyBhcyBhIGdhdGV3YXkgb3IgcHJveHkgYW5kIHJlY2VpdmVkIGFuIGludmFsaWQgcmVzcG9uc2UgZnJvbSB0aGUgdXBzdHJlYW0gc2VydmVyLiBUaGlzIGlzIHNpbWlsYXIgdG8gNTAyIEhUVFAgU3RhdHVzIENvZGUuJ1xuICB9LFxuICAxMDE1OiB7XG4gICAgY29kZTogMTAxNSxcbiAgICBuYW1lOiAnVExTIEhhbmRzaGFrZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIkluZGljYXRlcyB0aGF0IHRoZSBjb25uZWN0aW9uIHdhcyBjbG9zZWQgZHVlIHRvIGEgZmFpbHVyZSB0byBwZXJmb3JtIGEgVExTIGhhbmRzaGFrZSAoZS5nLiwgdGhlIHNlcnZlciBjZXJ0aWZpY2F0ZSBjYW4ndCBiZSB2ZXJpZmllZCkuXCJcbiAgfSxcbiAgLy8gY3VzdG9tXG4gIDMwMDA6IHtcbiAgICBjb2RlOiAzMDAwLFxuICAgIG5hbWU6ICdSZWNvbm5lY3QgV2ViU29ja2V0JyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgY2xpZW50IGlzIHRlcm1pbmF0aW5nIHRoZSBjb25uZWN0aW9uIGJlY2F1c2UgaXQgd2FudHMgdG8gcmVjb25uZWN0J1xuICB9LFxuICAzMDAxOiB7XG4gICAgY29kZTogMzAwMSxcbiAgICBuYW1lOiAnTm8gUmVhbHRpbWUgTGlzdGVuZXJzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgY2xpZW50IGlzIHRlcm1pbmF0aW5nIHRoZSBjb25uZWN0aW9uIGJlY2F1c2Ugbm8gbW9yZSByZWFsdGltZSBsaXN0ZW5lcnMgZXhpc3QnXG4gIH0sXG4gIDMwMDI6IHtcbiAgICBjb2RlOiAzMDAyLFxuICAgIG5hbWU6ICdIZWFydGJlYXQgUGluZyBFcnJvcicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGNsaWVudCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBkdWUgdG8gaXRzIGZhaWx1cmUgaW4gc2VuZGluZyBoZWFydGJlYXQgbWVzc2FnZXMnXG4gIH0sXG4gIDMwMDM6IHtcbiAgICBjb2RlOiAzMDAzLFxuICAgIG5hbWU6ICdIZWFydGJlYXQgUG9uZyBUaW1lb3V0IEVycm9yJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdUaGUgY2xpZW50IGlzIHRlcm1pbmF0aW5nIHRoZSBjb25uZWN0aW9uIGJlY2F1c2Ugbm8gaGVhcnRiZWF0IHJlc3BvbnNlIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlcidcbiAgfSxcbiAgMzA1MDoge1xuICAgIGNvZGU6IDMwNTAsXG4gICAgbmFtZTogJ1NlcnZlciBDbG9zZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVGhlIGNsaWVudCBpcyB0ZXJtaW5hdGluZyB0aGUgY29ubmVjdGlvbiBiZWNhdXNlIG5vIGhlYXJ0YmVhdCByZXNwb25zZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXInXG4gIH1cbn1cblxuZXhwb3J0IGVudW0gQ0xPU0VfRVZFTlRfQ09ERSB7XG4gIC8vIHNwZWNcbiAgTm9ybWFsQ2xvc3VyZSA9IDEwMDAsXG4gIEdvaW5nQXdheSA9IDEwMDEsXG4gIFByb3RvY29sRXJyb3IgPSAxMDAyLFxuICBVbnN1cHBvcnRlZERhdGEgPSAxMDAzLFxuICBOb1N0YXR1c1JlY2VpdmVkID0gMTAwNSxcbiAgQWJub3JtYWxDbG9zdXJlID0gMTAwNixcbiAgSW52YWxpZEZyYW1lUGF5bG9hZERhdGEgPSAxMDA3LFxuICBQb2xpY3lWaW9sYXRpb24gPSAxMDA4LFxuICBNZXNzYWdlVG9vQmlnID0gMTAwOSxcbiAgTWlzc2luZ0V4dGVuc2lvbiA9IDEwMTAsXG4gIEludGVybmFsRXJyb3IgPSAxMDExLFxuICBTZXJ2aWNlUmVzdGFydCA9IDEwMTIsXG4gIFRyeUFnYWluTGF0ZXIgPSAxMDEzLFxuICBCYWRHYXRld2F5ID0gMTAxNCxcbiAgVExTSGFuZHNoYWtlID0gMTAxNSxcbiAgLy8gY3VzdG9tIC0gY2xpZW50IGNsb3NlIGl0c2VsZlxuICBSZWNvbm5lY3RXZWJTb2NrZXQgPSAzMDAwLFxuICBOb1JlYWx0aW1lTGlzdGVuZXJzID0gMzAwMSxcbiAgSGVhcnRiZWF0UGluZ0Vycm9yID0gMzAwMixcbiAgSGVhcnRiZWF0UG9uZ1RpbWVvdXRFcnJvciA9IDMwMDMsXG4gIC8vIGN1c3RvbSAtIHNlcnZlciBjbG9zZVxuICBOb0F1dGhlbnRpY2F0aW9uID0gMzA1MFxufVxuXG5leHBvcnQgY29uc3QgZ2V0V1NDbG9zZUVycm9yID0gKGNvZGU6IENMT1NFX0VWRU5UX0NPREUsIHJlYXNvbj86IHN0cmluZykgPT4ge1xuICBjb25zdCBpbmZvID0gQ0xPU0VfRVZFTlRfQ09ERV9JTkZPW2NvZGVdXG4gIGNvbnN0IGVyck1zZyA9ICFpbmZvXG4gICAgPyBgY29kZSAke2NvZGV9YFxuICAgIDogYCR7aW5mby5uYW1lfSwgY29kZSAke2NvZGV9LCByZWFzb24gJHtyZWFzb24gfHwgaW5mby5kZXNjcmlwdGlvbn1gXG4gIHJldHVybiBuZXcgQ2xvdWRTREtFcnJvcih7XG4gICAgZXJyQ29kZTogRVJSX0NPREUuU0RLX0RBVEFCQVNFX1JFQUxUSU1FX0xJU1RFTkVSX1dFQlNPQ0tFVF9DT05ORUNUSU9OX0NMT1NFRCBhcyBzdHJpbmcsXG4gICAgZXJyTXNnXG4gIH0pXG59XG4iXX0=