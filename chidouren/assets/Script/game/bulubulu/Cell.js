
var s = function(t, e, i) {
    this.id = t;
    this.inner = e; 
    this.rect = i;
    this.showing = false; 
    this.units = new ss.Dictionary();
};
s.prototype.getRandV2 = function() {
    var t = cc.v2();
    t.x = this.rect.x + Math.floor(Math.random() * this.rect.width); 
    t.y = this.rect.y + Math.floor(Math.random() * this.rect.height); 
    return t;
}, s.prototype.getCenterV2 = function() {
    return this.rect.center;
}, s.prototype.getRectV2 = function() {
    return this.rect.origin;
}, s.prototype.add = function(t) {
    this.units.set(t.id, t); 
    t && t.onActiveFx && t.onActiveFx(this.showing, !0);
}, s.prototype.remove = function(t) {
    this.units.remove(t);
}, s.prototype.show = function() {
    this.showing || (this.showing = !0, this._activeFx(!0));
}, s.prototype.hide = function() {
    this.showing && (this.showing = !1, this._activeFx(!1));
}, s.prototype.reset = function() {
    this.hide();
}, s.prototype.clear = function() {
    for (var t, e = this.units.values, i = 0, s = e.length; i < s; i++) (t = e[i]) && t.clear && t.clear();
    this.units.clear();
}, s.prototype._activeFx = function(t) {
    for (var e, i = this.units.values, s = i.length - 1; s >= 0; s--) (e = i[s]) && e.onActiveFx && e.onActiveFx(t);
}, module.exports = {
    Cell: s
} 