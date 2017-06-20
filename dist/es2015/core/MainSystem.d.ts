import { EScreenSize } from "../renderer/device/EScreenSize";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export declare var getIsTest: (MainData: any) => any;
export declare var setIsTest: (isTest: boolean, MainData: any) => IO;
export declare var setLibIsTest: (isTest: boolean) => IO;
export declare var setConfig: (closeContractTest: boolean, MainData: any, WorkerDetectData: any, {canvasId, isTest, screenSize, useDevicePixelRatio, contextConfig, workerConfig}: {
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
    workerConfig?: {
        renderWorkerFileDir: string;
    };
}) => IO;
export declare var init: Function;
export declare var initData: any;
