"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MeshRendererSystem_1 = require("../../component/renderer/MeshRendererSystem");
var MeshRendererData_1 = require("../../component/renderer/MeshRendererData");
var functionalUtils_1 = require("../../utils/functionalUtils");
var RenderCommandBufferSystem_1 = require("../command_buffer/RenderCommandBufferSystem");
var SendDrawRenderCommandBufferDataSystem_1 = require("../worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem");
var MaterialData_1 = require("../../component/material/MaterialData");
var GameObjectData_1 = require("../../core/entityObject/gameObject/GameObjectData");
var GeometryData_1 = require("../../component/geometry/GeometryData");
var ArrayBufferData_1 = require("../buffer/ArrayBufferData");
var IndexBufferData_1 = require("../buffer/IndexBufferData");
var render_config_1 = require("../worker/both_file/data/render_config");
var DeviceManagerData_1 = require("../device/DeviceManagerData");
var ThreeDTransformData_1 = require("../../component/transform/ThreeDTransformData");
var SceneData_1 = require("../../core/entityObject/scene/SceneData");
var CameraControllerData_1 = require("../../component/camera/CameraControllerData");
var CameraData_1 = require("../../component/camera/CameraData");
var EWorkerOperateType_1 = require("../worker/both_file/EWorkerOperateType");
var SendDrawRenderCommandBufferData_1 = require("../worker/logic_file/draw/SendDrawRenderCommandBufferData");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var WorkerInstanceSystem_1 = require("../../worker/WorkerInstanceSystem");
var WorkerInstanceData_1 = require("../../worker/WorkerInstanceData");
var BasicMaterialData_1 = require("../../component/material/BasicMaterialData");
var LightMaterialData_1 = require("../../component/material/LightMaterialData");
var GlobalTempData_1 = require("../../definition/GlobalTempData");
var AmbientLightData_1 = require("../../component/light/AmbientLightData");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var stateUtils_1 = require("../utils/worker/render_file/state/stateUtils");
var bufferUtils_1 = require("../utils/light/bufferUtils");
var TextureData_1 = require("../texture/TextureData");
var MapManagerData_1 = require("../texture/MapManagerData");
var TextureCacheData_1 = require("../texture/TextureCacheData");
var TextureSystem_1 = require("../texture/TextureSystem");
var GBufferData_1 = require("../webgl2/render/light/defer/gbuffer/GBufferData");
var materialUtils_1 = require("../utils/worker/render_file/material/materialUtils");
var ShaderSystem_1 = require("../webgl2/shader/ShaderSystem");
var shaderLib_generator_1 = require("../worker/webgl1/both_file/data/shaderLib_generator");
var shaderLib_generator_2 = require("../worker/webgl2/both_file/data/shaderLib_generator");
var material_config_1 = require("../worker/webgl1/both_file/data/material_config");
var material_config_2 = require("../worker/webgl2/both_file/data/material_config");
var ShaderSystem_2 = require("../webgl1/shader/ShaderSystem");
var WebGLDetectSystem_1 = require("../device/WebGLDetectSystem");
var deferDrawRenderCommandBufferUtils_1 = require("../webgl2/utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils");
var PointLightData_1 = require("../webgl1/light/PointLightData");
var PointLightData_2 = require("../webgl2/light/PointLightData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var MaterialSystem_1 = require("../../component/webgl2/material/MaterialSystem");
var MaterialSystem_2 = require("../../component/webgl1/material/MaterialSystem");
var GPUDetectData_1 = require("../device/GPUDetectData");
var BasicRenderCommandBufferData_1 = require("../command_buffer/BasicRenderCommandBufferData");
var LightRenderCommandBufferData_1 = require("../command_buffer/LightRenderCommandBufferData");
var BasicDrawRenderCommandBufferData_1 = require("../draw/basic/BasicDrawRenderCommandBufferData");
var LightDrawRenderCommandBufferData_1 = require("../draw/light/LightDrawRenderCommandBufferData");
var DrawRenderCommandBufferSystem_1 = require("../draw/DrawRenderCommandBufferSystem");
var RenderCommandBufferSystem_2 = require("../worker/logic_file/command_buffer/RenderCommandBufferSystem");
var RenderSystem_1 = require("../webgl2/render/RenderSystem");
var RenderSystem_2 = require("../webgl1/render/RenderSystem");
var bufferUtils_2 = require("../utils/material/bufferUtils");
var bufferUtils_3 = require("../utils/material/bufferUtils");
var GLSLSenderData_1 = require("../webgl2/shader/glslSender/GLSLSenderData");
var GLSLSenderData_2 = require("../webgl1/shader/glslSender/GLSLSenderData");
var ProgramData_1 = require("../webgl1/shader/program/ProgramData");
var ProgramData_2 = require("../webgl2/shader/program/ProgramData");
var renderUtils_1 = require("../webgl2/utils/worker/render_file/render/renderUtils");
var VaoData_1 = require("../vao/VaoData");
var renderUtils_2 = require("../webgl1/utils/worker/render_file/render/renderUtils");
var LocationData_1 = require("../webgl1/shader/location/LocationData");
var LocationData_2 = require("../webgl2/shader/location/LocationData");
var ShaderData_1 = require("../webgl1/shader/ShaderData");
var ShaderData_2 = require("../webgl2/shader/ShaderData");
var DirectionLightData_1 = require("../webgl1/light/DirectionLightData");
var DirectionLightData_2 = require("../webgl2/light/DirectionLightData");
var DeferDirectionLightPassData_1 = require("../webgl2/render/light/defer/light/DeferDirectionLightPassData");
var DeferPointLightPassData_1 = require("../webgl2/render/light/defer/light/DeferPointLightPassData");
var DeferAmbientLightPassData_1 = require("../webgl2/render/light/defer/light/DeferAmbientLightPassData");
var _checkLightCount = contract_1.requireCheckFunc(function (ambientLightCount, directionLightCount, pointLightCount, AmbientLightData, DirectionLightData, PointLightData) {
    contract_1.it("count should <= max count", function () {
        wonder_expect_js_1.expect(AmbientLightData.count).lte(ambientLightCount);
        wonder_expect_js_1.expect(DirectionLightData.count).lte(directionLightCount);
        wonder_expect_js_1.expect(PointLightData.count).lte(pointLightCount);
    });
}, function () {
});
exports.init = null;
exports.render = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    if (WebGLDetectSystem_1.isWebgl1()) {
        exports.init = function (state) {
            _checkLightCount(DataBufferConfig_1.DataBufferConfig.frontAmbientLightCount, DataBufferConfig_1.DataBufferConfig.frontDirectionLightCount, DataBufferConfig_1.DataBufferConfig.frontDirectionLightCount, AmbientLightData_1.AmbientLightData, DirectionLightData_1.WebGL1DirectionLightData, PointLightData_1.WebGL1PointLightData);
            return _init_1(state, {
                ambientLightData: {
                    buffer: AmbientLightData_1.AmbientLightData.buffer,
                    bufferCount: bufferUtils_1.getAmbientLightBufferCount(),
                    lightCount: AmbientLightData_1.AmbientLightData.count
                },
                directionLightData: {
                    buffer: DirectionLightData_1.WebGL1DirectionLightData.buffer,
                    bufferCount: bufferUtils_1.getDirectionLightBufferCount(),
                    lightCount: DirectionLightData_1.WebGL1DirectionLightData.count,
                    directionLightGLSLDataStructureMemberNameArr: DirectionLightData_1.WebGL1DirectionLightData.lightGLSLDataStructureMemberNameArr
                },
                pointLightData: {
                    buffer: PointLightData_1.WebGL1PointLightData.buffer,
                    bufferCount: bufferUtils_1.getPointLightBufferCount(),
                    lightCount: PointLightData_1.WebGL1PointLightData.count,
                    pointLightGLSLDataStructureMemberNameArr: PointLightData_1.WebGL1PointLightData.lightGLSLDataStructureMemberNameArr
                }
            }, null);
        };
        exports.render = function (state) {
            _render_1(state, DirectionLightData_1.WebGL1DirectionLightData, PointLightData_1.WebGL1PointLightData);
        };
    }
    else {
        exports.init = function (state) {
            _checkLightCount(DataBufferConfig_1.DataBufferConfig.deferAmbientLightCount, DataBufferConfig_1.DataBufferConfig.deferDirectionLightCount, DataBufferConfig_1.DataBufferConfig.deferPointLightCount, AmbientLightData_1.AmbientLightData, DirectionLightData_2.WebGL2DirectionLightData, PointLightData_2.WebGL2PointLightData);
            return _init_1(state, {
                directionLightData: {
                    buffer: DirectionLightData_2.WebGL2DirectionLightData.buffer,
                    bufferCount: bufferUtils_1.getDirectionLightBufferCount(),
                    lightCount: DirectionLightData_2.WebGL2DirectionLightData.count
                },
                pointLightData: {
                    buffer: PointLightData_2.WebGL2PointLightData.buffer,
                    bufferCount: bufferUtils_1.getPointLightBufferCount(),
                    lightCount: PointLightData_2.WebGL2PointLightData.count
                },
            }, {
                deferShading: {
                    isInit: true
                }
            });
        };
        exports.render = function (state) {
            _render_1(state, DirectionLightData_2.WebGL2DirectionLightData, PointLightData_2.WebGL2PointLightData);
        };
    }
    var _init_1 = function (state, lightData, renderData) {
        var renderWorker = WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData_1.WorkerInstanceData);
        renderWorker.postMessage({
            operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
            materialData: {
                buffer: MaterialData_1.MaterialData.buffer,
                basicMaterialData: {
                    startIndex: bufferUtils_3.getBasicMaterialBufferStartIndex(),
                    index: BasicMaterialData_1.BasicMaterialData.index
                },
                lightMaterialData: {
                    startIndex: bufferUtils_2.getLightMaterialBufferStartIndex(),
                    index: LightMaterialData_1.LightMaterialData.index
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
            lightData: lightData,
            textureData: {
                mapManagerBuffer: MapManagerData_1.MapManagerData.buffer,
                textureBuffer: TextureData_1.TextureData.buffer,
                index: TextureData_1.TextureData.index,
                imageSrcIndexArr: TextureSystem_1.convertSourceMapToSrcIndexArr(TextureData_1.TextureData),
                uniformSamplerNameMap: TextureSystem_1.getUniformSamplerNameMap(TextureData_1.TextureData)
            },
            renderData: renderData
        });
        renderWorker.onmessage = function (e) {
            var data = e.data, state = data.state;
            SendDrawRenderCommandBufferData_1.SendDrawRenderCommandBufferData.state = state;
        };
        return state;
    };
    var _render_1 = function (state, DirectionLightData, PointLightData) {
        return functionalUtils_1.compose(SendDrawRenderCommandBufferDataSystem_1.sendDrawData(WorkerInstanceData_1.WorkerInstanceData, TextureData_1.TextureData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData, AmbientLightData_1.AmbientLightData, DirectionLightData, PointLightData), RenderCommandBufferSystem_2.createRenderCommandBufferData(state, GlobalTempData_1.GlobalTempData, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData, BasicRenderCommandBufferData_1.BasicRenderCommandBufferData, LightRenderCommandBufferData_1.LightRenderCommandBufferData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
    };
}
else {
    if (WebGLDetectSystem_1.isWebgl1()) {
        exports.init = function (state) {
            var gl = DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state);
            stateUtils_1.initState(state, DeviceManagerSystem_1.getGL, DeviceManagerSystem_1.setSide, DeviceManagerData_1.DeviceManagerData);
            MaterialSystem_2.init(state, gl, material_config_1.webgl1_material_config, shaderLib_generator_1.webgl1_shaderLib_generator, ShaderSystem_2.initNoMaterialShader, TextureData_1.TextureData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData, GPUDetectData_1.GPUDetectData, GLSLSenderData_2.WebGL1GLSLSenderData, ProgramData_1.WebGL1ProgramData, VaoData_1.VaoData, LocationData_1.WebGL1LocationData, ShaderData_1.WebGL1ShaderData);
            _checkLightCount(DataBufferConfig_1.DataBufferConfig.frontAmbientLightCount, DataBufferConfig_1.DataBufferConfig.frontDirectionLightCount, DataBufferConfig_1.DataBufferConfig.frontPointLightCount, AmbientLightData_1.AmbientLightData, DirectionLightData_1.WebGL1DirectionLightData, PointLightData_1.WebGL1PointLightData);
        };
        exports.render = function (state) {
            return functionalUtils_1.compose(RenderSystem_2.render(null, render_config_1.render_config, material_config_1.webgl1_material_config, shaderLib_generator_1.webgl1_shaderLib_generator, DataBufferConfig_1.DataBufferConfig, ShaderSystem_2.initMaterialShader, renderUtils_2.buildDrawDataMap(DeviceManagerData_1.DeviceManagerData, TextureData_1.TextureData, TextureCacheData_1.TextureCacheData, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData, AmbientLightData_1.AmbientLightData, DirectionLightData_1.WebGL1DirectionLightData, PointLightData_1.WebGL1PointLightData, ProgramData_1.WebGL1ProgramData, LocationData_1.WebGL1LocationData, GLSLSenderData_2.WebGL1GLSLSenderData, GeometryData_1.GeometryData, ArrayBufferData_1.ArrayBufferData, IndexBufferData_1.IndexBufferData, BasicDrawRenderCommandBufferData_1.BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData_1.LightDrawRenderCommandBufferData), materialUtils_1.buildInitShaderDataMap(DeviceManagerData_1.DeviceManagerData, ProgramData_1.WebGL1ProgramData, LocationData_1.WebGL1LocationData, GLSLSenderData_2.WebGL1GLSLSenderData, ShaderData_1.WebGL1ShaderData, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData, AmbientLightData_1.AmbientLightData, DirectionLightData_1.WebGL1DirectionLightData, PointLightData_1.WebGL1PointLightData, GPUDetectData_1.GPUDetectData, VaoData_1.VaoData), ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData), DrawRenderCommandBufferSystem_1.clearColor(null, render_config_1.render_config, DeviceManagerData_1.DeviceManagerData), RenderCommandBufferSystem_1.createRenderCommandBufferData(state, GlobalTempData_1.GlobalTempData, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData, BasicRenderCommandBufferData_1.BasicRenderCommandBufferData, LightRenderCommandBufferData_1.LightRenderCommandBufferData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
        };
    }
    else {
        exports.init = function (state) {
            var gl = DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state);
            stateUtils_1.initState(state, DeviceManagerSystem_1.getGL, DeviceManagerSystem_1.setSide, DeviceManagerData_1.DeviceManagerData);
            MaterialSystem_1.init(state, gl, material_config_2.webgl2_material_config, shaderLib_generator_2.webgl2_shaderLib_generator, ShaderSystem_1.initNoMaterialShader, TextureData_1.TextureData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData, GPUDetectData_1.GPUDetectData, GLSLSenderData_1.WebGL2GLSLSenderData, ProgramData_2.WebGL2ProgramData, VaoData_1.VaoData, LocationData_2.WebGL2LocationData, ShaderData_2.WebGL2ShaderData);
            RenderSystem_1.init(gl, render_config_1.render_config, DataBufferConfig_1.DataBufferConfig, GBufferData_1.GBufferData, DeferAmbientLightPassData_1.DeferAmbientLightPassData, DeferDirectionLightPassData_1.DeferDirectionLightPassData, DeferPointLightPassData_1.DeferPointLightPassData, ShaderData_2.WebGL2ShaderData, ProgramData_2.WebGL2ProgramData, LocationData_2.WebGL2LocationData, GLSLSenderData_1.WebGL2GLSLSenderData, GPUDetectData_1.GPUDetectData);
            _checkLightCount(DataBufferConfig_1.DataBufferConfig.deferAmbientLightCount, DataBufferConfig_1.DataBufferConfig.deferDirectionLightCount, DataBufferConfig_1.DataBufferConfig.deferPointLightCount, AmbientLightData_1.AmbientLightData, DirectionLightData_2.WebGL2DirectionLightData, PointLightData_2.WebGL2PointLightData);
        };
        exports.render = function (state) {
            return functionalUtils_1.compose(RenderSystem_1.render(state, render_config_1.render_config, material_config_2.webgl2_material_config, shaderLib_generator_2.webgl2_shaderLib_generator, DataBufferConfig_1.DataBufferConfig, ShaderSystem_1.initMaterialShader, renderUtils_1.buildDrawDataMap(DeviceManagerData_1.DeviceManagerData, TextureData_1.TextureData, TextureCacheData_1.TextureCacheData, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData, AmbientLightData_1.AmbientLightData, DirectionLightData_2.WebGL2DirectionLightData, PointLightData_2.WebGL2PointLightData, ProgramData_2.WebGL2ProgramData, LocationData_2.WebGL2LocationData, GLSLSenderData_1.WebGL2GLSLSenderData, GeometryData_1.GeometryData, BasicDrawRenderCommandBufferData_1.BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData_1.LightDrawRenderCommandBufferData), deferDrawRenderCommandBufferUtils_1.buildDrawDataMap(GBufferData_1.GBufferData, DeferAmbientLightPassData_1.DeferAmbientLightPassData, DeferDirectionLightPassData_1.DeferDirectionLightPassData, DeferPointLightPassData_1.DeferPointLightPassData), materialUtils_1.buildInitShaderDataMap(DeviceManagerData_1.DeviceManagerData, ProgramData_2.WebGL2ProgramData, LocationData_2.WebGL2LocationData, GLSLSenderData_1.WebGL2GLSLSenderData, ShaderData_2.WebGL2ShaderData, MapManagerData_1.MapManagerData, MaterialData_1.MaterialData, BasicMaterialData_1.BasicMaterialData, LightMaterialData_1.LightMaterialData, AmbientLightData_1.AmbientLightData, DirectionLightData_2.WebGL2DirectionLightData, PointLightData_2.WebGL2PointLightData, GPUDetectData_1.GPUDetectData, VaoData_1.VaoData), ThreeDTransformData_1.ThreeDTransformData, GameObjectData_1.GameObjectData), DrawRenderCommandBufferSystem_1.clearColor(null, render_config_1.render_config, DeviceManagerData_1.DeviceManagerData), RenderCommandBufferSystem_1.createRenderCommandBufferData(state, GlobalTempData_1.GlobalTempData, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData, BasicRenderCommandBufferData_1.BasicRenderCommandBufferData, LightRenderCommandBufferData_1.LightRenderCommandBufferData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
        };
    }
}
//# sourceMappingURL=WebGLRenderSystem.js.map