import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { DirectionLightGLSLDataStructure } from "../../../type/dataType";
import { Vector3 } from "../../../../math/Vector3";
import {
    createTypeArrays, getColor as getColorUtils, getColorArr3 as getColorArr3Utils,
    getIntensity as getIntensityUtils
} from "../../../utils/light/directionLightUtils";

export var setCount = setSpecifyLightCount;

export var setLightGLSLDataStructureMemberNameArr = (lightGLSLDataStructureMemberNameArr:Array<DirectionLightGLSLDataStructure>, DirectionLightWorkerData:any) => {
    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = lightGLSLDataStructureMemberNameArr;
}

export var setPositionArr = (positionArr:Array<Float32Array>, DirectionLightWorkerData:any) => {
    DirectionLightWorkerData.positionArr = positionArr;
}

export var getColor = getColorUtils;

export var getColorArr3 = getColorArr3Utils;

export var getIntensity = getIntensityUtils;

export var initData = ({
                           buffer,
                           count,
                           directionLightGLSLDataStructureMemberNameArr
                       }, DirectionLightWorkerData: any) => {
    setCount(count, DirectionLightWorkerData);

    setLightGLSLDataStructureMemberNameArr(directionLightGLSLDataStructureMemberNameArr, DirectionLightWorkerData);

    createTypeArrays(buffer, count, DirectionLightWorkerData);
}
