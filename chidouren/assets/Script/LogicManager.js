var s = require("./logic/ConfigLogic");
var o = require("./logic/MoneyLogic"); 
var n = require("./logic/NetLogic"); 
var a = require("./logic/OpenLogic"); 
var r = require("./logic/TipsLogic"); 
var c = require("./logic/SoundLogic"); 
var h = require("./logic/StorageLogic"); 
var l = require("./logic/PanelLogic"); 
var d = require("./logic/LotteryLogic"); 
var u = require("./logic/AldLogic"); 
var p = require("./logic/GameLogic"); 
var g = require("./logic/InfoLogic"); 
var m = require("./logic/GoodsLogic"); 
var f = require("./logic/AssetLogic"); 
var v = require("./logic/InviteLogic"); 
var y = require("./logic/AbfunLogic"); 
var w = require("./logic/WeiPaiLogic");

var LM = function() {};

LM.prototype.initialize = function() {
	this.config = new s.ConfigLogic();
	this.money = new o.MoneyLogic(); 
	this.net = new n.NetLogic(); 
	this.open = new a.OpenLogic(); 
	this.tips = new r.TipsLogic(); 
	this.panel = new l.PanelLogic(); 
	this.sound = new c.SoundLogic(); 
	this.storage = new h.StorageLogic(); 
	this.lottery = new d.LotteryLogic(); 
	this.ald = new u.AldLogic(); 
	this.game = new p.GameLogic(); 
	this.info = new g.InfoLogic(); 
	this.goods = new m.GoodsLogic(); 
	this.asset = new f.AssetLogic(); 
	this.invite = new v.InviteLogic(); 
	this.abFun = new y.AbFunLogic(); 
	this.weiPai = new w.WeiPaiLogic();
}, 
LM.prototype.clear = function() {}
 
module.exports = {
	LogicManager: LM
}