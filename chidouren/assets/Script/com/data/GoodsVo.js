
var s = function() {
    this.reset();
};
s.prototype.reset = function() {
    this.current = 0, this.items = {}, this.newId = 1;
}

module.exports = {
    GoodsVo: s
} 