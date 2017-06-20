import { View } from "../../structure/View";
import { ContextConfigData } from "../../definition/type/mainType";
export declare class DeviceManager {
    static getInstance(): any;
    readonly gl: WebGLRenderingContext;
    readonly viewport: any;
    view: View;
    private constructor();
    createGL(canvasId: string, contextConfig: ContextConfigData): any;
}
export declare var setDeviceManagerGL: (gl: WebGLRenderingContext) => any;
