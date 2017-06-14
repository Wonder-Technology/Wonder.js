import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { fromArray as fromArrayFromFrp, Operator } from "wonder-frp/dist/es2015/global/Operator";
import { initData as initThreeDTransformDataSystem } from "../component/transform/ThreeDTransformSystem";
import { initData as initTagDataSystem } from "../component/tag/TagSystem";
import {
    hasIndices,
    initData as initGeometryDataSystem, setIndices, setVertices
} from "../component/geometry/GeometrySystem";
import { getShaderIndex as getShaderIndexSystem, initData as initMaterialDataSystem } from "../component/material/MaterialSystem";
import {
    initData as initShaderDataSystem,
    sendAttributeData as sendAttributeDataSystem, sendUniformData as sendUniformDataSystem,
    use
} from "../renderer/shader/ShaderSystem";

import { initData as initMeshRendererDataSystem } from "../component/renderer/MeshRendererSystem";
import { createState as createStateUtils } from "../utils/stateUtils";
import { Map } from "immutable";
import { initData as initArrayBufferDataSystem } from "../renderer/buffer/ArrayBufferSystem";
import { initData as initIndexBufferDataSystem } from "../renderer/buffer/IndexBufferSystem";
import { RenderCommand } from "../renderer/command/RenderCommand";
import { DataUtils as DataUtilsUtils } from "../utils/DataUtils";
import { initData as initCameraControllerDataSystem } from "../component/camera/CameraControllerSystem";
import { initData as initGameObjectDataSystem } from "../core/entityObject/gameObject/GameObjectSystem";
import { disableVertexAttribArray as disableVertexAttribArrayUtils } from "../renderer/utils/shader/program/programUtils";
import { initData as initDeviceManagerDataSystem } from "../renderer/device/DeviceManagerSystem";
import { initData as initProgramDataSystem } from "../renderer/shader/program/ProgramSystem";
import { initData as initLocationDataSystem } from "../renderer/shader/location/LocationSystem";
import { initData as initGLSLSenderDataSystem } from "../renderer/shader/glslSender/GLSLSenderSystem";
import { initData as initSceneDataSystem } from "../core/entityObject/scene/SceneSystem";

export var initThreeDTransformData = initThreeDTransformDataSystem;

export var DomQuery = DomQueryFromCommonlib;

export var fromArray = fromArrayFromFrp;

export var initTagData = initTagDataSystem;

export var initGeometryData = initGeometryDataSystem;

export var initMaterialData = initMaterialDataSystem;

export var initShaderData = initShaderDataSystem;

export var initProgramData = initProgramDataSystem;

export var initLocationData = initLocationDataSystem;

export var initGLSLSenderData = initGLSLSenderDataSystem;

export var initMeshRendererData = initMeshRendererDataSystem;

export var initArrayBufferData = initArrayBufferDataSystem;

export var initIndexBufferData = initIndexBufferDataSystem;

export var initDeviceManagerData = initDeviceManagerDataSystem;

export var initCameraControllerData = initCameraControllerDataSystem;

export var initGameObjectData = initGameObjectDataSystem;

export var initSceneData = initSceneDataSystem;

export var createState = createStateUtils;

export var useProgram = use;

export var sendAttributeData = sendAttributeDataSystem;

export var sendUniformData = sendUniformDataSystem;

export var disableVertexAttribArray = disableVertexAttribArrayUtils

export var DataUtils = DataUtilsUtils;

export var setGeometryIndices = setIndices;

export var setGeometryVertices = setVertices;

export var hasGeometryIndices = hasIndices;

export var getShaderIndex = getShaderIndexSystem;

