"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../../../definition/typescript/decorator/registerClass");
var Scene_1 = require("../Scene");
var GameObject_1 = require("../../gameObject/GameObject");
var contract_1 = require("../../../../definition/typescript/decorator/contract");
var JudgeUtils_1 = require("../../../../utils/JudgeUtils");
var Log_1 = require("../../../../utils/Log");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var RenderUtils_1 = require("../../../../utils/RenderUtils");
var CameraController_1 = require("../../../../component/camera/controller/CameraController");
var GameObjectScene = (function (_super) {
    __extends(GameObjectScene, _super);
    function GameObjectScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._currentCamera = null;
        _this._cameraList = Collection_1.Collection.create();
        return _this;
    }
    GameObjectScene.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(GameObjectScene.prototype, "currentCamera", {
        get: function () {
            return this._currentCamera || this._cameraList.getChild(0);
        },
        set: function (arg) {
            if (JudgeUtils_1.JudgeUtils.isNumber(arg)) {
                var index = arg;
                this._currentCamera = this._cameraList.getChild(index);
            }
            else if (arg instanceof GameObject_1.GameObject) {
                var currentCamera = arg;
                this._currentCamera = currentCamera;
            }
        },
        enumerable: true,
        configurable: true
    });
    GameObjectScene.prototype.addChild = function (child) {
        var cameraList = this._getCameras(child);
        if (cameraList.getCount() > 0) {
            this._cameraList.addChildren(cameraList);
        }
        return _super.prototype.addChild.call(this, child);
    };
    GameObjectScene.prototype.update = function (elapsed) {
        var currentCamera = this._getCurrentCameraComponent();
        if (currentCamera) {
            currentCamera.update(elapsed);
        }
        _super.prototype.update.call(this, elapsed);
    };
    GameObjectScene.prototype.render = function (renderer) {
        _super.prototype.render.call(this, renderer, this.currentCamera);
    };
    GameObjectScene.prototype.getRenderList = function () {
        return RenderUtils_1.RenderUtils.getGameObjectRenderList(this.getChildren());
    };
    GameObjectScene.prototype.createTransform = function () {
        return null;
    };
    GameObjectScene.prototype._getCameras = function (gameObject) {
        return this._find(gameObject, this._isCamera);
    };
    GameObjectScene.prototype._find = function (gameObject, judgeFunc) {
        var self = this, resultArr = Collection_1.Collection.create();
        var find = function (gameObject) {
            if (judgeFunc.call(self, gameObject)) {
                resultArr.addChild(gameObject);
            }
            gameObject.forEach(function (child) {
                find(child);
            });
        };
        find(gameObject);
        return resultArr;
    };
    GameObjectScene.prototype._isCamera = function (child) {
        return child.hasComponent(CameraController_1.CameraController);
    };
    GameObjectScene.prototype._getCurrentCameraComponent = function () {
        if (!this.currentCamera) {
            return null;
        }
        return this.currentCamera.getComponent(CameraController_1.CameraController);
    };
    return GameObjectScene;
}(Scene_1.Scene));
__decorate([
    contract_1.requireSetter(function (arg) {
        if (JudgeUtils_1.JudgeUtils.isNumber(arg)) {
            var index = arg;
            contract_1.assert(!!this._cameraList.getChild(index), Log_1.Log.info.FUNC_NOT_EXIST("current camera in cameraList"));
        }
    })
], GameObjectScene.prototype, "currentCamera", null);
GameObjectScene = __decorate([
    registerClass_1.registerClass("GameObjectScene")
], GameObjectScene);
exports.GameObjectScene = GameObjectScene;
//# sourceMappingURL=GameObjectScene.js.map