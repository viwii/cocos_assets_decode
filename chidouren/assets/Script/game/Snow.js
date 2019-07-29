cc.Class({
      extends: cc.Component,
      properties: {},
      ctor: function() {
          this.playing = !1, this.v2 = cc.v2(), this.data = null, this.params = null;
      },
      start: function() {},
      init: function(t, e) {
          switch (this.data = t, this.params = e, this.node.parent = t.parent, this.node.setPosition(t.v2), 
          this.v2 = t.v2, t.index) {
            case 0:
              this.v2.y += 30;
              break;

            case 1:
              this.v2.y += 60;
              break;

            case 2:
              this.v2.y += 90;
              break;

            default:
              this.v2.y += 45;
          }
          this.getComponent(cc.Label).string = "" + t.word;
      },
      play: function() {
          this.playing = !0, this.node.stopAllActions(), this.node.setScale(.5);
          var t = cc.sequence(cc.spawn(cc.moveTo(.3, this.v2.x, this.v2.y), cc.scaleTo(.3, 1, 1).easing(cc.easeElasticOut(1))), cc.delayTime(.5), cc.callFunc(this.onFinish, this));
          this.node.runAction(t);
      },
      onFinish: function() {
          this.data && ss.logic.game.bulu.recoverSnow(this.data.id);
      },
      clear: function() {
          this.playing = !1, this.node.y = 0, this.node.stopAllActions(), this.node.removeFromParent(), 
          this.data = null, this.params = null;
      },
      removeTarget: function(t) {
          this.data && this.data.target == t && ss.logic.game.bulu.recoverSnow(this.data.id);
      }
  })