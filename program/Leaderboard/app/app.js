function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), r = require("./conf/message/messageConf"), t = require("./service/handlerService"), i = function() {
    function i() {
        e(this, i), this.handlerService = new t();
    }
    return n(i, [ {
        key: "init",
        value: function() {
            this.handlerService.init(r.MESSAGES_HANDLER);
        }
    }, {
        key: "start",
        value: function() {
            var e = this;
            wx.onMessage(function(n) {
                e.handlerService.handler(n.route, n.data);
            });
        }
    } ]), i;
}();

module.exports = i;