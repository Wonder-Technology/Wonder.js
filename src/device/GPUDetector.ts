/// <reference path="../definitions.d.ts"/>
module dy {
    //todo check extension/capability support
    export class GPUDetector {
        private static _instance:GPUDetector = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        get gl() {
            return Director.getInstance().gl;
        }

        private _maxTextureUnit:number = null;
        get maxTextureUnit(){
            this._ensureDetected();

            return this._maxTextureUnit;
        }

        private _maxTextureSize:number = null;
        get maxTextureSize(){
            this._ensureDetected();

            return this._maxTextureSize;
        }

        private _maxAnisotropy:number = null;
        get maxAnisotropy(){
            this._ensureDetected();

            return this._maxAnisotropy;
        }

        public extensionCompressedTextureS3TC:any = null;
        public extensionTextureFilterAnisotropic:any = null;

        private _isDetected:boolean = false;

        public detect() {
            this._isDetected = true;

            this._detectExtension();
            this._detectCapabilty();
        }

        private _detectExtension() {
            //this.extensionTextureFloat = gl.getExtension( "OES_texture_float" );
            //this.extensionTextureFloatLinear = gl.getExtension( "OES_texture_float_linear" );
            //this.extensionStandardDerivatives = gl.getExtension( "OES_standard_derivatives" );
            //
            //this.extensionTextureFilterAnisotropic = gl.getExtension( "EXT_texture_filter_anisotropic" ) || gl.getExtension( "MOZ_EXT_texture_filter_anisotropic" ) || gl.getExtension( "WEBKIT_EXT_texture_filter_anisotropic" );

            this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc");

            this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic");

            //this.extensionElementIndexUint = gl.getExtension( "OES_element_index_uint" );


            //if ( this.extensionTextureFloat === null ) {
            //
            //    dyCb.Log.log( "Float textures not supported." );
            //
            //}
            //
            //if ( this.extensionStandardDerivatives === null ) {
            //
            //    dyCb.Log.log( "Standard derivatives not supported." );
            //
            //}
            //
            //if ( this.extensionTextureFilterAnisotropic === null ) {
            //
            //    dyCb.Log.log( "Anisotropic texture filtering not supported." );
            //
            //}

            //if ( this.extensionCompressedTextureS3TC === null ) {
            //    dyCb.Log.log( "S3TC compressed textures not supported." );
            //}

            //if ( this.extensionElementIndexUint === null ) {
            //
            //    dyCb.Log.log( "elementindex as unsigned integer not supported." );
            //
            //}
            //
            //if ( gl.getShaderPrecisionFormat === undefined ) {
            //
            //    gl.getShaderPrecisionFormat = function () {
            //
            //        return {
            //            "rangeMin": 1,
            //            "rangeMax": 1,
            //            "precision": 1
            //        };
            //
            //    }
            //}
            //
            //if ( _logarithmicDepthBuffer ) {
            //
            //    this.extensionFragDepth = gl.getExtension( "EXT_frag_depth" );
            //
            //}
        }

        private _detectCapabilty() {
            var gl = this.gl;

            this._maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            this._maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            this._maxAnisotropy = this._getMaxAnisotropy();
        }

        private _getExtension(name:string) {
            //
            //
            //if ( extensions[ name ] !== undefined ) {
            //
            //    return extensions[ name ];
            //
            //}

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

            //if ( extension === null ) {
            //
            //    THREE.warn( "THREE.WebGLRenderer: " + name + " extension not supported." );
            //
            //}

            //extensions[ name ] = extension;

            return extension;
        }

        private _getMaxAnisotropy() {
            var extension = this.extensionTextureFilterAnisotropic,
                gl = this.gl;

            return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
        }

        private _ensureDetected(){
            if(!this._isDetected){
                this.detect();
            }
        }
    }
}
//// GPU capabilities
//
//var _maxTextures = gl.getParameter( gl.MAX_TEXTURE_IMAGE_UNITS );
//var _maxVertexTextures = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
//var _maxTextureSize = gl.getParameter( gl.MAX_TEXTURE_SIZE );
//var _maxCubemapSize = gl.getParameter( gl.MAX_CUBE_MAP_TEXTURE_SIZE );
//
//var _maxAnisotropy = this.extensionTextureFilterAnisotropic ? gl.getParameter( this.extensionTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT ) : 0;
//
//var _supportsVertexTextures = ( _maxVertexTextures > 0 );
//var _supportsBoneTextures = _supportsVertexTextures && this.extensionTextureFloat;
//
//var _compressedTextureFormats = this.extensionCompressedTextureS3TC ? gl.getParameter( gl.COMPRESSED_TEXTURE_FORMATS ) : [];
//
////
//
//var _vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat( gl.VERTEX_SHADER, gl.HIGH_FLOAT );
//var _vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat( gl.VERTEX_SHADER, gl.MEDIUM_FLOAT );
//var _vertexShaderPrecisionLowpFloat = gl.getShaderPrecisionFormat( gl.VERTEX_SHADER, gl.LOW_FLOAT );
//
//var _fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.HIGH_FLOAT );
//var _fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT );
//var _fragmentShaderPrecisionLowpFloat = gl.getShaderPrecisionFormat( gl.FRAGMENT_SHADER, gl.LOW_FLOAT );
//
//// clamp precision to maximum available
//
//var highpAvailable = _vertexShaderPrecisionHighpFloat.precision > 0 && _fragmentShaderPrecisionHighpFloat.precision > 0;
//var mediumpAvailable = _vertexShaderPrecisionMediumpFloat.precision > 0 && _fragmentShaderPrecisionMediumpFloat.precision > 0;
//
//if ( _precision === "highp" && ! highpAvailable ) {
//
//    if ( mediumpAvailable ) {
//
//        _precision = "mediump";
//        console.warn( "highp not supported, using mediump." );
//
//    } else {
//
//        _precision = "lowp";
//        console.warn( "highp and mediump not supported, using lowp." );
//
//    }
//
//}
//
//if ( _precision === "mediump" && ! mediumpAvailable ) {
//
//    _precision = "lowp";
//    console.warn( "mediump not supported, using lowp." );
//
//}

