/// <reference path="../definitions.d.ts"/>
module dy{
    export class Texture{
        public static defaultTexture = null;

        constructor(source:any = Texture.defaultTexture){
            this.source = source;
        }

        private _width:number = null;
        get width(){
            return this._width === null? (this.source? this.source.width : null) : this._width;
        }
        set width(width:number){
            this._width = width;
        }

        private _height:number = null;
        get height(){
            return this._height === null? (this.source? this.source.height : null) : this._height;
        }
        set height(height:number){
            this._height = height;
        }

        protected p_sourceRegionMethod:TextureSourceRegionMethod = TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
        get sourceRegionMethod(){
            return this.p_sourceRegionMethod;
        }
        set sourceRegionMethod(sourceRegionMethod:TextureSourceRegionMethod){
            this.p_sourceRegionMethod = sourceRegionMethod;
        }

        private _generateMipmaps:boolean = true;
        get generateMipmaps(){
            return this._generateMipmaps;
        }
        set generateMipmaps(generateMipmaps:boolean){
            if(!generateMipmaps){
                this.minFilter = this.filterFallback(this.minFilter);
                this.magFilter = this.filterFallback(this.magFilter);
            }

            this._generateMipmaps = generateMipmaps;
        }

        public format:TextureFormat = TextureFormat.RGBA;
        public source:any = null;
        public repeatRegion:RectRegion = RectRegion.create(0, 0, 1, 1);
        public sourceRegion:RectRegion = null;

        public sourceRegionMapping:TextureSourceRegionMapping = TextureSourceRegionMapping.CANVAS;

        public flipY:boolean = true;
        public premultiplyAlpha:boolean = false;		//预乘Alpha值,如果设置为true,纹素的rgb值会先乘以alpha值,然后在存储.
        public unpackAlignment:number = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
        // 默认值是4。指定用于在内存中的每个像素行开始校准要求。
        // 允许的值是1（字节对齐），2（行对齐，偶数字节），4（对齐），和8（行开始在双字的边界）。更多信息见glpixelstorei。
        //http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml

        //todo extract TextureDefault class to save default setting?

        public wrapS:TextureWrapMode = TextureWrapMode.CLAMP_TO_EDGE;
        public wrapT:TextureWrapMode = TextureWrapMode.CLAMP_TO_EDGE;
        public magFilter:TextureFilterMode = TextureFilterMode.LINEAR;
        public minFilter:TextureFilterMode = TextureFilterMode.LINEAR_MIPMAP_LINEAR;
        public type:TextureType = TextureType.UNSIGNED_BYTE;	//数据类型,默认为不带符号8位整形值(一个字节)
        public mipmaps:dyCb.Collection<any> = dyCb.Collection.create<any>();
        public anisotropy:number = null;
        public needUpdate:boolean = true;

        protected target:TextureTarget = TextureTarget.TEXTURE_2D;

        private _texture:any = null;

        public init(){
            var gl = Director.getInstance().gl;
            //texture.addEventListener( "dispose", onTextureDispose );

            this._texture = gl.createTexture();

            //_this.info.memory.textures ++;

            return this;
        }

        public update(index:number){
            var gl = Director.getInstance().gl,
                isSourcePowerOfTwo = this.isSourcePowerOfTwo();

            this.bindToUnit(index);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);


            //todo not set UNPACK_PREMULTIPLY_ALPHA_WEBGL,UNPACK_ALIGNMENT when cubemap?
            gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha );
            gl.pixelStorei( gl.UNPACK_ALIGNMENT, this.unpackAlignment );


            if(this.isCheckMaxSize()){
                this.clampToMaxSize();
            }

            this._setTextureParameters( gl[this.target], isSourcePowerOfTwo);

            this.allocateSourceToTexture(isSourcePowerOfTwo);

            if (this.generateMipmaps && isSourcePowerOfTwo) {
                gl.generateMipmap(gl[this.target]);
            }

            this.needUpdate = false;

