/// <reference path="../../definitions.d.ts"/>
module dy{
    export abstract class BasicTexture extends Texture implements ITextureAsset{
        protected p_sourceRegionMethod:TextureSourceRegionMethod = null;
        get sourceRegionMethod(){
            return this.p_sourceRegionMethod;
        }
        set sourceRegionMethod(sourceRegionMethod:TextureSourceRegionMethod){
            this.p_sourceRegionMethod = sourceRegionMethod;
        }

        public generateMipmaps:boolean = null;
        public format:TextureFormat = null;
        public source:any = null;
        public repeatRegion:RectRegion = null;
        public sourceRegion:RectRegion = null;
        public sourceRegionMapping:TextureSourceRegionMapping = null;
        public flipY:boolean = null;
        public premultiplyAlpha:boolean = null;
        public unpackAlignment:number = null;
        public type:TextureType = null;
        public mipmaps:dyCb.Collection<any> = null;
        public anisotropy:number = null;
        public needUpdate:boolean = null;

        public init(){
            var gl = DeviceManager.getInstance().gl;
            //texture.addEventListener( "dispose", onTextureDispose );

            this.glTexture = gl.createTexture();

            //_this.info.memory.textures ++;

            return this;
        }

        public update(index:number){
            var gl = DeviceManager.getInstance().gl,
                isSourcePowerOfTwo = this.isSourcePowerOfTwo();

            this.bindToUnit(index);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);


            //todo not set UNPACK_PREMULTIPLY_ALPHA_WEBGL,UNPACK_ALIGNMENT when cubemap?
            gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha );
            gl.pixelStorei( gl.UNPACK_ALIGNMENT, this.unpackAlignment );


            if(this.isCheckMaxSize()){
                this.clampToMaxSize();
            }

            this.setTextureParameters( gl[this.target], isSourcePowerOfTwo);

            this.allocateSourceToTexture(isSourcePowerOfTwo);

            if (this.generateMipmaps && isSourcePowerOfTwo) {
                gl.generateMipmap(gl[this.target]);
            }

            this.needUpdate = false;

            return this;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, VariableType.SAMPLER_2D);
        }

        protected sendOtherData(program:Program, unit:number){
            var sourceRegion = null;

            if(this.sourceRegion && this.sourceRegionMethod === TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL){
                sourceRegion = this._convertSourceRegionToUV();
            }
            else{
                sourceRegion = RectRegion.create(0, 0, 1, 1);
            }
            program.sendUniformData("u_sourceRegion", VariableType.FLOAT_4, sourceRegion);

            program.sendUniformData("u_repeatRegion", VariableType.FLOAT_4, this.repeatRegion);

            return this;
        }

        protected abstract allocateSourceToTexture(isSourcePowerOfTwo:boolean);

        protected isCheckMaxSize(){
            return true;
        }

        protected clampToMaxSize(){
            this.source = this.clampToMaxSizeHelper(this.source, GPUDetector.getInstance().maxTextureSize);
        }

        protected clampToMaxSizeHelper (source:any, maxSize:number) {
            var maxDimension = null,
                newWidth = null,
                newHeight = null,
                canvas = null,
                ctx = null;

            if(!source){
                return null;
            }

            if(source.width <= maxSize && source.height <= maxSize) {
                return source;
            }


            // Warning: Scaling through the canvas will only work with sources that use
            // premultiplied alpha.

            maxDimension = Math.max( source.width, source.height );
            newWidth = Math.floor( source.width * maxSize / maxDimension );
            newHeight = Math.floor( source.height * maxSize / maxDimension );

            canvas = this._createResizedCanvas();

            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx = canvas.getContext( "2d" );
            ctx.drawImage( source, 0, 0, source.width, source.height, 0, 0, newWidth, newHeight );

            Log.log(`source is too big (${source.width}x${source.height}). Resized to ${canvas.width}x${canvas.height}.`);

            return canvas;
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            this._setAnisotropy(textureType);
        }

        private _setAnisotropy(textureType){
            var gpu = GPUDetector.getInstance(),
                gl = DeviceManager.getInstance().gl;

            if(!gpu.extensionTextureFilterAnisotropic){
                return;
            }
            //todo halfFloat/float for texture?(threejs->Ocean.js use it!)
            //if (this.type !== THREE.FloatType && texture.type !== THREE.HalfFloatType ) {


            if (this.anisotropy > 1) {
                gl.texParameterf(textureType, gpu.extensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(this.anisotropy, gpu.maxAnisotropy));
                //gl.texParameterf(textureType, 34046, Math.min(this.anisotropy, gpu.maxAnisotropy));
                //texture.__currentAnisotropy = texture.anisotropy;

                //}
            }
        }


        private _createResizedCanvas(){
            return document.createElement( "canvas" );
        }

        private _convertSourceRegionCanvasMapToUV(sourceRegion:RectRegion){
            var width = this.width,
                height = this.height,
                region:RectRegion = null;

            region = RectRegion.create(
                sourceRegion.x / width,
                sourceRegion.y / height,
                sourceRegion.width / width,
                sourceRegion.height / height
            );

            region.y = 1 - region.y - region.height;

            return region;
        }

        //todo optimize: add dirty cache
        private _convertSourceRegionToUV(){
            if(this.sourceRegionMapping === TextureSourceRegionMapping.CANVAS){
                return this._convertSourceRegionCanvasMapToUV(this.sourceRegion);
            }
            else if(this.sourceRegionMapping === TextureSourceRegionMapping.UV){
                return this.sourceRegion;
            }
        }
    }
}

