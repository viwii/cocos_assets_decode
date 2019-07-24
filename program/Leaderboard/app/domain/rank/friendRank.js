function a(a, t) {
    if (!(a instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function a(a, t) {
        for (var i = 0; i < t.length; i++) {
            var e = t[i];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(a, e.key, e);
        }
    }
    return function(t, i, e) {
        return i && a(t.prototype, i), e && a(t, e), t;
    };
}(), i = require("../user/user").getInstance(), e = require("../../dao/storageData"), n = require("../../service/sdkService"), s = require("../../util/utils"), r = require("./rank"), o = function() {
    function o(t, n) {
        a(this, o), this.uid = i.getData("uid"), this.baseInfo = {
            nickname: i.getData("nickname"),
            avatarUrl: i.getData("avatarUrl")
        }, this.rankId = t, this.isStorageLoad = !1, this.isFriendLoad = !1, this.rank = new r(t, n.date, n.sortList, n.limit), 
        this.storage = new e(this.uid, t), this.tmpData = null, this.tmpTimesamp = 0;
    }
    return t(o, [ {
        key: "isReady",
        value: function() {
            return this.isStorageLoad && this.isFriendLoad;
        }
    }, {
        key: "loadRankStorage",
        value: function() {
            var a = this;
            if (!this.isStorageLoad) {
                var t = this;
                this.storage.load(function() {
                    a.updateTmpData(), t.isStorageLoad = !0;
                });
            }
        }
    }, {
        key: "loadFriendRank",
        value: function(a) {
            var t = this;
            if (!this.isFriendLoad) {
                var i = this;
                n.getFriendsStorage(this.rankId, function(e) {
                    if (s.isValidValue(e)) {
                        var n = {};
                        for (var r in e) {
                            var o = e[r].data;
                            o.hasOwnProperty("rank") && (n[r] = o.rank);
                        }
                        t.rank.load(n, a), t.updateTmpData(), i.isFriendLoad = !0;
                    } else console.log("loadFriendRank getFriendsStorage faild", e);
                });
            }
        }
    }, {
        key: "refreshFriends",
        value: function() {
            this.loadFriendRank(!1);
        }
    }, {
        key: "load",
        value: function() {
            if (!this.isReady()) {
                this.loadRankStorage(), this.loadFriendRank(!0);
                var a = this;
                setTimeout(function() {
                    a.isReady() || a.load();
                }, 3e4);
            }
        }
    }, {
        key: "saveTmpData",
        value: function(a, t) {
            if (this.rank.isVaildData(a)) return null == this.tmpData ? (this.tmpData = a, void (this.tmpTimesamp = t)) : void (this.rank.cmpRankData(a, this.tmpData) <= 0 || (this.tmpData = a, 
            this.tmpTimesamp = t));
            console.log("FriendRank updateTmpData faild, data is invaild", a);
        }
    }, {
        key: "updateTmpData",
        value: function() {
            this.isReady() || null != this.tmpData && (this.updateCmpScore(this.tmpData, this.tmpTimesamp, !0), 
            this.tmpData = null);
        }
    }, {
        key: "updateCmpScore",
        value: function(a, t, i) {
            if (this.rank.isVaildData(a)) if (this.isReady()) {
                s.isBoolean(i) || (i = !0);
                var e = this.storage.getData();
                if (null != e) {
                    var n = e.rank;
                    e.hasOwnProperty("rank") || (n = this.rank.createRankInfo(this.uid, t, this.baseInfo), 
                    e.rank = n), this.rank.updateCmpRankInfo(n, this.uid, t, this.baseInfo, a) && (this.rank.updateInfo(this.uid, n, i), 
                    this.storage.save(i));
                } else console.log("FriendRank updateScore faild, this.storage not Load");
            } else this.saveTmpData(a, t); else console.log("FriendRank updateScore faild, data is invaild", a);
        }
    }, {
        key: "getRank",
        value: function() {
            return this.rank;
        }
    } ]), o;
}();

module.exports = o;