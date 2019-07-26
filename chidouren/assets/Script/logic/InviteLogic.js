
var s = function() {
	this.serverDataList = [], this.index = 10, this.updateViewsCallback = null, this.playing = !1, 
	this.inviteNum = 0, this.timestamps = 0, this.addtimestamps = 0;
};
s.prototype.init = function() {
	this.playing = !0;
	var t = ss.data.misc.inviteNum;
	t || (t = 0), this.inviteNum = t, this.getInitInivteData();
}, s.prototype.update = function(t) {
	ss.state.isPlaying() || this.playing && (this.timestamps += t, this.timestamps > 120 && (this.timestamps = 0, 
	this.getAddInivteData()));
}, s.prototype.addUpdateViewsCallback = function(t) {
	this.updateViewsCallback = t;
}, s.prototype.getInitInivteData = function() {
	ss.state.isPreving() && ss.http.getInviteData(!0, this.getInviteCallbackOk.bind(this), this.getInviteCallbackFail.bind(this));
}, s.prototype.getAddInivteData = function() {
	if (ss.state.isPreving()) {
		var t = Date.now();
		t - this.addtimestamps < 6e4 || (this.addtimestamps = t, ss.http.getInviteData(!1, this.getInviteCallbackOk.bind(this), this.getInviteCallbackFail.bind(this)));
	}
}, s.prototype.getInviteCallbackOk = function(t) {
	var e = t;
	if ("string" == typeof t && (e = JSON.parse(t)), e && 200 == e.err_code) {
		var i = e.data;
		i && "" != i && ("string" == typeof i && (i = JSON.parse(i)), i.hasOwnProperty("friends") && i.friends.length > 0 && (this.serverDataList = this.serverDataList.concat(i.friends), 
		this.serverDataList.sort(function(t, e) {
			return t.index - e.index;
		}), this.updateInivteViews(), this._checkRed()));
	}
}, s.prototype.updateInivteViews = function() {
	this.updateViewsCallback && this.updateViewsCallback();
}, s.prototype.getInviteCallbackFail = function(t) {
	console.warn("getInviteCallbackFail:", t);
}, s.prototype.getInivteData = function() {
	for (var t, e = [], i = this._getInivteMaxNum(), s = 0; s < i; s++) (t = {}).id = s, 
	t.rank = s + 1, t.awardNum = this._getInivteAwardData(s + 1), t.data = this._fillDataFromServer(s), 
	t.state = this._getInivteState(t.data), e.push(t);
	var o = [], n = [], a = [];
	for (s = 0; s < e.length; s++) e[s].state == ss.enum.inviteState.complete ? o.push(e[s]) : e[s].state == ss.enum.inviteState.getted ? n.push(e[s]) : a.push(e[s]);
	o.sort(function(t, e) {
		return t.rank - e.rank;
	}), a.sort(function(t, e) {
		return t.rank - e.rank;
	}), n.sort(function(t, e) {
		return t.rank - e.rank;
	});
	var r = o.concat(a);
	for (r = r.concat(n), s = 0; s < r.length; s++) r[s].id = s, r[s].index = s;
	return r;
}, s.prototype.acceptAward = function(t) {
	ss.logic.tips.hint("金币 +" + t.awardNum), ss.logic.money.simpleAdd(ss.enum.money.coin, t.awardNum), 
	t.state = ss.enum.inviteState.getted, this.storageDatas(t.data.uid), this.updateInivteViews();
}, s.prototype.storageDatas = function(t) {
	var e = ss.data.misc.invite || {};
	e[t] = ss.enum.inviteState.getted, ss.logic.net.reqSetMisc({
		key: "invite",
		value: e
	}), this._checkRed();
}, s.prototype.getInviteNum = function() {
	return console.log("getInviteNum:", this.inviteNum), this.inviteNum;
}, s.prototype._checkRed = function() {
	for (var t = this.getInivteData(), e = 0, i = 0, s = 0; s < t.length; s++) switch (t[s].state) {
	  case ss.enum.inviteState.complete:
		e++, i++;
		break;

	  case ss.enum.inviteState.getted:
		i++;
	}
	this.inviteNum = i;
	var o = ss.data.misc.inviteNum;
	o || (o = 0), console.log("_checkRed:", this.inviteNum), i > o && ss.logic.net.reqSetMisc({
		key: "inviteNum",
		value: this.inviteNum
	}), cc.systemEvent.emit(ss.event.client.setRed, {
		type: ss.enum.redType.invite,
		num: e
	});
}, s.prototype._getInivteAwardData = function(t) {
	return ss.config.invite.coin;
}, s.prototype._getInivteMaxNum = function() {
	return ss.config.invite.max;
}, s.prototype._fillDataFromServer = function(t) {
	for (var e = 0; e < this.serverDataList.length; e++) if (this.serverDataList[e].index == t) return this.serverDataList[e];
	return null;
}, s.prototype._getInivteState = function(t) {
	return t ? ss.commonUtils.isValidValue(ss.data.misc.invite) && ss.data.misc.invite[t.uid] == ss.enum.inviteState.getted ? ss.enum.inviteState.getted : ss.enum.inviteState.complete : ss.enum.inviteState.normal;
}, module.exports = {
	InviteLogic: s
}