import { Color } from "../../../../../structure/Color";
import { ESide } from "../../../../enum/ESide";
import { EBlendFunc } from "../../../../enum/EBlendFunc";
import { EBlendEquation } from "../../../../enum/EBlendEquation";

export class DeviceManagerDataCommon {
    public static gl: any = null;

    public static clearColor: Color = null;

    public static writeRed: boolean = null;
    public static writeGreen: boolean = null;
    public static writeBlue: boolean = null;
    public static writeAlpha: boolean = null;

    public static side: ESide = null;
    public static depthWrite: boolean = null;
    public static blend: boolean = null;
    public static depthTest: boolean = null;
    public static scissorTest: boolean = null;
    public static blendSrc: EBlendFunc = null;
    public static blendDst: EBlendFunc = null;
    public static blendEquation: EBlendEquation = null;
    public static blendFuncSeparate: Array<EBlendFunc> = null;
}

