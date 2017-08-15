import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import {
    // createTypeArrays,
    getColor as getColorUtils, getColorArr3 as getColorArr3Utils, getConstant as getConstantUtils,
    getIntensity as getIntensityUtils, getLinear as getLinearUtils, getQuadratic as getQuadraticUtils, getRange as getRangeUtils
} from "../../../utils/worker/render_file/light/pointLightUtils";
import { Color } from "../../../../structure/Color";
import { computeRadius as computeRadiusUtils } from "../../../webgl2/utils/worker/render_file/light/pointLightUtils";

export var setPositionArr = (positionArr: Array<Float32Array>, PointLightWorkerData: any) => {
    PointLightWorkerData.positionArr = positionArr;
}

export var getColor = getColorUtils;

export var getColorArr3 = getColorArr3Utils;

export var getIntensity = getIntensityUtils;

export var getConstant = getConstantUtils;

export var getLinear = getLinearUtils;

export var getQuadratic = getQuadraticUtils;

export var getRange = getRangeUtils;

export var computeRadius = computeRadiusUtils;

// export var initData = ({
//                            buffer,
//     bufferCount,
//     lightCount,
//     pointLightGLSLDataStructureMemberNameArr
//                        }, PointLightWorkerData: any) => {
//     _setCount(lightCount, PointLightWorkerData);
//
//     PointLightWorkerData.lightGLSLDataStructureMemberNameArr = pointLightGLSLDataStructureMemberNameArr;
//
//     createTypeArrays(buffer, bufferCount, PointLightWorkerData);
// }
