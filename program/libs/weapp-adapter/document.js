function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
    return n.default = e, n;
}(require("./window")), t = e(require("./HTMLElement")), a = e(require("./HTMLVideoElement")), r = e(require("./Image")), u = e(require("./Audio")), o = e(require("./Canvas"));

require("./EventIniter/index.js");

var d = {}, l = {
    readyState: "complete",
    visibilityState: "visible",
    documentElement: n,
    hidden: !1,
    style: {},
    location: n.location,
    ontouchstart: null,
    ontouchmove: null,
    ontouchend: null,
    head: new t.default("head"),
    body: new t.default("body"),
    createElement: function(e) {
        return "canvas" === e ? new o.default() : "audio" === e ? new u.default() : "img" === e ? new r.default() : "video" === e ? new a.default() : new t.default(e);
    },
    createElementNS: function(e, n) {
        return this.createElement(n);
    },
    getElementById: function(e) {
        return e === n.canvas.id ? n.canvas : null;
    },
    getElementsByTagName: function(e) {
        return "head" === e ? [ l.head ] : "body" === e ? [ l.body ] : "canvas" === e ? [ n.canvas ] : [];
    },
    getElementsByName: function(e) {
        return "head" === e ? [ l.head ] : "body" === e ? [ l.body ] : "canvas" === e ? [ n.canvas ] : [];
    },
    querySelector: function(e) {
        return "head" === e ? l.head : "body" === e ? l.body : "canvas" === e ? n.canvas : e === "#" + n.canvas.id ? n.canvas : null;
    },
    querySelectorAll: function(e) {
        return "head" === e ? [ l.head ] : "body" === e ? [ l.body ] : "canvas" === e ? [ n.canvas ] : [];
    },
    addEventListener: function(e, n) {
        d[e] || (d[e] = []), d[e].push(n);
    },
    removeEventListener: function(e, n) {
        var t = d[e];
        if (t && t.length > 0) for (var a = t.length; a--; a > 0) if (t[a] === n) {
            t.splice(a, 1);
            break;
        }
    },
    dispatchEvent: function(e) {
        var n = d[e.type];
        if (n) for (var t = 0; t < n.length; t++) n[t](e);
    }
};

exports.default = l, module.exports = exports.default;