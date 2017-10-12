"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeometryData_1 = require("../component/geometry/GeometryData");
var PerspectiveCameraData_1 = require("../component/camera/PerspectiveCameraData");
var CameraData_1 = require("../component/camera/CameraData");
var CameraControllerData_1 = require("../component/camera/CameraControllerData");
var ThreeDTransformData_1 = require("../component/transform/ThreeDTransformData");
var GameObjectData_1 = require("./entityObject/gameObject/GameObjectData");
var GlobalTempData_1 = require("../definition/GlobalTempData");
var SceneSystem_1 = require("./entityObject/scene/SceneSystem");
var ThreeDTransformSystem_1 = require("../component/transform/ThreeDTransformSystem");
var GeometrySystem_1 = require("../component/geometry/GeometrySystem");
var DataBufferConfig_1 = require("../config/DataBufferConfig");
var AllMaterialSystem_1 = require("../component/material/AllMaterialSystem");
var MaterialData_1 = require("../component/material/MaterialData");
var MeshRendererSystem_1 = require("../component/renderer/MeshRendererSystem");
var MeshRendererData_1 = require("../component/renderer/MeshRendererData");
var TagSystem_1 = require("../component/tag/TagSystem");
var TagData_1 = require("../component/tag/TagData");
var SceneData_1 = require("./entityObject/scene/SceneData");
var CameraControllerSystem_1 = require("../component/camera/CameraControllerSystem");
var GameObjectSystem_1 = require("./entityObject/gameObject/GameObjectSystem");
var RenderCommandBufferSystem_1 = require("../renderer/command_buffer/RenderCommandBufferSystem");
var ProgramSystem_1 = require("../renderer/shader/program/ProgramSystem");
var ArrayBufferSystem_1 = require("../renderer/buffer/ArrayBufferSystem");
var IndexBufferSystem_1 = require("../renderer/buffer/IndexBufferSystem");
var DebugConfig_1 = require("../config/DebugConfig");
var EScreenSize_1 = require("../renderer/device/EScreenSize");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var CompileConfig_1 = require("../config/CompileConfig");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var functionalUtils_1 = require("../utils/functionalUtils");
var contract_1 = require("../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var immutable_1 = require("immutable");
var initDeviceSystem_1 = require("../renderer/device/initDeviceSystem");
var WorkerDetectSystem_1 = require("../device/WorkerDetectSystem");
var IndexBufferData_1 = require("../renderer/buffer/IndexBufferData");
var ArrayBufferData_1 = require("../renderer/buffer/ArrayBufferData");
var BasicMaterialData_1 = require("../component/material/BasicMaterialData");
var LightMaterialData_1 = require("../component/material/LightMaterialData");
var AmbientLightData_1 = require("../component/light/AmbientLightData");
var InitConfigSystem_1 = require("../renderer/config/InitConfigSystem");
var WorkerInstanceSystem_1 = require("../worker/WorkerInstanceSystem");
var TextureCacheData_1 = require("../renderer/texture/TextureCacheData");
var TextureData_1 = require("../renderer/texture/TextureData");
var MapManagerData_1 = require("../renderer/texture/MapManagerData");
var SendDrawRenderCommandBufferDataSystem_1 = require("../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem");
var SendDrawRenderCommandBufferData_1 = require("../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferData");
var EWorkerOperateType_1 = require("../renderer/worker/both_file/EWorkerOperateType");
var WebGLDetectSystem_1 = require("../renderer/device/WebGLDetectSystem");
var PointLightData_1 = require("../renderer/webgl1/light/PointLightData");
var PointLightData_2 = require("../renderer/webgl2/light/PointLightData");
var LightSystem_1 = require("../component/webgl1/light/LightSystem");
var LightSystem_2 = require("../component/webgl2/light/LightSystem");
var GPUDetectData_1 = require("../renderer/device/GPUDetectData");
var GPUDetectSystem_1 = require("../renderer/webgl1/device/GPUDetectSystem");
var GPUDetectSystem_2 = require("../renderer/webgl2/device/GPUDetectSystem");
var BasicRenderCommandBufferData_1 = require("../renderer/command_buffer/BasicRenderCommandBufferData");
var LightRenderCommandBufferData_1 = require("../renderer/command_buffer/LightRenderCommandBufferData");
var BasicDrawRenderCommandBufferData_1 = require("../renderer/draw/basic/BasicDrawRenderCommandBufferData");
var LightDrawRenderCommandBufferData_1 = require("../renderer/draw/light/LightDrawRenderCommandBufferData");
var DrawRenderCommandBufferSystem_1 = require("../renderer/draw/DrawRenderCommandBufferSystem");
var GLSLSenderSystem_1 = require("../renderer/webgl2/shader/glslSender/GLSLSenderSystem");
var GLSLSenderData_1 = require("../renderer/webgl2/shader/glslSender/GLSLSenderData");
var GLSLSenderSystem_2 = require("../renderer/webgl1/shader/glslSender/GLSLSenderSystem");
var GLSLSenderData_2 = require("../renderer/webgl1/shader/glslSender/GLSLSenderData");
var ProgramData_1 = require("../renderer/webgl1/shader/program/ProgramData");
var ProgramData_2 = require("../renderer/webgl2/shader/program/ProgramData");
var VaoSystem_1 = require("../renderer/webgl2/vao/VaoSystem");
var VaoData_1 = require("../renderer/vao/VaoData");
var LocationData_1 = require("../renderer/webgl1/shader/location/LocationData");
var LocationData_2 = require("../renderer/webgl2/shader/location/LocationData");
var LocationSystem_1 = require("../renderer/webgl1/shader/location/LocationSystem");
var LocationSystem_2 = require("../renderer/webgl2/shader/location/LocationSystem");
var ShaderSystem_1 = require("../renderer/webgl1/shader/ShaderSystem");
var ShaderSystem_2 = require("../renderer/webgl2/shader/ShaderSystem");
var ShaderData_1 = require("../renderer/webgl1/shader/ShaderData");
var ShaderData_2 = require("../renderer/webgl2/shader/ShaderData");
var DeferLightPassSystem_1 = require("../renderer/webgl2/render/light/defer/light/DeferLightPassSystem");
var DirectionLightData_1 = require("../renderer/webgl2/light/DirectionLightData");
var DirectionLightData_2 = require("../renderer/webgl1/light/DirectionLightData");
var DeferDirectionLightPassData_1 = require("../renderer/webgl2/render/light/defer/light/DeferDirectionLightPassData");
var DeferPointLightPassData_1 = require("../renderer/webgl2/render/light/defer/light/DeferPointLightPassData");
var DeferAmbientLightPassData_1 = require("../renderer/webgl2/render/light/defer/light/DeferAmbientLightPassData");
var DeviceManagerSystem_1 = require("../renderer/device/DeviceManagerSystem");
var DeviceManagerData_1 = require("../renderer/device/DeviceManagerData");
var AssetDatabaseSystem_1 = require("../asset/AssetDatabaseSystem");
var AssetDatabaseData_1 = require("../asset/AssetDatabaseData");
exports.setConfig = function (closeContractTest, InitConfigData, WorkerDetectData, WorkerInstanceData, WebGLDetectData, _a) {
    var _b = _a.canvasId, canvasId = _b === void 0 ? "" : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig_1.DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize_1.EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
        options: {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        }
    } : _f, _g = _a.workerConfig, workerConfig = _g === void 0 ? {
        renderWorkerFileDir: "/Wonder.js/dist/worker/"
    } : _g;
    return IO_1.IO.of(function () {
        var _isTest = false;
        if (CompileConfig_1.CompileConfig.closeContractTest) {
            _isTest = false;
            InitConfigSystem_1.setLibIsTest(false).run();
        }
        else {
            _isTest = isTest;
            InitConfigSystem_1.setLibIsTest(isTest).run();
        }
        WorkerDetectSystem_1.setWorkerConfig(workerConfig, WorkerDetectData).run();
        WorkerInstanceSystem_1.initWorkInstances(WorkerInstanceData);
        InitConfigSystem_1.setIsTest(_isTest, InitConfigData, WorkerInstanceData).run();
        exports.passDataToRenderWorker(WorkerInstanceData, WebGLDetectData).run();
        return immutable_1.fromJS({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasId: canvasId,
                contextConfig: {
                    options: ExtendUtils_1.ExtendUtils.extend({
                        alpha: true,
                        depth: true,
                        stencil: false,
                        antialias: true,
                        premultipliedAlpha: true,
                        preserveDrawingBuffer: false
                    }, contextConfig.options)
                },
                useDevicePixelRatio: useDevicePixelRatio
            }
        });
    });
};
exports.initData = null;
exports.passDataToRenderWorker = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initData = function () {
        _initData();
    };
    exports.passDataToRenderWorker = function (WorkerInstanceData, WebGLDetectData) {
        return IO_1.IO.of(function () {
            var renderWorker = WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData);
            renderWorker.postMessage({
                operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_DATA,
                webglVersion: WebGLDetectSystem_1.getVersion(WebGLDetectData)
            });
        });
    };
}
else {
    if (WebGLDetectSystem_1.isWebgl1()) {
        exports.initData = function () {
            _initData();
            ShaderSystem_1.initData(ShaderData_1.WebGL1ShaderData);
            ProgramSystem_1.initData(ProgramData_1.WebGL1ProgramData);
            LocationSystem_1.initData(LocationData_1.WebGL1LocationData);
            ArrayBufferSystem_1.initData(ArrayBufferData_1.ArrayBufferData);
            IndexBufferSystem_1.initData(IndexBufferData_1.IndexBufferData);
            DrawRenderCommandBufferSystem_1.initData(BasicDrawRenderCommandBufferData_1.BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData_1.LightDrawRenderCommandBufferData);
            GLSLSenderSystem_2.initData(GLSLSenderData_2.WebGL1GLSLSenderData);
        };
    }
    else {
        exports.initData = function () {
            _initData();
            ShaderSystem_2.initData(ShaderData_2.WebGL2ShaderData);
            ProgramSystem_1.initData(ProgramData_2.WebGL2ProgramData);
            LocationSystem_2.initData(LocationData_2.WebGL2LocationData);
            DrawRenderCommandBufferSystem_1.initData(BasicDrawRenderCommandBufferData_1.BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData_1.LightDrawRenderCommandBufferData);
            GLSLSenderSystem_1.initData(GLSLSenderData_1.WebGL2GLSLSenderData);
        };
    }
    exports.passDataToRenderWorker = function (WorkerInstanceData, WebGLDetectData) {
        return IO_1.IO.of(function () {
        });
    };
}
exports.init = null;
var _initData = null;
if (WebGLDetectSystem_1.isWebgl1()) {
    _initData = function () {
        _initBothData();
        LightSystem_1.initData(AmbientLightData_1.AmbientLightData, DirectionLightData_2.WebGL1DirectionLightData, PointLightData_1.WebGL1PointLightData);
    };
    exports.init = contract_1.requireCheckFunc(function (gameState, configState, DomQuery) {
        contract_1.it("should set config before", function () {
            wonder_expect_js_1.expect(configState.get("useDevicePixelRatio")).exist;
        });
    }, function (gameState, configState, DomQuery) {
        return functionalUtils_1.compose(functionalUtils_1.chain(initDeviceSystem_1.initDevice(configState.get("contextConfig"), gameState, configState, GPUDetectSystem_1.detect, DomQuery)), initDeviceSystem_1.createCanvas(DomQuery))(configState.get("canvasId"));
    });
}
else {
    _initData = function () {
        _initBothData();
        LightSystem_2.initData(AmbientLightData_1.AmbientLightData, DirectionLightData_1.WebGL2DirectionLightData, PointLightData_2.WebGL2PointLightData);
        DeferLightPassSystem_1.initData(DeferAmbientLightPassData_1.DeferAmbientLightPassData, DeferDirectionLightPassData_1.DeferDirectionLightPassData, DeferPointLightPassData_1.DeferPointLightPassData);
    };
    exports.init = contract_1.requireCheckFunc(function (gameState, configState, DomQuery) {
        contract_1.it("should set config before", function () {
            wonder_expect_js_1.expect(configState.get("useDevicePixelRatio")).exist;
        });
    }, function (gameState, configState, DomQuery) {
        return functionalUtils_1.compose(functionalUtils_1.chain(initDeviceSystem_1.initDevice(configState.get("contextConfig"), gameState, configState, GPUDetectSystem_2.detect, DomQuery)), initDeviceSystem_1.createCanvas(DomQuery))(configState.get("canvasId"));
    });
}
var _initBothData = function () {
    GeometrySystem_1.initData(DataBufferConfig_1.DataBufferConfig, GeometryData_1.GeometryData, GPUDetectData_1.GPUDetectData);
    AllMaterialSystem_1.initData(TextureCacheData_1.TextureCacheData, TextureData_1.TextureData, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData);
    MeshRendererSystem_1.initData(MeshRendererData_1.MeshRendererData);
    TagSystem_1.initData(TagData_1.TagData);
    ThreeDTransformSystem_1.initData(GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
    SceneSystem_1.initData(SceneData_1.SceneData);
    CameraControllerSystem_1.initData(CameraControllerData_1.CameraControllerData, PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData);
    GameObjectSystem_1.initData(GameObjectData_1.GameObjectData);
    RenderCommandBufferSystem_1.initData(DataBufferConfig_1.DataBufferConfig, BasicRenderCommandBufferData_1.BasicRenderCommandBufferData, LightRenderCommandBufferData_1.LightRenderCommandBufferData);
    SendDrawRenderCommandBufferDataSystem_1.initData(SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData);
    VaoSystem_1.initData(VaoData_1.VaoData);
    DeviceManagerSystem_1.initData(DeviceManagerData_1.DeviceManagerData);
    AssetDatabaseSystem_1.initData(AssetDatabaseData_1.AssetDatabaseData);
};
//# sourceMappingURL=MainSystem.js.map