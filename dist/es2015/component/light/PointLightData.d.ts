import { SpecifyLightData } from "./SpecifyLightData";
import { PointLightGLSLDataStructure } from "../../renderer/type/dataType";
export declare class PointLightData extends SpecifyLightData {
    static intensities: Float32Array;
    static constants: Float32Array;
    static linears: Float32Array;
    static quadratics: Float32Array;
    static ranges: Uint16Array;
    static defaultIntensity: number;
    static defaultConstant: number;
    static defaultLinear: number;
    static defaultQuadratic: number;
    static defaultRange: number;
    static lightGLSLDataStructureMemberNameArr: Array<PointLightGLSLDataStructure>;
}
