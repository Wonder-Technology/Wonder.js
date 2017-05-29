"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MeshRendererSystem_1 = require("../../component/renderer/MeshRendererSystem");
var MeshRendererData_1 = require("../../component/renderer/MeshRendererData");
var functionalUtils_1 = require("../../utils/functionalUtils");
var RenderCommandSystem_1 = require("../command/RenderCommandSystem");
var SortRenderCommandSystem_1 = require("../sort/SortRenderCommandSystem");
var DrawRenderCommandSystem_1 = require("../draw/DrawRenderCommandSystem");
var MaterialSystem_1 = require("../../component/material/MaterialSystem");
var MaterialData_1 = require("../../component/material/MaterialData");
var GameObjectData_1 = require("../../core/entityObject/gameObject/GameObjectData");
var ShaderData_1 = require("../shader/ShaderData");
var material_config_1 = require("../data/material_config");
var shaderLib_generator_1 = require("../data/shaderLib_generator");
var GeometryData_1 = require("../../component/geometry/GeometryData");
var ArrayBufferData_1 = require("../buffer/ArrayBufferData");
var IndexBufferData_1 = require("../buffer/IndexBufferData");
var DeviceManagerSystem_1 = require("../../device/DeviceManagerSystem");
var render_config_1 = require("../data/render_config");
var DeviceManagerData_1 = require("../../device/DeviceManagerData");
var ThreeDTransformData_1 = require("../../component/transform/ThreeDTransformData");
var SceneData_1 = require("../../core/entityObject/scene/SceneData");
var CameraControllerData_1 = require("../../component/camera/CameraControllerData");
var CameraData_1 = require("../../component/camera/CameraData");
exports.init = function (state) {
    MaterialSystem_1.init(state, material_config_1.material_config, shaderLib_generator_1.shaderLib_generator, DeviceManagerData_1.DeviceManagerData, ShaderData_1.ShaderData, MaterialData_1.MaterialData);
    return state;
};
exports.clear = function (state) {
    DeviceManagerSystem_1.clear(DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state), render_config_1.render_config.render_setting.clearColor, DeviceManagerData_1.DeviceManagerData);
    return state;
};
exports.render = function (state) {
    return functionalUtils_1.compose(DrawRenderCommandSystem_1.draw(state, DeviceManagerData_1.DeviceManagerData, MaterialData_1.MaterialData, ShaderData_1.ShaderData, GeometryData_1.GeometryData, ArrayBufferData_1.ArrayBufferData, IndexBufferData_1.IndexBufferData), SortRenderCommandSystem_1.sortRenderCommands(state), RenderCommandSystem_1.createRenderCommands(state, GameObjectData_1.GameObjectData, ThreeDTransformData_1.ThreeDTransformData, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData, MaterialData_1.MaterialData, GeometryData_1.GeometryData, SceneData_1.SceneData), MeshRendererSystem_1.getRenderList(state))(MeshRendererData_1.MeshRendererData);
};
//# sourceMappingURL=WebGLRenderSystem.js.map