
var s = function() {
    this.mObjects = [];
};
(s.prototype = {
    get objects() {
        return this.mObjects;
    }
}).add = function(t) {
    t && -1 == this.mObjects.indexOf(t) && (this.mObjects[this.mObjects.length] = t);
}, s.prototype.contains = function(t) {
    return -1 != this.mObjects.indexOf(t);
}, s.prototype.remove = function(t) {
    if (null != t) {
        var e = this.mObjects.indexOf(t);
        -1 != e && (this.mObjects[e] = null);
    }
}, s.prototype.purge = function() {
    for (var t = this.mObjects.length - 1; t >= 0; --t) this.mObjects[t] = null;
}, s.prototype.advanceFrame = function(t, e) {
    var i, s = this.mObjects.length, o = 0;
    if (0 != s) {
        for (i = 0; i < s; ++i) {
            var n = this.mObjects[i];
            n && (o != i && (this.mObjects[o] = n, this.mObjects[i] = null), n.advanceFrame(t, e), 
            ++o);
        }
        if (o != i) {
            for (s = this.mObjects.length; i < s; ) this.mObjects[o++] = this.mObjects[i++];
            this.mObjects.length = o;
        }
    }
}, 
module.exports = {
    Juggler: s
} 