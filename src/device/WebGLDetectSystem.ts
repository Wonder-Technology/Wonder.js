import { getOnlyWebgl1Context, getOnlyWebgl2Context } from "../structure/ViewSystem";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { EWebGLVersion } from "../renderer/device/EWebGLVersion";
import { WebGLDetectData } from "./WebGLDetectData";
import { root } from "../definition/Variable";

export var detect = (WebGLDetectData: any) => {
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
        options:any = {},
        gl = getOnlyWebgl2Context(options, canvas);

    if (!gl) {
        gl = getOnlyWebgl1Context(options, canvas);

        if(!gl){
            return null;
        }
        else{
            WebGLDetectData.version = EWebGLVersion.WEBGL1;
        }
    }
    else{
        WebGLDetectData.version = EWebGLVersion.WEBGL2;
    }
}

export var isWebgl1 = () => WebGLDetectData.version === EWebGLVersion.WEBGL1;

export var isWebgl2 = () => WebGLDetectData.version === EWebGLVersion.WEBGL2;

detect(WebGLDetectData);
