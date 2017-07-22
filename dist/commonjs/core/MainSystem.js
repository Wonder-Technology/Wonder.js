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
var ShaderSystem_1 = require("../renderer/shader/ShaderSystem");
var ShaderData_1 = require("../renderer/shader/ShaderData");
var DataBufferConfig_1 = require("../config/DataBufferConfig");
var MaterialSystem_1 = require("../component/material/MaterialSystem");
var MaterialData_1 = require("../component/material/MaterialData");
var MeshRendererSystem_1 = require("../component/renderer/MeshRendererSystem");
var MeshRendererData_1 = require("../component/renderer/MeshRendererData");
var TagSystem_1 = require("../component/tag/TagSystem");
var TagData_1 = require("../component/tag/TagData");
var SceneData_1 = require("./entityObject/scene/SceneData");
var CameraControllerSystem_1 = require("../component/camera/CameraControllerSystem");
var GameObjectSystem_1 = require("./entityObject/gameObject/GameObjectSystem");
var RenderCommandBufferSystem_1 = require("../renderer/command_buffer/RenderCommandBufferSystem");
var RenderCommandBufferData_1 = require("../renderer/command_buffer/RenderCommandBufferData");
var ProgramSystem_1 = require("../renderer/shader/program/ProgramSystem");
var LocationSystem_1 = require("../renderer/shader/location/LocationSystem");
var GLSLSenderSystem_1 = require("../renderer/shader/glslSender/GLSLSenderSystem");
var ArrayBufferSystem_1 = require("../renderer/buffer/ArrayBufferSystem");
var IndexBufferSystem_1 = require("../renderer/buffer/IndexBufferSystem");
var DrawRenderCommandBufferSystem_1 = require("../renderer/draw/DrawRenderCommandBufferSystem");
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
var DrawRenderCommandBufferData_1 = require("../renderer/draw/DrawRenderCommandBufferData");
var IndexBufferData_1 = require("../renderer/buffer/IndexBufferData");
var ArrayBufferData_1 = require("../renderer/buffer/ArrayBufferData");
var GLSLSenderData_1 = require("../renderer/shader/glslSender/GLSLSenderData");
var LocationData_1 = require("../renderer/shader/location/LocationData");
var ProgramData_1 = require("../renderer/shader/program/ProgramData");
var BasicMaterialData_1 = require("../component/material/BasicMaterialData");
var LightMaterialData_1 = require("../component/material/LightMaterialData");
var LightSystem_1 = require("../component/light/LightSystem");
var AmbientLightData_1 = require("../component/light/AmbientLightData");
var DirectionLightData_1 = require("../component/light/DirectionLightData");
var PointLightData_1 = require("../component/light/PointLightData");
var InitConfigSystem_1 = require("../renderer/config/InitConfigSystem");
var WorkerInstanceSystem_1 = require("../worker/WorkerInstanceSystem");
var TextureCacheData_1 = require("../renderer/texture/TextureCacheData");
var TextureData_1 = require("../renderer/texture/TextureData");
var MapManagerData_1 = require("../renderer/texture/MapManagerData");
var SendDrawRenderCommandBufferDataSystem_1 = require("../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem");
var SendDrawRenderCommandBufferData_1 = require("../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferData");
exports.setConfig = function (closeContractTest, InitConfigData, WorkerDetectData, WorkerInstanceData, _a) {
    var _b = _a.canvasID, canvasID = _b === void 0 ? "" : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig_1.DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize_1.EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
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
        return immutable_1.fromJS({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasID: canvasID,
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
exports.init = contract_1.requireCheckFunc(function (gameState, configState, DomQuery) {
    contract_1.it("should set config before", function () {
        wonder_expect_js_1.expect(configState.get("useDevicePixelRatio")).exist;
    });
}, function (gameState, configState, DomQuery) {
    return functionalUtils_1.compose(functionalUtils_1.chain(initDeviceSystem_1.initDevice(configState.get("contextConfig"), gameState, configState)), initDeviceSystem_1.createCanvas(DomQuery))(configState.get("canvasID"));
});
exports.initData = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initData = function () {
        _initData();
    };
}
else {
    exports.initData = function () {
        _initData();
        ProgramSystem_1.initData(ProgramData_1.ProgramData);
        LocationSystem_1.initData(LocationData_1.LocationData);
        GLSLSenderSystem_1.initData(GLSLSenderData_1.GLSLSenderData);
        ArrayBufferSystem_1.initData(ArrayBufferData_1.ArrayBufferData);
        IndexBufferSystem_1.initData(IndexBufferData_1.IndexBufferData);
        DrawRenderCommandBufferSystem_1.initData(DrawRenderCommandBufferData_1.DrawRenderCommandBufferData);
    };
}
var _initData = function () {
    ShaderSystem_1.initData(ShaderData_1.ShaderData);
    GeometrySystem_1.initData(DataBufferConfig_1.DataBufferConfig, GeometryData_1.GeometryData);
    MaterialSystem_1.initData(TextureCacheData_1.TextureCacheData, TextureData_1.TextureData, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData);
    MeshRendererSystem_1.initData(MeshRendererData_1.MeshRendererData);
    TagSystem_1.initData(TagData_1.TagData);
    ThreeDTransformSystem_1.initData(GlobalTempData_1.GlobalTempData, ThreeDTransformData_1.ThreeDTransformData);
    SceneSystem_1.initData(SceneData_1.SceneData);
    CameraControllerSystem_1.initData(CameraControllerData_1.CameraControllerData, PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData);
    GameObjectSystem_1.initData(GameObjectData_1.GameObjectData);
    RenderCommandBufferSystem_1.initData(DataBufferConfig_1.DataBufferConfig, RenderCommandBufferData_1.RenderCommandBufferData);
    LightSystem_1.initData(AmbientLightData_1.AmbientLightData, DirectionLightData_1.DirectionLightData, PointLightData_1.PointLightData);
    SendDrawRenderCommandBufferDataSystem_1.initData(SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData);
};
//# sourceMappingURL=MainSystem.js.map