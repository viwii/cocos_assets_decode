function e(n, i, l) {
    p ? p.readdir({
        dirPath: n,
        success: function(t) {
            var s = t.files;
            !function t(c) {
                if (c < s.length) {
                    var r = n + "/" + s[c];
                    if (p.statSync(r).isDirectory()) e(r, i, function() {
                        t(c + 1);
                    }); else {
                        if (i && -1 !== i.indexOf(r)) return void t(c + 1);
                        p.unlink({
                            filePath: r,
                            success: function() {
                                cc.log("unlink local file " + r + " successfully!");
                            },
                            fail: function(e) {
                                cc.warn("failed to unlink file(" + r + "): " + e ? e.errMsg : "unknown error");
                            },
                            complete: function() {
                                t(c + 1);
                            }
                        });
                    }
                } else l();
            }(0);
        },
        fail: function(e) {
            l(e ? e.errMsg : "unknown error");
        }
    }) : l("wx.getFileSystemManager is undefined");
}

function n(e, n) {
    cc.LoadingItems.getQueue(e).addListener(e.id, function(e) {
        e.error && (e.url in f ? delete f[e.url] : p && p.unlink({
            filePath: e.url,
            success: function() {
                cc.log("Load failed, removed local file " + e.url + " successfully!");
            }
        }));
    }), n(null, null);
}

function i(e, n) {
    if (p) {
        for (var i = e.url, l = "utf8", t = 0; t < a.length; t++) if (i.endsWith(a[t])) {
            l = "";
            break;
        }
        p.readFile({
            filePath: i,
            encoding: l,
            success: function(l) {
                cc.LoadingItems.getQueue(e).addListener(e.id, function(e) {
                    e.error && p.unlink({
                        filePath: i,
                        success: function() {
                            cc.log("Load failed, removed local file " + i + " successfully!");
                        }
                    });
                }), l.data ? (e.states[cc.loader.downloader.id] = cc.Pipeline.ItemState.COMPLETE, 
                n(null, l.data)) : n({
                    status: 0,
                    errorMessage: "Empty file: " + i
                });
            },
            fail: function(e) {
                cc.warn("Read file failed: " + i), p.unlink({
                    filePath: i,
                    success: function() {
                        cc.log("Read file failed, removed local file " + i + " successfully!");
                    }
                }), n({
                    status: 0,
                    errorMessage: e && e.errMsg ? e.errMsg : "Read text file failed: " + i
                });
            }
        });
    } else n({
        status: 0,
        errorMessage: "wx.getFileSystemManager is undefined"
    });
}

function l(e, l) {
    if (p) {
        var t = wx.env.USER_DATA_PATH + "/" + e.url;
        p.access({
            path: t,
            success: function() {
                w.push(t), e.url = t, e.type && -1 !== u.indexOf(e.type) ? n(e, l) : i(e, l);
            },
            fail: function(n) {
                y.REMOTE_SERVER_ROOT ? c(e, l) : l(null, null);
            }
        });
    } else l({
        status: 0,
        errorMessage: "wx.getFileSystemManager is undefined"
    });
}

function t(e, n) {
    if (p) {
        var i = cc.path.dirname(e);
        "wxfile://usr" !== i && "http://usr" !== i ? p.access({
            path: i,
            success: n,
            fail: function(e) {
                t(i, function() {
                    p.mkdir({
                        dirPath: i,
                        complete: n
                    });
                });
            }
        }) : n();
    } else n("wx.getFileSystemManager is undefined");
}

function s(e, n) {
    if (f[e] = n, !d) {
        d = !0, setTimeout(function e() {
            d = !1;
            for (var n in f) {
                var i = f[n];
                return t(i, function() {
                    wx.saveFile({
                        tempFilePath: n,
                        filePath: i,
                        success: function(e) {
                            cc.log("cache success " + i);
                        }
                    });
                }), delete f[n], void (cc.js.isEmptyObject(f) || d || (d = !0, setTimeout(e, g)));
            }
        }, g);
    }
}

function c(e, l) {
    var t = e.url;
    if (o.test(t)) l(null, null); else {
        var c = y.REMOTE_SERVER_ROOT + "/" + t;
        e.url = c, wx.downloadFile({
            url: c,
            success: function(r) {
                if (200 === r.statusCode && r.tempFilePath) {
                    var a = r.tempFilePath;
                    e.url = a, e.type && -1 !== u.indexOf(e.type) ? n(e, l) : i(e, l), s(a, wx.env.USER_DATA_PATH + "/" + t);
                } else cc.warn("Download file failed: " + c), l({
                    status: 0,
                    errorMessage: r && r.errMsg ? r.errMsg : "Download file failed: " + c
                });
            },
            fail: function(e) {
                l({
                    status: 0,
                    errorMessage: e && e.errMsg ? e.errMsg : "Download file failed: " + c
                }, null);
            }
        });
    }
}

var r = "WXDownloader", u = [ "js", "png", "jpg", "bmp", "jpeg", "gif", "ico", "tiff", "webp", "image", "mp3", "ogg", "wav", "m4a", "font", "eot", "ttf", "woff", "svg", "ttc" ], a = [ "bin", "pvr", "pkm" ], o = /^\w+:\/\/.*/, f = {}, d = !1, g = 100, p = wx.getFileSystemManager ? wx.getFileSystemManager() : null, w = [], v = window.WXDownloader = function() {
    this.id = r, this.async = !0, this.pipeline = null, this.REMOTE_SERVER_ROOT = "", 
    this.SUBCONTEXT_ROOT = "", w = [];
};

v.ID = r, v.prototype.handle = function(e, t) {
    if ("js" === e.type) return null;
    if ("uuid" === e.type) {
        var s = cc.Pipeline.Downloader.PackDownloader.load(e, t);
        if (void 0 !== s) return s || void 0;
    }
    if (CC_WECHATGAMESUB) {
        if (o.test(e.url)) return null;
        if (e.url = this.SUBCONTEXT_ROOT + "/" + e.url, e.type && -1 !== u.indexOf(e.type)) return void n(e, t);
        if (!p) return null;
    }
    var c = e.url;
    p.access({
        path: c,
        success: function() {
            e.type && -1 !== u.indexOf(e.type) ? n(e, t) : i(e, t);
        },
        fail: function(n) {
            l(e, t);
        }
    });
}, v.prototype.cleanOldAssets = function() {
    e(wx.env.USER_DATA_PATH, w, function(e) {
        if (e) cc.warn(e); else {
            for (var n = 0; n < w.length; ++n) cc.log("reserve local file: " + w[n]);
            cc.log("Clean old Assets successfully!");
        }
    });
}, v.prototype.cleanAllAssets = function() {
    w = [], e(wx.env.USER_DATA_PATH, null, function(e) {
        e ? cc.warn(e) : cc.log("Clean all Assets successfully!");
    });
};

var y = window.wxDownloader = new v();