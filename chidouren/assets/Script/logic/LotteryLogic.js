
var s = function() {
    this.DAY_MASK_ID = "mask_lottey_dayCount";
};
s.prototype.init = function() {
    this._setRed();
}, s.prototype.getLastTimes = function() {
    var t = ss.mask.get(this.DAY_MASK_ID);
    return Math.max(0, ss.config.lottery.max - t + 1);
}, s.prototype.getResult = function(t) {
    for (var e, i = (t + 30) % 360, s = null, o = 0; o < ss.config.lottery.pinList.length; o++) if (ss.config.lottery.pinList[o].min_rotaion <= i && i <= ss.config.lottery.pinList[o].max_rotaion) {
        e = ss.config.lottery.pinList[o].itemId, s = ss.logic.config.getSheetData(ss.enum.sheet.item, e);
        break;
    }
    return s;
}, s.prototype.createLotteryRotation = function() {
    for (var t = ss.config.lottery.itemList, e = t[0].per, i = t.slice(1, t.length), s = ss.randomUtils.getPirze(e, i).id, o = 0; o < ss.config.lottery.pinList.length; o++) if (ss.config.lottery.pinList[o].id == s) return ss.config.lottery.pinList[o].min_rotaion;
    return null;
}, s.prototype.processLottery = function(t) {
    var e = "", i = t.ext;
    switch (t.type) {
      case ss.enum.itemType.hugeCoin:
        e = "金币 +" + i, ss.logic.tips.hint(e), ss.logic.money.simpleAdd(ss.enum.money.coin, i), 
        ss.logic.panel.showCoin(e, i);
        break;

      case ss.enum.itemType.hugeDiamond:
        e = "钻石 +" + i, ss.logic.tips.hint(e), ss.logic.money.simpleAdd(ss.enum.money.diamond, i), 
        ss.logic.panel.showDiamond(e, i);
        break;

      default:
        console.warn("undefind processLottery:", t);
    }
}, s.prototype.saveLotteryTimes = function() {
    ss.mask.add(this.DAY_MASK_ID), this._setRed();
}, s.prototype._setRed = function() {
    var t = this.getLastTimes();
    cc.systemEvent.emit(ss.event.client.setRed, {
        type: ss.enum.redType.lottery,
        num: t
    });
}, module.exports = {
    LotteryLogic: s
} 