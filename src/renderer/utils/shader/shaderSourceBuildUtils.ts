import { GLSLChunk } from "../../shader/chunk/ShaderChunk";
import { EGPUPrecision } from "../../enum/EGPUPrecision";
import { getPrecision } from "../device/gpuDetectUtils";

export var getPrecisionSource = (lowp_fragment: GLSLChunk, mediump_fragment: GLSLChunk, highp_fragment: GLSLChunk, GPUDetectData:any) => {
    var precision = getPrecision(GPUDetectData),
        result = null;

    switch (precision) {
        case EGPUPrecision.HIGHP:
            result = highp_fragment.top;
            break;
        case EGPUPrecision.MEDIUMP:
            result = mediump_fragment.top;
            break;
        case EGPUPrecision.LOWP:
            result = lowp_fragment.top;
            break;
        default:
            result = "";
            break;
    }

    return result;
}

