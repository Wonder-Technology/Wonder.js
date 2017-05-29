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
var DirectorTimeController_1 = require("../utils/time/DirectorTimeController");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var ThreeDTransformSystem_1 = require("../component/transform/ThreeDTransformSystem");
var DirectorSystem_1 = require("./DirectorSystem");
var DirectorData_1 = require("./DirectorData");
var ThreeDTransformData_1 = require("../component/transform/ThreeDTransformData");
var GlobalTempData_1 = require("../definition/GlobalTempData");
var GameObjectData_1 = require("./entityObject/gameObject/GameObjectData");
var SceneSystem_1 = require("./entityObject/scene/SceneSystem");
var GeometrySystem_1 = require("../component/geometry/GeometrySystem");
var WebGLRenderSystem_1 = require("../renderer/render/WebGLRenderSystem");
var GeometryData_1 = require("../component/geometry/GeometryData");
var ShaderSystem_1 = require("../renderer/shader/ShaderSystem");
var ShaderData_1 = require("../renderer/shader/ShaderData");
var Geometry_1 = require("../component/geometry/Geometry");
var DataBufferConfig_1 = require("../config/DataBufferConfig");
var MaterialSystem_1 = require("../component/material/MaterialSystem");
var MaterialData_1 = require("../component/material/MaterialData");
var MeshRendererSystem_1 = require("../component/renderer/MeshRendererSystem");
var MeshRendererData_1 = require("../component/renderer/MeshRendererData");
var TagSystem_1 = require("../component/tag/TagSystem");
var TagData_1 = require("../component/tag/TagData");
var Tag_1 = require("../component/tag/Tag");
var ThreeDTransform_1 = require("../component/transform/ThreeDTransform");
var IndexBufferSystem_1 = require("../renderer/buffer/IndexBufferSystem");
var IndexBufferData_1 = require("../renderer/buffer/IndexBufferData");
var ArrayBufferSystem_1 = require("../renderer/buffer/ArrayBufferSystem");
var ArrayBufferData_1 = require("../renderer/buffer/ArrayBufferData");
var Material_1 = require("../component/material/Material");
var MeshRenderer_1 = require("../component/renderer/MeshRenderer");
var CameraControllerSystem_1 = require("../component/camera/CameraControllerSystem");
var PerspectiveCameraData_1 = require("../component/camera/PerspectiveCameraData");
var CameraData_1 = require("../component/camera/CameraData");
var CameraControllerData_1 = require("../component/camera/CameraControllerData");
var SceneData_1 = require("./entityObject/scene/SceneData");
var CameraControllerSystem_2 = require("../component/camera/CameraControllerSystem");
var CameraController_1 = require("../component/camera/CameraController");
var DeviceManager_1 = require("../device/DeviceManager");
var GameObjectSystem_1 = require("./entityObject/gameObject/GameObjectSystem");
var Director = (function () {
    function Director() {
        this.scene = SceneSystem_1.create(GameObjectData_1.GameObjectData);
        this._gameLoop = null;
        this._timeController = DirectorTimeController_1.DirectorTimeController.create();
    }
    Director.getInstance = function () { };
    ;
    Object.defineProperty(Director.prototype, "view", {
        get: function () {
            return DeviceManager_1.DeviceManager.getInstance().view;
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
            DirectorSystem_1.setState(self._loopBody(time, DirectorSystem_1.getState(DirectorData_1.DirectorData)), DirectorData_1.DirectorData).run();
        });
    };
    Director.prototype._buildInitStream = function () {
        var _this = this;
        return Operator_1.callFunc(function () {
            DirectorSystem_1.setState(_this._init(DirectorSystem_1.getState(DirectorData_1.DirectorData)), DirectorData_1.DirectorData);
        }, this);
    };
    Director.prototype._init = function (state) {
        var resultState = state;
        resultState = this._initSystem(resultState);
        resultState = this._initRenderer(resultState);
        return resultState;
    };
    Director.prototype._initSystem = function (state) {
        var resultState = ThreeDTransformSystem_1.init(GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData, state);
        resultState = GeometrySystem_1.init(GeometryData_1.GeometryData, state);
        resultState = CameraControllerSystem_1.init(PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData, CameraControllerData_1.CameraControllerData, state);
        return resultState;
    };
    Director.prototype._initRenderer = function (state) {
        var resultState = WebGLRenderSystem_1.init(state);
        return resultState;
    };
    Director.prototype._buildLoopStream = function () {
        return Operator_1.intervalRequest();
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
        resultState = WebGLRenderSystem_1.clear(state);
        resultState = WebGLRenderSystem_1.render(state);
        return resultState;
    };
    Director.prototype._updateSystem = function (elapsed, state) {
        var resultState = ThreeDTransformSystem_1.update(elapsed, GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData, state);
        resultState = CameraControllerSystem_1.update(PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData, CameraControllerData_1.CameraControllerData);
        return resultState;
    };
    return Director;
}());
Director = __decorate([
    singleton_1.singleton(true),
    registerClass_1.registerClass("Director")
], Director);
exports.Director = Director;
ShaderSystem_1.initData(ShaderData_1.ShaderData);
GeometrySystem_1.initData(DataBufferConfig_1.DataBufferConfig, GeometryData_1.GeometryData);
GeometrySystem_1.addAddComponentHandle(Geometry_1.Geometry);
GeometrySystem_1.addDisposeHandle(Geometry_1.Geometry);
GeometrySystem_1.addInitHandle(Geometry_1.Geometry);
MaterialSystem_1.initData(MaterialData_1.MaterialData);
MaterialSystem_1.addAddComponentHandle(Material_1.Material);
MaterialSystem_1.addDisposeHandle(Material_1.Material);
MaterialSystem_1.addInitHandle(Material_1.Material);
MeshRendererSystem_1.initData(MeshRendererData_1.MeshRendererData);
MeshRendererSystem_1.addAddComponentHandle(MeshRenderer_1.MeshRenderer);
MeshRendererSystem_1.addDisposeHandle(MeshRenderer_1.MeshRenderer);
TagSystem_1.initData(TagData_1.TagData);
TagSystem_1.addAddComponentHandle(Tag_1.Tag);
TagSystem_1.addDisposeHandle(Tag_1.Tag);
ThreeDTransformSystem_1.initData(GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
ThreeDTransformSystem_1.addAddComponentHandle(ThreeDTransform_1.ThreeDTransform);
ThreeDTransformSystem_1.addDisposeHandle(ThreeDTransform_1.ThreeDTransform);
ArrayBufferSystem_1.initData(ArrayBufferData_1.ArrayBufferData);
IndexBufferSystem_1.initData(IndexBufferData_1.IndexBufferData);
SceneSystem_1.initData(SceneData_1.SceneData);
CameraControllerSystem_2.initData(CameraControllerData_1.CameraControllerData, PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData);
CameraControllerSystem_1.addAddComponentHandle(CameraController_1.CameraController);
CameraControllerSystem_1.addDisposeHandle(CameraController_1.CameraController);
GameObjectSystem_1.initData(GameObjectData_1.GameObjectData);
//# sourceMappingURL=Director.js.map