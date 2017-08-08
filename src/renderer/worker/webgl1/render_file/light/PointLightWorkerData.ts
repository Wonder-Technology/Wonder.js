import { SpecifyLightWorkerData } from "../../../render_file/light/SpecifyLightWorkerData";
import { PointLightGLSLDataStructure } from "../../../../type/dataType";

export class PointLightWorkerDataWebGL1 extends SpecifyLightWorkerData {
    public static positionArr: Array<Float32Array> = null;

    public static lightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure> = null;
}

