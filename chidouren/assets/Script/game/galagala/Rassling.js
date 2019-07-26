
var s = function() {
    this.manager = cc.director.getCollisionManager();
};
s.prototype.init = function(t) {
    this.manager.enabledDebugDraw = t.enabledDebugDraw || !1, this.manager.enabledDrawBoundingBox = t.enabledDrawBoundingBox || !1;
}, s.prototype.play = function() {
    this.manager.enabled = !0;
}, s.prototype.stop = function() {
    this.manager.enabled = !1;
}, module.exports = {
    Rassling: s
} 