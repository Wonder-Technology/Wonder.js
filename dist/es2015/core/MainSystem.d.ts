import { EScreenSize } from "../device/EScreenSize";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { Map } from "immutable";
export declare var getIsTest: (MainData: any) => any;
export declare var setIsTest: (isTest: boolean, MainData: any) => IO;
export declare var setLibIsTest: (isTest: boolean) => IO;
export declare var getScreenSize: (state: Map<any, any>) => any;
export declare var setConfig: (closeContractTest: boolean, MainData: any, {canvasId, isTest, screenSize, useDevicePixelRatio, contextConfig}: {
    canvasId?: string;
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
}) => IO;
export declare var init: Function;
export declare type ContextConfigData = {
    options: ContextConfigOptionsData;
};
export declare type MainConfigData = {
    canvasId?: string;
    isTest?: boolean;
    screenSize?: any;
    useDevicePixelRatio?: boolean;
    contextConfig?: ContextConfigData;
};
export declare type ContextConfigOptionsData = {
    alpha: boolean;
    depth: boolean;
    stencil: boolean;
    antialias: boolean;
    premultipliedAlpha: boolean;
    preserveDrawingBuffer: boolean;
};
