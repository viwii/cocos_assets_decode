var s = require("./balabala/Buff"), o = function(t) {
    this.comp = t, this.playing = !1, this.data = null, this.items = null;
};
o.pools = [], o.create = function() {
    return o.pools.length ? o.pools.pop() : new s.Buff();
}, o.recover = function(t) {
    t && (t.clear(), o.pools.push(t));
}, o.prototype.init = function(t) {
    this.data = t, this.items || (this.items = new ss.Dictionary());
}, o.prototype.play = function() {
    this.playing = !0;
}, o.prototype.stop = function() {
    this.playing = !1;
}, o.prototype.update = function(t) {
    if (this.playing && this.items) for (var e, i = this.items.values, s = i.length - 1; s >= 0; s--) (e = i[s]) && e.update(t);
}, o.prototype.has = function(t) {
    return this.items && this.items.has(t);
}, o.prototype.add = function(t, e) {
    if (!(this.has(t) || e <= 0)) {
        var i = o.create();
        i.setData(t, {
            time: e,
            updateFun: this._updateFun.bind(this),
            finishFun: this._finishFun.bind(this)
        }), this.items.set(t, i), this._callCompAdd(t, e), i.play();
    }
}, o.prototype.remove = function(t) {
    if (this.items) {
        var e = this.items.get(t);
        e && (this.items.remove(t), o.recover(e), this._callCompRemove(t));
    }
}, o.prototype.clear = function() {
    if (this.stop(), this.items) {
        for (var t, e = this.items.values, i = e.length - 1; i > 0; i--) t = e[i], o.recover(t);
        this.items.clear();
    }
    this.data = null;
}, o.prototype._updateFun = function(t, e) {
    this._callCompUpdate(t, e);
}, o.prototype._finishFun = function(t, e) {
    this.remove(t);
}, o.prototype._callCompAdd = function(t, e) {
    this.comp && this.comp.onBalaAdd && this.comp.onBalaAdd(t, e);
}, o.prototype._callCompUpdate = function(t, e) {
    this.comp && this.comp.onBalaUpdate && this.comp.onBalaUpdate(t, e);
}, o.prototype._callCompRemove = function(t) {
    this.comp && this.comp.onBalaRemove && this.comp.onBalaRemove(t, 0);
}, module.exports = {
    Bala: o
}