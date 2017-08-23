import { DirectionLightWorkerData } from "../../../render_file/light/DirectionLightWorkerData";
import { DirectionLightGLSLDataStructure } from "../../../../type/dataType";

export class WebGL1DirectionLightWorkerData extends DirectionLightWorkerData {
    public static positionArr: Array<Float32Array> = null;

    public static lightGLSLDataStructureMemberNameArr: Array<DirectionLightGLSLDataStructure> = null;
}

