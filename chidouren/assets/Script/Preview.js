cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: 9999
    },
    properties: {
        logo: cc.Node,
        loading: cc.ProgressBar,
        progressTxt: cc.Label,
        loginNode: cc.Node,
        subLength: 0
    },
    onLoad: function() {
        this.progress = 0, this.isLoaded = !1, this.isLogind = !1, this.wxLoginBtn = null;
    },
    start: function() {
        this.loading.node.active = !1, this.loginNode.active = !1, this.ready();
    },
    ready: function() {
        var t = this;
        ss.logic.ald && ss.logic.ald.open && ss.logic.ald.open(), isWeiXin ? ss.proxy.noCheck ? this.login() : this.scheduleOnce(function() {
            ss.platform.preview(function() {
                t.login();
            }, function() {
                t.loginNode && (t.loginNode.active = !0), t.createUserInfoBotton();
            });
        }, .5) : this.login();
    },
    createUserInfoBotton: function() {
        var t = this;
        if (isWeiXin) if (ss.platform.isUserInfoButton()) {
            var e = wx.getSystemInfoSync(), i = wx.createUserInfoButton({
                type: "text",
                text: " ",
                style: {
                    left: 0,
                    top: 0,
                    width: e.windowWidth,
                    height: e.windowHeight,
                    lineHeight: 40,
                    backgroundColor: "#FFFFFF01",
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: 16,
                    borderRadius: 0
                }
            });
            this.wxLoginBtn = i, i.onTap(function(e) {
                console.log("createUserInfoButton:", e), "getUserInfo:ok" == e.errMsg && (ss.platform.setWxRes(e), 
                t.login());
            });
        } else wx.showModal({
            title: "提示",
            content: "微信版本过低，请更新至最新版本再试！",
            showCancel: !1,
            cancelText: "",
            confirmText: "确认",
            success: function() {
                console.log("showModal loadSubErr"), wx.exitMiniProgram({
                    success: function() {
                        console.log("exitMiniProgram success");
                    },
                    fail: function() {}
                });
            },
            fail: function() {}
        });
    },
    login: function() {
        this.loginNode && (this.loginNode.active = !1), this.wxLoginBtn && (this.wxLoginBtn.hide(), 
        this.wxLoginBtn.destroy(), this.wxLoginBtn = null), this.isLogind || (this.isLogind = !0, 
        this.enter());
    },
    enter: function() {
        var t = this;
        ss.platform.startup(function(e) {
            ss.http.setLoginRes(e), t.loading && t.loading.node && (t.loading.node.active = !t.isLoaded), 
            ss.logic.ald.login(), ss.logic.ald.clickShareAld(), t.loadScene();
        });
    },
    setProgress: function(t) {
        var e = Math.min(1, t);
        this.loading.progress = e, this.progressTxt.string = "加载进度：" + (100 * e).toFixed(2) + "%";
    },
    loadScene: function() {
        var t = this, e = this;
        console.log("loadScene"), e.loading.node && (e.loading.node.active = !0);
        for (var i = 0, s = this.subLength, o = [], n = 1; n <= s; n++) o.push("res" + n);
        this.asyncMap(o, this.loadSubRes.bind(this), function(i, s) {
            if (i) return console.log("子包资源加载失败"), void t.loadSubErr();
            !function() {
                function t() {
                    s && o && (e.setProgress(100), cc.director.loadScene("game"));
                }
                var i = 0, s = !1, o = !1;
                e.schedule(function() {
                    i++, e.progress = .01 + i / 100 * .98, e.setProgress(e.progress), i >= 100 && (s = !0, 
                    e.unscheduleAllCallbacks(), t());
                }, .01, 100), cc.director.preloadScene("game", function(i, s) {
                    console.log("loaded", i, s), o = !0, cc.loader.onProgress = null, e.isLoaded = !0, 
                    t();
                });
            }();
        }, function() {
            i++, e.progress = Math.min(.01, i / o.length * .01), e.setProgress(e.progress);
        });
    },
    loadSubErr: function() {
        wx.showModal({
            title: "提示",
            content: "资源加载异常，请检查网络再试！",
            showCancel: !1,
            cancelText: "",
            confirmText: "确认",
            success: function() {
                console.log("showModal loadSubErr"), wx.exitMiniProgram({
                    success: function() {
                        console.log("exitMiniProgram success");
                    },
                    fail: function() {}
                });
            },
            fail: function() {}
        });
    },
    loadSubRes: function(t, e) {
        isWeiXin ? wx.loadSubpackage ? wx.loadSubpackage({
            name: t,
            success: function(t) {
                e(null, t);
            },
            fail: function(t) {
                console.log("loadSubRes error error :", t), e(t);
            }
        }) : wx.showModal({
            title: "提示",
            content: "微信版本过低，请升级后再试！",
            showCancel: !1,
            cancelText: "",
            confirmText: "确认",
            success: function() {
                console.log("showModal loadSubErr"), wx.exitMiniProgram({
                    success: function() {
                        console.log("exitMiniProgram success");
                    },
                    fail: function() {}
                });
            },
            fail: function() {}
        }) : e(null);
    },
    asyncMap: function(t, e, i, s) {
        if (t.length <= 0) i(null, []); else for (var o = [], n = 0, a = t.length, r = null, c = 0; c < a; c++) e(t[c], function(t, e) {
            r || (t ? i(r = t, o) : (o.push(e), n++, s && s(), n == a && i(r, o)));
        });
    }
})