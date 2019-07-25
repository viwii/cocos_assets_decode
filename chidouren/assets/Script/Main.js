var s = require("./ferrari/CommonUtils")
var o = require("./ferrari/DateUtils") 
var n = require("./ferrari/Dictionary") 
var a = require("./ferrari/Ferrari") 
var r = require("./ferrari/NodePool")
var c = require("./ferrari/RandomUtils")
var h = require("./ferrari/TimeUtils") 
var l = require("./ferrari/DirUtils") 
var d = require("./core/App") 
var u = require("./core/Resize")
var p = require("./core/Proxy") 
var g = require("./core/State") 
var m = require("./Facade") 
var f = require("./Config") 
var v = require("./Event") 
var y = require("./Enum") 
var w = require("./custom/CustomManager") 
var _ = require("./com/BootManager") 
var S = require("./com/DataManager") 
var b = require("./com/VoManager")
var k = require("./com/MaskManager") 
var C = require("./com/RomManager") 
var L = require("./com/ExtendsManager") 
var R = require("./com/ServerManager") 
var T = require("./com/LogicManager") 
var x = require("./com/PlatformManager") 
var A = require("./com/CommandManager") 
var M = require("./com/HttpManager")
cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: 0
    },
    properties: {},
    onLoad: function() {
        u.Resize.initialize(!0), this.getComponent(cc.Canvas).designResolution = new cc.Size(u.Resize.width, u.Resize.height), 
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE), d.App.isLoaded || (d.App.isLoaded = !0, 
        ss.commonUtils = s.CommonUtils, ss.dateUtils = o.DateUtils, ss.randomUtils = c.RandomUtils, 
        ss.timeUtils = h.TimeUtils, ss.dirUtils = l.DirUtils, ss.Dictionary = n.Dictionary, 
        ss.NodePool = r.NodePool, ss.Resize = u.Resize, ss.proxy = p.Proxy, ss.event = v.Event, 
        ss.state = g.State, ss.config = f.Config, ss.enum = y.Enum, ss.facade = new m.Facade(), 
        ss.ferrari = new a.Ferrari(), ss.rom = new C.RomManager(), ss.data = new S.DataManager(), 
        ss.vo = new b.VoManager(), ss.mask = new k.MaskManager(), ss.boot = new _.BootManager(), 
        ss.http = new M.HttpManager(), ss.logic = new T.LogicManager(), ss.custom = new w.CustomManager(), 
        ss.server = new R.ServerManager(), ss.extends = new L.ExtendsManager(), ss.command = new A.CommandManager(), 
        ss.platform = new x.PlatformManager(), ss.boot.initialize(), ss.rom.initialize(), 
        ss.data.initialize(), ss.vo.initialize(), ss.mask.initialize(), ss.http.initialize(), 
        ss.logic.initialize(), ss.server.initialize(), ss.custom.initialize(), ss.extends.initialize(), 
        ss.command.initialize(), ss.platform.initialize(), ss.ferrari.start());
    },
    update: function(t) {
        ss.ferrari && ss.ferrari.update(t);
    }
})