import { getOnlyWebgl1Context, getOnlyWebgl2Context } from "../../structure/ViewSystem";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { EWebGLVersion } from "../enum/EWebGLVersion";
import { WebGLDetectData } from "./WebGLDetectData";
import { root } from "../../definition/Variable";
import { isWebgl1 as isWebgl1Utils, isWebgl2 as isWebgl2Utils } from "../utils/worker/render_file/device/webglDetectUtils";

export const detect = (WebGLDetectData: any) => {
    /*!
     for unit test
     */
    if (typeof root.webglVersion !== "undefined") {
        if (root.webglVersion === 1) {
            WebGLDetectData.version = EWebGLVersion.WEBGL1;
        }
        else {
            WebGLDetectData.version = EWebGLVersion.WEBGL2;
        }

        return;
    }

    let canvas = DomQuery.create("<canvas></canvas>").get(0),
        options: any = {},
        gl = getOnlyWebgl2Context(options, canvas);

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
}

export const isWebgl1 = () => isWebgl1Utils(WebGLDetectData);

export const isWebgl2 = () => isWebgl2Utils(WebGLDetectData);

export const getVersion = (WebGLDetectData: any) => WebGLDetectData.version;

detect(WebGLDetectData);
