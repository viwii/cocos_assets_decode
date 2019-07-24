function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, i, a) {
        return i && t(e.prototype, i), a && t(e, a), e;
    };
}(), i = require("../util/utils"), a = require("../service/sdkService"), n = function() {
    function n(e, i) {
        t(this, n), this.uid = e, this.key = i, this.data = null, this.isLoad = !1;
    }
    return e(n, [ {
        key: "load",
        value: function(t) {
            var e = this;
            if (this.isLoad) i.invokeCb(t); else {
                var n = this;
                a.getStorage(this.key, function(a) {
                    console.log("StorageData load success", e.uid, e.key, a), e.isLoad = !0, n.data = a, 
                    i.invokeCb(t);
                });
            }
        }
    }, {
        key: "save",
        value: function(t) {
            this.isLoad && (i.isValidValue(t) && "boolean" == typeof t || (t = !0), t && a.setStorage(this.uid, this.key, this.data, function() {}));
        }
    }, {
        key: "clear",
        value: function(t) {
            this.isLoad && (this.data = {}, this.save(t));
        }
    }, {
        key: "setData",
        value: function(t, e) {
            return !!this.isLoad && (!!i.isObject(t) && (this.data = t, this.save(e), !0));
        }
    }, {
        key: "getData",
        value: function() {
            return this.isLoad ? this.data : null;
        }
    } ]), n;
}();

module.exports = n;