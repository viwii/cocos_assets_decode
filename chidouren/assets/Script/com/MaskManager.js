
var s = function() {
    this.playing = !1, this.time = 0, this.mask = {
        zerostamps: 0,
        datas: {}
    };
};
s.prototype.initialize = function() {}, s.prototype.startup = function(t) {
    t && t.mask && Object.keys(t.mask).length ? (this.mask = t.mask, this._judgeDay()) : this._resetDay(), 
    this.playing = !0;
}, s.prototype.update = function(t) {
    this.playing && (this.time += t, this.time < 120 || (this.time = 0, this._judgeDay()));
}, s.prototype.add = function(t) {
    var e = this.get(t);
    this.set(t, e + 1);
}, s.prototype.set = function(t, e) {
    e && (this.mask.datas[t] = e, this._saveDay());
}, s.prototype.get = function(t) {
    var e = this.mask.datas[t];
    return e ? Number(e) : 0;
}, s.prototype._resetDay = function() {
    this.mask = {
        zerostamps: ss.dateUtils.getZeroTime(),
        datas: {}
    }, this._saveDay(!0);
}, s.prototype._judgeDay = function() {
    ss.dateUtils.getZeroTime() - this.mask.zerostamps < 864e5 || this._resetDay();
}, s.prototype._saveDay = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    ss.custom.setStorage(ss.enum.storage.mask, this.mask, !1, t);
}, module.exports = {
    MaskManager: s
} 