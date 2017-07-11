import { Color } from "../../structure/Color";
import { ESide } from "../enum/ESide";

export class DeviceManagerData {
    public static gl: WebGLRenderingContext = null;

    public static clearColor: Color = null;

    public static writeRed: boolean = null;
    public static writeGreen: boolean = null;
    public static writeBlue: boolean = null;
    public static writeAlpha: boolean = null;

    //todo fix worker
    public static side: ESide = null;
}
