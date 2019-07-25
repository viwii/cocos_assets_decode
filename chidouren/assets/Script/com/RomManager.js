
var s = function() {
    this.items = null;
};
s.prototype.initialize = function() {
    this.items = new ss.Dictionary();
}, s.prototype.set = function(t, e) {
    this.items.set(t, e);
}, s.prototype.get = function(t) {
    return this.items.get(t);
}, s.prototype.clear = function() {
    this.items.clear();
}, module.exports = {
    RomManager: s
} 