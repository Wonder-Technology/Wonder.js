import { PointLightGLSLDataStructure } from "../../../../type/dataType";
import { PointLightWorkerData } from "../../../render_file/light/PointLightWorkerData";
export declare class WebGL1PointLightWorkerData extends PointLightWorkerData {
    static positionArr: Array<Float32Array>;
    static lightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure>;
}
