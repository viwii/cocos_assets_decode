 cc.Class({
    extends: cc.Component,
    properties: {
        joystickNode: cc.Node,
        addSpeedNode: cc.Node,
        joystickNode_back: cc.Node,
        addSpeedNode_back: cc.Node,
        mapNode: cc.Node,
        miniMapNode: cc.Node,
        miniRankNode: cc.Node,
        miniBuffNode: cc.Node,
        miniKillNode: cc.Node,
        miniTimeLab: cc.Label,
        miniKillLab: cc.Label,
        miniDiedLab: cc.Label,
        miniSignLab: cc.Label,
        miniSurviveNode: cc.Node,
        miniSurviveLab: cc.Label,
        pacmanPrefab: cc.Prefab,
        peaPrefab: cc.Prefab,
        ghostPrefab: cc.Prefab,
        raderPrefab: cc.Prefab,
        snowPrefab: cc.Prefab,
        shadowPrefab: cc.Prefab
    },
    onLoad: function() {
        this.joystick = this.joystickNode.getComponent("Joystick"); 
        this.addSpeed = this.addSpeedNode.getComponent("AddSpeed"); 
        //this.joystick_back = this.joystickNode_back.getComponent("Joystick"); 
        //this.addSpeed_back = this.addSpeedNode_back.getComponent("AddSpeed");
    },
    start: function() {
        cc.systemEvent.on(ss.event.system.GameInit, this.gameInit, this), 
        cc.systemEvent.on(ss.event.system.UserData, this.userData, this), 
        cc.systemEvent.on(ss.event.system.GameData, this.gameData, this), 
        cc.systemEvent.on(ss.event.system.GamePlay, this.gamePlay, this), 
        cc.systemEvent.on(ss.event.system.GameOver, this.gameOver, this), 
        this.joystickNode.on("move", this.callJoystick, this), 
        this.addSpeedNode.on("speed", this.callAddSpeed, this); 
        //this.joystickNode_back.on("move", this.callJoystick, this); 
        //his.addSpeedNode_back.on("speed", this.callAddSpeed, this); 
        //this.joystickNode_back.active = !1; 
        //this.addSpeedNode_back.active = !1;
    },
    gameInit: function(t) {
        var e = ss.logic.game.isSystemBetter() ? 80 : 60;
        ss.logic.game.init({
            map: this.mapNode,
            bulu: {
                pea: {
                    parent: this.mapNode,
                    prefab: this.peaPrefab,
                    num: e
                },
                ghost: {
                    parent: this.mapNode,
                    prefab: this.ghostPrefab,
                    num: 2
                },
                pacman: {
                    parent: this.mapNode,
                    prefab: this.pacmanPrefab,
                    num: 10
                },
                viewing: {
                    content: this.mapNode,
                    mapSize: cc.size(this.mapNode.width, this.mapNode.height),
                    paddingSize: cc.size(256, 256)
                },
                radar: {
                    parent: this.miniMapNode,
                    prefab: this.raderPrefab,
                    num: 0,
                    scaleX: this.miniMapNode.width / this.mapNode.width,
                    scaleY: this.miniMapNode.height / this.mapNode.height
                },
                snow: {
                    parent: null,
                    prefab: this.snowPrefab,
                    num: 6
                },
                shadow: {
                    parent: this.mapNode,
                    prefab: this.shadowPrefab,
                    num: 50
                }
            },
            gala: {
                outlooking: {
                    mapRect: cc.rect(-this.mapNode.width / 2, -this.mapNode.height / 2, this.mapNode.width, this.mapNode.height)
                },
                rassling: {
                    enabledDebugDraw: !1,
                    enabledDrawBoundingBox: !1
                }
            },
            hutu: {
                pea: {
                    num: e,
                    1: {
                        cherry: 5,
                        chocolate: 0,
                        sweet: 0,
                        shit: 0
                    },
                    2: {
                        cherry: 5,
                        chocolate: 1,
                        sweet: 1,
                        shit: 1
                    }
                },
                ghost: {
                    1: {
                        num: 1
                    },
                    2: {
                        num: 0
                    }
                },
                pacman: {
                    num: 9,
                    1: {
                        num: 0,
                        step: 0
                    },
                    2: {
                        num: 50,
                        step: 10
                    }
                }
            },
            mini: {
                rankNode: this.miniRankNode,
                killNode: this.miniKillNode,
                buffNode: this.miniBuffNode,
                surviveNode: this.miniSurviveNode,
                surviveLab: this.miniSurviveLab,
                killLab: this.miniKillLab,
                diedLab: this.miniDiedLab,
                signLab: this.miniSignLab,
                timeLab: this.miniTimeLab,
                gameTime: 120
            }
        });
    },
    userData: function(t) {},
    gameData: function(t) {},
    gamePlay: function(t) {
        var e = t;
        this.joystick.play(), 
        this.addSpeed.play(), 
        //this.joystick_back.play(), 
        //this.addSpeed_back.play(), 
        ss.logic.game.play(e), 
        this.callCtrlView();
    },
    gameOver: function(t) {
        this.joystick.stop(), 
        this.addSpeed.stop(), 
        //this.joystick_back.stop(), 
        //this.addSpeed_back.stop(), 
        ss.logic.game.stop();
    },
    callJoystick: function(t) {
        if (ss.state.isPlaying()) {
            var e = t;
            ss.logic.game.move(e);
        }
    },
    callAddSpeed: function(t) {
        ss.state.isPlaying() && ss.logic.game.addSpeed();
    },
    callCtrlView: function(t) {
        if (ss.data.sets.rightabled) {
            this.joystickNode.active = false; 
            this.addSpeedNode.active = false; 
            //this.joystickNode_back.active = !0, 
            //this.addSpeedNode_back.active = !0
        }else{
            this.joystickNode.active = true; 
            this.addSpeedNode.active = true; 
            //this.joystickNode_back.active = !1, 
            //this.addSpeedNode_back.active = !1
        }
    },
    update: function(t) {
        ss.state.isPlaying() && ss.logic.game.update(t);
    }
}) 