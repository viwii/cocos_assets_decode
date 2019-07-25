var n = function() {};
module.exports = {
    Utils: n
}, n.isValidValue = function(t) {
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
} 