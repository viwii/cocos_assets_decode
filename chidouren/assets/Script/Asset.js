var s = require("./asset/MoveClips"), o = require("./asset/SpriteFrames");
cc.Class({
    extends: cc.Component,
    properties: {
        pacmanClips: s.MoveClips,
        ghostClips: s.MoveClips,
        pacmanIcons: o.SpriteFrames
    },
    onLoad: function() {
        ss.asset = this;
    },
    getAsset: function(t) {
        return this[t] ? this[t] : null;
    }
}) 