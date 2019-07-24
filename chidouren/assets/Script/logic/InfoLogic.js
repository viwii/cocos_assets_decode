var s = function() {
    this.CONST_GAP_DAY = 7, 
    this.CONST_SECOND_DAY = 2000, 
    this.openForever = {
        num: 0,
        kill: 0,
        count: 0
    }, this.openCallBack = null;
};

s.prototype.init = function() {
    this._judgeDaily(), this._judgeForever();
}, 
s.prototype.isCanSign = function() {
    var t = ss.data.info, e = ss.dateUtils.getZeroTime();
    return t.zero || (t.zero = 0), Math.max(0, (e - t.zero) / 864e5) >= 1 || !t.sign;
}, 
s.prototype.isSecondCanSign = function() {
    var t = ss.data.info;
    return 1 == (t.loginNum ? t.loginNum : 0) && this.isCanSign();
}, 
s.prototype.getAwardData = function() {
    var t = ss.data.info;
    return t.loginNum || (t.loginNum = 0), this._getLoginData(t.loginNum + 1);
}, 
s.prototype.signDaily = function() {
    var t = ss.data.info;
    t.sign = !0, t.zero = ss.dateUtils.getZeroTime(), t.loginNum || (t.loginNum = 0), 
    t.loginNum++, ss.logic.storage.saveInfo(), this._judgeDaily();
}, 
s.prototype._judgeDaily = function() {
    var t = this.isCanSign() ? 1 : 0;
    cc.systemEvent.emit(ss.event.client.setRed, {
        type: ss.enum.redType.daily,
        num: t
    });
}, 
s.prototype._getLoginData = function(t) {
    var e = 0, i = !1, s = [];
    2 == (t = Math.max(1, t)) ? (e = this.CONST_SECOND_DAY, i = !0) : 0 == (e = t % this.CONST_GAP_DAY) && (e = this.CONST_GAP_DAY);
    for (var o, n = ss.logic.config.getSheetData(ss.enum.sheet.daily, e), a = (n && n.value ? n.value : "10001&50_10002&20_10003&1").split("_"), r = 0; r < a.length; r++) o = a[r].split("&"), 
    s.push({
        id: o[0],
        num: parseInt(o[1]),
        second: i
    });
    return s;
}, 
s.prototype._judgeForever = function() {
    var t = ss.data.misc.openForever;
    t && (this.openForever.num = t.num || 0, this.openForever.kill = t.kill || 0, this.openCallBack && this.openCallBack());
}, 
s.prototype.setOpenForeverData = function(t, e) {
    var i = !1;
    e >= ss.config.openForever.num && (this.openForever.kill = Math.max(this.openForever.kill, e), 
    i = !0), t && (this.openForever.num++, i = !0), i && (this.isOpenForever() && this.openForever.count++, 
    ss.logic.net.reqSetMisc({
        key: "openForever",
        value: this.openForever
    })), console.log("setOpenForeverData:", this.openForever);
}, 
s.prototype.getOpenForeverData = function() {
    return this.openForever;
}, 
s.prototype.isOpenForever = function() {
    var t = ss.config.openForever;
    return this.openForever.num >= t.num || this.openForever.kill >= t.kill;
}, 
s.prototype.isFristOpenForever = function() {
    return 1 == this.openForever.count;
};

module.exports = {
    InfoLogic: s
}