/// <reference path="../../definitions.d.ts"/>
module dy.render{
    export class Texture{
        public static defaultTexture = null;

        constructor(source:any = Texture.defaultTexture){
            this.source = source;
        }

        public format:TextureFormat = TextureFormat.RGBA;
        public source:any = null;

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

        public repeatRegion:RectRegion = RectRegion.create(0, 0, 1, 1);

        private _sourceRegion:RectRegion = RectRegion.create(0, 0, 1, 1);
        get sourceRegion(){
            return this._sourceRegion;
        }
        set sourceRegion(sourceRegion:RectRegion){
            if(this.sourceRegionMapping === TexCoordMapping.CANVAS){
                this._sourceRegion = this._convertCanvasMappingToUVMapping(sourceRegion)
            }
            else if(this.sourceRegionMapping === TexCoordMapping.UV){
                this._sourceRegion = sourceRegion;
            }
        }

        public sourceRegionMapping:TexCoordMapping = TexCoordMapping.CANVAS;

        public generateMipmaps:boolean = true;
        public flipY:boolean = true;
        public premultiplyAlpha:boolean = false;		//预乘Alpha值,如果设置为true,纹素的rgb值会先乘以alpha值,然后在存储.
        public unpackAlignment:number = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
        // 默认值是4。指定用于在内存中的每个像素行开始校准要求。
        // 允许的值是1（字节对齐），2（行对齐，偶数字节），4（对齐），和8（行开始在双字的边界）。更多信息见glpixelstorei。
        //http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml

        public wrapS:TextureWrapMode = TextureWrapMode.CLAMP_TO_EDGE;
        public wrapT:TextureWrapMode = TextureWrapMode.CLAMP_TO_EDGE;
        public magFilter:TextureFilterMode = TextureFilterMode.LINEAR;
        public minFilter:TextureFilterMode = TextureFilterMode.LINEAR_MIPMAP_LINEAR;
        public type:TextureType = TextureType.UNSIGNED_BYTE;	//数据类型,默认为不带符号8位整形值(一个字节)
        public mipmaps:dyCb.Collection<IMipmap> = dyCb.Collection.create<IMipmap>();

        public needUpdate:boolean = true;

        private _texture:any = null;

        public init(){
            var gl = Director.getInstance().gl;
            //texture.addEventListener( "dispose", onTextureDispose );

            this._texture = gl.createTexture();

            //_this.info.memory.textures ++;
        }

        public update(index:number){
            var gl = Director.getInstance().gl,
                isSourcePowerOfTwo = this._isSourcePowerOfTwo();

            this.bindToUnit(index);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);

            gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha );
            gl.pixelStorei( gl.UNPACK_ALIGNMENT, this.unpackAlignment );


            this.source = this._clampToMaxSize(this.source);

            this._setTextureParameters( gl.TEXTURE_2D, isSourcePowerOfTwo);

            this.allocateSourceToTexture(isSourcePowerOfTwo);

            if (this.generateMipmaps && isSourcePowerOfTwo) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }

            this.needUpdate = false;
        }

        public sendData(index){
            var program = Director.getInstance().stage.program;

            program.setUniformData("u_sampler" + index, UniformDataType.NUMBER_1, index);
            program.setUniformData("u_sourceRegion", UniformDataType.FLOAT_4, this.sourceRegion);
            program.setUniformData("u_repeatRegion", UniformDataType.FLOAT_4, this.repeatRegion);
        }

        public bindToUnit (unit:number) {
            var gl = Director.getInstance().gl;

            gl.activeTexture(gl["TEXTURE" + String(unit)]);
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
        }

        public copy(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected copyHelper(texture:Texture){
            dyCb.Log.error(!texture, dyCb.Log.info.FUNC_MUST_DEFINE("texture"));

            texture.source = this.source;
            texture.mipmaps = this.mipmaps.copy();

            //texture.mapping = this.mapping;

            texture.wrapS = this.wrapS;
            texture.wrapT = this.wrapT;

            texture.magFilter = this.magFilter;
            texture.minFilter = this.minFilter;

            //texture.anisotropy = this.anisotropy;

            texture.format = this.format;
            texture.type = this.type;

            texture.repeatRegion = this.repeatRegion.copy();

            texture.generateMipmaps = this.generateMipmaps;
            texture.premultiplyAlpha = this.premultiplyAlpha;
            texture.flipY = this.flipY;
            texture.unpackAlignment = this.unpackAlignment;

            texture.needUpdate = this.needUpdate;

            return texture;
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        private _isSourcePowerOfTwo(){
            return JudgeUtils.isPowerOfTwo( this.width ) && JudgeUtils.isPowerOfTwo( this.height );
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

                gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, this._filterFallback(this.magFilter));
                gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, this._filterFallback(this.minFilter));
            }
        }

        // Fallback filters for non-power-of-2 textures
        private _filterFallback(filter:TextureFilterMode) {
            var gl = Director.getInstance().gl;

        if (filter === TextureFilterMode.NEAREST|| filter === TextureFilterMode.NEAREST_MIPMAP_MEAREST|| filter === TextureFilterMode.NEAREST_MIPMAP_LINEAR ) {
            return gl.NEAREST;
        }

        return gl.LINEAR;
    }

        private _clampToMaxSize ( source:any) {
            var maxSize = null,
                maxDimension = null,
                newWidth = null,
                newHeight = null,
                canvas = null,
                ctx = null;

            if(!source){
                return null;
            }

            maxSize = GPUDetector.getInstance().maxTextureSize;

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

        private _convertCanvasMappingToUVMapping(sourceRegion:RectRegion){
            var region = RectRegion.create();

            region.x = sourceRegion.x;
            region.y = 1 - sourceRegion.y - sourceRegion.height;
            region.width = sourceRegion.width;
            region.height = sourceRegion.height;

            return region;
        }
    }
}

