var s = require("./Utils"), o = function() {};
module.exports = {
	WebUtils: o
}, o.obj2UriParam = function(t, e) {
	var i = "";
	if (!s.Utils.isObject(t)) return i;
	s.Utils.isValidValue(e) || (e = !0);
	var o = 0;
	for (var n in t) {
		o > 0 && (i += "&"), o++, i += e ? encodeURIComponent(n) : n, i += "=";
		var a = "" + t[n];
		i += e ? encodeURIComponent(a) : a;
	}
	return i;
} 