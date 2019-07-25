
var s = require("./BootBase"), o = function() {
	s.BootBase.call(this);
};
(o.prototype = new s.BootBase()).execute = function() {
	this._$oneByOne();
}, module.exports = {
	BootLoads: o
} 