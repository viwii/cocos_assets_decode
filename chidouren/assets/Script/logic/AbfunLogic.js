var s = function() {
    this.url = "https://ab.afunapp.com", this.app_key = "chidouzidazuozhan", this.data = null, 
    this.test_client_id = 2, this.experiment_login_id = "chidouzidazuozhan5", this.experiment_login_data = null;
};
s.prototype.init = function() {
    var t = this;
    this.getData(function() {
        t.login();
    });
}, 
s.prototype.getData = function(t, e) {
    var i = this;
    if (this.data) t && t(this.data); else {
        var s = {
            app_key: this.app_key,
            client_id: ss.proxy.httpParams.uid || this.test_client_id
        };
        ss.custom.httpPost(this.url + "/get_experiment_flags", s, function(s) {
            console.log("AbFunLogic getData:", s), s && 200 == s.code ? (i.data = s.data, t && t(i.data)) : e && e();
        }, e);
    }
}, 
s.prototype.sendData = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, s = {
        app_key: this.app_key,
        client_id: ss.proxy.httpParams.uid || this.test_client_id,
        device_info: JSON.stringify({
            platform: this._getDevicePlatform(),
            version: ss.proxy.game.version + ""
        }),
        experiment_ids: JSON.stringify(t.experiment_ids),
        ext_data: JSON.stringify(t.ext_data),
        log_time: Date.now()
    };
    ss.custom.httpPost(this.url + "/tracker", s, function(t) {
        console.log("AbFunLogic sendData:", t), t && 200 == t.code ? e && e(t.data) : i && i();
    }, i);
}, 
s.prototype.login = function() {
    if (this.data) {
        var t = this._getExperimentItem(this.experiment_login_id);
        if (t) {
            this.experiment_login_data = t;
            var e = {}, i = {};
            i[this.experiment_login_id] = t.g_id, e.experiment_ids = i, e.ext_data = {
                login: 1
            }, this.sendData(e);
        } else console.warn("AbFunLogic.login experiment is null, maybe is not test, or data error");
    } else console.warn("AbFunLogic.login undefind data,plase requst get_experiment_flags");
}, 
s.prototype._getExperimentItem = function(t) {
    if (this.data && this.data.experiments) for (var e = this.data.experiments, i = 0; i < e.length; i++) {
        var s = e[i];
        if (s.e_id == t) return s;
    }
    return null;
}, 
s.prototype._getDevicePlatform = function() {
    switch (ss.logic.open.getSystem()) {
      case "android":
        return 2;

      case "ios":
      case "window":
        return 1;
    }
    return 1;
}, 
s.prototype.isGroup2 = function() {
    return this.experiment_login_data || (this.experiment_login_data = this._getExperimentItem(this.experiment_login_id)), 
    !(!this.experiment_login_data || "2" != this.experiment_login_data.g_id);
}; 

module.exports = {
    AbFunLogic: s
}