function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("./Canvas"));

e(require("./HTMLElement"));

GameGlobal.screencanvas = GameGlobal.screencanvas || new a.default();

var r = GameGlobal.screencanvas.constructor;

exports.default = r, module.exports = exports.default;