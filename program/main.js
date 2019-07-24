window.boot = function() {
    var e = window._CCSettings;
    if (window._CCSettings = void 0, !e.debug) {
        var s = e.uuids, r = e.rawAssets, a = e.assetTypes, i = e.rawAssets = {};
        for (var t in r) {
            var c = r[t], n = i[t] = {};
            for (var o in c) {
                var u = c[o], d = u[1];
                "number" == typeof d && (u[1] = a[d]), n[s[o] || o] = u;
            }
        }
        for (var g = e.scenes, b = 0; b < g.length; ++b) {
            var l = g[b];
            "number" == typeof l.uuid && (l.uuid = s[l.uuid]);
        }
        var v = e.packedAssets;
        for (var p in v) for (var w = v[p], f = 0; f < w.length; ++f) "number" == typeof w[f] && (w[f] = s[w[f]]);
        var m = e.subpackages;
        for (var j in m) {
            var y = m[j].uuids;
            if (y) for (var A = 0, k = y.length; A < k; A++) "number" == typeof y[A] && (y[A] = s[y[A]]);
        }
    }
    var h = e.jsList, M = e.debug ? "src/project.dev.js" : "src/project.js";
    h ? (h = h.map(function(e) {
        return "src/" + e;
    })).push(M) : h = [ M ];
    var S = {
        id: "GameCanvas",
        scenes: e.scenes,
        debugMode: e.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: e.debug,
        frameRate: 60,
        jsList: h,
        groupList: e.groupList,
        collisionMatrix: e.collisionMatrix
    };
    cc.AssetLibrary.init({
        libraryPath: "res/import",
        rawAssetsBase: "res/raw-",
        rawAssets: e.rawAssets,
        packedAssets: e.packedAssets,
        md5AssetsMap: e.md5AssetsMap,
        subpackages: e.subpackages
    }), cc.game.run(S, function() {
        cc.loader.downloader._subpackages = e.subpackages, cc.view.enableRetina(!0), cc.view.resizeWithBrowserSize(!0);
        var s = e.launchScene;
        cc.director.loadScene(s, null, function() {
            if (cc.sys.isBrowser) {
                document.getElementById("GameCanvas").style.visibility = "";
                var e = document.getElementById("GameDiv");
                e && (e.style.backgroundImage = "");
            }
            cc.loader.onProgress = null, console.log("Success to load scene: " + s);
        });
    });
};

window.jsb && ("function" == typeof loadRuntime ? (require("src/settings.js"), require("src/cocos2d-runtime.js"), 
require("jsb-adapter/engine/index.js")) : (require("src/settings.js"), require("src/cocos2d-jsb.js"), 
require("jsb-adapter/jsb-engine.js")), window.boot());