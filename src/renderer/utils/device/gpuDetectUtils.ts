import { Map } from "immutable";
import { Log } from "../../../utils/Log";
import { EGPUPrecision } from "../../enum/EGPUPrecision";

export var detectExtension = (state: Map<any, any>, gl:any, GPUDetectDataFromSystem:any) => {
    GPUDetectDataFromSystem.extensionCompressedTextureS3TC = getExtension("WEBGL_compressed_texture_s3tc", state, gl);
    GPUDetectDataFromSystem.extensionTextureFilterAnisotropic = getExtension("EXT_texture_filter_anisotropic", state, gl);
    GPUDetectDataFromSystem.extensionInstancedArrays = getExtension("ANGLE_instanced_arrays", state, gl);
    GPUDetectDataFromSystem.extensionUintIndices = getExtension("element_index_uint", state, gl);
    GPUDetectDataFromSystem.extensionDepthTexture = getExtension("depth_texture", state, gl);
    GPUDetectDataFromSystem.extensionVAO = getExtension("vao", state, gl);
    GPUDetectDataFromSystem.extensionStandardDerivatives = getExtension("standard_derivatives", state, gl);
}

export var detectCapabilty = (state: Map<any, any>, gl: any, GPUDetectDataFromSystem:any) => {
    GPUDetectDataFromSystem.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    GPUDetectDataFromSystem.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    GPUDetectDataFromSystem.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    GPUDetectDataFromSystem.maxAnisotropy = _getMaxAnisotropy(state, gl, GPUDetectDataFromSystem);

    GPUDetectDataFromSystem.maxBoneCount = _getMaxBoneCount(state, gl);

    //todo use map instead
    // alert("maxBoneCount:" + GPUDetectDataFromSystem.maxBoneCount);

    _detectPrecision(state, gl, GPUDetectDataFromSystem);
}

var _getMaxBoneCount = (state: Map<any, any>, gl: any) => {
    var numUniforms: number = null,
        maxBoneCount: number = null;

    // Calculate a estimate of the maximum number of bones that can be uploaded to the GPU
    // based on the number of available uniforms and the number of uniforms required for non-
    // bone data.  This is based off of the Standard shader.  A user defined shader may have
    // even less space available for bones so this calculated value can be overridden via
    numUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    numUniforms -= 4 * 4; // Model, view, projection and shadow matrices
    // numUniforms -= 8;     // 8 lights max, each specifying a position vector
    numUniforms -= 1;     // Eye position
    numUniforms -= 4 * 4; // Up to 4 texture transforms

    maxBoneCount = Math.floor(numUniforms / 4);

    // Put a limit on the number of supported bones before skin partitioning must be performed
    // Some GPUs have demonstrated performance issues if the number of vectors allocated to the
    // skin matrix palette is left unbounded
    return Math.min(maxBoneCount, 128);
}

var _getMaxAnisotropy = (state: Map<any, any>, gl: any, GPUDetectDataFromSystem:any) => {
    var extension = GPUDetectDataFromSystem.extensionTextureFilterAnisotropic;

    return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
}

var _detectPrecision = (state: Map<any, any>, gl: any, GPUDetectDataFromSystem:any) => {
    if (!gl.getShaderPrecisionFormat) {
        GPUDetectDataFromSystem.precision = EGPUPrecision.HIGHP;

        return;
    }

    let vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT),
        vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT),
        //vertexShaderPrecisionLowpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT),
        fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT),
        fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT),
        //fragmentShaderPrecisionLowpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT),
        highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0,
        mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;

    if (!highpAvailable) {
        if (mediumpAvailable) {
            GPUDetectDataFromSystem.precision = EGPUPrecision.MEDIUMP;
            Log.warn(Log.info.FUNC_NOT_SUPPORT("gpu", "highp, using mediump"));
        }
        else {
            GPUDetectDataFromSystem.precision = EGPUPrecision.LOWP;
            Log.warn(Log.info.FUNC_NOT_SUPPORT("gpu", "highp and mediump, using lowp"));
        }
    }
    else {
        GPUDetectDataFromSystem.precision = EGPUPrecision.HIGHP;
    }
}

export var getExtension = (name: string, state: Map<any, any>, gl: any) => {
    var extension: any = null;

    switch (name) {
        case "EXT_texture_filter_anisotropic":
            extension = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;
        case "WEBGL_compressed_texture_s3tc":
            extension = gl.getExtension("WEBGL_compressed_texture_s3tc") || gl.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;
        case "WEBGL_compressed_texture_pvrtc":
            extension = gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;
        case "ANGLE_instanced_arrays":
            extension = gl.getExtension("ANGLE_instanced_arrays");
            break;
        case "element_index_uint":
            extension = gl.getExtension("OES_element_index_uint") !== null;
            break;
        case "depth_texture":
            extension = gl.getExtension("WEBKIT_WEBGL_depth_texture") !== null || gl.getExtension("WEBGL_depth_texture") !== null;
            break;
        case "vao":
            extension = gl.getExtension("OES_vertex_array_object");
            break;
        case "standard_derivatives":
            extension = gl.getExtension("OES_standard_derivatives");
            break;
        default:
            extension = gl.getExtension(name);
            break;
    }

    return extension;
}
