import { ContextConfigData } from "../core/MainSystem";
import { View } from "../structure/View";
export declare class DeviceManager {
    static getInstance(): any;
    readonly gl: WebGLRenderingContext;
    readonly viewport: any;
    view: View;
    private constructor();
    createGL(canvasId: string, contextConfig: ContextConfigData): any;
    setScreen(): any;
}
export declare var setDeviceManagerGL: (gl: WebGLRenderingContext) => any;
