import { EWebGLVersion } from "../../../../enum/EWebGLVersion";
export var isWebgl1 = function (WebGLDetectData) { return WebGLDetectData.version === EWebGLVersion.WEBGL1; };
export var isWebgl2 = function (WebGLDetectData) { return WebGLDetectData.version === EWebGLVersion.WEBGL2; };
//# sourceMappingURL=webglDetectUtils.js.map