
var s = function() {};
s.prototype._isHasFull = function(t, e) {
    switch (t) {
      case ss.enum.money.coin:
        return e <= ss.data.getCoin();

      case ss.enum.money.diamond:
        return e <= ss.data.getDiamond();
    }
    return !1;
}, s.prototype.isHasFullCoin = function(t) {
    return this._isHasFull(ss.enum.money.coin, t);
}, s.prototype.isHasFullDiamond = function(t) {
    return this._isHasFull(ss.enum.money.diamond, t);
}, s.prototype.cost = function(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], o = {};
    o[ss.enum.money.coin] = this.isHasFullCoin.bind(this), o[ss.enum.money.diamond] = this.isHasFullDiamond.bind(this);
    var n = {
        code: 0,
        cost: 0
    }, a = o[t];
    a && a(e) ? (n.code = ss.enum.code.success, n.cost = e, ss.logic.net.reqAddMoney({
        moneyType: t,
        money: -e,
        isStorage: !1,
        isEffect: !1,
        isNow: !0,
        isIcon: !1
    })) : (n.code = ss.enum.code.failed, s && this._showLessCost(t)), i && i(n);
}, s.prototype._showLessCost = function(t) {
    var e = {};
    e[ss.enum.money.coin] = "金币不足！", e[ss.enum.money.diamond] = "钻石不足！", ss.logic.tips.hint(e[t]);
}, s.prototype.add = function(t) {
    t && t.money && ss.logic.net.reqAddMoney(t);
}, s.prototype.simpleAdd = function(t, e) {
    var i = {
        moneyType: t,
        money: e,
        isStorage: !1,
        isEffect: !1,
        isNow: !0,
        isIcon: !1
    };
    this.add(i);
}, module.exports = {
    MoneyLogic: s
}