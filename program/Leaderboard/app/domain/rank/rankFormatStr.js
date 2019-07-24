function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function n(n, e) {
        for (var o = 0; o < e.length; o++) {
            var i = e[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(n, i.key, i);
        }
    }
    return function(e, o, i) {
        return o && n(e.prototype, o), i && n(e, i), e;
    };
}(), o = null;

module.exports.getInstance = function() {
    return null == o && (o = new c()), o;
};

var i = function(n) {
    if ((n = parseInt(n)) < 2) return "";
    n -= 1;
    for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", o = e.length, i = ""; n > 0; ) i = e[(n - 1) % 26] + i, 
    n = Math.floor((n - 1) / o);
    return i;
}, c = function() {
    function o() {
        n(this, o);
    }
    return e(o, [ {
        key: "formatUnit",
        value: function(n) {
            var e = n.score1;
            return "" + n.score2 + i(e) + "/s";
        }
    }, {
        key: "formatDan",
        value: function(n) {
            for (var e = n.score1, o = [ {
                id: 0,
                name: "倔强青铜Ⅲ",
                icon: 0,
                score: 30
            }, {
                id: 1,
                name: "倔强青铜Ⅱ",
                icon: 0,
                score: 60
            }, {
                id: 2,
                name: "倔强青铜Ⅰ",
                icon: 0,
                score: 90
            }, {
                id: 3,
                name: "秩序白银Ⅲ",
                icon: 1,
                score: 130
            }, {
                id: 4,
                name: "秩序白银Ⅱ",
                icon: 1,
                score: 170
            }, {
                id: 5,
                name: "秩序白银Ⅰ",
                icon: 1,
                score: 210
            }, {
                id: 6,
                name: "荣耀黄金Ⅳ",
                icon: 2,
                score: 260
            }, {
                id: 7,
                name: "荣耀黄金Ⅲ",
                icon: 2,
                score: 310
            }, {
                id: 8,
                name: "荣耀黄金Ⅱ",
                icon: 2,
                score: 360
            }, {
                id: 9,
                name: "荣耀黄金Ⅰ",
                icon: 2,
                score: 410
            }, {
                id: 10,
                name: "尊贵铂金Ⅳ",
                icon: 3,
                score: 470
            }, {
                id: 11,
                name: "尊贵铂金Ⅲ",
                icon: 3,
                score: 530
            }, {
                id: 12,
                name: "尊贵铂金Ⅱ",
                icon: 3,
                score: 590
            }, {
                id: 13,
                name: "尊贵铂金Ⅰ",
                icon: 3,
                score: 650
            }, {
                id: 14,
                name: "永恒钻石Ⅴ",
                icon: 4,
                score: 710
            }, {
                id: 15,
                name: "永恒钻石Ⅳ",
                icon: 4,
                score: 770
            }, {
                id: 16,
                name: "永恒钻石Ⅲ",
                icon: 4,
                score: 830
            }, {
                id: 17,
                name: "永恒钻石Ⅱ",
                icon: 4,
                score: 890
            }, {
                id: 18,
                name: "永恒钻石Ⅰ",
                icon: 4,
                score: 950
            }, {
                id: 19,
                name: "至尊星耀Ⅴ",
                icon: 5,
                score: 1030
            }, {
                id: 20,
                name: "至尊星耀Ⅳ",
                icon: 5,
                score: 1100
            }, {
                id: 21,
                name: "至尊星耀Ⅲ",
                icon: 5,
                score: 1180
            }, {
                id: 22,
                name: "至尊星耀Ⅱ",
                icon: 5,
                score: 1260
            }, {
                id: 23,
                name: "至尊星耀Ⅰ",
                icon: 5,
                score: 1340
            }, {
                id: 24,
                name: "最强王者Ⅴ",
                icon: 6,
                score: 1460
            }, {
                id: 25,
                name: "最强王者Ⅳ",
                icon: 6,
                score: 1580
            }, {
                id: 26,
                name: "最强王者Ⅲ",
                icon: 6,
                score: 1700
            }, {
                id: 27,
                name: "最强王者Ⅱ",
                icon: 6,
                score: 1820
            }, {
                id: 28,
                name: "最强王者Ⅰ",
                icon: 6,
                score: 1940
            } ], i = 0, c = void 0, r = o.length - 1; r >= 0; r--) if ((c = o[r]) && e >= c.score) {
                i = r;
                break;
            }
            return "" + (c = o[i]).name;
        }
    } ]), o;
}();