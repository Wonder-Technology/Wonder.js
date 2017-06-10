import curry from "wonder-lodash/curry";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { WorkerDetectData } from "./WorkerDetectData";

export var detect = curry((WorkerDetectData:any) => {
    var canvas = DomQuery.create("<canvas></canvas>").get(0);

    if(typeof SharedArrayBuffer !== "undefined"){
        WorkerDetectData.isSupportSharedArrayBuffer = true;
    }
    else{
        WorkerDetectData.isSupportSharedArrayBuffer = false;
    }

    if(("transferControlToOffscreen" in canvas) && WorkerDetectData.isSupportSharedArrayBuffer){
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = true;
    }
    else{
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = false;
    }
})

export var isSupportSharedArrayBuffer = () => {
    return WorkerDetectData.isSupportSharedArrayBuffer;
}

export var isSupportRenderWorkerAndSharedArrayBuffer = () => {
    return WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer;
}


detect(WorkerDetectData);
