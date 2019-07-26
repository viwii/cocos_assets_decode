
var s = function() {
    this._unitTimeStamps = 0, this._infoTimeStamps = 0, this._goodsTimeStamps = 0;
};
s.prototype.saveUnit = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = Date.now();
    !t && e - this._unitTimeStamps < 5e3 ? ss.custom.setStorage(ss.enum.storage.unit, ss.data.unit, !1, !1) : (this._unitTimeStamps = e, 
    ss.custom.setStorage(ss.enum.storage.unit, ss.data.unit, !1, !0));
}, s.prototype.saveInfo = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = Date.now();
    !t && e - this._infoTimeStamps < 5e3 ? ss.custom.setStorage(ss.enum.storage.info, ss.data.info, !1, !1) : (this._infoTimeStamps = e, 
    ss.custom.setStorage(ss.enum.storage.info, ss.data.info, !1, !0));
}, s.prototype.saveGoods = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = Date.now();
    !t && e - this._goodsTimeStamps < 5e3 ? ss.custom.setStorage(ss.enum.storage.goods, ss.data.goods, !1, !1) : (this._goodsTimeStamps = e, 
    ss.custom.setStorage(ss.enum.storage.goods, ss.data.goods, !1, !0));
}, s.prototype.saveSets = function() {
    arguments.length > 0 && void 0 !== arguments[0] && arguments[0], ss.custom.setStorage(ss.enum.storage.sets, ss.data.sets, !1, !0);
}, module.exports = {
    StorageLogic: s
} 