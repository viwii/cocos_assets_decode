function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MouseEvent = exports.TouchEvent = void 0;

var t = e(require("./TouchEvent")), u = e(require("./MouseEvent"));

exports.TouchEvent = t.default, exports.MouseEvent = u.default;