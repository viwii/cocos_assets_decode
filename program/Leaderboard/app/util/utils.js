var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = module.exports;

i.isValidValue = function(t) {
    return void 0 !== t && null != t && ("number" != typeof t || !isNaN(t));
}, i.isBoolean = function(t) {
    return this.isValidValue(t) && "boolean" == typeof t;
}, i.isNumber = function(t) {
    return this.isValidValue(t) && "number" == typeof t;
}, i.isString = function(t) {
    return this.isValidValue(t) && "string" == typeof t;
}, i.isFunction = function(t) {
    return this.isValidValue(t) && "function" == typeof t;
}, i.isArray = function(t) {
    return this.isValidValue(t) && Array.isArray(t);
}, i.isObject = function(i) {
    return this.isValidValue(i) && "object" === (void 0 === i ? "undefined" : t(i)) && !Array.isArray(i);
}, i.getJson = function(t) {
    if (!this.isString(t)) return null;
    try {
        var i = JSON.parse(t);
        if (i && this.isObject(i)) return i;
    } catch (t) {}
    return null;
}, i.invokeCb = function(t) {
    if (this.isFunction(t)) {
        var i = Array.prototype.slice.call(arguments, 1);
        t.apply(null, i);
    } else console.log("invokeCb faild", t);
}, i.clone = function(t) {
    var i = JSON.stringify(t);
    try {
        return JSON.parse(i);
    } catch (t) {}
};