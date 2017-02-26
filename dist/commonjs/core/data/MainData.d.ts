import { EScreenSize } from "../../device/EScreenSize";
import { RectRegion } from "../../structure/RectRegion";
export declare class MainData {
    private static _isTest;
    static isTest: boolean;
    static screenSize: EScreenSize & RectRegion;
}
export declare type ContextConfigData = {
    options: {
        alpha: boolean;
        depth: boolean;
        stencil: boolean;
        antialias: boolean;
        premultipliedAlpha: boolean;
        preserveDrawingBuffer: boolean;
    };
};
