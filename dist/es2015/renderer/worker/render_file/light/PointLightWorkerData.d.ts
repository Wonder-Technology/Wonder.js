import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";
import { PointLightGLSLDataStructure } from "../../../type/dataType";
export declare class PointLightWorkerData extends SpecifyLightWorkerData {
    static positionArr: Array<Float32Array>;
    static lightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure>;
}
