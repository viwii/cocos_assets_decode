var s = function() {
    this.data = null, this.supermanSid = 0, this.gameMode = 0, this.pacmanSids = [ 1001, 1002, 1003, 1004 ], 
    this.ghostSids = [ 2001, 2002, 2003, 2004 ], this.tempNames = ss.config.nikeNames.slice(), 
    this.nikeNames = [], this.souler = new o(), this.soulCallBackFun = null, this.record = {}, 
    this.record[ss.enum.gameMode.solo] = {
        total: 0,
        win: 0,
        lose: 0,
        comb: 0
    }, this.record[ss.enum.gameMode.forever] = {
        total: 0,
        win: 0,
        lose: 0,
        comb: 0
    };
};
s.prototype.init = function(t, e) {
    this.data = t, this._randNames(), this.soulCallBackFun = e;
    var i = ss.data.misc.record;
    i && Object.keys(i).length && (this.record = i);
}, s.prototype.create = function(t) {
    this.souler.reset(), this.gameMode = t.gameMode;
    var e = {}, i = null, s = 0, o = 0, n = null, a = [], r = {
        sid: 0,
        mid: 0,
        camp: 0
    }, c = ss.enum.gameCamp.normal, h = ss.enum.gameCamp.normal;
    a.length = 0;
    var l = this.data.pacman;
    i = l[this.gameMode];
    var d = "普罗米修斯";
    ss.proxy.userInfo && (d = ss.commonUtils.stringTruncate(ss.proxy.userInfo.nickName, 16)), 
    r.name = d, r.camp = c, r.sid = this.supermanSid, r.mid = t.gameData.test ? t.gameData.testId : t.gameData.currId, 
    a.push(r), o = l.num, this.nikeNames.length < o && this._randNames();
    var u, p = this._getAiIds(o);
    for (console.log("aiIds:", p), s = 0; s < o; s++) u = this.nikeNames.pop(), n = {
        sid: p[s],
        mid: ss.logic.goods.getAllRandId(),
        camp: s < 4 ? c : h,
        name: u
    }, a.push(n);
    for (e.pacman = a.slice(), e.pacmanForever = this._getPacmanForever(i), a.length = 0, 
    i = this.data.ghost[this.gameMode], o = ss.logic.open.isAudited() ? i.num : 0, s = 0; s < o; s++) n = {
        sid: this.ghostSids[Math.floor(Math.random() * this.ghostSids.length)],
        mid: 0
    }, a.push(n);
    e.ghost = a.slice();
    var g = this.data.pea;
    return o = g.num, i = ss.commonUtils.clone(g[this.gameMode]), e.pea = {
        num: o,
        data: i
    }, e;
}, s.prototype.kill = function(t) {
    var e = this.souler.fristblood(), i = [];
    return t && (i = this.souler.excite()), i = e.concat(i), this.soulCallBackFun && this.soulCallBackFun(), 
    i;
}, s.prototype.died = function() {
    this.souler.downcast(), this.soulCallBackFun && this.soulCallBackFun();
}, s.prototype.getSoulerData = function() {
    return {
        kill: this.souler.killCount,
        died: this.souler.diedCount
    };
}, s.prototype.getKillWord = function(t, e) {
    var i = 0;
    switch (t) {
      case ss.enum.killType.fristblood:
        i = 0;
        break;

      case ss.enum.killType.double_kill:
        i = 1;
        break;

      case ss.enum.killType.triple_kill:
        i = 2;
        break;

      case ss.enum.killType.ultrakill:
        i = 3;
        break;

      case ss.enum.killType.rampage:
        i = 4;
        break;

      case ss.enum.killType.killing_spree:
        i = 5;
        break;

      case ss.enum.killType.dominating:
        i = 6;
        break;

      case ss.enum.killType.megakill:
        i = 7;
        break;

      case ss.enum.killType.unstoppable:
        i = 8;
        break;

      case ss.enum.killType.whickedsick:
        i = 9;
        break;

      case ss.enum.killType.monsterkill:
        i = 10;
        break;

      case ss.enum.killType.godlike:
        i = 11;
        break;

      case ss.enum.killType.holyshit:
        i = 12;
        break;

      default:
        return null;
    }
    return {
        index: i,
        winName: e.winName,
        lostName: e.lostName
    };
}, s.prototype.result = function(t) {
    var e = t.result, i = e.heroData, s = this._getStorge(this.gameMode);
    s.total++;
    var o = !1;
    switch (this.gameMode) {
      case ss.enum.gameMode.solo:
        o = e.finished && i && i.index <= 1;
        break;

      case ss.enum.gameMode.forever:
        o = e.finished;
    }
    o ? (s.win++, s.comb++) : (s.lose++, s.comb = Math.max(s.comb - 1, 0)), ss.logic.net.reqSetMisc({
        key: "record",
        value: this.record
    });
}, s.prototype.getRandName = function() {
    return 0 == this.nikeNames.length && this._randNames(), this.nikeNames.pop();
}, s.prototype._getAiIds = function(t) {
    var e = [], i = this._getStorge(this.gameMode).comb, s = [];
    s[0] = Math.max(t - 3 * i, 0), s[1] = i <= 3 ? 3 * i : Math.max(t - 3 * (i - 3), 0), 
    s[2] = i <= 3 || i >= 9 ? 0 : i <= 6 ? 3 * (i - 3) : Math.max(t - 3 * (i - 6), 0), 
    s[3] = i <= 6 ? 0 : Math.min(3 * (i - 6), t), s[4] = t;
    for (var o = 0, n = 0; o < s.length; o++) {
        n = Math.min(this.pacmanSids.length - 1, o);
        for (var a = 0; a < s[o] && (e.push(this.pacmanSids[n]), e.length != t); a++) ;
        if (e.length == t) break;
    }
    return e;
}, s.prototype._randNames = function() {
    this.nikeNames = ss.commonUtils.arrayRandomSort(this.tempNames);
}, s.prototype._getStorge = function(t) {
    var e = this.record[t];
    return e = e || {
        total: 0,
        win: 0,
        lose: 0,
        comb: 0
    };
}, s.prototype._getPacmanForever = function(t) {
    var e = this._getStorge(this.gameMode), i = e ? e.win : 0;
    return t.num + i * t.step;
}; 

