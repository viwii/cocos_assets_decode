
var s = require("./boot/BootConfig"), o = require("./boot/BootLoads"), n = function() {
    this.index = -1, this.boots = [], this.mCompleteHandler = null;
};
n.prototype.initialize = function() {
    this.add(new s.BootConfig()), this.add(new o.BootLoads());
}, n.prototype.add = function(t) {
    -1 == this.boots.indexOf(t) && (t.boot = this, this.boots.push(t));
}, n.prototype.execute = function(t) {
    this.mCompleteHandler = t, this._$oneByOne();
}, n.prototype._$oneByOne = function() {
    ++this.index < this.boots.length ? this.boots[this.index] && this.boots[this.index].execute() : this._$complete();
}, n.prototype._$complete = function() {
    this.mCompleteHandler && this.mCompleteHandler();
}
module.exports = {
    BootManager: n
}