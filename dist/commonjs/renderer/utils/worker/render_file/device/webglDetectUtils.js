"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EWebGLVersion_1 = require("../../../../enum/EWebGLVersion");
exports.isWebgl1 = function (WebGLDetectData) { return WebGLDetectData.version === EWebGLVersion_1.EWebGLVersion.WEBGL1; };
exports.isWebgl2 = function (WebGLDetectData) { return WebGLDetectData.version === EWebGLVersion_1.EWebGLVersion.WEBGL2; };
//# sourceMappingURL=webglDetectUtils.js.map