module.exports = {
    Hutu: s
};
var o = function() {
    this.configs = {}, this.configs[ss.enum.killType.fristblood] = {
        type: ss.enum.killType.fristblood,
        grow: 5,
        link: 1,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.double_kill] = {
        type: ss.enum.killType.double_kill,
        grow: 0,
        link: 2,
        comb: 1,
        interval: 3500
    }, this.configs[ss.enum.killType.triple_kill] = {
        type: ss.enum.killType.triple_kill,
        grow: 0,
        link: 3,
        comb: 2,
        interval: 3500
    }, this.configs[ss.enum.killType.ultrakill] = {
        type: ss.enum.killType.ultrakill,
        grow: 0,
        link: 4,
        comb: 3,
        interval: 3500
    }, this.configs[ss.enum.killType.rampage] = {
        type: ss.enum.killType.rampage,
        grow: 0,
        link: 5,
        comb: 4,
        interval: 800
    }, this.configs[ss.enum.killType.killing_spree] = {
        type: ss.enum.killType.killing_spree,
        grow: 0,
        link: 3,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.dominating] = {
        type: ss.enum.killType.dominating,
        grow: 0,
        link: 4,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.megakill] = {
        type: ss.enum.killType.megakill,
        grow: 0,
        link: 5,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.unstoppable] = {
        type: ss.enum.killType.unstoppable,
        grow: 0,
        link: 6,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.whickedsick] = {
        type: ss.enum.killType.whickedsick,
        grow: 0,
        link: 7,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.monsterkill] = {
        type: ss.enum.killType.monsterkill,
        grow: 0,
        link: 8,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.godlike] = {
        type: ss.enum.killType.godlike,
        grow: 0,
        link: 9,
        comb: 0,
        interval: 0
    }, this.configs[ss.enum.killType.holyshit] = {
        type: ss.enum.killType.holyshit,
        grow: 0,
        link: 10,
        comb: 0,
        interval: 0
    }, this.costs_comb = [ ss.enum.killType.double_kill, ss.enum.killType.triple_kill, ss.enum.killType.ultrakill, ss.enum.killType.rampage ], 
    this.costs_link = [ ss.enum.killType.killing_spree, ss.enum.killType.dominating, ss.enum.killType.megakill, ss.enum.killType.unstoppable, ss.enum.killType.whickedsick, ss.enum.killType.monsterkill, ss.enum.killType.godlike, ss.enum.killType.holyshit ], 
    this.frist = 0, this.link = 0, this.comb = 0, this.timestamp = 0, this.killCount = 0, 
    this.diedCount = 0;
};
o.prototype.reset = function() {
    this.frist = 0, this.link = 0, this.comb = 0, this.timestamp = 0, this.killCount = 0, 
    this.diedCount = 0;
}, o.prototype.fristblood = function() {
    return 1 == ++this.frist ? [ this.configs[ss.enum.killType.fristblood] ] : [];
}, o.prototype.excite = function() {
    var t = [], e = Date.now();
    0 == this.timestamp && (this.timestamp = e);
    var i, s, o, n = e - this.timestamp, a = this.comb + 1;
    for (this.killCount++, this.link++, i = this.costs_link.length - 1; i >= 0; i--) if (s = this.costs_link[i], 
    o = this.configs[s], this.link >= o.link) {
        t.push(o);
        break;
    }
    for (i = this.costs_comb.length - 1; i >= 0; i--) if (s = this.costs_comb[i], o = this.configs[s], 
    this.link >= o.link && a >= o.comb) {
        n <= o.interval ? (this.comb = a, t.push(o)) : this.comb = 0;
        break;
    }
    return this.timestamp = e, t;
}, o.prototype.downcast = function() {
    this.diedCount++, this.link = 0, this.comb = 0, this.timestamp = 0;
}