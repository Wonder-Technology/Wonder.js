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
import { init as initTransform, initData as initThreeDTransformData, addAddComponentHandle as addThreeDTransformAddComponentHandle, addDisposeHandle as addThreeDTransformDisposeHandle, update as updateTransform } from "../component/transform/ThreeDTransformSystem";
import { getState, setState } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { GlobalTempData } from "../definition/GlobalTempData";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { create, initData as initSceneData } from "./entityObject/scene/SceneSystem";
import { addAddComponentHandle as addGeometryAddComponentHandle, addDisposeHandle as addGeometryDisposeHandle, addInitHandle as addGeometryInitHandle, init as initGeometry, initData as initGeometryData } from "../component/geometry/GeometrySystem";
import { clear, init as initRenderer, render } from "../renderer/render/WebGLRenderSystem";
import { GeometryData } from "../component/geometry/GeometryData";
import { initData as initShaderData } from "../renderer/shader/ShaderSystem";
import { ShaderData } from "../renderer/shader/ShaderData";
import { Geometry } from "../component/geometry/Geometry";
import { DataBufferConfig } from "../config/DataBufferConfig";
import { addAddComponentHandle as addMaterialAddComponentHandle, addDisposeHandle as addMaterialDisposeHandle, addInitHandle as addMaterialInitHandle, initData as initMaterialData } from "../component/material/MaterialSystem";
import { MaterialData } from "../component/material/MaterialData";
import { addAddComponentHandle as addMeshRendererAddComponentHandle, addDisposeHandle as addMeshRendererDisposeHandle, initData as initMeshRendererData } from "../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../component/renderer/MeshRendererData";
import { initData as initTagData, addAddComponentHandle as addTagAddComponentHandle, addDisposeHandle as addTagDisposeHandle } from "../component/tag/TagSystem";
import { TagData } from "../component/tag/TagData";
import { Tag } from "../component/tag/Tag";
import { ThreeDTransform } from "../component/transform/ThreeDTransform";
import { initData as initIndexBufferData } from "../renderer/buffer/IndexBufferSystem";
import { IndexBufferData } from "../renderer/buffer/IndexBufferData";
import { initData as initArrayBufferData } from "../renderer/buffer/ArrayBufferSystem";
import { ArrayBufferData } from "../renderer/buffer/ArrayBufferData";
import { Material } from "../component/material/Material";
import { MeshRenderer } from "../component/renderer/MeshRenderer";
import { addAddComponentHandle as addCameraControllerAddComponentHandle, addDisposeHandle as addCameraControllerDisposeHandle, init as initCameraController, update as updateCameraController } from "../component/camera/CameraControllerSystem";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { SceneData } from "./entityObject/scene/SceneData";
import { initData as initCameraControllerData } from "../component/camera/CameraControllerSystem";
import { CameraController } from "../component/camera/CameraController";
import { DeviceManager } from "../device/DeviceManager";
import { initData as initGameObjectData } from "./entityObject/gameObject/GameObjectSystem";
var Director = (function () {
    function Director() {
        this.scene = create(GameObjectData);
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
        return this._run(elapsed, state);
    };
    Director.prototype._run = function (elapsed, state) {
        var resultState = this._update(elapsed, state);
        resultState = this._render(state);
        return resultState;
    };
    Director.prototype._update = function (elapsed, state) {
        var resultState = this._updateSystem(elapsed, state);
        return resultState;
    };
    Director.prototype._render = function (state) {
        var resultState = state;
        resultState = clear(state);
        resultState = render(state);
        return resultState;
    };
    Director.prototype._updateSystem = function (elapsed, state) {
        var resultState = updateTransform(elapsed, GlobalTempData, ThreeDTransformData, state);
        resultState = updateCameraController(PerspectiveCameraData, CameraData, CameraControllerData);
        return resultState;
    };
    return Director;
}());
Director = __decorate([
    singleton(true),
    registerClass("Director")
], Director);
export { Director };
initShaderData(ShaderData);
initGeometryData(DataBufferConfig, GeometryData);
addGeometryAddComponentHandle(Geometry);
addGeometryDisposeHandle(Geometry);
addGeometryInitHandle(Geometry);
initMaterialData(MaterialData);
addMaterialAddComponentHandle(Material);
addMaterialDisposeHandle(Material);
addMaterialInitHandle(Material);
initMeshRendererData(MeshRendererData);
addMeshRendererAddComponentHandle(MeshRenderer);
addMeshRendererDisposeHandle(MeshRenderer);
initTagData(TagData);
addTagAddComponentHandle(Tag);
addTagDisposeHandle(Tag);
initThreeDTransformData(GlobalTempData, ThreeDTransformData);
addThreeDTransformAddComponentHandle(ThreeDTransform);
addThreeDTransformDisposeHandle(ThreeDTransform);
initArrayBufferData(ArrayBufferData);
initIndexBufferData(IndexBufferData);
initSceneData(SceneData);
initCameraControllerData(CameraControllerData, PerspectiveCameraData, CameraData);
addCameraControllerAddComponentHandle(CameraController);
addCameraControllerDisposeHandle(CameraController);
initGameObjectData(GameObjectData);
//# sourceMappingURL=Director.js.map