            return this;
        }

        public sendData(index){
            var program = Director.getInstance().stage.program,
                sourceRegion = null;

            program.setUniformData("u_sampler" + index, render.UniformDataType.NUMBER_1, index);

            if(this.sourceRegion && this.sourceRegionMethod === TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL){
                sourceRegion = this._convertSourceRegionToUV();
            }
            else{
                sourceRegion = RectRegion.create(0, 0, 1, 1);
            }
            program.setUniformData("u_sourceRegion", render.UniformDataType.FLOAT_4, sourceRegion);

            program.setUniformData("u_repeatRegion", render.UniformDataType.FLOAT_4, this.repeatRegion);

            return this;
        }

        public bindToUnit (unit:number) {
            var gl = Director.getInstance().gl,
                maxUnit = GPUDetector.getInstance().maxTextureUnit;

            if(unit >= maxUnit){
                dyCb.Log.warn("trying to use %d texture units, but GPU only supports %d units", unit, maxUnit);
            }

            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl[this.target], this._texture);

            return this;
        }

        public copy(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public dispose(){
            var gl = Director.getInstance().gl;

            gl.deleteTexture(this._texture);
            delete this._texture;
        }

        public filterFallback(filter:TextureFilterMode) {
            if (filter === TextureFilterMode.NEAREST|| filter === TextureFilterMode.NEAREST_MIPMAP_MEAREST|| filter === TextureFilterMode.NEAREST_MIPMAP_LINEAR ) {
                return TextureFilterMode.NEAREST;
            }

            return TextureFilterMode.LINEAR;
        }

        protected copyHelper(texture:Texture){
            dyCb.Log.error(!texture, dyCb.Log.info.FUNC_MUST_DEFINE("texture"));

            texture.source = this.source;

            texture.width = this.width;
            texture.height = this.height;

            texture.mipmaps = this.mipmaps.copy();

            texture.wrapS = this.wrapS;
            texture.wrapT = this.wrapT;

            texture.magFilter = this.magFilter;
            texture.minFilter = this.minFilter;

            texture.anisotropy = this.anisotropy;

            texture.format = this.format;
            texture.type = this.type;

            texture.repeatRegion = this.repeatRegion.copy();
            texture.sourceRegion = this.sourceRegion && this.sourceRegion.copy();
            texture.sourceRegionMapping = this.sourceRegionMapping;

            texture.sourceRegionMethod = this.sourceRegionMethod;

            texture.generateMipmaps = this.generateMipmaps;
            texture.premultiplyAlpha = this.premultiplyAlpha;
            texture.flipY = this.flipY;
            texture.unpackAlignment = this.unpackAlignment;

            texture.needUpdate = this.needUpdate;

            return texture;
        }

        protected isCheckMaxSize(){
            return true;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected isSourcePowerOfTwo(){
            return this.isPowerOfTwo(this.width, this.height);
        }

        protected isPowerOfTwo(width:number, height:number){
            return JudgeUtils.isPowerOfTwo(width) && JudgeUtils.isPowerOfTwo(height);
        }

        private _setTextureParameters(textureType, isSourcePowerOfTwo){
            var gl = Director.getInstance().gl;

            if (isSourcePowerOfTwo){
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl[this.wrapS]);
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl[this.wrapT]);

                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[this.magFilter]);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[this.minFilter]);
            }
            else {
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[this.filterFallback(this.magFilter)]);
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[this.filterFallback(this.minFilter)]);
            }

            this._setAnisotropy(textureType);
        }

        private _setAnisotropy(textureType){
            var gpu = GPUDetector.getInstance(),
                gl = Director.getInstance().gl;

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

            canvas = document.createElement( "canvas" );
            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx = canvas.getContext( "2d" );
            ctx.drawImage( source, 0, 0, source.width, source.height, 0, 0, newWidth, newHeight );

            dyCb.Log.log(source + " is too big (" + source.width + "x" + source.height + "). Resized to " + canvas.width + "x" + canvas.height + ".");

            return canvas;
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

