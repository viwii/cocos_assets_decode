
var s = function() {};
s.prototype.hint = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1.5, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
    ss.tips.showHint({
        delay: e,
        image: i,
        msg: t
    });
}, s.prototype.kill = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
    t && ss.tips.showKill({
        msg: t
    });
}, s.prototype.shareGroupSucc = function() {}, s.prototype.shareGroupFailed = function() {
    var t = [ "试试分享至其他群吧！" ], e = t[Math.floor(Math.random() * t.length)];
    this.hint(e);
}, s.prototype.shareGroupFull = function() {
    this.hint("尝试分享至不同的群吧！");
}, s.prototype.shareSucc = function() {}, s.prototype.shareFail = function() {}, 
module.exports = {
    TipsLogic: s
} 