import { Vector3 } from "../../../../math/Vector3";
import { SpecifyLightWorkerData } from "./SpecifyLightWorkerData";
import { DirectionLightGLSLDataStructure } from "../../../type/dataType";

export class DirectionLightWorkerData extends SpecifyLightWorkerData{
    public static lightPositionArr: Array<Vector3> = null;

    public static lightGLSLDataStructureMemberNameArrArr: Array<DirectionLightGLSLDataStructure> = null;
}

