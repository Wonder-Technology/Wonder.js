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
var SendDrawRenderCommandBufferData_1 = require("../worker/logic_file/draw/SendDrawRenderCommandBufferData");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var DrawRenderCommandBufferSystem_1 = require("../draw/DrawRenderCommandBufferSystem");
var DrawRenderCommandBufferData_1 = require("../draw/DrawRenderCommandBufferData");
var ProgramData_1 = require("../shader/program/ProgramData");
var LocationData_1 = require("../shader/location/LocationData");
var GLSLSenderData_1 = require("../shader/glslSender/GLSLSenderData");
var drawRenderCommandBufferUtils_1 = require("../utils/draw/drawRenderCommandBufferUtils");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var WorkerInstanceSystem_1 = require("../../worker/WorkerInstanceSystem");
var WorkerInstanceData_1 = require("../../worker/WorkerInstanceData");
var BasicMaterialData_1 = require("../../component/material/BasicMaterialData");
var LightMaterialData_1 = require("../../component/material/LightMaterialData");
var GlobalTempData_1 = require("../../definition/GlobalTempData");
var AmbientLightData_1 = require("../../component/light/AmbientLightData");
var DirectionLightData_1 = require("../../component/light/DirectionLightData");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var bufferUtils_1 = require("../utils/material/bufferUtils");
var stateUtils_1 = require("../utils/state/stateUtils");
var PointLightData_1 = require("../../component/light/PointLightData");
var bufferUtils_2 = require("../utils/light/bufferUtils");
var TextureData_1 = require("../texture/TextureData");
var MapManagerData_1 = require("../texture/MapManagerData");
var TextureCacheData_1 = require("../texture/TextureCacheData");
var TextureSystem_1 = require("../texture/TextureSystem");
var LightMaterialSystem_1 = require("../../component/material/LightMaterialSystem");
exports.init = null;
exports.render = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.init = function (state) {
        var renderWorker = WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData_1.WorkerInstanceData);
        renderWorker.postMessage({
            operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
            materialData: {
                buffer: MaterialData_1.MaterialData.buffer,
                basicMaterialData: {
                    startIndex: bufferUtils_1.getBasicMaterialBufferStartIndex(),
                    index: BasicMaterialData_1.BasicMaterialData.index
                },
                lightMaterialData: {
                    startIndex: bufferUtils_1.getLightMaterialBufferStartIndex(),
                    index: LightMaterialData_1.LightMaterialData.index,
                    diffuseMapIndex: LightMaterialSystem_1.getDiffuseMapIndex(LightMaterialData_1.LightMaterialData),
                    specularMapIndex: LightMaterialSystem_1.getSpecularMapIndex(LightMaterialData_1.LightMaterialData)
                }
            },
            geometryData: {
                buffer: GeometryData_1.GeometryData.buffer,
                indexType: GeometryData_1.GeometryData.indexType,
                indexTypeSize: GeometryData_1.GeometryData.indexTypeSize,
                verticesInfoList: GeometryData_1.GeometryData.verticesInfoList,
                normalsInfoList: GeometryData_1.GeometryData.normalsInfoList,
                texCoordsInfoList: GeometryData_1.GeometryData.texCoordsInfoList,
                indicesInfoList: GeometryData_1.GeometryData.indicesInfoList
            },
            lightData: {
                ambientLightData: {
                    buffer: AmbientLightData_1.AmbientLightData.buffer,
                    bufferCount: bufferUtils_2.getAmbientLightBufferCount(),
                    lightCount: AmbientLightData_1.AmbientLightData.count
                },
                directionLightData: {
                    buffer: DirectionLightData_1.DirectionLightData.buffer,
                    bufferCount: bufferUtils_2.getDirectionLightBufferCount(),
                    lightCount: DirectionLightData_1.DirectionLightData.count,
                    directionLightGLSLDataStructureMemberNameArr: DirectionLightData_1.DirectionLightData.lightGLSLDataStructureMemberNameArr
                },
                pointLightData: {
                    buffer: PointLightData_1.PointLightData.buffer,
                    bufferCount: bufferUtils_2.getPointLightBufferCount(),
                    lightCount: PointLightData_1.PointLightData.count,
                    pointLightGLSLDataStructureMemberNameArr: PointLightData_1.PointLightData.lightGLSLDataStructureMemberNameArr
                }
            },
            textureData: {
                mapManagerBuffer: MapManagerData_1.MapManagerData.buffer,
                textureBuffer: TextureData_1.TextureData.buffer,
                index: TextureData_1.TextureData.index,
                imageSrcIndexArr: TextureSystem_1.convertSourceMapToSrcIndexArr(TextureData_1.TextureData),
                uniformSamplerNameMap: TextureSystem_1.getUniformSamplerNameMap(TextureData_1.TextureData)
            }
        });
        renderWorker.onmessage = function (e) {
            var data = e.data, state = data.state;
            SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData.state = state;
        };
        return state;
    };
    exports.render = function (state) {
        return functionalUtils_1.compose(SendDrawRenderCommandBufferDataSystem_1.sendDrawData(WorkerInstanceData_1.WorkerInstanceData, TextureData_1.TextureData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData, AmbientLightData_1.AmbientLightData, DirectionLightData_1.DirectionLightData), RenderCommandBufferSystem_1.createRenderCommandBufferData(state, GlobalTempData_1.GlobalTempData, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData, RenderCommandBufferData_1.RenderCommandBufferData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
    };
}
else {
    exports.init = function (state) {
        stateUtils_1.initState(state, DeviceManagerSystem_1.getGL, DeviceManagerSystem_1.setSide, DeviceManagerData_1.DeviceManagerData);
        MaterialSystem_1.init(state, DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state), TextureData_1.TextureData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData);
    };
    exports.render = function (state) {
        return functionalUtils_1.compose(DrawRenderCommandBufferSystem_1.draw(null, DataBufferConfig_1.DataBufferConfig, drawRenderCommandBufferUtils_1.buildDrawDataMap(DeviceManagerData_1.DeviceManagerData, TextureData_1.TextureData, TextureCacheData_1.TextureCacheData, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData, AmbientLightData_1.AmbientLightData, DirectionLightData_1.DirectionLightData, PointLightData_1.PointLightData, ProgramData_1.ProgramData, LocationData_1.LocationData, GLSLSenderData_1.GLSLSenderData, GeometryData_1.GeometryData, ArrayBufferData_1.ArrayBufferData, IndexBufferData_1.IndexBufferData, DrawRenderCommandBufferData_1.DrawRenderCommandBufferData)), DrawRenderCommandBufferSystem_1.clear(null, render_config_1.render_config, DeviceManagerData_1.DeviceManagerData), RenderCommandBufferSystem_1.createRenderCommandBufferData(state, GlobalTempData_1.GlobalTempData, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData, RenderCommandBufferData_1.RenderCommandBufferData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
    };
}
//# sourceMappingURL=WebGLRenderSystem.js.map