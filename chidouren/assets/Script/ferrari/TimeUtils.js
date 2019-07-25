
var s = require("./CommonUtils"), o = function() {};
module.exports = {
    TimeUtils: o
};
var n = 864e5;
Date.prototype.Format = function(t) {
    if (!s.CommonUtils.isString(t)) return "";
    var e = t, i = {
        "M+": Date.getMonth() + 1,
        "d+": Date.getDate(),
        "h+": Date.getHours(),
        "m+": Date.getMinutes(),
        "s+": Date.getSeconds(),
        "q+": Math.floor((Date.getMonth() + 3) / 3),
        S: Date.getMilliseconds(),
        w: Math.floor((Date.getTime() + 3 * n + 288e5) / (7 * n))
    };
    for (var o in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (Date.getFullYear() + "").substr(4 - RegExp.$1.length))), 
    i) new RegExp("(" + o + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? i[o] : ("00" + i[o]).substr(("" + i[o]).length)));
    return e;
}, o.time2StrEN = function(t) {
    if (t < 0) return t.toString();
    t -= 24 * Math.floor(t / 24 / 3600 / 1e3) * 3600 * 1e3;
    var e = Math.floor(t / 3600 / 1e3);
    t -= 3600 * e * 1e3;
    var i = Math.floor(t / 60 / 1e3);
    t -= 60 * i * 1e3;
    var s = Math.floor(t / 1e3);
    return e < 10 && (e = "0" + e), i < 10 && (i = "0" + i), s < 10 && (s = "0" + s), 
    [ e, ":", i, ":", s ].join("");
}, o.time2StrCN = function(t) {
    if (t < 0) return "";
    var e = Math.floor(t / 24 / 3600 / 1e3);
    t -= 24 * e * 3600 * 1e3;
    var i = Math.floor(t / 3600 / 1e3);
    t -= 3600 * i * 1e3;
    var s = Math.floor(t / 60 / 1e3);
    t -= 60 * s * 1e3;
    var o = Math.floor(t / 1e3);
    return e > 0 ? i > 0 ? [ e, "天" ].join("") : [ e, "天", i, "时" ].join("") : i > 0 ? s > 0 ? [ i, "时", s, "分" ].join("") : [ i, "时" ].join("") : s > 0 ? o > 0 ? [ s, "分", o, "秒" ].join("") : [ s, "分" ].join("") : o > 0 ? [ o, "秒" ].join("") : "";
}, o.isTimeOut = function(t) {
    return o.getNowTime() > t;
}, o.getNowTime = function(t, e) {
    return Date.now();
}, o.getEndTime = function(t) {
    return Date.now() + t;
}, o.format = function(t, e) {
    return s.CommonUtils.isNumber(e) || (e = Date.now()), new Date(e).Format(t);
}, o.getDayZeroTime = function(t) {
    return s.CommonUtils.isNumber(t) || (t = Date.now()), Math.floor((t + 288e5) / n) * n - 288e5;
}, o.getWeekZeroTime = function(t) {
    return s.CommonUtils.isNumber(t) || (t = Date.now()), 6048e5 * Math.floor((t + 288e5 + 3 * n) / 6048e5) - 288e5 - 3 * n;
}, o.getMonthZeroTime = function(t) {
    s.CommonUtils.isNumber(t) || (t = Date.now());
    var e = new Date(t), i = new Date(-288e5);
    return i.setYear(e.getFullYear()), i.setMonth(e.getMonth()), i.getTime();
} 