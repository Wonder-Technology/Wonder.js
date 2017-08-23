import { Color } from "../../../../../structure/Color";
import { ESide } from "../../../../enum/ESide";
import { EBlendFunc } from "../../../../enum/EBlendFunc";
import { EBlendEquation } from "../../../../enum/EBlendEquation";
export declare class DeviceManagerDataCommon {
    static gl: any;
    static clearColor: Color;
    static writeRed: boolean;
    static writeGreen: boolean;
    static writeBlue: boolean;
    static writeAlpha: boolean;
    static side: ESide;
    static depthWrite: boolean;
    static blend: boolean;
    static depthTest: boolean;
    static scissorTest: boolean;
    static blendSrc: EBlendFunc;
    static blendDst: EBlendFunc;
    static blendEquation: EBlendEquation;
    static blendFuncSeparate: Array<EBlendFunc>;
}
