import curry from "wonder-lodash/curry";
import { DomQuery } from "wonder-commonlib/dist/commonjs/utils/DomQuery";
import { WorkerDetectData } from "./WorkerDetectData";
import { root } from "../definition/Variable";
import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
import { WorkerConfigData } from "../definition/type/mainType";
import { RenderWorkerConfig } from "../config/RenderWorkerConfig";

export var detect = curry((WorkerDetectData: any) => {
    /*!
    for unit test
     */
    if (typeof root.isSupportSharedArrayBuffer_wonder !== "undefined" && typeof root.isSupportRenderWorkerAndSharedArrayBuffer_wonder !== "undefined") {
        WorkerDetectData.isSupportSharedArrayBuffer = root.isSupportSharedArrayBuffer_wonder;
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = root.isSupportRenderWorkerAndSharedArrayBuffer_wonder;

        return;
    }

    let canvas = DomQuery.create("<canvas></canvas>").get(0);

    if (typeof SharedArrayBuffer !== "undefined") {
        WorkerDetectData.isSupportSharedArrayBuffer = true;
    }
    else {
        WorkerDetectData.isSupportSharedArrayBuffer = false;
    }

    if (("transferControlToOffscreen" in canvas) && WorkerDetectData.isSupportSharedArrayBuffer) {
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = true;
    }
    else {
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = false;
    }
})

export var isSupportSharedArrayBuffer = () => {
    return WorkerDetectData.isSupportSharedArrayBuffer;
}

export var isSupportRenderWorkerAndSharedArrayBuffer = () => {
    return RenderWorkerConfig.useRenderWorker && WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer;
}

export var setWorkerConfig = (config: WorkerConfigData, WorkerDetectData: any) => {
    return IO.of(() => {
        WorkerDetectData.renderWorkerFileDir = config.renderWorkerFileDir;
    })
}

export var getRenderWorkerFilePath = () => {
    return `${_getValidFileDir(WorkerDetectData.renderWorkerFileDir)}wd.renderWorker.js`
}

var _getValidFileDir = (dir: string) => {
    if (dir.slice(-1) !== '/') {
        return `${dir}/`;
    }

    return dir;
}

detect(WorkerDetectData);
