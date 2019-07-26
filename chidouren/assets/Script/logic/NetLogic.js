
var s = function() {};
s.prototype.reqGamePlay = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqGamePlay, e.data = t, ss.server.execute(e);
}, s.prototype.reqGameOver = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqGameOver, e.data = t, ss.server.execute(e);
}, s.prototype.reqAddMoney = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqAddMoney, e.data = t, ss.server.execute(e);
}, s.prototype.reqUpdateSign = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqUpdateSign, e.data = t, ss.server.execute(e);
}, s.prototype.reqSetBuff = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqSetBuff, e.data = t, ss.server.execute(e);
}, s.prototype.reqSetTask = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqSetTask, e.data = t, ss.server.execute(e);
}, s.prototype.reqSetMisc = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqSetMisc, e.data = t, ss.server.execute(e);
}, s.prototype.reqSetGoods = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqSetGoods, e.data = t, ss.server.execute(e);
}, s.prototype.reqAddScore = function(t) {
    var e = {};
    e.type = ss.event.protocol.ReqAddScore, e.data = t, ss.server.execute(e);
}, 
module.exports = {
    NetLogic: s
}