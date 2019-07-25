 Date.prototype.Format = function(t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    for (var i in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
    e) new RegExp("(" + i + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[i] : ("00" + e[i]).substr(("" + e[i]).length)));
    return t;
};
var s = function() {};
s.serverTime = 0, s.startTime = 0, s.initTime = function() {
    s.serverTime = s.getTimestamp(), s.startTime = s.getTimestamp();
}, s.setServerTime = function(t) {
    s.serverTime = t, s.startTime = s.getTimestamp(), console.log("setServerTime", t);
}, s.date2datestr = function(t) {
    return t = t || new Date(), s.timestamp2datestr(t.getTime());
}, s.timestamp2datestr = function(t) {
    return void 0 != t && new Date(t).Format("yyyy-MM-dd hh:mm:ss") || new Date().Format("yyyy-MM-dd hh:mm:ss");
}, s.datestr2timestamp = function(t) {
    return new Date(t).getTime();
}, s.isTimeOut = function(t) {
    var e = s.getTimestamp() - s.startTime;
    return s.serverTime + e > t;
}, s.getLastTime = function(t) {
    return t - s.getNowTimeByServer();
}, s.getNowTimeByServer = function(t) {
    var e = s.getTimestamp() - s.startTime;
    return s.serverTime + e;
}, s.getNowDateStr = function() {
    return s.timestamp2datestr();
}, s.timestamp2datestr_ = function(t) {
    return s.timestamp2datestr(t) + "." + t % 1e3;
}, s.getTimestamp = function(t) {
    var e = Date.now();
    return t ? Math.floor(e / 1e3) : Math.floor(e);
}, s.getZeroTime = function(t) {
    return null != t && void 0 != t || (t = s.getTimestamp()), 864e5 * Math.floor((t + 288e5) / 864e5) - 288e5;
}, s.getWeekZeroTime = function(t) {
    return null != t && void 0 != t || (t = s.getTimestamp()), 6048e5 * Math.floor((t + 288e5 + 3456e5) / 6048e5) - 288e5 - 3456e5;
}, s.getMonthZeroTime = function(t) {
    null != t && void 0 != t || (t = s.getTimestamp());
    var e = new Date(t), i = new Date(-288e5);
    return i.setYear(e.getFullYear()), i.setMonth(e.getMonth()), i.getTime();
}, s.getThisMonthDays = function() {
    var t = new Date(), e = t.getFullYear(), i = t.getMonth();
    return 1 != i ? [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][i] : e % 100 != 0 ? e % 4 == 0 ? 29 : 28 : e % 400 == 0 ? 29 : 28;
}, s.time2countdownStr = function(t) {
    if (t < 0) return t.toString();
    var e = Math.floor(t / 24 / 3600 / 1e3);
    t -= 24 * e * 3600 * 1e3;
    var i = Math.floor(t / 3600 / 1e3);
    t -= 3600 * i * 1e3;
    var s = Math.floor(t / 60 / 1e3);
    return t -= 60 * s * 1e3, [ e, "天", i, "小时", s, "分钟", Math.floor(t / 1e3), "秒" ].join("");
}, s.time2countdownStr2 = function(t) {
    var e = t, i = Math.floor(e / 3600 / 1e3);
    e -= 3600 * i * 1e3;
    var s = Math.floor(e / 60 / 1e3);
    e -= 60 * s * 1e3;
    var o = Math.floor(e / 1e3);
    return (i >= 10 ? i : "0" + i) + ":" + (s >= 10 ? s : "0" + s) + ":" + (o >= 10 ? o : "0" + o);
}, s.time2countdownStrCn = function(t) {
    if (t < 0) return "";
    var e = Math.floor(t / 24 / 3600 / 1e3);
    t -= 24 * e * 3600 * 1e3;
    var i = Math.floor(t / 3600 / 1e3);
    t -= 3600 * i * 1e3;
    var s = Math.floor(t / 60 / 1e3);
    t -= 60 * s * 1e3;
    var o = Math.floor(t / 1e3);
    return e > 0 ? i > 0 ? [ e, "天" ].join("") : [ e, "天", i, "时" ].join("") : i > 0 ? s > 0 ? [ i, "时", s, "分" ].join("") : [ i, "时" ].join("") : s > 0 ? o > 0 ? [ s, "分", o, "秒" ].join("") : [ s, "分" ].join("") : o > 0 ? [ o, "秒" ].join("") : "";
}, s.time2Day = function(t) {
    if (t < 0) return t.toString();
    var e = Math.floor(t / 24 / 3600 / 1e3);
    return t -= 24 * e * 3600 * 1e3, t -= 3600 * Math.floor(t / 3600 / 1e3) * 1e3, e > 0 ? [ e, "天" ].join("") : "";
}, s.time3Day = function(t) {
    if (t < 0) return 0;
    var e = Math.floor(t / 24 / 3600 / 1e3);
    return t -= 24 * e * 3600 * 1e3, t -= 3600 * Math.floor(t / 3600 / 1e3) * 1e3, e;
}, s.getLongEndTime = function() {
    return s.getNowTimeByServer() + 31104e8;
}, s.getEndTime = function(t) {
    return Date.now() + t;
}, s.getDayTimeStamp = function(t) {
    return null == t && (t = Date.now()), t % 864e5 + 288e5;
}, s.getCurrentZeroTime = function() {
    return s.getZeroTime(s.serverTime);
}, s.getNowTime = function(t, e) {
    return Date.now();
}, 
module.exports = {
    DateUtils: s
} 