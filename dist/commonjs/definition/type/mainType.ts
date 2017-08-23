import { ContextConfigOptionsData } from "../../renderer/type/dataType";

export type ContextConfigData = {
    options: ContextConfigOptionsData;
}

export type MainConfigData = {
    canvasId?: string;
    isTest?: boolean;
    screenSize?: any;
    useDevicePixelRatio?: boolean;
    contextConfig?: ContextConfigData;
    workerConfig?: WorkerConfigData;
}

export type WorkerConfigData = {
    renderWorkerFileDir: string;
}
