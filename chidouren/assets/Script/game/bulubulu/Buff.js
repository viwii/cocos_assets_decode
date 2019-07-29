var s = function() {
	this.clear();
};
s.prototype.setData = function(t, e) {
	this.count = 0, this.type = t, this.time += e.time, this.updateFun = e.updateFun, 
	this.finishFun = e.finishFun;
}, s.prototype.play = function() {
	this.playing = !0;
}, s.prototype.stop = function() {
	this.playing = !1;
}, s.prototype.update = function(t) {
	this.playing && (this.count += t, this.count < 1 || (this.count = 0, --this.time <= 0 ? (this.playing = !1, 
	this.time = 0, this.finishFun && this.finishFun(this.type, this.time)) : this.updateFun && this.updateFun(this.type, this.time)));
}, s.prototype.clear = function() {
	this.playing = !1, this.type = 0, this.count = 0, this.time = 0, this.updateFun = null, 
	this.finishFun = null;
}, module.exports = {
	Buff: s
} 