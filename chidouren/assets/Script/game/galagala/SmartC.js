
var s = require("./Brain"), o = function(t) {
    this.comp = t, this.brain = new s.Brain(), this.list = [], this.clear();
};
o.prototype.isStanding = function() {
    return this.id >= 0;
}, o.prototype.init = function(t) {
    this.id = t.id, this.sid = t.sid, this.type = t.type, this.camp = t.camp;
}, o.prototype.setData = function(t) {
    this.data = t;
}, o.prototype.setGrowLength = function(t) {
    this.grow = t;
}, o.prototype.setBodyLength = function(t) {
    this.bodyLength = t;
}, o.prototype.setViewLength = function(t) {
    this.viewLength = t;
}, o.prototype.play = function() {
    this.playing = !0;
}, o.prototype.update = function(t) {
    this.playing && this.brain.update(t);
}, o.prototype.addViewTarget = function(t) {
    this.id != t && -1 == this.list.indexOf(t) && this.list.push(t);
}, o.prototype.removeViewTarget = function(t) {
    if (this.id != t) {
        var e = this.list.indexOf(t);
        e > -1 && this.list.splice(e, 1), this.targetId == t && (this.targetId = -1);
    }
}, o.prototype.removeSelf = function() {
    this.clear();
}, o.prototype.setLocking = function(t) {
    this.locking = t;
}, o.prototype.move = function(t) {
    this.v2 = t;
}, o.prototype._callBackCompAction = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    this.action = t, this.comp && this.comp.onSmartAction && this.comp.onSmartAction({
        action: t,
        angle: e,
        addSpeed: i
    });
}, o.prototype._playFreedom = function() {
    var t = -180 + Math.floor(180 * Math.random());
    this._callBackCompAction(ss.enum.action.freedom, t, !1);
}, o.prototype._playTrack = function(t) {}, o.prototype._playEscape = function() {}, 
o.prototype.clear = function() {
    this.id = -1, this.sid = -1, this.camp = -1, this.targetId = -1, this.type = null, 
    this.action = null, this.v2 = null, this.grow = 0, this.bodyLength = 0, this.viewLength = 0, 
    this.list.length = 0, this.playing = !1, this.locking = !1, this.data = null, this.brain.clear();
}, module.exports = {
    SmartC: o
} 