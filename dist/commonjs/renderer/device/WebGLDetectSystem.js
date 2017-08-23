"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewSystem_1 = require("../../structure/ViewSystem");
var DomQuery_1 = require("wonder-commonlib/dist/commonjs/utils/DomQuery");
var EWebGLVersion_1 = require("../enum/EWebGLVersion");
var WebGLDetectData_1 = require("./WebGLDetectData");
var Variable_1 = require("../../definition/Variable");
var webglDetectUtils_1 = require("../utils/worker/render_file/device/webglDetectUtils");
exports.detect = function (WebGLDetectData) {
    if (typeof Variable_1.root.webglVersion !== "undefined") {
        if (Variable_1.root.webglVersion === 1) {
            WebGLDetectData.version = EWebGLVersion_1.EWebGLVersion.WEBGL1;
        }
        else {
            WebGLDetectData.version = EWebGLVersion_1.EWebGLVersion.WEBGL2;
        }
        return;
    }
    var canvas = DomQuery_1.DomQuery.create("<canvas></canvas>").get(0), options = {}, gl = ViewSystem_1.getOnlyWebgl2Context(options, canvas);
    if (!gl) {
        gl = ViewSystem_1.getOnlyWebgl1Context(options, canvas);
        if (!gl) {
            return null;
        }
        else {
            WebGLDetectData.version = EWebGLVersion_1.EWebGLVersion.WEBGL1;
        }
    }
    else {
        WebGLDetectData.version = EWebGLVersion_1.EWebGLVersion.WEBGL2;
    }
};
exports.isWebgl1 = function () { return webglDetectUtils_1.isWebgl1(WebGLDetectData_1.WebGLDetectData); };
exports.isWebgl2 = function () { return webglDetectUtils_1.isWebgl2(WebGLDetectData_1.WebGLDetectData); };
exports.getVersion = function (WebGLDetectData) { return WebGLDetectData.version; };
exports.detect(WebGLDetectData_1.WebGLDetectData);
//# sourceMappingURL=WebGLDetectSystem.js.map