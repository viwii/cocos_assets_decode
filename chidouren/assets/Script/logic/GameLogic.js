var s = require("../game/Bulu"); 
var o = require("../game/Gala"); 
var n = require("../game/Hutu"); 
var a = require("../game/Mini");

var r = function() {
    this.bulu = new s.Bulu(); 
    this.gala = new o.Gala(); 
    this.hutu = new n.Hutu(); 
    this.mini = new a.Mini(); 
    this.playing = false; 
    this.pausing = false;
    this.supermanData = null; 
    this.gameMode = 0;
    this.gameData = null; 
    this.tempData = null; 
    this.hutuData = null; 
    this.ids = [];
    this.gIndex = 0; 
    this.tIndex = 0;
    this.tLength = 1; 
    this.fIndex = 0;
    this.fLength = 1; 
    this.forverCount = 0;
    this.tMiniProgram = null; 
    this.tEgging = false; 
    this.tLife = 0;
    this.timestamps = 0; 
    this.tTime = 0;
    this.tForever = 0; 
    this.tForeverAll = 0; 
    cc.game.on(cc.game.EVENT_HIDE, this._pause, this); 
    cc.game.on(cc.game.EVENT_SHOW, this._resume, this); 
    cc.systemEvent.on(ss.event.system.AdVideo, 
        this._onVideoRespond.bind(this)
    );
};
r.prototype._createAll = function() {
    var t = this.hutu.create(this.tempData);
    this.hutuData = t, this.bulu.createAll(t), this.gala.createAll(), this._createForever(t);
}, 
r.prototype._clearAll = function() {
    this.bulu.clearAll(), this.gala.clearAll(), this.ids.length = 0, this.tEgging = !1, 
    this.tLife = 0;
}, 
r.prototype._pause = function() {
    this.playing && !this.pausing && (this.pausing = !0);
}, 
r.prototype._resume = function() {
    this.playing && this.pausing && (this.pausing = !1);
}, 
r.prototype._onVideoRespond = function(t) {
    var e = t;
    e.method == ss.enum.advertising.method.show && e.code == ss.enum.advertising.code.success ? this.pausing = !0 : this.pausing = !1;
}, 
r.prototype._respondKillFun = function() {
    this.mini.setKillData(this.getKillData());
}, 
r.prototype.init = function(t) {
    this.bulu.init(t.bulu); 
    this.gala.init(t.gala);
    this.hutu.init(t.hutu, this._respondKillFun.bind(this)); 
    this.mini.init(t.mini);
}, 
r.prototype.update = function(t) {
    this.playing && (this.pausing || (this.mini.update(t), this.timestamps += t, this.timestamps >= 1 && (this.timestamps = 0, 
    this.tTime++)));
}, 
r.prototype.move = function(t) {
    this.bulu.move(t);
}, 
r.prototype.addSpeed = function() {
    this.bulu.addSpeed();
}, 
r.prototype.isSystemBetter = function() {
    switch (ss.logic.open.getSystem()) {
      case "android":
        return false;

      case "ios":
      case "window":
        return true;
    }
    return false;
}, 
r.prototype.play = function(t) {
    switch (this.gIndex++, this.timestamps = 0, this.tTime = 0, this._clearAll(), this.playing = !0, 
    this.tempData = t, this.gameMode = t.gameMode, this.gameMode) {
      case ss.enum.gameMode.solo:
        this.tIndex++;
        break;

      case ss.enum.gameMode.forever:
        this.fIndex++;
    }
    this.mini.reset(), this._createAll(), this.mini.play(this.gameMode), this._createEggData(t);
}, 
r.prototype.stop = function() {
    switch (this.playing = !1, this.pausing = !1, this._clearAll(), this.mini.clear(), 
    this.gameMode) {
      case ss.enum.gameMode.solo:
      case ss.enum.gameMode.forever:
    }
}, 
r.prototype.add = function(t) {
    var e = this.bulu.getScaleXY() >= 1 ? 2 : 1, i = this.ids.indexOf(t);
    return this.ids.length < e && (-1 == i && this.ids.push(t), !0);
}, 
r.prototype.sub = function(t) {
    var e = this.ids.indexOf(t);
    -1 != e && this.ids.splice(e, 1);
}, 
r.prototype.getKillData = function() {
    return this.hutu.getSoulerData();
}, 
r.prototype.getScoreData = function(t, e) {
    var i = 0, s = 0, o = 0, n = this.getKillData(), a = 0;
    switch (this.gameMode) {
      case ss.enum.gameMode.solo:
        switch (t.index) {
          case 0:
            i += 12, s = 12;
            break;

          case 1:
            i += 10, s = 10;
            break;

          case 2:
            i += 8, s = 8;
            break;

          default:
            i += 5, s = 5;
        }
        a = Math.floor(.6 * (n.kill - n.died)), i += Math.max(0, a), o = Math.floor(i / 3);
        break;

      case ss.enum.gameMode.forever:
        console.log("游戏耗时:" + this.tTime);
        var r = 200 + 2 * this.tForeverAll;
        switch (this.tTime <= .7 * r ? 0 : this.tTime <= .8 * r ? 1 : this.tTime <= .9 * r ? 2 : 3) {
          case 0:
            i += 20, s = 25;
            break;

          case 1:
            i += 16, s = 20;
            break;

          case 2:
            i += 12, s = 15;
            break;

          default:
            i += 8, s = 10;
        }
        a = Math.min(200, Math.floor(.5 * (n.kill - n.died))), i += Math.max(0, a), o = Math.floor(i / 2);
    }
    return {
        coin: i,
        diamond: s,
        score: o
    };
}, 
r.prototype.getGiveUpScoreData = function() {
    var t = 2, e = 0, i = 0, s = this.getKillData(), o = void 0;
    switch (this.gameMode) {
      case ss.enum.gameMode.solo:
        o = Math.floor(.7 * (s.kill - s.died)), t += Math.max(0, o), s.kill - s.died >= 5 && (e = 5), 
        i = Math.floor(t / 3);
        break;

      case ss.enum.gameMode.forever:
        console.log("游戏耗时:" + this.tTime), o = Math.floor(.5 * (s.kill - s.died)), t += Math.min(Math.max(0, o), 20), 
        s.kill - s.died >= 5 && (e = 3 + Math.min(10, Math.max(0, Math.floor((s.kill - s.died) / 2)))), 
        i = Math.floor(t / 2);
    }
    return {
        coin: t,
        diamond: e,
        score: i
    };
}, 
r.prototype.getPreData = function(t) {
    var e = 1, i = !1;
    switch (t) {
      case ss.enum.gameMode.solo:
        if (this.tIndex >= this.tLength) {
            switch (this.tIndex = 0, this.tLength) {
              case 1:
              case 3:
              case 5:
                this.tLength = 3;
                break;

              default:
                this.tLength = 5;
            }
            e = ss.logic.goods.getTestRandId();
        }
        break;

      case ss.enum.gameMode.forever:
        i = this.fIndex >= 1;
    }
    return {
        test: e > 0,
        testId: e,
        currId: ss.logic.goods.getCurrId(),
        egg: i
    };
}, 
r.prototype.resetTest = function() {
    this.tIndex = 0;
}, 
r.prototype.getMiniProgram = function() {
    if (this.tMiniProgram) return this.tMiniProgram;
    this.tMiniProgram = [];
    for (var t = ss.config.miniProgram.allList, e = ss.config.miniProgram.programs, i = 0, s = t.length; i < s; i++) this.tMiniProgram.push(e[t[i]]);
    return this.tMiniProgram;
}, 
r.prototype.getScoreDan = function(t) {
    for (var e = ss.config.dan.list, i = 0, s = void 0, o = e.length - 1; o >= 0; o--) if ((s = e[o]) && t >= s.score) {
        i = o;
        break;
    }
    return s = e[i];
}, 
r.prototype.getScoreStar = function(t) {
    for (var e = ss.config.dan.star, i = 0, s = e.length - 1; s >= 0; s--) if (t >= e[s]) {
        i = s;
        break;
    }
    return i = Math.min(i, 3);
}, 
r.prototype.judge = function(t, e) {
    if (!t || !t.getAllLiving()) return !1;
    if (!e || !e.getAllLiving()) return !1;
    switch (t.data.type) {
      case ss.enum.roleType.superman:
      case ss.enum.roleType.pacman:
        if (!e.getAllBorning() || !t.getAllBorning()) return;
        var i = e.data.camp, s = t.data.camp;
        if (i > ss.enum.gameCamp.normal && i == s) return;
        var o = e.getAllGhosting(), n = t.getAllGhosting();
        if (o && n) return;
        var a = e.getGrow(), r = t.getGrow();
        o ? (e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(r, !0, 0, !0, !0, e.data.id, t.data.id, e.data.name, t.data.name)), 
        t.onJudgeDied && t.onJudgeDied()) : n ? (t.onJudgeGrow && t.onJudgeGrow(this._createGrowVo(a, !0, 0, !0, !0, t.data.id, e.data.id, t.data.name, e.data.name)), 
        e.onJudgeDied && e.onJudgeDied()) : a > r ? (e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(r, !0, 0, !0, !0, e.data.id, t.data.id, e.data.name, t.data.name)), 
        t.onJudgeDied && t.onJudgeDied()) : a < r ? (t.onJudgeGrow && t.onJudgeGrow(this._createGrowVo(a, !0, 0, !0, !0, t.data.id, e.data.id, t.data.name, e.data.name)), 
        e.onJudgeDied && e.onJudgeDied()) : a == r && (e.onJudgeDied && e.onJudgeDied(), 
        t.onJudgeDied && t.onJudgeDied());
        break;

      case ss.enum.roleType.ghost:
        if (!e.getAllBorning()) return;
        if (e.getAllGhosting()) return;
        e.onJudgeDied && e.onJudgeDied();
        break;

      case ss.enum.roleType.pea:
        e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(t.getGrow(), t.getEffect(), t.getEgg(), !1, !1)), 
        t.onJudgeDied && t.onJudgeDied();
        break;

      default:
        console.error("GameLogic judge undefind roletype:", t.data);
    }
}, 
r.prototype.attract = function(t, e) {
    return !(!t || !t.getAllLiving()) && !(!e || !e.getAllLiving()) && !!t.isCanAttract() && (e.onJudgeGrow && e.onJudgeGrow(this._createGrowVo(t.getGrow(), t.getEffect(), t.getEgg(), !1, !1)), 
    void (t.onAttractDied && t.onAttractDied({
        v2: e.node.getPosition(),
        isEffect: e.node.active
    })));
}, 
r.prototype._createGrowVo = function(t, e, i, s, o) {
    return {
        grow: t,
        isEffect: e,
        egg: i,
        isVibrate: s,
        isSoul: o,
        winId: arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
        lostId: arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
        winName: arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "",
        lostName: arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : ""
    };
}, 
r.prototype.recover = function(t) {
    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (t && !(t.id < 0)) {
        var s = ss.commonUtils.clone(t);
        switch (t.type) {
          case ss.enum.roleType.superman:
            this.supermanData = s, this.bulu.recoverHero(t.id), this._judgeLove() ? cc.systemEvent.emit(ss.event.client.openView, {
                type: ss.enum.view.revive
            }) : (console.log("生命值 == 0"), this._subForever(), ss.logic.game.callOver(!1, null, null, ss.logic.game.getKillData(), ss.logic.game.getGiveUpScoreData()));
            break;

          case ss.enum.roleType.pacman:
            this.bulu.recoverPacman(t.id), this._judgeRevive(s, e, i);
            break;

          case ss.enum.roleType.ghost:
            this.bulu.recoverGhost(t.id), e && this.bulu.reviveGhost(s);
            break;

          case ss.enum.roleType.pea:
            this.bulu.recoverPea(t.id), e && this.bulu.revivePea(s);
            break;

          default:
            console.error("GameLogic recover undefind roletype:", t);
        }
    }
}, 
r.prototype.revive = function() {
    switch (this.supermanData && this.bulu.reviveHero(this.supermanData), this.supermanData = null, 
    this.ids.length = 0, this.gameMode) {
      case ss.enum.gameMode.solo:
        this.bulu.reviveAll(!1);
        break;

      case ss.enum.gameMode.forever:
        this.bulu.reviveAll(!0);
    }
}, 
r.prototype.callMode = function(t) {
    var e = this.getPreData(t), i = {
        gameMode: t,
        gameData: e
    };
    // cc.systemEvent.emit(ss.event.client.closeAllView), e.test ? cc.systemEvent.emit(ss.event.client.openView, {
    //     type: ss.enum.view.test,
    //     params: i
    // }) : e.egg ? cc.systemEvent.emit(ss.event.client.openView, {
    //     type: ss.enum.view.strong,
    //     params: i
    // }) : 
    ss.logic.net.reqGamePlay(i);
}, 
r.prototype.callOver = function(t) {
    var e = {
        finished: t,
        rankData: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        heroData: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
        killData: arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
        scoreData: arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null
    };
    ss.logic.net.reqGameOver(e), this._subForever();
}, 
r.prototype.getEgging = function() {
    return this.tEgging;
}, 
r.prototype.getLife = function() {
    return this.tLife;
}, 
r.prototype._createForever = function(t) {
    this.gameMode == ss.enum.gameMode.forever && (this.tForeverAll = this.tForever = t.pacmanForever, 
    this.mini.setSurviveData(this.tForever));
}, 
r.prototype._createEggData = function(t) {
    if (t.gameMode == ss.enum.gameMode.forever) {
        var e = t.gameData;
        this.tEgging = e.egg, this.tLife = e.egg ? 5 : 3, this.mini.setBuffData({
            method: "add",
            type: ss.enum.gameEgg.love,
            time: this.tLife
        });
    }
}, 
r.prototype._judgeLove = function() {
    if (this.gameMode == ss.enum.gameMode.forever) {
        if (!(--this.tLife > 0)) return this.mini.setBuffData({
            method: "remove",
            type: ss.enum.gameEgg.love,
            time: 0
        }), !1;
        this.mini.setBuffData({
            method: "update",
            type: ss.enum.gameEgg.love,
            time: this.tLife
        });
    }
    return !0;
}, 
r.prototype._judgeRevive = function(t, e, i) {
    switch (this.gameMode) {
      case ss.enum.gameMode.solo:
        e && this.bulu.revivePacman(t);
        break;

      case ss.enum.gameMode.forever:
        if (i) e && this.bulu.revivePacman(t); else if (this._subForever(), this.tForever > 0) {
            var s = t;
            s.grow && (s.grow += Math.floor(10 + 20 * Math.random())), s.name = this.hutu.getRandName(), 
            e && this.bulu.revivePacman(s);
        } else console.log("击杀了所有对手，吃鸡成功！"), this.callOver(!0, null, null, ss.logic.game.getKillData(), ss.logic.game.getScoreData(null, null));
    }
}, 
r.prototype._subForever = function() {
    this.gameMode == ss.enum.gameMode.forever && (this.tForever = Math.max(0, this.tForever - 1), 
    this.mini.setSurviveData(this.tForever));
}

module.exports = {
    GameLogic: r
}