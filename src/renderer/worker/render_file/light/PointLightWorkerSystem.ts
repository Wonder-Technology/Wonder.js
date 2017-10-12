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
import { Color } from "../../../../structure/Color";

export const setPositionArr = (positionArr: Array<Float32Array>, PointLightWorkerData: any) => {
    PointLightWorkerData.positionArr = positionArr;
}

export const getColor = getColorUtils;

export const getColorArr3 = getColorArr3Utils;

export const getIntensity = getIntensityUtils;

export const getConstant = getConstantUtils;

export const getLinear = getLinearUtils;

export const getQuadratic = getQuadraticUtils;

export const getRange = getRangeUtils;

export const isPositionDirty = isPositionDirtyUtils;

export const isColorDirty = isColorDirtyUtils;

export const isIntensityDirty = isIntensityDirtyUtils;

export const isAttenuationDirty = isAttenuationDirtyUtils;

export const cleanPositionDirty = cleanPositionDirtyUtils;

export const cleanColorDirty = cleanColorDirtyUtils;

export const cleanIntensityDirty = cleanIntensityDirtyUtils;

export const cleanAttenuationDirty = cleanAttenuationDirtyUtils;
