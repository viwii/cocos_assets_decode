
var s = require("./LeaderboardMessage"), o = function() {
	this.message = new s.LeaderboardMessage();
}, n = null;
o.getInstance = function() {
	return null == n && (n = new o()), n;
}, module.exports = {
	Leaderboard: o
}, o.prototype.init = function(t, e, i, s) {
	this.message.userLogin(t, e, i, s);
}, o.prototype.updateRankOneKey = function(t, e, i) {
	this.message.updateRankScore(t, {
		score1: Number(e)
	}, i);
}, o.prototype.updateRankTwoKey = function(t, e, i, s) {
	this.message.updateRankScore(t, {
		score1: Number(e),
		score2: Number(i)
	}, s);
}, o.prototype.refreshFriendRank = function(t, e) {
	this.message.refreshFriendRank(t, e);
}, o.prototype.drawRankView = function(t, e, i) {
	"undefined" !== e && null != e || (e = !0), this.message.draw(t, {
		isReturn: e
	}, i);
}, o.prototype.lastRankPage = function(t, e) {
	this.message.turnRankPage(t, -1, e);
}, o.prototype.nextRankPage = function(t, e) {
	this.message.turnRankPage(t, 1, e);
}, o.prototype.drawRangeView = function(t, e) {
	this.message.draw(t, {}, e);
}, o.prototype.beginBeyond = function(t, e) {
	this.message.turnRankPage(t, 1, e);
}, o.prototype.beyondOneKey = function(t, e, i) {
	this.message.draw(t, {
		beyondData: {
			score1: e
		}
	}, i);
}, o.prototype.beyondTwoKey = function(t, e, i, s) {
	this.message.draw(t, {
		beyondData: function(t, e, i) {
			return e in t ? Object.defineProperty(t, e, {
				value: i,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : t[e] = i, t;
		}({
			score1: e
		}, "score1", i)
	}, s);
}