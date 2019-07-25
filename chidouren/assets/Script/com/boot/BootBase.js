
var s = function() {
	this.boot = null;
};
s.prototype.execute = function() {
	this._$oneByOne();
}, s.prototype._$oneByOne = function() {
	this.boot && this.boot._$oneByOne();
}, s.prototype.destroy = function() {
	this.boot = null;
}, module.exports = {
	BootBase: s
} 