
var s = function() {
    this.url = null, this.res = null;
};
s.prototype.initialize = function() {
    this.url = ss.proxy.game.url;
}, s.prototype.setLoginRes = function(t) {
    this.res = t;
}, s.prototype.login = function(t, e, i) {
    ss.custom.httpPost(this.url + "/auth/login", t, e, i);
}, s.prototype.loginExt = function(t, e, i) {
    ss.custom.httpPost(this.url + "/auth/loginExt", t, e, i);
}, s.prototype.getTaskData = function(t, e, i) {
    ss.custom.httpPost(this.url + "/game/get_data", t, e, i);
}, s.prototype.getInviteData = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
    if (this.res) {
        this.res;
        var s = ss.commonUtils.clone(ss.proxy.httpParams);
        s.show_all = t, ss.custom.httpPost(this.url + "/game/get_friends", s, e, i);
    }
}, module.exports = {
    HttpManager: s
}