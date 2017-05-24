import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { fromArray as fromArrayFromFrp, Operator } from "wonder-frp/dist/es2015/global/Operator";
import { initData as initThreeDTransformDataSystem } from "../component/transform/ThreeDTransformSystem";
import { initData as initTagDataSystem } from "../component/tag/TagSystem";
import { initData as initGeometryDataSystem } from "../component/geometry/GeometrySystem";
import { initData as initMaterialDataSystem } from "../component/renderComponent/material/MaterialSystem";
import {
    initData as initShaderDataSystem,
    sendAttributeData as sendAttributeDataSystem, sendUniformData as sendUniformDataSystem,
    use
} from "../renderer/shader/ShaderSystem";

import {
    disableVertexAttribArray as disableVertexAttribArraySystem
} from "../renderer/shader/programSystem";
import { initData as initMeshRendererDataSystem } from "../component/renderComponent/renderer/MeshRendererSystem";
import { createState as createStateUtils } from "../utils/stateUtils";
import { Map } from "immutable";
import { initData as initArrayBufferDataSystem } from "../renderer/buffer/ArrayBufferSystem";
import { initData as initIndexBufferDataSystem } from "../renderer/buffer/IndexBufferSystem";
import { RenderCommand } from "../renderer/command/RenderCommand";
import { DataUtils as DataUtilsUtils } from "../utils/DataUtils";
import { initData as initDeviceManagerDataSystem } from "../device/DeviceManagerSystem";

export var initThreeDTransformData = initThreeDTransformDataSystem;

export var DomQuery = DomQueryFromCommonlib;

export var fromArray = fromArrayFromFrp;

export var initTagData = initTagDataSystem;

export var initGeometryData = initGeometryDataSystem;

export var initMaterialData = initMaterialDataSystem;

export var initShaderData = initShaderDataSystem;

export var initMeshRendererData = initMeshRendererDataSystem;

export var initArrayBufferData = initArrayBufferDataSystem;

export var initIndexBufferData = initIndexBufferDataSystem;

export var initDeviceManagerData = initDeviceManagerDataSystem;

export var createState = createStateUtils;

export var useProgram = use;

export var sendAttributeData = sendAttributeDataSystem;

export var sendUniformData = sendUniformDataSystem;

export var disableVertexAttribArray = disableVertexAttribArraySystem;

export var DataUtils = DataUtilsUtils;
