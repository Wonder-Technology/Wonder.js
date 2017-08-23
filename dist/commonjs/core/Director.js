"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var WebGLRenderSystem_1 = require("../renderer/core/WebGLRenderSystem");
var GeometryData_1 = require("../component/geometry/GeometryData");
var MaterialSystem_1 = require("../component/material/MaterialSystem");
var MeshRendererSystem_1 = require("../component/renderer/MeshRendererSystem");
var TagSystem_1 = require("../component/tag/TagSystem");
var Tag_1 = require("../component/tag/Tag");
var ThreeDTransform_1 = require("../component/transform/ThreeDTransform");
var MeshRenderer_1 = require("../component/renderer/MeshRenderer");
var CameraControllerSystem_1 = require("../component/camera/CameraControllerSystem");
var PerspectiveCameraData_1 = require("../component/camera/PerspectiveCameraData");
var CameraData_1 = require("../component/camera/CameraData");
var CameraControllerData_1 = require("../component/camera/CameraControllerData");
var CameraController_1 = require("../component/camera/CameraController");
var DeviceManager_1 = require("../renderer/device/DeviceManager");
var Scheduler_1 = require("./Scheduler");
var AmbientLight_1 = require("../component/light/AmbientLight");
var DirectionLight_1 = require("../component/light/DirectionLight");
var BasicMaterial_1 = require("../component/material/BasicMaterial");
var LightMaterial_1 = require("../component/material/LightMaterial");
var BoxGeometry_1 = require("../component/geometry/BoxGeometry");
var CustomGeometry_1 = require("../component/geometry/CustomGeometry");
var PointLight_1 = require("../component/light/PointLight");
var WebGLDetectSystem_1 = require("../renderer/device/WebGLDetectSystem");
var LightSystem_1 = require("../component/webgl1/light/LightSystem");
var LightSystem_2 = require("../component/webgl2/light/LightSystem");
var PointLightSystem_1 = require("../component/light/PointLightSystem");
var DirectionLightSystem_1 = require("../component/light/DirectionLightSystem");
var PointLightData_1 = require("../renderer/webgl1/light/PointLightData");
var PointLightData_2 = require("../renderer/webgl2/light/PointLightData");
var GeometrySystem_2 = require("../component/webgl1/geometry/GeometrySystem");
var GeometrySystem_3 = require("../component/webgl2/geometry/GeometrySystem");
var DirectionLightData_1 = require("../renderer/webgl1/light/DirectionLightData");
var DirectionLightData_2 = require("../renderer/webgl2/light/DirectionLightData");
var Director = (function () {
    function Director() {
        this.scene = SceneSystem_1.create(GameObjectData_1.GameObjectData);
        this.scheduler = null;
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
        this.scheduler = Scheduler_1.Scheduler.create();
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
        DirectorSystem_1.markIsInit(DirectorData_1.DirectorData);
        resultState = this._initSystem(resultState);
        resultState = this._initRenderer(resultState);
        this._timeController.start();
        this.scheduler.start();
        return resultState;
    };
    Director.prototype._initSystem = function (state) {
        var resultState = ThreeDTransformSystem_1.init(GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData, state);
        resultState = GeometrySystem_1.init(GeometryData_1.GeometryData, state);
        resultState = CameraControllerSystem_1.init(PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData, CameraControllerData_1.CameraControllerData, state);
        resultState = _initPointLight(state);
        resultState = _initDirectionLight(state);
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
        elapsed = this._timeController.computeElapseTime(time);
        return DirectorSystem_1.run(elapsed, state, this._timeController, this.scheduler);
    };
    Director = __decorate([
        singleton_1.singleton(true),
        registerClass_1.registerClass("Director")
    ], Director);
    return Director;
}());
exports.Director = Director;
MaterialSystem_1.addAddComponentHandle(BasicMaterial_1.BasicMaterial, LightMaterial_1.LightMaterial);
MaterialSystem_1.addDisposeHandle(BasicMaterial_1.BasicMaterial, LightMaterial_1.LightMaterial);
MaterialSystem_1.addInitHandle(BasicMaterial_1.BasicMaterial, LightMaterial_1.LightMaterial);
MeshRendererSystem_1.addAddComponentHandle(MeshRenderer_1.MeshRenderer);
MeshRendererSystem_1.addDisposeHandle(MeshRenderer_1.MeshRenderer);
TagSystem_1.addAddComponentHandle(Tag_1.Tag);
TagSystem_1.addDisposeHandle(Tag_1.Tag);
ThreeDTransformSystem_1.addAddComponentHandle(ThreeDTransform_1.ThreeDTransform);
ThreeDTransformSystem_1.addDisposeHandle(ThreeDTransform_1.ThreeDTransform);
CameraControllerSystem_1.addAddComponentHandle(CameraController_1.CameraController);
CameraControllerSystem_1.addDisposeHandle(CameraController_1.CameraController);
GeometrySystem_1.addAddComponentHandle(BoxGeometry_1.BoxGeometry, CustomGeometry_1.CustomGeometry);
GeometrySystem_1.addInitHandle(BoxGeometry_1.BoxGeometry, CustomGeometry_1.CustomGeometry);
var _initPointLight = null, _initDirectionLight = null;
if (WebGLDetectSystem_1.isWebgl1()) {
    LightSystem_1.addAddComponentHandle(AmbientLight_1.AmbientLight, DirectionLight_1.DirectionLight, PointLight_1.PointLight);
    LightSystem_1.addDisposeHandle(AmbientLight_1.AmbientLight, DirectionLight_1.DirectionLight, PointLight_1.PointLight);
    GeometrySystem_2.addDisposeHandle(BoxGeometry_1.BoxGeometry, CustomGeometry_1.CustomGeometry);
    _initPointLight = function (state) {
        return PointLightSystem_1.init(PointLightData_1.WebGL1PointLightData, state);
    };
    _initDirectionLight = function (state) {
        return DirectionLightSystem_1.init(DirectionLightData_1.WebGL1DirectionLightData, state);
    };
}
else {
    LightSystem_2.addAddComponentHandle(AmbientLight_1.AmbientLight, DirectionLight_1.DirectionLight, PointLight_1.PointLight);
    LightSystem_2.addDisposeHandle(AmbientLight_1.AmbientLight, DirectionLight_1.DirectionLight, PointLight_1.PointLight);
    GeometrySystem_3.addDisposeHandle(BoxGeometry_1.BoxGeometry, CustomGeometry_1.CustomGeometry);
    _initPointLight = function (state) {
        return PointLightSystem_1.init(PointLightData_2.WebGL2PointLightData, state);
    };
    _initDirectionLight = function (state) {
        return DirectionLightSystem_1.init(DirectionLightData_2.WebGL2DirectionLightData, state);
    };
}
//# sourceMappingURL=Director.js.map