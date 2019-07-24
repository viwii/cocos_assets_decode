var n = module.exports, e = require("../domain/rank/rankMgr").getInstance();

n.refreshFriends = function(n) {
    var r = e.getRank(n.rankId);
    null != r ? r.refreshFriends() : console.log("refreshFriends unknown rank", n);
}, n.updateCmpScore = function(n) {
    var r = e.getRank(n.rankId);
    null != r ? r.updateCmpScore(n.data, n.timestamp) : console.log("updateCmpScore unknown rank", n);
};