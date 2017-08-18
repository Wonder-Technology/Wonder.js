import { createTypeArrays } from "../../../../utils/worker/render_file/light/pointLightUtils";
import { setCount } from "../../../render_file/light/SpecifyLightWorkerSystem";
import { computeRadius as computeRadiusUtils } from "../../../../webgl2/utils/worker/render_file/light/pointLightUtils";

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
export var computeRadius = computeRadiusUtils;


