
var s = function() {
    this.reset();
};
s.prototype.reset = function() {
    this.zero = 0, this.sign = !1, this.loginNum = 0, this.newId = 1;
}
module.exports = {
    InfoVo: s
} 