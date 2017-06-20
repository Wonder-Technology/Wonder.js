import { ContextConfigOptionsData } from "../../renderer/type/dataType";
export declare type ContextConfigData = {
    options: ContextConfigOptionsData;
};
export declare type MainConfigData = {
    canvasId?: string;
    isTest?: boolean;
    screenSize?: any;
    useDevicePixelRatio?: boolean;
    contextConfig?: ContextConfigData;
    workerConfig?: WorkerConfigData;
};
export declare type WorkerConfigData = {
    renderWorkerFileDir: string;
};
