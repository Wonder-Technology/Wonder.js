"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkerDetectSystem_1 = require("../device/WorkerDetectSystem");
exports.createSharedArrayBufferOrArrayBuffer = function (length) {
    var Buffer = null;
    if (WorkerDetectSystem_1.isSupportSharedArrayBuffer()) {
        Buffer = SharedArrayBuffer;
    }
    else {
        Buffer = ArrayBuffer;
    }
    return new Buffer(length);
};
//# sourceMappingURL=arrayBufferUtils.js.map