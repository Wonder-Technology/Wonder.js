import { createTypeArrays } from "../../../../utils/worker/render_file/light/directionLightUtils";
import { setCount } from "../../../render_file/light/SpecifyLightWorkerSystem";

export var initData = ({
                           buffer,
    bufferCount,
    lightCount,
    directionLightGLSLDataStructureMemberNameArr
                       }, DirectionLightWorkerData: any) => {
    setCount(lightCount, DirectionLightWorkerData);

    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = directionLightGLSLDataStructureMemberNameArr;

    createTypeArrays(buffer, bufferCount, DirectionLightWorkerData);
}


