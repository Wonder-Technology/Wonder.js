import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { use as useUtils } from "../utils/worker/render_file/shader/shaderUtils";
export var create = function (ShaderData) {
    ShaderData.count += 1;
};
export var use = null;
if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    use = useUtils;
}
//# sourceMappingURL=ShaderSystem.js.map