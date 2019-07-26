
var s = function() {
    this.samrts = new ss.Dictionary(), this.mapRect = null;
};
s.prototype.init = function(t) {
    this.mapRect = t.mapRect;
}, s.prototype.getSmart = function(t) {
    return this.samrts.get(t);
}, s.prototype.addSmart = function(t, e) {
    this.samrts.set(t, e), e.setData({
        mapRect: this.mapRect,
        outlooking: this
    });
}, s.prototype.removeSmart = function(t) {
    var e = this.samrts.get(t);
    if (e) {
        e.removeSelf(), this.samrts.remove(t);
        for (var i, s = this.samrts.values, o = 0, n = s.length; o < n; o++) (i = s[o]) && i.removeViewTarget(t);
    }
}, s.prototype.removeAllSmarts = function() {
    this.samrts.clear();
}, s.prototype.clear = function() {
    this.removeAllSmarts();
}, module.exports = {
    Outlooking: s
} 