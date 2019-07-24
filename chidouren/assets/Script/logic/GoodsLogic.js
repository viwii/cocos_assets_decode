var s = function() {
    this.default = {
        id: 20001,
        forever: !0,
        date: 0
    }, this.second = {
        id: 20002,
        forever: !0,
        date: 0
    }, this.current = 0, this.timeStamp = 0, this._goodsList = null, this.playing = !1;
};
s.prototype.init = function() {
    this.playing = !0, this._judgeCurr(), this._judgeAll();
}, 
s.prototype.isDefault = function(t) {
    return this.default.id == t;
}, 
s.prototype.addSecond = function() {
    this.add(this.second);
}, 
s.prototype.add = function(t) {
    ss.logic.net.reqSetGoods({
        method: ss.enum.goodsMethod.add,
        item: t
    });
}, 
s.prototype.use = function(t) {
    this.current = t.id, ss.logic.net.reqSetGoods({
        method: ss.enum.goodsMethod.use,
        item: t
    });
}, 
s.prototype.remove = function(t) {
    t == this.current && this.use(this.default);
    var e = ss.data.getGoodsItems()[t];
    console.log("GoodsLogic remove:", e), e && ss.logic.net.reqSetGoods({
        method: ss.enum.goodsMethod.remove,
        item: e
    });
}, 
s.prototype.update = function(t) {
    this.playing && (this.timeStamp += t, this.timeStamp >= 1 && (this.timeStamp = 0, 
    this._judgeAll()));
}, 
s.prototype.timeout = function(t) {
    var e = ss.data.getGoodsItems()[t];
    return !e || !(!e || e.forever) && Date.now() > e.date;
}, 
s.prototype.expire = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e5, i = ss.data.getGoodsItems()[t];
    return !(!i || i.forever) && Date.now() + e > i.date;
}, 
s.prototype.compare = function(t) {
    var e = ss.logic.config.getSheetData(ss.enum.sheet.goods, this.current), i = ss.logic.config.getSheetData(ss.enum.sheet.goods, t);
    if (!e || !i) return null;
    var s = ss.logic.config.getSheetData(ss.enum.sheet.mode, e.extend_id || 0), o = ss.logic.config.getSheetData(ss.enum.sheet.mode, i.extend_id || 0);
    return {
        speed: o.speed - s.speed,
        addSpeed: o.addSpeed - s.addSpeed,
        duration: o.duration - s.duration,
        attr: o.attr - s.attr
    };
}, 
s.prototype.judgeGet = function() {
    for (var t, e = void 0, i = void 0, s = this.getGoodsList(), o = 0, n = s.length; o < n; o++) if (t = s[o]) switch (e = ss.logic.config.getSheetData(ss.enum.sheet.goods, t.id), 
    i = ss.logic.config.getSheetData(ss.enum.sheet.item, e.item_id), e.cost_type) {
      case ss.enum.costType.invite:
        if (!ss.data.getGoods(t.id)) {
            var a = e.extend_data;
            a > 0 && ss.logic.invite.getInviteNum() >= a && (function(e, i) {
                t = {
                    id: e,
                    forever: 0 == i,
                    date: Date.now() + 1e3 * i
                }, ss.logic.goods.add(t);
            }(t.id, i.time), ss.logic.tips.hint("累计邀请好友" + a + "位获得【<color=#FFA500>" + i.name + "</color>】！"));
        }
    }
}, 
s.prototype.getGoodsList = function() {
    if (!this._goodsList) {
        this._goodsList = [];
        var t = ss.logic.open.isAudited(), e = ss.logic.config.getSheet(ss.enum.sheet.goods), i = void 0;
        for (var s in e) i = e[s], !t && i.is_audited > 0 || i.is_show && this._goodsList.push(i);
        this._goodsList.sort(function(t, e) {
            return t.seat - e.seat;
        });
        for (var o = 0; o < this._goodsList.length; o++) (i = this._goodsList[o]).index = o;
    }
    return this._goodsList;
}, 
s.prototype.getGoodsById = function(t) {
    for (var e, i = this.getGoodsList(), s = 0, o = i.length; s < o; s++) if ((e = i[s]).id == t) return e;
    return null;
}, 
s.prototype.getTestIds = function() {
    for (var t, e = this.getGoodsList(), i = [], s = 0, o = e.length; s < o; s++) (t = e[s]).id != this.current && t.id != this.default.id && (ss.data.getGoods(t.id) || i.push(t.id));
    return i;
}, 
s.prototype.getTestRandId = function() {
    var t = this.getTestIds();
    return t && t.length ? t[Math.floor(Math.random() * t.length)] : 0;
}, 
s.prototype.getAllRandId = function() {
    var t = this.getGoodsList();
    return t && t.length ? t[Math.floor(Math.random() * t.length)].id : 20001;
}, 
s.prototype.getItemPrice = function(t) {
    var e = 0, i = ss.data.isNewCost();
    switch (t.cost_type) {
      case ss.enum.costType.coin:
        e = i ? t.cost_coin2 : t.cost_coin;
        break;

      case ss.enum.costType.diamond:
        e = i ? t.cost_diamond2 : t.cost_diamond;
        break;

      default:
        console.warn("GoodsLogic getItemPrice cost_type error");
    }
    return e;
}, 
s.prototype.getCurrId = function() {
    return this.current || this.default.id;
}, 
s.prototype.isUseing = function(t) {
    return this.current == t;
}, 
s.prototype.isBaging = function(t) {
    return !!ss.data.getGoods(t);
}, 
s.prototype._judgeAll = function() {
    for (var t, e = ss.data.getGoodsItems(), i = Object.keys(e), s = i.length - 1; s >= 0; s--) e[t = i[s]] && this.timeout(t) && this.remove(t);
}, 
s.prototype._judgeCurr = function() {
    this.current = ss.data.goods.current, this.current && !this.timeout(this.current) || this.use(this.default);
}; 

module.exports = {
    GoodsLogic: s
}
