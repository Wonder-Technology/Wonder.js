module wd{
    declare var Math:any;

    export abstract class BasicTexture extends Texture implements ITextureAsset{
        protected p_sourceRegionMethod:ETextureSourceRegionMethod = null;
        @cloneAttributeAsBasicType()
        get sourceRegionMethod(){
            return this.p_sourceRegionMethod;
        }
        set sourceRegionMethod(sourceRegionMethod:ETextureSourceRegionMethod){
            this.p_sourceRegionMethod = sourceRegionMethod;
        }

        private _sourceRegion:RectRegion = null;
        @cloneAttributeAsCloneable()
        get sourceRegion(){
            return this._sourceRegion;
        }
        set sourceRegion(sourceRegion:RectRegion){
            this._sourceRegion = sourceRegion;

            this._sourceRegionDirty = true;
        }

        @cacheGetter(function(){
            return !this._sourceRegionDirty && this._sourceRegionForGLSLCache !== null;
        }, function(){
            return this._sourceRegionForGLSLCache;
        }, function(result){
            this._sourceRegionForGLSLCache = result;
            this._sourceRegionDirty = false;
        })
        get sourceRegionForGLSL(){
            if(this.sourceRegion && this.sourceRegionMethod === ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL){
                return this._convertSourceRegionToUV(this.sourceRegion);
            }

            return RectRegion.create(0, 0, 1, 1);
        }

        @cloneAttributeAsBasicType()
        public generateMipmaps:boolean = null;
        @cloneAttributeAsBasicType()
        public format:ETextureFormat = null;
        @cloneAttributeAsBasicType()
        public source:any = null;
        @cloneAttributeAsCloneable()
        public repeatRegion:RectRegion = null;
        @cloneAttributeAsBasicType()
        public sourceRegionMapping:ETextureSourceRegionMapping = null;
        @cloneAttributeAsBasicType()
        public packAlignment:number = null;
        @cloneAttributeAsBasicType()
        public unpackAlignment:number = null;
        @cloneAttributeAsBasicType()
        public flipY:boolean = null;
        @cloneAttributeAsBasicType()
        public premultiplyAlpha:boolean = null;
        @cloneAttributeAsBasicType()
        public colorspaceConversion:any = null;

        @cloneAttributeAsBasicType()
        public type:ETextureType = null;
        @cloneAttributeAsCloneable()
        public mipmaps:wdCb.Collection<any> = null;
        @cloneAttributeAsBasicType()
        public anisotropy:number = null;

        private _sourceRegionDirty:boolean = false;
        private _sourceRegionForGLSLCache:RectRegion = null;

        public initWhenCreate(...args){
            //_this.info.memory.textures ++;

            this.needUpdate = true;
        }

        public init(){
            if(this.glTexture === null){
                let gl = DeviceManager.getInstance().gl;

                this.glTexture = gl.createTexture();
            }
        }

        public dispose(){
            super.dispose();

            this._sourceRegionForGLSLCache = null;
        }

        @require(function(isSourcePowerOfTwo:boolean){
            it("if repeat texture and draw part of texture by changing texcoords in glsl, warn", () => {
                if(!BasicTextureUtils.isDrawPartOfTexture(this.sourceRegion, this.sourceRegionMethod)
                    && (this.repeatRegion && !this.repeatRegion.isEqual(Vector4.create(0, 0, 1, 1)))){
                    Log.warn("the glsl->texCoord data may be wrong due to both repeating texture and drawing part of texture by changing texcoords in glsl")
                }
            }, this);
        })
        public update(){
            var gl = DeviceManager.getInstance().gl,
                isSourcePowerOfTwo = this.isSourcePowerOfTwo();

            /*!
            refer to <<WebGL Insights>> -> p 41:
             The pixel format is only one of several factors that could require a conversion. Other factors are controlled by pixelStorei parameters. They are the stride (UNPACK_ ALIGNMENT), the alpha channel premultiplication status (UNPACK_PREMULTIPLY_ ALPHA_WEBGL), and the vertical flipping (UNPACK_FLIP_Y_WEBGL).
             For the tex[Sub]Image2D overloads taking an HTML element or canvas ImageData, another case needs to be mentioned: the case of opting out from colorspace conversion. This is achieved by setting another pixelStorei parameter, UNPACK_ COLORSPACE_CONVERSION_WEBGL, to the value NONE. This is implemented by re- decoding the image from its original stream, from scratch. This, of course, is costly.
             There is one particularly nasty corner case with UNPACK_PREMULTIPLY_ALPHA_ WEBGL that may also require re-decoding an image from scratch. This is the case when the image source is an HTML <img> element that was already premultiplied in the browser’s memory (which is very commonly done by browsers), and UNPACK_PREMULTIPLY_ ALPHA_WEBGL has its default value of false. Un-premultiplying a previously premul- tiplied element doesn’t exactly recover the original image, so the WebGL spec requires implementing this by re-decoding the image from scratch, like we described above for the case where UNPACK_COLORSPACE_CONVERSION_WEBGL is set to NONE.
             For the tex[Sub]Image2D overloads taking an ArrayBufferView, things are a lot simpler: There is no possibility of format or stride or colorspace conversion, no possibility of un-premultiplication, and in the default state there is no conversion at all. Nondefault pixelStorei parameters can still require conversions: Setting UNPACK_FLIP_Y_ WEBGL or UNPACK_PREMULTIPLY_ALPHA_WEBGL to true will still require a flip- ping or a premultiplication, respectively.
             A practical takeaway from this conversation is that the default state of UNPACK_ PREMULTIPLY_ALPHA_WEBGL, set to the value false, is best for tex[Sub] Image2D overloads taking an ArrayBufferView or other image sources that are known not to be premultiplied, such as canvas ImageData, but can be very painful for the overloads taking an HTML element, which typically are premultiplied. For those, setting UNPACK_PREMULTIPLY_ALPHA_WEBGL to true allows for cheaper texture uploads with more accurate results.
             */
            //todo optimize: add dirty to avoid set the default value?
            gl.pixelStorei(gl.PACK_ALIGNMENT, this.packAlignment);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.unpackAlignment);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, this.colorspaceConversion);

            if(this.needClampMaxSize()){
                this.clampToMaxSize();

                isSourcePowerOfTwo = this.isSourcePowerOfTwo();

                if(!isSourcePowerOfTwo){
                    Log.warn("texture size is not power of two after clampToMaxSize()");
                }
            }

            this.setTextureParameters( gl[this.target], isSourcePowerOfTwo);

            /*! optimize in ANGLE:
             - Create new textures, rather than changing the dimensions or format of old ones.
             - if only the pixel data contained in a texture need to be updated, it is best to reuse the texture.
             the additional overhead is only incurred when updating texture format or dimensions, because these require redefinition of the mipmap chain.
             */

            this.allocateSourceToTexture(isSourcePowerOfTwo);

            if (this.generateMipmaps && isSourcePowerOfTwo) {
                gl.generateMipmap(gl[this.target]);
            }

            this.needUpdate = false;

            return this;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, EVariableType.SAMPLER_2D);
        }

        protected abstract allocateSourceToTexture(isSourcePowerOfTwo:boolean);

        @virtual
        protected needClampMaxSize(){
            if(!this.source){
                return false;
            }

            return BasicTextureUtils.needClampMaxSize(GPUDetector.getInstance().maxTextureSize, this.source.width, this.source.height);
        }

        protected clampToMaxSize(){
            this.source = BasicTextureUtils.clampToMaxSize(this.source, GPUDetector.getInstance().maxTextureSize);
        }

        protected setTextureParameters(textureType, isSourcePowerOfTwo){
            super.setTextureParameters(textureType, isSourcePowerOfTwo);

            this._setAnisotropy(textureType);
        }

        protected isSourcePowerOfTwo(){
            return BasicTextureUtils.isSourcePowerOfTwo(this.sourceRegion, this.sourceRegionMethod, this.width, this.height);
        }

        private _setAnisotropy(textureType){
            var gpu = GPUDetector.getInstance(),
                gl = DeviceManager.getInstance().gl;

            if(!gpu.extensionTextureFilterAnisotropic){
                return;
            }

            if (this.anisotropy > 1) {
                gl.texParameterf(textureType, gpu.extensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(this.anisotropy, gpu.maxAnisotropy));
            }
        }

        //todo optimize: add dirty cache
        private _convertSourceRegionToUV(sourceRegion:RectRegion){
            if(this.sourceRegionMapping === ETextureSourceRegionMapping.CANVAS){
                return GlobalTextureUtils.convertSourceRegionCanvasMapToUV(sourceRegion, this.width, this.height);
            }
            else if(this.sourceRegionMapping === ETextureSourceRegionMapping.UV){
                return sourceRegion;
            }
        }
    }
}

