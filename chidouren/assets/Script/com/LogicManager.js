
var s = require("./logic/ConfigLogic"), 
o = require("./logic/MoneyLogic"), 
n = require("./logic/NetLogic"), 
a = require("./logic/OpenLogic"), 
r = require("./logic/TipsLogic"), 
c = require("./logic/SoundLogic"), 
h = require("./logic/StorageLogic"),
l = require("./logic/PanelLogic"), 
d = require("./logic/LotteryLogic"), 
u = require("./logic/AldLogic"), 
p = require("./logic/GameLogic"), 
g = require("./logic/InfoLogic"), 
m = require("./logic/GoodsLogic"), 
f = require("./logic/AssetLogic"), 
v = require("./logic/InviteLogic"), 
y = require("./logic/AbfunLogic"), 
w = require("./logic/WeiPaiLogic"), 
_ = function() {};
_.prototype.initialize = function() {
    this.config = new s.ConfigLogic(), this.money = new o.MoneyLogic(), this.net = new n.NetLogic(), 
    this.open = new a.OpenLogic(), this.tips = new r.TipsLogic(), this.panel = new l.PanelLogic(), 
    this.sound = new c.SoundLogic(), this.storage = new h.StorageLogic(), this.lottery = new d.LotteryLogic(), 
    this.ald = new u.AldLogic(), this.game = new p.GameLogic(), this.info = new g.InfoLogic(), 
    this.goods = new m.GoodsLogic(), this.asset = new f.AssetLogic(), this.invite = new v.InviteLogic(), 
    this.abFun = new y.AbFunLogic(), this.weiPai = new w.WeiPaiLogic();
}, _.prototype.clear = function() {}, 
module.exports = {
    LogicManager: _
} 