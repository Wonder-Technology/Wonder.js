import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
import { WorkerConfigData } from "../definition/type/mainType";
export declare const detect: any;
export declare const isSupportSharedArrayBuffer: () => boolean;
export declare const isSupportRenderWorkerAndSharedArrayBuffer: () => boolean;
export declare const setWorkerConfig: (config: WorkerConfigData, WorkerDetectData: any) => IO;
export declare const getRenderWorkerFilePath: () => string;
