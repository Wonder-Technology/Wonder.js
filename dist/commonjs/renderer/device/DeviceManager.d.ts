import { View } from "../../structure/View";
export declare class DeviceManager {
    static getInstance(): any;
    readonly gl: WebGLRenderingContext;
    readonly viewport: any;
    view: View;
    private constructor();
}
export declare var setDeviceManagerGL: (gl: WebGLRenderingContext) => any;
