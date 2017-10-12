import {
    cleanColorDirty as cleanColorDirtyUtils, cleanIntensityDirty as cleanIntensityDirtyUtils,
    cleanPositionDirty as cleanPositionDirtyUtils,
    getColor as getColorUtils, getColorArr3 as getColorArr3Utils,
    getIntensity as getIntensityUtils, isColorDirty as isColorDirtyUtils, isIntensityDirty as isIntensityDirtyUtils, isPositionDirty as isPositionDirtyUtils
} from "../../../utils/worker/render_file/light/directionLightUtils";
import { Color } from "../../../../structure/Color";

export const setPositionArr = (positionArr: Array<Float32Array>, DirectionLightWorkerData: any) => {
    DirectionLightWorkerData.positionArr = positionArr;
}

export const getColor = getColorUtils;

export const getColorArr3 = getColorArr3Utils;

export const getIntensity = getIntensityUtils;

export const isPositionDirty = isPositionDirtyUtils;

export const isColorDirty = isColorDirtyUtils;

export const isIntensityDirty = isIntensityDirtyUtils;

export const cleanPositionDirty = cleanPositionDirtyUtils;

export const cleanColorDirty = cleanColorDirtyUtils;

export const cleanIntensityDirty = cleanIntensityDirtyUtils;
