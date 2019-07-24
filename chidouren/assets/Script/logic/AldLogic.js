var s = function() {};
s.prototype.open = function() {
    ss.logic.open.sendAldEvent(ss.event.ald.open);
}, 
s.prototype.login = function() {
    ss.logic.open.sendAldEvent(ss.event.ald.login);
}, 
s.prototype.startGame = function() {
    ss.logic.open.sendAldEvent(ss.event.ald.start_game);
}, 
s.prototype.clickShareAld = function() {
    var t = ss.platform.params;
    t && t.hasOwnProperty("shareId") && t.hasOwnProperty("shareimg") && t.hasOwnProperty("sharetext") && "" != t.shareId && "" != t.shareimg && "" != t.sharetext && ss.logic.open.sendAldEvent(ss.event.ald.clickShare, {
        shareId: t.shareId,
        shareimg: t.shareimg,
        sharetext: t.sharetext
    });
}, 
s.prototype.sendShareAld = function(t) {
    t && t.hasOwnProperty("shareId") && t.hasOwnProperty("shareimg") && t.hasOwnProperty("sharetext") && ss.logic.open.sendAldEvent(ss.event.ald.sendShare, {
        shareId: t.shareId,
        shareimg: t.shareimg,
        sharetext: t.sharetext
    }, !0);
};

module.exports = {
    AldLogic: s
}