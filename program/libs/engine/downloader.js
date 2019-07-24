function a(a) {
    var o = a.url;
    return wx.loadFont(o) || "Arial";
}

cc.loader.downloader.loadSubpackage = function(a, o) {
    wx.loadSubpackage({
        name: a,
        success: function() {
            o && o();
        },
        fail: function() {
            o && o(new Error("Failed to load subpackage " + a));
        }
    });
}, cc.loader.downloader.addHandlers({
    js: function(a, o, r) {
        var e = "../../" + a.url;
        require(e), o(null, a.url);
    }
}), cc.loader.loader.addHandlers({
    font: a,
    eot: a,
    ttf: a,
    woff: a,
    svg: a,
    ttc: a
});