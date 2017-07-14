import { Vector3 } from "../../../../math/Vector3";
import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";
import { DirectionLightGLSLDataStructure } from "../../../type/dataType";

export class DirectionLightWorkerData extends SpecifyLightWorkerData{
    public static lightPositionArr: Array<Float32Array> = null;

    public static lightGLSLDataStructureMemberNameArr: Array<DirectionLightGLSLDataStructure> = null;
}

