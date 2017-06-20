import { isSupportSharedArrayBuffer } from "../device/WorkerDetectSystem";
export var createSharedArrayBufferOrArrayBuffer = function (length) {
    var Buffer = null;
    if (isSupportSharedArrayBuffer()) {
        Buffer = SharedArrayBuffer;
    }
    else {
        Buffer = ArrayBuffer;
    }
    return new Buffer(length);
};
//# sourceMappingURL=arrayBufferUtils.js.map