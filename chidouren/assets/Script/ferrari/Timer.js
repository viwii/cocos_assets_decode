
var s = require("./Dictionary"), o = function() {
    this.root = null, this.id = 0, this.interval = 0, this.startTime = 0, this.count = 0, 
    this.loop = -1, this.isPlaying = !1, this.lastTime = 0, this.method = null, this.param = null, 
    this.isLast = !0, this.isRecover = !1;
};
o.prototype.reset = function(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, n = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5], a = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
    this.isPlaying = !1, this.id = t, this.interval = e, n && (this.lastTime = 0), this.isLast = n, 
    this.count = 0, this.loop = s, this.method = i, this.param = o, this.isRecover = a;
}, o.prototype._$play = function() {
    return this.isLast && (this.startTime = Date.now(), this.lastTime = this.startTime), 
    this.isPlaying = !0, this.id;
}, o.prototype._$update = function(t) {
    if (this.isPlaying) {
        var e = Date.now();
        if (!(e - this.lastTime < this.interval)) {
            this.lastTime = e;
            var i = e - this.startTime;
            this.count = Math.floor(i / this.interval);
            var s = this.loop >= 0 && this.count >= this.loop;
            s && (this.isPlaying = !1), this.method && (null == this.param ? this.method() : this.method(this.param)), 
            s && this.isRecover && this.recover(this.id);
        }
    }
    
}, o.prototype.getCount = function() {
    return this.count;
}, o.prototype.clear = function() {
    this.isPlaying = !1, this.method = null, this.param = null, this.isLast = !0, this.isClearSelf = !1;
}, o.timerPools = [], o.timers = new s.Dictionary(), o.tid = 0, o.prototype.advanceFrame = function(t) {
    var e = o.timers.values;
    if (0 != e.length) for (var i, s = e.length - 1; s >= 0; s--) (i = e[s]) && i._$update(t);
}, o.prototype.getTimer = function(t) {
    return o.timers.get(t);
}, o.prototype.getTimer2 = function(t) {
    for (var e, i = o.timers.values, s = i.length - 1; s >= 0; s--) if ((e = i[s]) && e.method === t) return e;
    return null;
}, o.prototype.callLater = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 150, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], n = this.getTimer2(t);
    return n ? n.reset(n.id, e, t, 1, i, s) : ((n = o.timerPools.length > 0 ? o.timerPools.pop() : new o()).root = o, 
    n.reset(++o.tid, e, t, 1, i, s, !0), o.timers.set(n.id, n)), n._$play();
}, o.prototype.clearCallLater = function(t) {
    this.recover(t);
}, o.prototype.setInterval = function(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1, n = o.timerPools.length > 0 ? o.timerPools.pop() : new o();
    return n.root = o, n.reset(++o.tid, e, t, s, i, !0, !0), o.timers.set(n.id, n), 
    n._$play();
}, o.prototype.clearInterval = function(t) {
    this.recover(t);
}, o.prototype.setTimeout = function(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = o.timerPools.length > 0 ? o.timerPools.pop() : new o();
    return s.root = o, s.reset(++o.tid, e, t, 1, i, !0, !0), o.timers.set(s.id, s), 
    s._$play();
}, o.prototype.clearTimeout = function(t) {
    this.recover(t);
}, o.prototype.recover = function(t) {
    var e = o.timers.get(t);
    e && (e.clear(), o.timers.remove(t), o.timerPools.push(e));
}, o.prototype.purge = function() {
    var t = o.timers.keys;
    if (0 != t.length) {
        for (var e = t.length - 1; e >= 0; e--) this.recover(t[e]);
        o.timers.clear();
    }
}, module.exports = {
    Timer: o
}