var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
import { DirectorTimeController } from "../utils/time/DirectorTimeController";
import { callFunc, intervalRequest } from "wonder-frp/dist/es2015/global/Operator";
import { init as initTransform, addAddComponentHandle as addThreeDTransformAddComponentHandle, addDisposeHandle as addThreeDTransformDisposeHandle } from "../component/transform/ThreeDTransformSystem";
import { getState, markIsInit, run, setState } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { GlobalTempData } from "../definition/GlobalTempData";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { create } from "./entityObject/scene/SceneSystem";
import { addAddComponentHandle as addGeometryAddComponentHandle, addInitHandle as addGeometryInitHandle, init as initGeometry } from "../component/geometry/GeometrySystem";
import { init as initRenderer } from "../renderer/core/WebGLRenderSystem";
import { GeometryData } from "../component/geometry/GeometryData";
import { addAddComponentHandle as addMaterialAddComponentHandle, addDisposeHandle as addMaterialDisposeHandle, addInitHandle as addMaterialInitHandle } from "../component/material/MaterialSystem";
import { addAddComponentHandle as addMeshRendererAddComponentHandle, addDisposeHandle as addMeshRendererDisposeHandle } from "../component/renderer/MeshRendererSystem";
import { addAddComponentHandle as addTagAddComponentHandle, addDisposeHandle as addTagDisposeHandle } from "../component/tag/TagSystem";
import { Tag } from "../component/tag/Tag";
import { ThreeDTransform } from "../component/transform/ThreeDTransform";
import { MeshRenderer } from "../component/renderer/MeshRenderer";
import { addAddComponentHandle as addCameraControllerAddComponentHandle, addDisposeHandle as addCameraControllerDisposeHandle, init as initCameraController } from "../component/camera/CameraControllerSystem";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { CameraController } from "../component/camera/CameraController";
import { DeviceManager } from "../renderer/device/DeviceManager";
import { Scheduler } from "./Scheduler";
import { AmbientLight } from "../component/light/AmbientLight";
import { DirectionLight } from "../component/light/DirectionLight";
import { BasicMaterial } from "../component/material/BasicMaterial";
import { LightMaterial } from "../component/material/LightMaterial";
import { BoxGeometry } from "../component/geometry/BoxGeometry";
import { CustomGeometry } from "../component/geometry/CustomGeometry";
import { PointLight } from "../component/light/PointLight";
import { isWebgl1 } from "../renderer/device/WebGLDetectSystem";
import { addAddComponentHandle as addWebGL1LightAddComponentHandle, addDisposeHandle as addWebGL1LightDisposeHandle } from "../component/webgl1/light/LightSystem";
import { addAddComponentHandle as addWebGL2LightAddComponentHandle, addDisposeHandle as addWebGL2LightDisposeHandle } from "../component/webgl2/light/LightSystem";
import { init as initPointLight } from "../component/light/PointLightSystem";
import { init as initDirectionLight } from "../component/light/DirectionLightSystem";
import { WebGL1PointLightData } from "../renderer/webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../renderer/webgl2/light/PointLightData";
import { addDisposeHandle as addWebGL1GeometryDisposeHandle } from "../component/webgl1/geometry/GeometrySystem";
import { addDisposeHandle as addWebGL2GeometryDisposeHandle } from "../component/webgl2/geometry/GeometrySystem";
import { WebGL1DirectionLightData } from "../renderer/webgl1/light/DirectionLightData";
import { WebGL2DirectionLightData } from "../renderer/webgl2/light/DirectionLightData";
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
        markIsInit(DirectorData);
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
        resultState = _initPointLight(state);
        resultState = _initDirectionLight(state);
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
    Director = __decorate([
        singleton(true),
        registerClass("Director")
    ], Director);
    return Director;
}());
export { Director };
addMaterialAddComponentHandle(BasicMaterial, LightMaterial);
addMaterialDisposeHandle(BasicMaterial, LightMaterial);
addMaterialInitHandle(BasicMaterial, LightMaterial);
addMeshRendererAddComponentHandle(MeshRenderer);
addMeshRendererDisposeHandle(MeshRenderer);
addTagAddComponentHandle(Tag);
addTagDisposeHandle(Tag);
addThreeDTransformAddComponentHandle(ThreeDTransform);
addThreeDTransformDisposeHandle(ThreeDTransform);
addCameraControllerAddComponentHandle(CameraController);
addCameraControllerDisposeHandle(CameraController);
addGeometryAddComponentHandle(BoxGeometry, CustomGeometry);
addGeometryInitHandle(BoxGeometry, CustomGeometry);
var _initPointLight = null, _initDirectionLight = null;
if (isWebgl1()) {
    addWebGL1LightAddComponentHandle(AmbientLight, DirectionLight, PointLight);
    addWebGL1LightDisposeHandle(AmbientLight, DirectionLight, PointLight);
    addWebGL1GeometryDisposeHandle(BoxGeometry, CustomGeometry);
    _initPointLight = function (state) {
        return initPointLight(WebGL1PointLightData, state);
    };
    _initDirectionLight = function (state) {
        return initDirectionLight(WebGL1DirectionLightData, state);
    };
}
else {
    addWebGL2LightAddComponentHandle(AmbientLight, DirectionLight, PointLight);
    addWebGL2LightDisposeHandle(AmbientLight, DirectionLight, PointLight);
    addWebGL2GeometryDisposeHandle(BoxGeometry, CustomGeometry);
    _initPointLight = function (state) {
        return initPointLight(WebGL2PointLightData, state);
    };
    _initDirectionLight = function (state) {
        return initDirectionLight(WebGL2DirectionLightData, state);
    };
}
//# sourceMappingURL=Director.js.map