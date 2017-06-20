var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "wonder-frp/dist/es2015/stream/ConcatStream";
import "wonder-frp/dist/es2015/stream/IgnoreElementsStream";
import "wonder-frp/dist/es2015/extend/root";
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
import { DirectorTimeController } from "../utils/time/DirectorTimeController";
import { callFunc, intervalRequest } from "wonder-frp/dist/es2015/global/Operator";
import { init as initTransform, addAddComponentHandle as addThreeDTransformAddComponentHandle, addDisposeHandle as addThreeDTransformDisposeHandle } from "../component/transform/ThreeDTransformSystem";
import { getState, run, setState } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { GlobalTempData } from "../definition/GlobalTempData";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { create } from "./entityObject/scene/SceneSystem";
import { addAddComponentHandle as addGeometryAddComponentHandle, addDisposeHandle as addGeometryDisposeHandle, addInitHandle as addGeometryInitHandle, init as initGeometry } from "../component/geometry/GeometrySystem";
import { init as initRenderer } from "../renderer/render/WebGLRenderSystem";
import { GeometryData } from "../component/geometry/GeometryData";
import { Geometry } from "../component/geometry/Geometry";
import { addAddComponentHandle as addMaterialAddComponentHandle, addDisposeHandle as addMaterialDisposeHandle, addInitHandle as addMaterialInitHandle } from "../component/material/MaterialSystem";
import { addAddComponentHandle as addMeshRendererAddComponentHandle, addDisposeHandle as addMeshRendererDisposeHandle } from "../component/renderer/MeshRendererSystem";
import { addAddComponentHandle as addTagAddComponentHandle, addDisposeHandle as addTagDisposeHandle } from "../component/tag/TagSystem";
import { Tag } from "../component/tag/Tag";
import { ThreeDTransform } from "../component/transform/ThreeDTransform";
import { Material } from "../component/material/Material";
import { MeshRenderer } from "../component/renderer/MeshRenderer";
import { addAddComponentHandle as addCameraControllerAddComponentHandle, addDisposeHandle as addCameraControllerDisposeHandle, init as initCameraController } from "../component/camera/CameraControllerSystem";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { CameraController } from "../component/camera/CameraController";
import { DeviceManager } from "../renderer/device/DeviceManager";
import { Scheduler } from "./Scheduler";
var Director = (function () {
    function Director() {
        this.scene = create(GameObjectData);
        this.scheduler = null;
        this._gameLoop = null;
        this._timeController = DirectorTimeController.create();
    }
    Director.getInstance = function () { };
    ;
    Object.defineProperty(Director.prototype, "view", {
        get: function () {
            return DeviceManager.getInstance().view;
        },
        enumerable: true,
        configurable: true
    });
    Director.prototype.initWhenCreate = function () {
        this.scheduler = Scheduler.create();
    };
    Director.prototype.start = function () {
        this._startLoop();
    };
    Director.prototype._startLoop = function () {
        var self = this;
        this._gameLoop = this._buildInitStream()
            .ignoreElements()
            .concat(this._buildLoopStream())
            .subscribe(function (time) {
            setState(self._loopBody(time, getState(DirectorData)), DirectorData).run();
        });
    };
    Director.prototype._buildInitStream = function () {
        var _this = this;
        return callFunc(function () {
            setState(_this._init(getState(DirectorData)), DirectorData);
        }, this);
    };
    Director.prototype._init = function (state) {
        var resultState = state;
        resultState = this._initSystem(resultState);
        resultState = this._initRenderer(resultState);
        this._timeController.start();
        this.scheduler.start();
        return resultState;
    };
    Director.prototype._initSystem = function (state) {
        var resultState = initTransform(GlobalTempData, ThreeDTransformData, state);
        resultState = initGeometry(GeometryData, state);
        resultState = initCameraController(PerspectiveCameraData, CameraData, CameraControllerData, state);
        return resultState;
    };
    Director.prototype._initRenderer = function (state) {
        var resultState = initRenderer(state);
        return resultState;
    };
    Director.prototype._buildLoopStream = function () {
        return intervalRequest();
    };
    Director.prototype._loopBody = function (time, state) {
        var elapsed = null;
        elapsed = this._timeController.computeElapseTime(time);
        return run(elapsed, state, this._timeController, this.scheduler);
    };
    return Director;
}());
Director = __decorate([
    singleton(true),
    registerClass("Director")
], Director);
export { Director };
addGeometryAddComponentHandle(Geometry);
addGeometryDisposeHandle(Geometry);
addGeometryInitHandle(Geometry);
addMaterialAddComponentHandle(Material);
addMaterialDisposeHandle(Material);
addMaterialInitHandle(Material);
addMeshRendererAddComponentHandle(MeshRenderer);
addMeshRendererDisposeHandle(MeshRenderer);
addTagAddComponentHandle(Tag);
addTagDisposeHandle(Tag);
addThreeDTransformAddComponentHandle(ThreeDTransform);
addThreeDTransformDisposeHandle(ThreeDTransform);
addCameraControllerAddComponentHandle(CameraController);
addCameraControllerDisposeHandle(CameraController);
//# sourceMappingURL=Director.js.map