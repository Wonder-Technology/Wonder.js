import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { fromArray as fromArrayFromFrp, Operator } from "wonder-frp/dist/es2015/global/Operator";
import { initData as initThreeDTransformSystemData } from "../component/transform/ThreeDTransformSystem";
import { initData as initTagSystemTagData } from "../component/tag/TagSystem";
import { initData as initGeometrySystemData } from "../component/geometry/GeometrySystem";

export var initThreeDTransformData = initThreeDTransformSystemData;

export var DomQuery = DomQueryFromCommonlib;

export var fromArray = fromArrayFromFrp;

export var initTagData = initTagSystemTagData;

export var initGeometryData = initGeometrySystemData;
