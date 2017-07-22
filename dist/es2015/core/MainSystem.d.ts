import { EScreenSize } from "../renderer/device/EScreenSize";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export declare var setConfig: (closeContractTest: boolean, InitConfigData: any, WorkerDetectData: any, WorkerInstanceData: any, {canvasID, isTest, screenSize, useDevicePixelRatio, contextConfig, workerConfig}: {
    canvasID?: string;
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
