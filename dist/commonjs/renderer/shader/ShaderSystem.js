"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var shaderUtils_1 = require("../utils/worker/render_file/shader/shaderUtils");
exports.create = function (ShaderData) {
    ShaderData.count += 1;
};
exports.use = null;
if (!WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.use = shaderUtils_1.use;
}
//# sourceMappingURL=ShaderSystem.js.map