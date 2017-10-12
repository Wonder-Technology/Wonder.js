import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/commonjs/utils/DomQuery";
import { fromArray as fromArrayFromFrp, Operator } from "wonder-frp/dist/commonjs/global/Operator";
import {
    getNormalMatrix as getNormalMatrixSystem,
    initData as initThreeDTransformDataSystem
} from "../component/transform/ThreeDTransformSystem";
import { initData as initTagDataSystem } from "../component/tag/TagSystem";
import {
    hasIndices,
    initData as initGeometryDataSystem, setIndices, setVertices
} from "../component/geometry/GeometrySystem";
import { getShaderIndex as getShaderIndexSystem} from "../component/material/MaterialSystem";
import {
    use
} from "../renderer/shader/ShaderSystem";

import { initData as initMeshRendererDataSystem } from "../component/renderer/MeshRendererSystem";
import { createState as createStateUtils } from "../utils/stateUtils";
import { Map } from "immutable";
import { initData as initArrayBufferDataSystem } from "../renderer/buffer/ArrayBufferSystem";
import { initData as initIndexBufferDataSystem } from "../renderer/buffer/IndexBufferSystem";
import {
    getWorldToCameraMatrix as getWorldToCameraMatrixSystem,
    initData as initCameraControllerDataSystem
} from "../component/camera/CameraControllerSystem";
import { initData as initGameObjectDataSystem } from "../core/entityObject/gameObject/GameObjectSystem";
import { disableVertexAttribArray as disableVertexAttribArrayUtils } from "../renderer/utils/worker/render_file/shader/program/programUtils";
import { initData as initDeviceManagerDataSystem } from "../renderer/device/DeviceManagerSystem";
import { initData as initProgramDataSystem } from "../renderer/shader/program/ProgramSystem";
import { initData as initSceneDataSystem } from "../core/entityObject/scene/SceneSystem";
import { initData as initRenderCommandBufferDataSystem } from "../renderer/command_buffer/RenderCommandBufferSystem";
import { updateSystem as updateAllSystems } from "../core/DirectorSystem";
import { initData as initSendDrawRenderCommandBufferDataSystem } from "../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem";
import { initData as initWebGL1LightDataSystem } from "../component/webgl1/light/LightSystem";
import { initData as initWebGL2LightDataSystem } from "../component/webgl2/light/LightSystem";
import { initData as initDrawRenderCommandBufferDataSystem } from "../renderer/draw/DrawRenderCommandBufferSystem";
import { sendAttributeData as sendWebGL1AttributeDataSystem } from "../renderer/webgl1/render/RenderSystem";
import { initData as initWebGL1GLSLSenderDataSystem } from "../renderer/webgl1/shader/glslSender/GLSLSenderSystem";
import { initData as initWebGL2GLSLSenderDataSystem } from "../renderer/webgl2/shader/glslSender/GLSLSenderSystem";
import { initData as initVaoDataSystem } from "../renderer/webgl2/vao/VaoSystem";
import { initData as initWebGL1LocationDataSystem } from "../renderer/webgl1/shader/location/LocationSystem";
import { initData as initWebGL2LocationDataSystem } from "../renderer/webgl2/shader/location/LocationSystem";
import { initData as initWebGL1ShaderDataSystem } from "../renderer/webgl1/shader/ShaderSystem";
import { initData as initWebGL2ShaderDataSystem } from "../renderer/webgl2/shader/ShaderSystem";
import { initData as initDeferLightPassDataSystem } from "../renderer/webgl2/render/light/defer/light/DeferLightPassSystem";
import { initData as initWebGL1GPUDetectDataSystem } from "../renderer/webgl1/device/GPUDetectSystem";
import { initData as initWebGL2GPUDetectDataSystem } from "../renderer/webgl2/device/GPUDetectSystem";
import { initData as initDataSystem } from "../core/MainSystem";
import { initData as initMaterialDataSystem } from "../component/material/AllMaterialSystem";
import { getImageData as getImageDataUtils } from "../renderer/utils/texture/textureUtils";
import { hasDiffuseMap as hasDiffuseMapSystem, hasSpecularMap as hasSpecularMapSystem } from "../component/material/LightMaterialSystem";

export const initThreeDTransformData = initThreeDTransformDataSystem;

export const DomQuery = DomQueryFromCommonlib;

export const fromArray = fromArrayFromFrp;

export const initTagData = initTagDataSystem;

export const initGeometryData = initGeometryDataSystem;

export const initMaterialData = initMaterialDataSystem;

export const initWebGL1ShaderData = initWebGL1ShaderDataSystem;

export const initWebGL2ShaderData = initWebGL2ShaderDataSystem;

export const initProgramData = initProgramDataSystem;

export const initWebGL1LocationData = initWebGL1LocationDataSystem;

export const initWebGL2LocationData = initWebGL2LocationDataSystem;

export const initWebGL1GLSLSenderData = initWebGL1GLSLSenderDataSystem;

export const initWebGL2GLSLSenderData = initWebGL2GLSLSenderDataSystem;

export const initMeshRendererData = initMeshRendererDataSystem;

export const initArrayBufferData = initArrayBufferDataSystem;

export const initIndexBufferData = initIndexBufferDataSystem;

export const initDeviceManagerData = initDeviceManagerDataSystem;

export const initCameraControllerData = initCameraControllerDataSystem;

export const initWebGL1LightData = initWebGL1LightDataSystem;

export const initWebGL2LightData = initWebGL2LightDataSystem;

export const initGameObjectData = initGameObjectDataSystem;

export const initSceneData = initSceneDataSystem;

export const initRenderCommandBufferData = initRenderCommandBufferDataSystem;

export const initDrawRenderCommandBufferData = initDrawRenderCommandBufferDataSystem;

export const initSendDrawRenderCommandBufferData = initSendDrawRenderCommandBufferDataSystem;

export const initVaoData = initVaoDataSystem;

export const initDeferLightPassData = initDeferLightPassDataSystem;

export const initWebGL1GPUDetectData = initWebGL1GPUDetectDataSystem;

export const initWebGL2GPUDetectData = initWebGL2GPUDetectDataSystem;

export const initData = initDataSystem;

export const createState = createStateUtils;

export const useProgram = use;

export const sendWebGL1AttributeData = sendWebGL1AttributeDataSystem;

// export const sendUniformData = sendUniformDataSystem;

export const disableVertexAttribArray = disableVertexAttribArrayUtils;

export const setGeometryIndices = setIndices;

export const setGeometryVertices = setVertices;

export const hasGeometryIndices = hasIndices;

export const getShaderIndex = getShaderIndexSystem;

export const updateSystem = updateAllSystems;

export const getNormalMatrix = getNormalMatrixSystem;

export const getWorldToCameraMatrix = getWorldToCameraMatrixSystem;

export const getImageData = getImageDataUtils;

export const hasDiffuseMap = hasDiffuseMapSystem;

export const hasSpecularMap = hasSpecularMapSystem;
