import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { DirectionLightGLSLDataStructure } from "../../../type/dataType";
import { Vector3 } from "../../../../math/Vector3";
import {
    cleanColorDirty as cleanColorDirtyUtils, cleanIntensityDirty as cleanIntensityDirtyUtils,
    cleanPositionDirty as cleanPositionDirtyUtils,
    createTypeArrays, getColor as getColorUtils, getColorArr3 as getColorArr3Utils,
    getIntensity as getIntensityUtils, isColorDirty as isColorDirtyUtils, isIntensityDirty as isIntensityDirtyUtils, isPositionDirty as isPositionDirtyUtils
} from "../../../utils/worker/render_file/light/directionLightUtils";
import { Color } from "../../../../structure/Color";

export var setPositionArr = (positionArr: Array<Float32Array>, DirectionLightWorkerData: any) => {
    DirectionLightWorkerData.positionArr = positionArr;
}

export var getColor = getColorUtils;

export var getColorArr3 = getColorArr3Utils;

export var getIntensity = getIntensityUtils;

export var initData = ({
                           buffer,
    bufferCount,
    lightCount,
    directionLightGLSLDataStructureMemberNameArr
                       }, DirectionLightWorkerData: any) => {
    _setCount(lightCount, DirectionLightWorkerData);

    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = directionLightGLSLDataStructureMemberNameArr;

    createTypeArrays(buffer, bufferCount, DirectionLightWorkerData);
}

var _setCount = setSpecifyLightCount;

export var isPositionDirty = isPositionDirtyUtils;

export var isColorDirty = isColorDirtyUtils;

export var isIntensityDirty = isIntensityDirtyUtils;

export var cleanPositionDirty = cleanPositionDirtyUtils;

export var cleanColorDirty = cleanColorDirtyUtils;

export var cleanIntensityDirty = cleanIntensityDirtyUtils;
