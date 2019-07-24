function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.cancelAnimationFrame = exports.requestAnimationFrame = exports.clearInterval = exports.clearTimeout = exports.setInterval = exports.setTimeout = exports.canvas = exports.location = exports.localStorage = exports.DeviceMotionEvent = exports.MouseEvent = exports.TouchEvent = exports.WebGLRenderingContext = exports.HTMLVideoElement = exports.HTMLAudioElement = exports.HTMLMediaElement = exports.HTMLCanvasElement = exports.HTMLImageElement = exports.HTMLElement = exports.FileReader = exports.Audio = exports.ImageBitmap = exports.Image = exports.WebSocket = exports.XMLHttpRequest = exports.navigator = void 0;

var t = require("./EventIniter/index.js");

Object.defineProperty(exports, "TouchEvent", {
    enumerable: !0,
    get: function() {
        return t.TouchEvent;
    }
}), Object.defineProperty(exports, "MouseEvent", {
    enumerable: !0,
    get: function() {
        return t.MouseEvent;
    }
}), Object.defineProperty(exports, "DeviceMotionEvent", {
    enumerable: !0,
    get: function() {
        return t.DeviceMotionEvent;
    }
});

var r = require("./WindowProperties");

Object.keys(r).forEach(function(e) {
    "default" !== e && "__esModule" !== e && Object.defineProperty(exports, e, {
        enumerable: !0,
        get: function() {
            return r[e];
        }
    });
});

var o = e(require("./Canvas")), a = e(require("./navigator")), n = e(require("./XMLHttpRequest")), s = e(require("./WebSocket")), i = e(require("./Image")), u = e(require("./ImageBitmap")), l = e(require("./Audio")), p = e(require("./FileReader")), x = e(require("./HTMLElement")), m = e(require("./HTMLImageElement")), c = e(require("./HTMLCanvasElement")), d = e(require("./HTMLMediaElement")), v = e(require("./HTMLAudioElement")), M = e(require("./HTMLVideoElement")), f = e(require("./WebGLRenderingContext")), E = e(require("./localStorage")), T = e(require("./location"));

exports.navigator = a.default, exports.XMLHttpRequest = n.default, exports.WebSocket = s.default, 
exports.Image = i.default, exports.ImageBitmap = u.default, exports.Audio = l.default, 
exports.FileReader = p.default, exports.HTMLElement = x.default, exports.HTMLImageElement = m.default, 
exports.HTMLCanvasElement = c.default, exports.HTMLMediaElement = d.default, exports.HTMLAudioElement = v.default, 
exports.HTMLVideoElement = M.default, exports.WebGLRenderingContext = f.default, 
exports.localStorage = E.default, exports.location = T.default, GameGlobal.screencanvas = GameGlobal.screencanvas || new o.default();

var q = GameGlobal.screencanvas;

exports.canvas = q, exports.setTimeout = setTimeout, exports.setInterval = setInterval, 
exports.clearTimeout = clearTimeout, exports.clearInterval = clearInterval, exports.requestAnimationFrame = requestAnimationFrame, 
exports.cancelAnimationFrame = cancelAnimationFrame;