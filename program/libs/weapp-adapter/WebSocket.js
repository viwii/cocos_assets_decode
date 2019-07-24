function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t, n, o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), r = new WeakMap(), s = (n = t = function() {
    function t(n) {
        var o = this, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if (e(this, t), this.binaryType = "", this.bufferedAmount = 0, this.extensions = "", 
        this.onclose = null, this.onerror = null, this.onmessage = null, this.onopen = null, 
        this.protocol = "", this.readyState = 3, "string" != typeof n || !/(^ws:\/\/)|(^wss:\/\/)/.test(n)) throw new TypeError("Failed to construct 'WebSocket': The URL '" + n + "' is invalid");
        this.url = n, this.readyState = t.CONNECTING;
        var i = wx.connectSocket({
            url: n,
            protocols: Array.isArray(s) ? s : [ s ],
            tcpNoDelay: !0
        });
        return r.set(this, i), i.onClose(function(e) {
            o.readyState = t.CLOSED, "function" == typeof o.onclose && o.onclose(e);
        }), i.onMessage(function(e) {
            "function" == typeof o.onmessage && o.onmessage(e);
        }), i.onOpen(function() {
            o.readyState = t.OPEN, "function" == typeof o.onopen && o.onopen();
        }), i.onError(function(e) {
            "function" == typeof o.onerror && o.onerror(new Error(e.errMsg));
        }), this;
    }
    return o(t, [ {
        key: "close",
        value: function(e, n) {
            this.readyState = t.CLOSING, r.get(this).close({
                code: e,
                reason: n
            });
        }
    }, {
        key: "send",
        value: function(e) {
            if ("string" != typeof e && !(e instanceof ArrayBuffer)) throw new TypeError("Failed to send message: The data " + e + " is invalid");
            r.get(this).send({
                data: e
            });
        }
    } ]), t;
}(), t.CONNECTING = 0, t.OPEN = 1, t.CLOSING = 2, t.CLOSED = 3, n);

exports.default = s, module.exports = exports.default;