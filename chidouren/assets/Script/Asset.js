var s = require("./asset/MoveClips"), o = require("./asset/SpriteFrames");
cc.Class({
    extends: cc.Component,
    properties: {
        pacmanClips: s.MoveClips,
        ghostClips: s.MoveClips,
        pacmanIcons: o.SpriteFrames,
        frames:[o.SpriteFrames]
    },
    onLoad: function() {
        for (let i = 0; i < this.frames.length; i++) {
            var clip = cc.AnimationClip.createWithSpriteFrames(this.frames[i].frames, 5);
            clip.wrapMode = cc.WrapMode.LoopReverse;
            clip.sample = 20;
            this.pacmanClips.clips.push(clip);
        }
        ss.asset = this;
    },
    getAsset: function(t) {
        return this[t] ? this[t] : null;
    }
}) 