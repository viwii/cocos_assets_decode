var n = function() {};

n.isValidValue = function(t) {
    return void 0 !== t && null != t && ("number" != typeof t || !isNaN(t));
}, n.isBoolean = function(t) {
    return n.isValidValue(t) && "boolean" == typeof t;
}, n.isNumber = function(t) {
    return n.isValidValue(t) && "number" == typeof t;
}, n.isString = function(t) {
    return n.isValidValue(t) && "string" == typeof t;
}, n.isFunction = function(t) {
    return n.isValidValue(t) && "function" == typeof t;
}, n.isArray = function(t) {
    return n.isValidValue(t) && Array.isArray(t);
}, n.isObject = function(t) {
    return n.isValidValue(t) && "object" === (void 0 === t ? "undefined" : o(t)) && !Array.isArray(t);
}, n.getJson = function(t) {
    if (!n.isString(t)) return null;
    try {
        var e = JSON.parse(t);
        if (e && n.isObject(e)) return e;
    } catch (t) {}
    return null;
}, n.getObjFunc = function(t, e) {
    return n.isObject(t) && n.isString(e) && n.isFunction(t[e]) ? t[e].bind(t) : null;
}, n.getObjFuncEx = function(t, e, i) {
    var s = n.getObjFunc(t, e);
    return null == s ? n.getObjFunc(i, e) : s;
}, n.invokeCb = function(t) {
    if (n.isFunction(t)) {
        var e = Array.prototype.slice.call(arguments, 1);
        t.apply(null, e);
    } else console.log("invokeCb faild", t);
}, n.clone = function(t) {
    var e = JSON.stringify(t);
    try {
        return JSON.parse(e);
    } catch (t) {}
    return null;
}, n.angleToRotation = function(t) {
    return -1 * t;
}, n.rotationToAngle = function(t) {
    return -1 * t;
}, n.rotaToRad = function(t) {
    var e = n.rotationToAngle(t) % 360;
    return 0 == t && (e = 0), n.toFixed(e / 180 * Math.PI);
}, n.sin = function(t) {
    return Math.abs(t) % Math.PI == 0 ? t / Math.PI : Math.abs(t) == Math.PI / 2 ? 0 : Math.sin(t);
}, n.cos = function(t) {
    return Math.abs(t) == Math.PI / 2 ? t / (Math.PI / 2) : Math.cos(t);
}, n.toFixed = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    return 0 == t ? 0 : i ? Math.floor(t * e) / e : Math.ceil(t * e) / e;
}, n.rotationToVec2 = function(t) {
    var e = {
        x: 0,
        y: 0,
        dir: 0
    }, i = t % 360;
    return 0 == t && (i = 0), i < 0 && i > -90 || i > 270 && i < 360 ? (e.x = 1, e.y = 1, 
    e.dir = 9) : i < -90 && i > -180 || i > 180 && i < 270 ? (e.x = -1, e.y = 1, e.dir = 7) : i < -180 && i > -270 || i > 90 && i < 180 ? (e.x = -1, 
    e.y = -1, e.dir = 1) : i < -270 && i > -360 || i > 0 && i < 90 ? (e.x = 1, e.y = -1, 
    e.dir = 3) : 0 == i ? (e.x = 1, e.y = 0, e.dir = 6) : -90 == i || 270 == i ? (e.x = 0, 
    e.y = 1, e.dir = 8) : -180 == i || 180 == i ? (e.x = -1, e.y = 0, e.dir = 4) : -270 != i && 90 != i || (e.x = 0, 
    e.y = -1, e.dir = 2), e;
}, n.vToRotaVec2 = function(t, e) {
    var i = {}, s = n.rotationToVec2(e), o = n.rotaToRad(e);
    return i.x = s.x * Math.abs(n.cos(o)) * t, i.y = s.y * Math.abs(n.sin(o)) * t, i;
}, n.randomInt = function(t, e) {
    return Math.floor((e - t + 1) * Math.random()) + t;
}, n.arrayRandomSort = function(t) {
    for (var e = t.length - 1, i = 0; i <= e; i++) {
        var s = n.randomInt(i, e), o = t[i];
        t[i] = t[s], t[s] = o;
    }
    return t;
}, n.unitToString = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = null, o = null;
    return t >= 1e15 ? (s = n.toFixed(t / 1e15, e, !0), o = "Q") : t >= 1e12 ? (s = n.toFixed(t / 1e12, e, !0), 
    o = "T") : t >= 1e9 ? (s = n.toFixed(t / 1e9, e, !0), o = "B") : t >= 1e6 ? (s = n.toFixed(t / 1e6, e, !0), 
    o = "M") : t >= 1e4 ? (s = n.toFixed(t / 1e4, e, !0), o = "W") : i && (s = n.toFixed(t, e, !0)), 
    null != s && null != o ? -1 == (s + "").indexOf(".") ? s + ".0" + o : s + o : t + "";
}, n.intToString = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
    return String(t).length >= e ? "" + t : "" + (Array(e).join(0) + t).slice(-e);
}, n.stringReplace = function(t, e, i) {
    return e.replace(new RegExp(t, "gm"), i);
}, n.stringKeyValue = function(t, e) {
    var i = t;
    for (var s in e) {
        var o = e[s];
        void 0 != o && (i = n.stringReplace("\\{" + s + "\\}", i, o));
    }
    return i;
}, n.stringTruncate = function(t, e) {
    for (var i = "", s = 0, o = 0; o < t.length; o++) {
        var n = t.charCodeAt(o);
        if (n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? s++ : s += 2, !(s <= e)) break;
        i += t.substr(o, 1);
    }
    return i;
}
module.exports = {
    CommonUtils: n
}