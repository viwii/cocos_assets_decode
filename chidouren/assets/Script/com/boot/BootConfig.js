
var s = require("./BootBase"), o = function() {
	s.BootBase.call(this);
};
(o.prototype = new s.BootBase()).execute = function() {
	ss.custom.loadConfig("config", this._$oneByOne.bind(this));
}, module.exports = {
	BootConfig: o
} 