import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
import { WorkerConfigData } from "../definition/type/mainType";
export declare var detect: any;
export declare var isSupportSharedArrayBuffer: () => boolean;
export declare var isSupportRenderWorkerAndSharedArrayBuffer: () => boolean;
export declare var setWorkerConfig: (config: WorkerConfigData, WorkerDetectData: any) => IO;
export declare var getRenderWorkerFilePath: () => string;
