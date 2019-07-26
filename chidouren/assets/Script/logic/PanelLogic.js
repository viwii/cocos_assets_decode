
var s = function() {};
s.prototype.showDiamond = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = {
        type: ss.enum.money.diamond,
        msg: t,
        money: e
    };
    ss.panel.showGetAward(i);
}, s.prototype.showCoin = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = {
        type: ss.enum.money.coin,
        msg: t,
        money: e
    };
    ss.panel.showGetAward(i);
}, module.exports = {
    PanelLogic: s
} 