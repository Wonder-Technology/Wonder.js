import { EScreenSize } from "../device/EScreenSize";
export declare class Main {
    private static _canvasId;
    private static _contextConfig;
    private static _useDevicePixelRatio;
    static setConfig({canvasId, isTest, screenSize, useDevicePixelRatio, contextConfig}: {
        canvasId?: null;
        isTest?: boolean;
        screenSize?: EScreenSize;
        useDevicePixelRatio?: boolean;
        contextConfig?: {
            options: {
                alpha: boolean;
                depth: boolean;
                stencil: boolean;
                antialias: boolean;
                premultipliedAlpha: boolean;
                preserveDrawingBuffer: boolean;
            };
        };
    }): typeof Main;
    static init(): typeof Main;
    private static _setIsTest(isTestFromDebugConfig);
}
