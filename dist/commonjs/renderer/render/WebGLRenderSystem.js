"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MeshRendererSystem_1 = require("../../component/renderer/MeshRendererSystem");
var MeshRendererData_1 = require("../../component/renderer/MeshRendererData");
var functionalUtils_1 = require("../../utils/functionalUtils");
var RenderCommandBufferSystem_1 = require("../command_buffer/RenderCommandBufferSystem");
var SendDrawRenderCommandBufferDataSystem_1 = require("../worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
var MaterialData_1 = require("../../component/material/MaterialData");
var GameObjectData_1 = require("../../core/entityObject/gameObject/GameObjectData");
var GeometryData_1 = require("../../component/geometry/GeometryData");
var ArrayBufferData_1 = require("../buffer/ArrayBufferData");
var IndexBufferData_1 = require("../buffer/IndexBufferData");
var render_config_1 = require("../data/render_config");
var DeviceManagerData_1 = require("../device/DeviceManagerData");
var ThreeDTransformData_1 = require("../../component/transform/ThreeDTransformData");
var SceneData_1 = require("../../core/entityObject/scene/SceneData");
var CameraControllerData_1 = require("../../component/camera/CameraControllerData");
var CameraData_1 = require("../../component/camera/CameraData");
var EWorkerOperateType_1 = require("../worker/both_file/EWorkerOperateType");
var RenderCommandBufferData_1 = require("../command_buffer/RenderCommandBufferData");
var ERenderWorkerState_1 = require("../worker/both_file/ERenderWorkerState");
var SendDrawRenderCommandBufferData_1 = require("../worker/logic_file/draw/SendDrawRenderCommandBufferData");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var DrawRenderCommandBufferSystem_1 = require("../draw/DrawRenderCommandBufferSystem");
var DrawRenderCommandBufferData_1 = require("../draw/DrawRenderCommandBufferData");
var ProgramData_1 = require("../shader/program/ProgramData");
var LocationData_1 = require("../shader/location/LocationData");
var GLSLSenderData_1 = require("../shader/glslSender/GLSLSenderData");
var drawRenderCommandBufferUtils_1 = require("../utils/draw/drawRenderCommandBufferUtils");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var WorkerInstanceSystem_1 = require("../worker/logic_file/worker_instance/WorkerInstanceSystem");
var WorkerInstanceData_1 = require("../worker/logic_file/worker_instance/WorkerInstanceData");
exports.init = null;
exports.render = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.init = function (state) {
        var renderWorker = WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData_1.WorkerInstanceData);
        renderWorker.postMessage({
            operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_MATERIAL_GEOMETRY,
            materialData: {
                buffer: MaterialData_1.MaterialData.buffer,
                materialCount: MaterialData_1.MaterialData.count,
                materialClassNameTable: MaterialData_1.MaterialData.materialClassNameTable,
                shaderIndexTable: MaterialData_1.MaterialData.shaderIndexTable
            },
            geometryData: {
                buffer: GeometryData_1.GeometryData.buffer,
                indexType: GeometryData_1.GeometryData.indexType,
                indexTypeSize: GeometryData_1.GeometryData.indexTypeSize,
                verticesInfoList: GeometryData_1.GeometryData.verticesInfoList,
                indicesInfoList: GeometryData_1.GeometryData.indicesInfoList
            }
        });
        renderWorker.onmessage = function (e) {
            var data = e.data, state = data.state;
            SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData.state = state;
        };
        return state;
    };
    exports.render = function (state) {
        return functionalUtils_1.compose(SendDrawRenderCommandBufferDataSystem_1.sendDrawData(WorkerInstanceData_1.WorkerInstanceData, MaterialData_1.MaterialData, GeometryData_1.GeometryData), RenderCommandBufferSystem_1.createRenderCommandBufferData(state, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData, RenderCommandBufferData_1.RenderCommandBufferData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
    };
    var _initData = function (SendDrawRenderCommandBufferData) {
        SendDrawRenderCommandBufferData.state = ERenderWorkerState_1.ERenderWorkerState.DEFAULT;
    };
    _initData(SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData);
}
else {
    exports.init = function (state) {
        MaterialSystem_1.init(state, MaterialData_1.MaterialData);
    };
    exports.render = function (state) {
        return functionalUtils_1.compose(DrawRenderCommandBufferSystem_1.draw(null, DataBufferConfig_1.DataBufferConfig, drawRenderCommandBufferUtils_1.buildDrawDataMap(DeviceManagerData_1.DeviceManagerData, MaterialData_1.MaterialData, ProgramData_1.ProgramData, LocationData_1.LocationData, GLSLSenderData_1.GLSLSenderData, GeometryData_1.GeometryData, ArrayBufferData_1.ArrayBufferData, IndexBufferData_1.IndexBufferData, DrawRenderCommandBufferData_1.DrawRenderCommandBufferData)), DrawRenderCommandBufferSystem_1.clear(null, render_config_1.render_config, DeviceManagerData_1.DeviceManagerData), RenderCommandBufferSystem_1.createRenderCommandBufferData(state, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData, RenderCommandBufferData_1.RenderCommandBufferData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
    };
}
//# sourceMappingURL=WebGLRenderSystem.js.map