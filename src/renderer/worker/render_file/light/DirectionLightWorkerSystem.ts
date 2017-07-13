import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { DirectionLightGLSLDataStructure } from "../../../type/dataType";
import { Vector3 } from "../../../../math/Vector3";
import { getColor as getColorUtils, getIntensity as getIntensityUtils } from "../../../utils/light/directionLightUtils";

export var setCount = setSpecifyLightCount;

export var setLightGLSLDataStructureMemberNameArr = (lightGLSLDataStructureMemberNameArr:Array<DirectionLightGLSLDataStructure>, DirectionLightWorkerData:any) => {
    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArrArr = lightGLSLDataStructureMemberNameArr;
}

export var setPositionArr = (positionArr:Array<Vector3>, DirectionLightWorkerData:any) => {
    DirectionLightWorkerData.positionArr = positionArr;
}

export var getColor = getColorUtils;

export var getIntensity = getIntensityUtils;
