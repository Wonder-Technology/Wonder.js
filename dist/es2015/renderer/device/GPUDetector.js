var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { Log } from "../../utils/Log";
var GPUDetector = (function () {
    function GPUDetector() {
        this.maxTextureUnit = null;
        this.maxTextureSize = null;
        this.maxCubemapTextureSize = null;
        this.maxAnisotropy = null;
        this.maxBoneCount = null;
        this.extensionCompressedTextureS3TC = null;
        this.extensionTextureFilterAnisotropic = null;
        this.extensionInstancedArrays = null;
        this.extensionUintIndices = null;
        this.extensionDepthTexture = null;
        this.extensionVAO = null;
        this.extensionStandardDerivatives = null;
        this.precision = null;
        this._isDetected = false;
    }
    GPUDetector.getInstance = function () { };
    GPUDetector.prototype.detect = function (state, getGL, DeviceManagerDataFromSystem) {
        var gl = getGL(DeviceManagerDataFromSystem, state);
        this._isDetected = true;
        this._detectExtension(state, gl);
        this._detectCapabilty(state, gl);
        return state;
    };
    GPUDetector.prototype._detectExtension = function (state, gl) {
        this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc", state, gl);
        this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic", state, gl);
        this.extensionInstancedArrays = this._getExtension("ANGLE_instanced_arrays", state, gl);
        this.extensionUintIndices = this._getExtension("element_index_uint", state, gl);
        this.extensionDepthTexture = this._getExtension("depth_texture", state, gl);
        this.extensionVAO = this._getExtension("vao", state, gl);
        this.extensionStandardDerivatives = this._getExtension("standard_derivatives", state, gl);
    };
    GPUDetector.prototype._detectCapabilty = function (state, gl) {
        this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxAnisotropy = this._getMaxAnisotropy(state, gl);
        this.maxBoneCount = this._getMaxBoneCount(state, gl);
        this._detectPrecision(state, gl);
    };
    GPUDetector.prototype._getExtension = function (name, state, gl) {
        var extension = null;
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
    };
    GPUDetector.prototype._getMaxBoneCount = function (state, gl) {
        var numUniforms = null, maxBoneCount = null;
        numUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
        numUniforms -= 4 * 4;
        numUniforms -= 1;
        numUniforms -= 4 * 4;
        maxBoneCount = Math.floor(numUniforms / 4);
        return Math.min(maxBoneCount, 128);
    };
    GPUDetector.prototype._getMaxAnisotropy = function (state, gl) {
        var extension = this.extensionTextureFilterAnisotropic;
        return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
    };
    GPUDetector.prototype._detectPrecision = function (state, gl) {
        if (!gl.getShaderPrecisionFormat) {
            this.precision = EGPUPrecision.HIGHP;
            return;
        }
        var vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT), vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT), fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT), fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT), highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0, mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
        if (!highpAvailable) {
            if (mediumpAvailable) {
                this.precision = EGPUPrecision.MEDIUMP;
                Log.warn(Log.info.FUNC_NOT_SUPPORT("gpu", "highp, using mediump"));
            }
            else {
                this.precision = EGPUPrecision.LOWP;
                Log.warn(Log.info.FUNC_NOT_SUPPORT("gpu", "highp and mediump, using lowp"));
            }
        }
        else {
            this.precision = EGPUPrecision.HIGHP;
        }
    };
    GPUDetector = __decorate([
        singleton(),
        registerClass("GPUDetector")
    ], GPUDetector);
    return GPUDetector;
}());
export { GPUDetector };
export var EGPUPrecision;
(function (EGPUPrecision) {
    EGPUPrecision[EGPUPrecision["HIGHP"] = 0] = "HIGHP";
    EGPUPrecision[EGPUPrecision["MEDIUMP"] = 1] = "MEDIUMP";
    EGPUPrecision[EGPUPrecision["LOWP"] = 2] = "LOWP";
})(EGPUPrecision || (EGPUPrecision = {}));
//# sourceMappingURL=GPUDetector.js.map