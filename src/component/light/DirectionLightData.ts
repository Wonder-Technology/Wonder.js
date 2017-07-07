import { SpecifyLightData } from "./SpecifyLightData";
import { DirectionLightRenderData, LightGLSLDataStructure } from "./type";

export class DirectionLightData extends SpecifyLightData{
    public static renderDataMap:Array<DirectionLightRenderData>;

    public static defaultIntensity: number = null;

    public static lightGLSLDataStructureMemberName:Array<LightGLSLDataStructure> = null;
}
