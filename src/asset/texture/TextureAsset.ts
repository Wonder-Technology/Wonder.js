/// <reference path="../../filePath.d.ts"/>
module dy{
    export abstract class TextureAsset implements ITextureAsset{
        public static defaultTexture = null;

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

        public generateMipmaps:boolean = true;
        public sourceRegionMethod:TextureSourceRegionMethod = TextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
        public format:TextureFormat = TextureFormat.RGBA;
        public source:any = TextureAsset.defaultTexture;
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
        public anisotropy:number = 0;
        public needUpdate:boolean = true;


        public abstract toTexture():Texture;

        public abstract toCubemapFaceTexture():CubemapFaceTexture;

        public abstract copyToCubemapFaceTexture(cubemapFaceTexture:any);

        public copyToCubemapTexture(cubemapFaceTexture:ICubemapTextureAsset){
            cubemapFaceTexture.generateMipmaps = this.generateMipmaps;
            cubemapFaceTexture.minFilter = this.minFilter;
            cubemapFaceTexture.magFilter = this.magFilter;
            cubemapFaceTexture.width = this.width;
            cubemapFaceTexture.height = this.height;
            cubemapFaceTexture.wrapS = this.wrapS;
            cubemapFaceTexture.wrapT = this.wrapT;
            cubemapFaceTexture.anisotropy = this.anisotropy;
            cubemapFaceTexture.premultiplyAlpha = this.premultiplyAlpha;
            cubemapFaceTexture.unpackAlignment = this.unpackAlignment;
            //todo test
            cubemapFaceTexture.needUpdate = this.needUpdate;

            cubemapFaceTexture.mode = EnvMapMode.BASIC;
        }

        public copyTo(texture:BasicTexture){
            Log.error(!texture, Log.info.FUNC_MUST_DEFINE("texture"));

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
    }
}

