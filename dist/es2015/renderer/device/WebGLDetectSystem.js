import { getOnlyWebgl1Context, getOnlyWebgl2Context } from "../../structure/ViewSystem";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { EWebGLVersion } from "../enum/EWebGLVersion";
import { WebGLDetectData } from "./WebGLDetectData";
import { root } from "../../definition/Variable";
import { isWebgl1 as isWebgl1Utils, isWebgl2 as isWebgl2Utils } from "../utils/worker/render_file/device/webglDetectUtils";
export var detect = function (WebGLDetectData) {
    if (typeof root.webglVersion !== "undefined") {
        if (root.webglVersion === 1) {
            WebGLDetectData.version = EWebGLVersion.WEBGL1;
        }
        else {
            WebGLDetectData.version = EWebGLVersion.WEBGL2;
        }
        return;
    }
    var canvas = DomQuery.create("<canvas></canvas>").get(0), options = {}, gl = getOnlyWebgl2Context(options, canvas);
    if (!gl) {
        gl = getOnlyWebgl1Context(options, canvas);
        if (!gl) {
            return null;
        }
        else {
            WebGLDetectData.version = EWebGLVersion.WEBGL1;
        }
    }
    else {
        WebGLDetectData.version = EWebGLVersion.WEBGL2;
    }
};
export var isWebgl1 = function () { return isWebgl1Utils(WebGLDetectData); };
export var isWebgl2 = function () { return isWebgl2Utils(WebGLDetectData); };
export var getVersion = function (WebGLDetectData) { return WebGLDetectData.version; };
detect(WebGLDetectData);
//# sourceMappingURL=WebGLDetectSystem.js.map