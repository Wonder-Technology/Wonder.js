import { Color } from "../../../../structure/Color";

export class DeviceManagerWorkerData {
    public static renderWorker: Worker = null;

    public static gl: WebGLRenderingContext = null;

    public static clearColor: Color = null;

    public static writeRed: boolean = null;
    public static writeGreen: boolean = null;
    public static writeBlue: boolean = null;
    public static writeAlpha: boolean = null;
}