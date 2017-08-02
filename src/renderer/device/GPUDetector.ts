import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { singleton } from "../../definition/typescript/decorator/singleton";
import { Log } from "../../utils/Log";
import { Map } from "immutable";

@singleton()
@registerClass("GPUDetector")
export class GPUDetector {
    public static getInstance(): any { }

    private constructor() { }

    public maxTextureUnit: number = null;
    public maxTextureSize: number = null;
    public maxCubemapTextureSize: number = null;
    public maxAnisotropy: number = null;
    public maxBoneCount: number = null;
    public extensionCompressedTextureS3TC: any = null;
    public extensionTextureFilterAnisotropic: any = null;
    public extensionInstancedArrays: any = null;
    public extensionUintIndices: boolean = null;
    public extensionDepthTexture: boolean = null;
    public extensionVAO: any = null;
    public extensionStandardDerivatives: boolean = null;
    public extensionColorBufferFloat: boolean = null;
    public precision: number = null;

    private _isDetected: boolean = false;

    //todo test
    public detect(state: Map<any, any>, getGL: Function, DeviceManagerDataFromSystem: any) {
        var gl = getGL(DeviceManagerDataFromSystem, state);

        this._isDetected = true;

        this._detectExtension(state, gl);
        this._detectCapabilty(state, gl);

        return state;
    }

    private _detectExtension(state: Map<any, any>, gl) {
        this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc", state, gl);
        this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic", state, gl);
        this.extensionInstancedArrays = this._getExtension("ANGLE_instanced_arrays", state, gl);
        this.extensionUintIndices = this._getExtension("element_index_uint", state, gl);
        this.extensionDepthTexture = this._getExtension("depth_texture", state, gl);
        this.extensionVAO = this._getExtension("vao", state, gl);
        this.extensionStandardDerivatives = this._getExtension("standard_derivatives", state, gl);

        //todo separate from webgl2
        this.extensionColorBufferFloat = this._getExtension("EXT_color_buffer_float", state, gl);
    }

    private _detectCapabilty(state: Map<any, any>, gl: WebGLRenderingContext) {
        this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxAnisotropy = this._getMaxAnisotropy(state, gl);

        this.maxBoneCount = this._getMaxBoneCount(state, gl);

        //todo use map instead
        // alert("maxBoneCount:" + this.maxBoneCount);

        this._detectPrecision(state, gl);
    }

    private _getExtension(name: string, state: Map<any, any>, gl: WebGLRenderingContext) {
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

    private _getMaxBoneCount(state: Map<any, any>, gl: WebGLRenderingContext) {
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

    private _getMaxAnisotropy(state: Map<any, any>, gl: WebGLRenderingContext) {
        var extension = this.extensionTextureFilterAnisotropic;

        return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
    }

    private _detectPrecision(state: Map<any, any>, gl: WebGLRenderingContext) {
        if (!gl.getShaderPrecisionFormat) {
            this.precision = EGPUPrecision.HIGHP;

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
    }
}

export enum EGPUPrecision {
    HIGHP,
    MEDIUMP,
    LOWP
}