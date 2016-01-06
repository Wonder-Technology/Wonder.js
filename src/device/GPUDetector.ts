module wd {
    //todo check extension/capability support
    export class GPUDetector {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        get gl() {
            return DeviceManager.getInstance().gl;
        }

        public maxTextureUnit:number = null;
        public maxTextureSize:number = null;
        public maxCubemapTextureSize:number = null;
        public maxAnisotropy:number = null;
        public extensionCompressedTextureS3TC:any = null;
        public extensionTextureFilterAnisotropic:any = null;
        public precision:number = null;

        private _isDetected:boolean = false;

        public detect() {
            this._isDetected = true;

            this._detectExtension();
            this._detectCapabilty();
        }

        private _detectExtension() {
            this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc");

            this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic");
        }

        private _detectCapabilty() {
            var gl = this.gl;

            this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
            this.maxAnisotropy = this._getMaxAnisotropy();
            this._detectPrecision();
        }

        private _getExtension(name:string) {
            var extension,
                gl = this.gl;

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
                default:
                    extension = gl.getExtension(name);
            }

            return extension;
        }

        private _getMaxAnisotropy() {
            var extension = this.extensionTextureFilterAnisotropic,
                gl = this.gl;

            return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
        }

        private _detectPrecision() {
            var gl = this.gl,
                vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT),
                vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT),
                //vertexShaderPrecisionLowpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT),
            fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT),
                fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT),
                //fragmentShaderPrecisionLowpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT),
            highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0,
            mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;

            if (!highpAvailable) {
                if (mediumpAvailable) {
                    this.precision = GPUPrecision.MEDIUMP;
                    Log.warn(Log.info.FUNC_NOT_SUPPORT("gpu", "highp, using mediump"));
                }
                else {
                    this.precision = GPUPrecision.LOWP;
                    Log.warn(Log.info.FUNC_NOT_SUPPORT("gpu", "highp and mediump, using lowp"));
                }
            }
            else{
                this.precision = GPUPrecision.HIGHP;
            }
        }
    }

    export enum GPUPrecision{
        HIGHP,
        MEDIUMP,
        LOWP
    }
}
