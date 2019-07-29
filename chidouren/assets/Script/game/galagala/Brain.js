var s = function(t) {
    this.comp = t, this.clear();
};
s.prototype.setData = function(t) {
    this.data = ss.config.smart[t];
}, s.prototype.reflect = function(t, e) {
    var i = this.data[t];
    return i && Math.random() < i.frist ? (this.time = 0, this.action = t, this.targetId = e, 
    this.item = i, this.clockwise = Math.random() < .5 ? -1 : 1, this.cdRandom = i.cdRandom ? Math.ceil(i.cdRandom * Math.random()) : 0, 
    this.playing = !0, {
        addSpeed: Math.random() < i.addSpeed
    }) : null;
}, s.prototype.update = function(t) {
    this.playing && this.data && this.item && (this.item.cd <= 0 || (this.time += 1e3 * t, 
    this.time >= this.item.cd + this.cdRandom ? (this.playing = !1, this._onBrainFinish({
        action: this.action,
        again: Math.random() < this.item.again
    })) : this._onBrainUpdate({
        action: this.action,
        clockwise: this.clockwise
    })));
}, s.prototype.reset = function() {
    this.item = null, this.time = 0, this.targetId = -1, this.action = null, this.playing = !1, 
    this.clockwise = -1, this.cdRandom = 0;
}, s.prototype.clear = function() {
    this.data = null, this.reset();
}, s.prototype._onBrainUpdate = function(t) {
    this.comp && this.comp.onBrainUpdate && this.comp.onBrainUpdate(t);
}, s.prototype._onBrainFinish = function(t) {
    this.comp && this.comp.onBrainFinish && this.comp.onBrainFinish(t);
}, module.exports = {
    Brain: s
}