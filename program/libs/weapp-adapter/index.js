function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("./window")), n = e(require("./document")), o = (e(require("./HTMLElement")), 
GameGlobal);

GameGlobal.__isAdapterInjected || (GameGlobal.__isAdapterInjected = !0, function() {
    t.document = n.default, t.addEventListener = function(e, n) {
        t.document.addEventListener(e, n);
    }, t.removeEventListener = function(e, n) {
        t.document.removeEventListener(e, n);
    }, t.dispatchEvent = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        console.log("window.dispatchEvent", e.type, e);
    };
    var e = wx.getSystemInfoSync().platform;
    if ("undefined" == typeof __devtoolssubcontext && "devtools" === e) {
        for (var r in t) {
            var i = Object.getOwnPropertyDescriptor(o, r);
            i && !0 !== i.configurable || Object.defineProperty(window, r, {
                value: t[r]
            });
        }
        for (var d in t.document) {
            var a = Object.getOwnPropertyDescriptor(o.document, d);
            a && !0 !== a.configurable || Object.defineProperty(o.document, d, {
                value: t.document[d]
            });
        }
        window.parent = window;
    } else {
        for (var u in t) o[u] = t[u];
        o.window = t, window = o, window.top = window.parent = window;
    }
}());