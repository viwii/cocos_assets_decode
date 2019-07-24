function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("../../conf/rank/rankConf"), r = require("../../util/utils"), a = require("../../util/timeTools"), i = function() {
    function i(t, a, s, o) {
        if (e(this, i), (!r.isNumber(o) || o <= 0) && (o = 1), this.id = t, this.date = a, 
        this.limit = o, this.keyList = [], this.sortList = [], this.rankInfos = [], n.RANK_ID.hasOwnProperty(t) && n.RANK_DATE.hasOwnProperty(a)) {
            if (r.isArray(s)) for (var u = 0; u < s.length; u++) {
                var f = s[u];
                this.keyList.push(n.RANK_PARAM_PREFIX + (u + 1)), this.sortList.push(f);
            }
        } else console.log("Rank constructor faild1", t, a, s, o);
    }
    return t(i, [ {
        key: "isSameTime",
        value: function(e, t) {
            return this.date == n.RANK_DATE.DAY ? a.getDayZeroTime(e) == a.getDayZeroTime(t) : this.date == n.RANK_DATE.WEEK ? a.getWeekZeroTime(e) == a.getWeekZeroTime(t) : this.date != n.RANK_DATE.MONTH || a.getMonthZeroTime(e) == a.getMonthZeroTime(t);
        }
    }, {
        key: "createRankInfo",
        value: function(e, t, n) {
            var a = {
                key: e = "" + e,
                baseInfo: n,
                timestamp: t,
                kvList: []
            };
            if (!r.isArray(this.keyList)) return a;
            for (var i = 0; i < this.keyList.length; i++) a.kvList.push({
                key: this.keyList[i],
                value: 0
            });
            return a;
        }
    }, {
        key: "updateRankInfo",
        value: function(e, t, n, r, a) {
            e.key = t, e.baseInfo = r, e.timestamp = n;
            for (var i = !1, s = e.kvList, o = 0; o < s.length; o++) {
                var u = s[o].key;
                a.hasOwnProperty(u) && (a[u] != s[o].value && (i = !0, s[o].value = a[u]));
            }
            return i;
        }
    }, {
        key: "updateCmpRankInfo",
        value: function(e, t, n, r, a) {
            if (e.baseInfo = r, e.timestamp = n, e.key != t) return this.updateRankInfo(e, t, n, r, a);
            for (var i = e.kvList, s = 0; s < i.length; s++) {
                var o = i[s].key;
                if (a.hasOwnProperty(o) && a[o] != i[s].value) return this.sortList[s] ? a[o] > i[s].value && this.updateRankInfo(e, t, n, r, a) : a[o] < i[s].value && this.updateRankInfo(e, t, n, r, a);
            }
            return !1;
        }
    }, {
        key: "isVaildData",
        value: function(e) {
            if (!r.isObject(e)) return console.log("isVaildData step1", this.keyList, e), !1;
            if (!r.isArray(this.keyList)) return console.log("isVaildData step2", this.keyList, e), 
            !1;
            if (this.keyList.length <= 0) return console.log("isVaildData step3", this.keyList, e), 
            !1;
            for (var t = 0; t < this.keyList.length; t++) {
                var n = this.keyList[t];
                if (e.hasOwnProperty(n)) {
                    var a = e[n];
                    if (!r.isNumber(a)) return console.log("isVaildData step4", this.keyList, e), !1;
                }
            }
            return !0;
        }
    }, {
        key: "clearTimeoutInfo",
        value: function() {
            for (var e = this.rankInfos.length - 1; e >= 0; e--) {
                var t = this.rankInfos[e].timestamp;
                this.isSameTime(t, Date.now()) || this.rankInfos.splice(e, 1);
            }
        }
    }, {
        key: "getKeyIndex",
        value: function(e) {
            e = "" + e;
            for (var t = 0; t < this.rankInfos.length; t++) if (this.rankInfos[t].key == e) return t;
        }
    }, {
        key: "load",
        value: function(e, t) {
            if (r.isObject(e)) {
                r.isBoolean(t) || (t = !0), t && (this.rankInfos = []);
                for (var n in e) {
                    var a = e[n];
                    this.updateInfo(n, a, !1);
                }
                this.sort();
            }
        }
    }, {
        key: "updateInfo",
        value: function(e, t, n) {
            e = "" + e, r.isBoolean(n) || (n = !0);
            var a = this.getKeyIndex(e);
            void 0 == a ? this.rankInfos.push(t) : this.rankInfos[a] = t, n && this.sort();
        }
    }, {
        key: "sort",
        value: function() {
            var e = this;
            this.clearTimeoutInfo(), this.rankInfos.sort(function(t, n) {
                return e.sortRankInfoFunc(t, n);
            }), this.rankInfos.length > this.limit && (this.rankInfos = this.rankInfos.slice(0, this.limit));
        }
    }, {
        key: "sortRankInfoFunc",
        value: function(e, t) {
            for (var n = e.kvList, r = t.kvList, a = Math.min(n.length, r.length), i = 0; i < a; i++) {
                var s = n[i], o = r[i];
                if (s.value != o.value) return this.sortList[i] ? o.value - s.value : s.value - o.value;
            }
            return t.timestamp != e.timestamp ? e.timestamp - t.timestamp : e.key > t.key ? 1 : -1;
        }
    }, {
        key: "getRankTotal",
        value: function() {
            return this.clearTimeoutInfo(), this.rankInfos.length;
        }
    }, {
        key: "getRankRange",
        value: function(e, t) {
            if (!r.isNumber(e) || !r.isNumber(t)) return [];
            if (e > t) return [];
            e < 0 && (e = 0), this.clearTimeoutInfo(), t > this.rankInfos.length && (t = this.rankInfos.length);
            for (var n = [], a = e; a < t; a++) {
                var i = this.rankInfos[a], s = {
                    key: i.key,
                    value: {}
                }, o = i.baseInfo;
                for (var u in o) s.value[u] = o[u];
                for (var f = i.kvList, l = 0; l < f.length; l++) {
                    var u = f[l].key, h = f[l].value;
                    s.value[u] = h;
                }
                s.value.rank = a + 1, n.push(s);
            }
            return n;
        }
    }, {
        key: "getKeyInfo",
        value: function(e) {
            this.clearTimeoutInfo(), e = "" + e;
            for (var t = 0; t < this.rankInfos.length; t++) {
                var n = this.rankInfos[t];
                if (n.key == e) {
                    var r = {
                        key: n.key,
                        value: {}
                    }, a = n.baseInfo;
                    for (var i in a) r.value[i] = a[i];
                    for (var s = n.kvList, o = 0; o < s.length; o++) {
                        var i = s[o].key, u = s[o].value;
                        r.value[i] = u;
                    }
                    return r.value.rank = t + 1, r;
                }
            }
            return null;
        }
    }, {
        key: "getKeyRankRange",
        value: function(e, t, n) {
            var r = this.getRankTotal(), a = this.getKeyInfo(e);
            if (null == a) return [];
            var i = a.value.rank - t - 1;
            i < 0 && (i = 0);
            var s = i + n;
            return s > r && (s = r, i = Math.max(0, r - n)), this.getRankRange(i, s);
        }
    }, {
        key: "getKeyBeyondRange",
        value: function(e) {
            e = "" + e;
            for (var t = [], n = 0; n < this.rankInfos.length; n++) {
                var r = this.rankInfos[n];
                if (r.key == e) break;
                var a = {
                    key: r.key,
                    value: {}
                }, i = r.baseInfo;
                for (var s in i) a.value[s] = i[s];
                for (var o = r.kvList, u = 0; u < o.length; u++) {
                    var s = o[u].key, f = o[u].value;
                    a.value[s] = f;
                }
                a.value.rank = n + 1, t.push(a);
            }
            return t;
        }
    }, {
        key: "cmpRankData",
        value: function(e, t) {
            for (var n = 0; n < this.keyList.length; n++) {
                var r = this.keyList[n];
                if (!e.hasOwnProperty(r) && t.hasOwnProperty(r)) return -1;
                if (e.hasOwnProperty(r) && !t.hasOwnProperty(r)) return 1;
                if (e.hasOwnProperty(r) || t.hasOwnProperty(r)) {
                    var a = e[r], i = t[r];
                    if (a != i) return this.sortList[n] ? a > i ? 1 : -1 : a < i ? 1 : -1;
                }
            }
            return 0;
        }
    } ]), i;
}();

module.exports = i;