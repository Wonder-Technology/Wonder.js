import { SpecifyLightData } from "./SpecifyLightData";
import { DirectionLightGLSLDataStructure } from "../../renderer/type/dataType";
export declare class DirectionLightData extends SpecifyLightData {
    static intensities: Float32Array;
    static defaultIntensity: number;
    static lightGLSLDataStructureMemberNameArr: Array<DirectionLightGLSLDataStructure>;
}
