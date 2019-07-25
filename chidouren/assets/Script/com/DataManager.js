
var s = require("./data/UnitVo"); 
var o = require("./data/InfoVo"); 
var n = require("./data/GoodsVo"); 
var a = require("./data/MiscVo"); 
var r = require("./data/SetsVo");

var c = function() {
    this.fristDate = 0;
};
module.exports = {
    DataManager: c
}, c.prototype.initialize = function() {
    this.top = Math.pow(10, 15), this.unit = new s.UnitVo(), this.info = new o.InfoVo(), 
    this.goods = new n.GoodsVo(), this.misc = new a.MiscVo(), this.sets = new r.SetsVo();
    var t = ss.dateUtils.getZeroTime(), e = cc.sys.localStorage.getItem("fristDate");
    e ? this.fristDate = Number(e) : (this.fristDate = t, cc.sys.localStorage.setItem("fristDate", t)), 
    this.registerDayNum = Math.max(1, (t - this.fristDate) / 864e5 + 1);
}, c.prototype.startup = function(t) {
    if (t) for (var e in t) if (t[e] && Object.keys(t[e]).length) {
        if (!t[e].newId) continue;
        this[e] = t[e];
    }
}, c.prototype.clear = function() {}, c.prototype.isAddSecondDay = function() {
    return this.registerDayNum > 1;
}, c.prototype.isNewCost = function() {
    return this.fristDate > 15608736e5;
}, c.prototype.addMoney = function(t, e) {
    var i = {};
    i[ss.enum.money.coin] = this.addCoin.bind(this), i[ss.enum.money.diamond] = this.addDiamond.bind(this);
    var s = i[t];
    s && s(e);
}, c.prototype.addCoin = function(t) {
    if (this.unit.coin + t < this.top) {
        var e = Math.floor(Math.max(0, this.unit.coin + t));
        this.unit.coin = e;
    }
    this.unit.timeStamp = Date.now();
}, c.prototype.getCoin = function() {
    return this.unit.coin;
}, c.prototype.addDiamond = function(t) {
    if (this.unit.diamond + t < this.top) {
        var e = Math.floor(Math.max(0, this.unit.diamond + t));
        this.unit.diamond = e;
    }
    this.unit.timeStamp = Date.now();
}, c.prototype.getDiamond = function() {
    return this.unit.diamond;
}, c.prototype.addScore = function(t) {
    this.unit.score || (this.unit.score = 0), this.unit.score += Math.floor(t);
}, c.prototype.getScore = function() {
    return this.unit.score ? this.unit.score : 0;
}, c.prototype.setMisc = function(t) {
    var e = t.key, i = t.value;
    this.misc[e] = i;
}, c.prototype.getMisc = function(t) {
    return this.misc[t];
}, c.prototype.addGoods = function(t) {
    this.goods.items || (this.goods.items = {}), t && (this.goods.items[t.id] = t);
}, c.prototype.removeGoods = function(t) {
    this.goods.items || (this.goods.items = {}), console.log("DataManager removeGoods:", t), 
    this.goods.items[t] = null, delete this.goods.items[t];
}, c.prototype.useGoods = function(t) {
    t && (this.goods.current = t.id), this.addGoods(t);
}, c.prototype.getGoods = function(t) {
    return this.goods.items || (this.goods.items = {}), this.goods.items[t];
}, c.prototype.getGoodsItems = function() {
    return this.goods.items || (this.goods.items = {}), this.goods.items;
} 