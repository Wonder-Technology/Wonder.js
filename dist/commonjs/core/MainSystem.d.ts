import { EScreenSize } from "../renderer/device/EScreenSize";
import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
export declare const setConfig: (closeContractTest: boolean, InitConfigData: any, WorkerDetectData: any, WorkerInstanceData: any, WebGLDetectData: any, {canvasId, isTest, screenSize, useDevicePixelRatio, contextConfig, workerConfig}: {
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
export declare var initData: any;
export declare var passDataToRenderWorker: any;
export declare var init: any;
