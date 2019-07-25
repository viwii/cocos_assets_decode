
var s = function() {};
module.exports = {
	LeaderboardMessage: s
}, s.prototype.userLogin = function(t, e, i, s) {
	wx.postMessage({
		route: "user.login",
		data: {
			uid: t,
			nickName: e,
			avatarUrl: i
		},
		success: function(t) {
			s && s(!0, t);
		},
		fail: function(t) {
			s && s(!1, t);
		}
	});
}, s.prototype.refreshFriendRank = function(t, e) {
	wx.postMessage({
		route: "rank.refreshFriends",
		data: {
			rankId: t
		},
		success: function(t) {
			e && e(!0, t);
		},
		fail: function(t) {
			e && e(!1, t);
		}
	});
}, s.prototype.updateRankScore = function(t, e, i) {
	wx.postMessage({
		route: "rank.updateCmpScore",
		data: {
			rankId: t,
			data: e,
			timestamp: Date.now()
		},
		success: function(t) {
			i && i(!0, t);
		},
		fail: function(t) {
			i && i(!1, t);
		}
	});
}, s.prototype.draw = function(t, e, i) {
	wx.postMessage({
		route: "rankView.draw",
		data: {
			viewId: t,
			param: e
		},
		success: function(t) {
			i && i(!0, t);
		},
		fail: function(t) {
			i && i(!1, t);
		}
	});
}, s.prototype.turnRankPage = function(t, e, i) {
	wx.postMessage({
		route: "rankView.turnPage",
		data: {
			viewId: t,
			count: e
		},
		success: function(t) {
			i && i(!0, t);
		},
		fail: function(t) {
			i && i(!1, t);
		}
	});
}, s.prototype.beginBeyond = function(t, e) {
	wx.postMessage({
		route: "rankView.beginBeyond",
		data: {
			viewId: t
		},
		success: function(t) {
			e && e(!0, t);
		},
		fail: function(t) {
			e && e(!1, t);
		}
	});
} 