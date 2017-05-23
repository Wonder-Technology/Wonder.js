import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { fromArray as fromArrayFromFrp, Operator } from "wonder-frp/dist/es2015/global/Operator";
import { initData as initThreeDTransformDataSystem } from "../component/transform/ThreeDTransformSystem";
import { initData as initTagDataSystem } from "../component/tag/TagSystem";
import { initData as initGeometryDataSystem } from "../component/geometry/GeometrySystem";
import { initData as initMaterialDataSystem } from "../component/renderComponent/material/MaterialSystem";
import { initData as initShaderDataSystem } from "../renderer/shader/ShaderSystem";
import { initData as initMeshRendererDataSystem } from "../component/renderComponent/renderer/MeshRendererSystem";

export var initThreeDTransformData = initThreeDTransformDataSystem;

export var DomQuery = DomQueryFromCommonlib;

export var fromArray = fromArrayFromFrp;

export var initTagData = initTagDataSystem;

export var initGeometryData = initGeometryDataSystem;

export var initMaterialData = initMaterialDataSystem;

export var initShaderData = initShaderDataSystem;

export var initMeshRendererData = initMeshRendererDataSystem;
