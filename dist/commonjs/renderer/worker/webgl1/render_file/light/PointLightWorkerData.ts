import { PointLightGLSLDataStructure } from "../../../../type/dataType";
import { PointLightWorkerData } from "../../../render_file/light/PointLightWorkerData";

export class WebGL1PointLightWorkerData extends PointLightWorkerData {
    public static positionArr: Array<Float32Array> = null;

    public static lightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure> = null;
}

