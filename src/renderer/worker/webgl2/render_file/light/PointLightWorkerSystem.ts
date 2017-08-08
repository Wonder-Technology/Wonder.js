import { createTypeArrays } from "../../../../utils/light/pointLightUtils";
import { setCount } from "../../../render_file/light/SpecifyLightWorkerSystem";

export var initData = ({
                           buffer,
                           bufferCount,
                           lightCount
                           // pointLightGLSLDataStructureMemberNameArr
                       }, PointLightWorkerData: any) => {
    setCount(lightCount, PointLightWorkerData);

    // PointLightWorkerData.lightGLSLDataStructureMemberNameArr = pointLightGLSLDataStructureMemberNameArr;
    createTypeArrays(buffer, bufferCount, PointLightWorkerData);
}


