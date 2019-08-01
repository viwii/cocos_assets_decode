 cc.Class({
    extends: cc.Component,
    properties: {
        winLab: cc.Label,
        loseLab: cc.Label,
        killSprite: cc.Sprite,
        wordSprite: cc.Sprite,
        wordFrames: [ cc.SpriteFrame ]
    },
    ctor: function() {
        this.data = null, this.params = null, this.playing = !1;
    },
    onLoad: function() {
        this.winLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this), 
        this.loseLab.node.on(cc.Node.EventType.SIZE_CHANGED, this._labSizeChange, this);
    },
    start: function() {},
    init: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        this.data = t, this.params = e, this.node.active = !0, this.node.stopAllActions(), 
        this.node.opacity = 255, this.node.setScale(.5, .8), this.node.setPosition(cc.v2());
        var i = t.param.msg;
        this.winLab.string = i.winName + "", this.loseLab.string = i.lostName + "", this.wordSprite.spriteFrame = this.wordFrames[i.index], 
        this._labSizeChange();
    },
    play: function() {
        this.playing = !0;
        var t = cc.sequence(cc.scaleTo(.2, 1.2, 1.2), cc.scaleTo(.1, 1, 1), cc.delayTime(.8), cc.fadeTo(.2, 1), cc.callFunc(this.onFinish, this));
        this.node.runAction(t);
    },
    onFinish: function() {
        this.data && this.data.tips.hideKill(this.data.id);
    },
    clear: function() {
        this.data = null, this.params = null, this.playing = !1, this.node.stopAllActions();
    },
    _labSizeChange: function() {
        if (this.data) {
            var t = this.winLab.node.width + this.loseLab.node.width + this.killSprite.node.width + this.wordSprite.node.width + 60;
            this.winLab.node.x = -t / 2 + this.winLab.node.width / 2 + 15, this.killSprite.node.x = this.winLab.node.x + this.winLab.node.width / 2 + 10, 
            this.loseLab.node.x = this.killSprite.node.x + this.killSprite.node.width + this.loseLab.node.width / 2 + 10, 
            this.wordSprite.node.x = this.loseLab.node.x + this.loseLab.node.width / 2 + 10, 
            this.node.width = Math.max(t, 300);
        }
    }
}) 