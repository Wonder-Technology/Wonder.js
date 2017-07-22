import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";
import { PointLightGLSLDataStructure } from "../../../type/dataType";

export class PointLightWorkerData extends SpecifyLightWorkerData {
    public static positionArr: Array<Float32Array> = null;

    public static lightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure> = null;
}

