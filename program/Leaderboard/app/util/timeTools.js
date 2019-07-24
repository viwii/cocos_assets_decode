var e = require("./utils"), t = module.exports, r = 864e5;

Date.prototype.Format = function(t) {
    if (!e.isString(t)) return "";
    var n = t, o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
        w: Math.floor((this.getTime() + 3 * r + 288e5) / (7 * r))
    };
    /(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var i in o) new RegExp("(" + i + ")").test(n) && (n = n.replace(RegExp.$1, 1 == RegExp.$1.length ? o[i] : ("00" + o[i]).substr(("" + o[i]).length)));
    return n;
}, t.format = function(t, r) {
    return e.isNumber(r) || (r = Date.now()), new Date(r).Format(t);
}, t.getDayZeroTime = function(t) {
    return e.isNumber(t) || (t = Date.now()), Math.floor((t + 288e5) / r) * r - 288e5;
}, t.getWeekZeroTime = function(t) {
    return e.isNumber(t) || (t = Date.now()), 6048e5 * Math.floor((t + 288e5 + 3 * r) / 6048e5) - 288e5 - 3 * r;
}, t.getMonthZeroTime = function(t) {
    e.isNumber(t) || (t = Date.now());
    var r = new Date(t), n = new Date(-288e5);
    return n.setYear(r.getFullYear()), n.setMonth(r.getMonth()), n.getTime();
};