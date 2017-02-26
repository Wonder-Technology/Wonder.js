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
import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { Scene } from "../Scene";
import { GameObject } from "../../gameObject/GameObject";
import { requireSetter, assert } from "../../../../definition/typescript/decorator/contract";
import { JudgeUtils } from "../../../../utils/JudgeUtils";
import { Log } from "../../../../utils/Log";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { RenderUtils } from "../../../../utils/RenderUtils";
import { CameraController } from "../../../../component/camera/controller/CameraController";
var GameObjectScene = (function (_super) {
    __extends(GameObjectScene, _super);
    function GameObjectScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._currentCamera = null;
        _this._cameraList = Collection.create();
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
            if (JudgeUtils.isNumber(arg)) {
                var index = arg;
                this._currentCamera = this._cameraList.getChild(index);
            }
            else if (arg instanceof GameObject) {
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
        return RenderUtils.getGameObjectRenderList(this.getChildren());
    };
    GameObjectScene.prototype.createTransform = function () {
        return null;
    };
    GameObjectScene.prototype._getCameras = function (gameObject) {
        return this._find(gameObject, this._isCamera);
    };
    GameObjectScene.prototype._find = function (gameObject, judgeFunc) {
        var self = this, resultArr = Collection.create();
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
        return child.hasComponent(CameraController);
    };
    GameObjectScene.prototype._getCurrentCameraComponent = function () {
        if (!this.currentCamera) {
            return null;
        }
        return this.currentCamera.getComponent(CameraController);
    };
    return GameObjectScene;
}(Scene));
__decorate([
    requireSetter(function (arg) {
        if (JudgeUtils.isNumber(arg)) {
            var index = arg;
            assert(!!this._cameraList.getChild(index), Log.info.FUNC_NOT_EXIST("current camera in cameraList"));
        }
    })
], GameObjectScene.prototype, "currentCamera", null);
GameObjectScene = __decorate([
    registerClass("GameObjectScene")
], GameObjectScene);
export { GameObjectScene };
//# sourceMappingURL=GameObjectScene.js.map