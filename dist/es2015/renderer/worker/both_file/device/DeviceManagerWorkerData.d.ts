import { Color } from "../../../../structure/Color";
import { ESide } from "../../../enum/ESide";
export declare class DeviceManagerWorkerData {
    static gl: WebGLRenderingContext;
    static clearColor: Color;
    static writeRed: boolean;
    static writeGreen: boolean;
    static writeBlue: boolean;
    static writeAlpha: boolean;
    static side: ESide;
}
