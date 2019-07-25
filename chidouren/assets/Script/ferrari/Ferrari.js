
var s = require("./Juggler"), o = require("./Timer"), n = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 60;
    this.mCfgFps = t, this.mFps = t, this.mCount = 0, this.mTimer = 0, this.mInterval = 0, 
    this.mStarted = !1, this.mPaused = !1, this.juggler = new s.Juggler(), this.timer = new o.Timer(), 
    cc.game.on(cc.game.EVENT_HIDE, this.pause, this), cc.game.on(cc.game.EVENT_SHOW, this.resume, this);
};
(n.prototype = {
    get fps() {
        return this.mFps;
    },
    get isStarted() {
        return this.isStarted;
    }
}).start = function() {
    this.mStarted || (this.mStarted = !0);
}, n.prototype.stop = function() {
    this.mStarted = !1, clearInterval(this.mInterval);
}, n.prototype.pause = function() {
    this.mStarted && !this.mPaused && (this.mPaused = !0);
}, n.prototype.resume = function() {
    this.mStarted && this.mPaused && (this.mTimer = Date.now(), this.mPaused = !1);
}, n.prototype.update = function(t) {
    this.mStarted && (this.mPaused || (this.countFps(t), this.nextFrame(t)));
}, n.prototype.countFps = function(t) {
    this.mFps = Math.ceil(1 / t * 1e3) / 1e3;
}, n.prototype.nextFrame = function(t) {
    var e = Math.ceil(this.mFps / this.mCfgFps * 1e3) / 1e3;
    e = Math.max(.6, Math.min(e, 1.2)), this.advanceFrame(t, e);
}, n.prototype.advanceFrame = function(t, e) {
    this.juggler.advanceFrame(t, e), this.timer.advanceFrame(t);
}, n.prototype.purge = function() {
    this.juggler.purge(), this.timer.purge();
}, module.exports = {
    Ferrari: n
} 