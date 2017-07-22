import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { DirectionLightGLSLDataStructure } from "../../../type/dataType";
import { Vector3 } from "../../../../math/Vector3";
import {
    createTypeArrays, getColor as getColorUtils, getColorArr3 as getColorArr3Utils,
    getIntensity as getIntensityUtils
} from "../../../utils/light/directionLightUtils";
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
