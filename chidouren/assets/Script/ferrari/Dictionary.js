
var s = function() {
    this.items = {};
};
(s.prototype = {
    get keys() {
        var t = [];
        for (var e in this.items) t.push(e);
        return t;
    },
    get values() {
        var t = [];
        for (var e in this.items) t.push(this.items[e]);
        return t;
    }
}).has = function(t) {
    return t in this.items;
}, s.prototype.set = function(t, e) {
    this.items[t] = e;
}, s.prototype.remove = function(t) {
    return !!this.has(t) && (delete this.items[t], !0);
}, s.prototype.get = function(t) {
    return this.has(t) ? this.items[t] : void 0;
}, s.prototype.clear = function() {
    this.items = {};
}, module.exports = {
    Dictionary: s
} 