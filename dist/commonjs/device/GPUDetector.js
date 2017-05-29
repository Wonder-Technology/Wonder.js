"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var singleton_1 = require("../definition/typescript/decorator/singleton");
var Log_1 = require("../utils/Log");
var DeviceManagerSystem_1 = require("./DeviceManagerSystem");
var DeviceManagerData_1 = require("./DeviceManagerData");
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
    GPUDetector.prototype.detect = function (state) {
        this._isDetected = true;
        this._detectExtension(state);
        this._detectCapabilty(state);
        return state;
    };
    GPUDetector.prototype._detectExtension = function (state) {
        this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc", state);
        this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic", state);
        this.extensionInstancedArrays = this._getExtension("ANGLE_instanced_arrays", state);
        this.extensionUintIndices = this._getExtension("element_index_uint", state);
        this.extensionDepthTexture = this._getExtension("depth_texture", state);
        this.extensionVAO = this._getExtension("vao", state);
        this.extensionStandardDerivatives = this._getExtension("standard_derivatives", state);
    };
    GPUDetector.prototype._detectCapabilty = function (state) {
        var gl = DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state);
        this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxAnisotropy = this._getMaxAnisotropy(state);
        this.maxBoneCount = this._getMaxBoneCount(state);
        this._detectPrecision(state);
    };
    GPUDetector.prototype._getExtension = function (name, state) {
        var extension, gl = DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state);
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
    GPUDetector.prototype._getMaxBoneCount = function (state) {
        var gl = DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state), numUniforms = null, maxBoneCount = null;
        numUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
        numUniforms -= 4 * 4;
        numUniforms -= 1;
        numUniforms -= 4 * 4;
        maxBoneCount = Math.floor(numUniforms / 4);
        return Math.min(maxBoneCount, 128);
    };
    GPUDetector.prototype._getMaxAnisotropy = function (state) {
        var extension = this.extensionTextureFilterAnisotropic, gl = DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state);
        return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
    };
    GPUDetector.prototype._detectPrecision = function (state) {
        var gl = DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, state);
        if (!gl.getShaderPrecisionFormat) {
            this.precision = EGPUPrecision.HIGHP;
            return;
        }
        var vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT), vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT), fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT), fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT), highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0, mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
        if (!highpAvailable) {
            if (mediumpAvailable) {
                this.precision = EGPUPrecision.MEDIUMP;
                Log_1.Log.warn(Log_1.Log.info.FUNC_NOT_SUPPORT("gpu", "highp, using mediump"));
            }
            else {
                this.precision = EGPUPrecision.LOWP;
                Log_1.Log.warn(Log_1.Log.info.FUNC_NOT_SUPPORT("gpu", "highp and mediump, using lowp"));
            }
        }
        else {
            this.precision = EGPUPrecision.HIGHP;
        }
    };
    return GPUDetector;
}());
GPUDetector = __decorate([
    singleton_1.singleton(),
    registerClass_1.registerClass("GPUDetector")
], GPUDetector);
exports.GPUDetector = GPUDetector;
var EGPUPrecision;
(function (EGPUPrecision) {
    EGPUPrecision[EGPUPrecision["HIGHP"] = 0] = "HIGHP";
    EGPUPrecision[EGPUPrecision["MEDIUMP"] = 1] = "MEDIUMP";
    EGPUPrecision[EGPUPrecision["LOWP"] = 2] = "LOWP";
})(EGPUPrecision = exports.EGPUPrecision || (exports.EGPUPrecision = {}));
//# sourceMappingURL=GPUDetector.js.map