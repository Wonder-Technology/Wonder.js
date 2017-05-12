import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { fromArray as fromArrayFromFrp, Operator } from "wonder-frp/dist/es2015/global/Operator";
import { initData } from "../component/transform/ThreeDTransformSystem";

export var initThreeDTransform = initData;

export var DomQuery = DomQueryFromCommonlib;

export var fromArray = fromArrayFromFrp;
