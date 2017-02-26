"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("wonder-frp/dist/commonjs/stream/ConcatStream");
require("wonder-frp/dist/commonjs/stream/IgnoreElementsStream");
require("wonder-frp/dist/commonjs/extend/root");
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var singleton_1 = require("../definition/typescript/decorator/singleton");
var DeviceManager_1 = require("../device/DeviceManager");
var SceneDispatcher_1 = require("./entityObject/scene/SceneDispatcher");
var DirectorTimeController_1 = require("../utils/time/DirectorTimeController");
var WebGLRenderer_1 = require("../renderer/renderer/WebGLRenderer");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var BasicState_1 = require("../renderer/state/BasicState");
var EventManager_1 = require("../event/EventManager");
var CustomEvent_1 = require("../event/object/CustomEvent");
var EEngineEvent_1 = require("../event/EEngineEvent");
var EGameState;
(function (EGameState) {
    EGameState[EGameState["NORMAL"] = 0] = "NORMAL";
    EGameState[EGameState["STOP"] = 1] = "STOP";
    EGameState[EGameState["PAUSE"] = 2] = "PAUSE";
})(EGameState || (EGameState = {}));
var Director = (function () {
    function Director() {
        this.scene = null;
        this.renderer = null;
        this._gameLoop = null;
        this._gameState = EGameState.NORMAL;
        this._timeController = DirectorTimeController_1.DirectorTimeController.create();
    }
    Director.getInstance = function () { };
    ;
    Object.defineProperty(Director.prototype, "gameTime", {
        get: function () {
            return this._timeController.gameTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "fps", {
        get: function () {
            return this._timeController.fps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isNormal", {
        get: function () {
            return this._gameState === EGameState.NORMAL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isStop", {
        get: function () {
            return this._gameState === EGameState.STOP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isPause", {
        get: function () {
            return this._gameState === EGameState.PAUSE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isTimeChange", {
        get: function () {
            return this._timeController.isTimeChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "elapsed", {
        get: function () {
            return this._timeController.elapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "view", {
        get: function () {
            return DeviceManager_1.DeviceManager.getInstance().view;
        },
        enumerable: true,
        configurable: true
    });
    Director.prototype.initWhenCreate = function () {
        this.scene = SceneDispatcher_1.SceneDispatcher.create();
        this.renderer = WebGLRenderer_1.WebGLRenderer.create();
    };
    Director.prototype.start = function () {
        this._gameState = EGameState.NORMAL;
        this._startLoop();
    };
    Director.prototype.stop = function () {
        this._gameLoop && this._gameLoop.dispose();
        this._gameState = EGameState.STOP;
        this._timeController.stop();
    };
    Director.prototype.pause = function () {
        if (this._gameState === EGameState.PAUSE) {
            return;
        }
        this._gameState = EGameState.PAUSE;
        this._timeController.pause();
    };
    Director.prototype.resume = function () {
        this._gameState = EGameState.NORMAL;
        this._timeController.resume();
    };
    Director.prototype.getDeltaTime = function () {
        return this._timeController.deltaTime;
    };
    Director.prototype._startLoop = function () {
        var self = this;
        this._gameLoop = this._buildInitStream()
            .ignoreElements()
            .concat(this._buildLoopStream())
            .subscribe(function (time) {
            self._loopBody(time);
        });
    };
    Director.prototype._buildInitStream = function () {
        var _this = this;
        return Operator_1.callFunc(function () {
            _this._init();
        }, this);
    };
    Director.prototype._init = function () {
        this._initGameObjectScene();
    };
    Director.prototype._initGameObjectScene = function () {
        var gameObjectScene = this.scene.gameObjectScene;
        gameObjectScene.init();
        this.renderer.init();
        this._timeController.start();
    };
    Director.prototype._buildLoopStream = function () {
        return Operator_1.intervalRequest();
    };
    Director.prototype._loopBody = function (time) {
        var elapsed = null;
        if (this._gameState === EGameState.PAUSE || this._gameState === EGameState.STOP) {
            return false;
        }
        elapsed = this._timeController.computeElapseTime(time);
        this._run(elapsed);
        return true;
    };
    Director.prototype._run = function (elapsed) {
        this._timeController.tick(elapsed);
        EventManager_1.EventManager.trigger(CustomEvent_1.CustomEvent.create(EEngineEvent_1.EEngineEvent.STARTLOOP));
        this._update(elapsed);
        this._render();
        EventManager_1.EventManager.trigger(CustomEvent_1.CustomEvent.create(EEngineEvent_1.EEngineEvent.ENDLOOP));
    };
    Director.prototype._update = function (elapsed) {
        this.scene.gameObjectScene.update(elapsed);
    };
    Director.prototype._render = function () {
        this.scene.gameObjectScene.render(this.renderer);
        this.renderer.clear();
        if (this.renderer.hasCommand()) {
            this.renderer.webglState = BasicState_1.BasicState.create();
            this.renderer.render();
        }
    };
    return Director;
}());
Director = __decorate([
    singleton_1.singleton(true),
    registerClass_1.registerClass("Director")
], Director);
exports.Director = Director;
//# sourceMappingURL=Director.js.map