import {
    cleanAttenuationDirty as cleanAttenuationDirtyUtils,
    cleanColorDirty as cleanColorDirtyUtils, cleanIntensityDirty as cleanIntensityDirtyUtils,
    cleanPositionDirty as cleanPositionDirtyUtils,
    getColor as getColorUtils,
    getColorArr3 as getColorArr3Utils,
    getConstant as getConstantUtils,
    getIntensity as getIntensityUtils,
    getLinear as getLinearUtils,
    getQuadratic as getQuadraticUtils,
    getRange as getRangeUtils, isAttenuationDirty as isAttenuationDirtyUtils, isColorDirty as isColorDirtyUtils, isIntensityDirty as isIntensityDirtyUtils,
    isPositionDirty as isPositionDirtyUtils
} from "../../../utils/worker/render_file/light/pointLightUtils";

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

export var isPositionDirty = isPositionDirtyUtils;

export var isColorDirty = isColorDirtyUtils;

export var isIntensityDirty = isIntensityDirtyUtils;

export var isAttenuationDirty = isAttenuationDirtyUtils;

export var cleanPositionDirty = cleanPositionDirtyUtils;

export var cleanColorDirty = cleanColorDirtyUtils;

export var cleanIntensityDirty = cleanIntensityDirtyUtils;

export var cleanAttenuationDirty = cleanAttenuationDirtyUtils;
