var e = require("../../conf/rank/rankConf"), t = require("../../service/canvasService").getInstance(), n = require("../../util/stringUtils"), r = require("../../util/utils"), i = require("../../util/async"), a = require("./rankFormatStr"), o = function(e, t) {
    for (var n = "", r = 0, i = 0; i < e.length; i++) {
        var a = e.charCodeAt(i);
        if (a >= 1 && a <= 126 || 65376 <= a && a <= 65439 ? r++ : r += 2, !(r <= t)) break;
        n += e.substr(i, 1);
    }
    return n;
}, s = function(e, t) {
    var i = n.getFuncName(e), o = a.getInstance();
    if (o && void 0 != i) {
        var s = o[i];
        if (r.isFunction(s)) return s(t);
    }
    return n.formatString(e, t);
}, f = function(n, a, f, l, u) {
    if (f) {
        var p = f.rank, c = a.drawConf[0];
        a.drawConf.hasOwnProperty(p) && (c = a.drawConf[p]);
        i.mapSeries(c, function(i, a) {
            var p = r.clone(i.position);
            if (l === e.RANK_STYLE.VERTICAL ? p.top += u : p.left += u, "image" == i.type) {
                var c = i.src;
                c = s(c, f), t.drawImage(n, c, p, function() {
                    a(null, {});
                });
            } else if ("text" == i.type) {
                var g = i.text;
                g = s(g, f), i.hasOwnProperty("textLength") && (g = o(g, i.textLength)), t.drawText(n, g, i.layout, p, function() {
                    a(null, {});
                });
            }
        }, function(e, t) {});
    }
}, l = function(n, i, a, o) {
    var s = i.pageItem.splitConf;
    if (s) {
        var f = r.clone(s.position);
        a === e.RANK_STYLE.VERTICAL ? f.top += o : f.left += o, t.drawImage(n, s.src, f, function() {});
    }
};

module.exports.drawPage = function(n, i, a, o) {
    var s = t.createCanvas(), u = 0, p = n.pageItem.splitConf;
    n.selfStyle == e.VIEW_SELF_STYLE.TOP && a && (f(s, n.selfItem, a.value, e.RANK_STYLE.VERTICAL, u), 
    u += n.selfSpan, (I = n.selfItem.splitConf) && (l(s, n.selfItem, e.RANK_STYLE.VERTICAL, u), 
    u += I.position.height));
    for (var c = 0; c < i.length; c++) {
        var g = i[c].value;
        f(s, n.pageItem, g, n.style, u), u += n.itemSpan, p && c < i.length - 1 && (l(s, n.pageItem, n.style, u), 
        n.style === e.RANK_STYLE.VERTICAL ? u += p.position.height : u += p.position.width);
    }
    if (n.selfStyle == e.VIEW_SELF_STYLE.BOTTOM && a) {
        u = n.pageCount * n.itemSpan, p && n.style === e.RANK_STYLE.VERTICAL && (u += (n.pageCount - 1) * p.position.height);
        var I = n.selfItem.splitConf;
        I && (l(s, n.selfItem, e.RANK_STYLE.VERTICAL, u), u += I.position.height), f(s, n.selfItem, a.value, e.RANK_STYLE.VERTICAL, u), 
        u += n.selfSpan;
    }
    r.isNumber(o) && o > 0 && setTimeout(function() {
        t.clearCtx(s);
    }, o);
};