import { isSupportSharedArrayBuffer } from "../device/WorkerDetectSystem";

export const createSharedArrayBufferOrArrayBuffer = (length: number) => {
    var Buffer: any = null;

    if (isSupportSharedArrayBuffer()) {
        Buffer = SharedArrayBuffer;
    }
    else {
        Buffer = ArrayBuffer;
    }

    return new Buffer(length);
}

