require("libs/weapp-adapter/index");

var e = require("libs/xmldom/dom-parser");

window.DOMParser = e.DOMParser, require("libs/wx-downloader.js"), require("src/settings");

var r = window._CCSettings;

require("main"), require(r.debug ? "cocos2d-js.js" : "cocos2d-js-min.js"), require("./libs/engine/index.js"), 
cc.view._maxPixelRatio = 3, wxDownloader.REMOTE_SERVER_ROOT = "", wxDownloader.SUBCONTEXT_ROOT = "";

var o = cc.loader.subPackPipe || cc.loader.md5Pipe || cc.loader.assetLoader;

if (cc.loader.insertPipeAfter(o, wxDownloader), cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
    var i = require("src/subdomain.json.js");
    cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
        cc.Pipeline.Downloader.PackDownloader._doPreload("WECHAT_SUBDOMAIN", i);
    }), require("./libs/sub-context-adapter");
} else cc.macro.CLEANUP_IMAGE_CACHE = !0;

window.boot();