module wd{
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
        public sourceRegionMethod:ETextureSourceRegionMethod = ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
        public format:ETextureFormat = ETextureFormat.RGBA;
        @cloneAttributeAsBasicType()
        public source:any = TextureAsset.defaultTexture;
        public repeatRegion:RectRegion = RectRegion.create(0, 0, 1, 1);
        public sourceRegion:RectRegion = null;

        public sourceRegionMapping:ETextureSourceRegionMapping = ETextureSourceRegionMapping.CANVAS;

        //todo use gl.getParameter(e.g., gl.getParameter(gl.UNPACK_ALIGNMENT)) to query the actual value?
        public packAlignment:number = 4;
        public unpackAlignment:number = 4;
        public flipY:boolean = true;
        public premultiplyAlpha:boolean = false;
        public colorspaceConversion:any = DeviceManager.getInstance().gl.BROWSER_DEFAULT_WEBGL;

        //todo extract TextureDefault class to save default setting?

        public wrapS:ETextureWrapMode = ETextureWrapMode.CLAMP_TO_EDGE;
        public wrapT:ETextureWrapMode = ETextureWrapMode.CLAMP_TO_EDGE;
        public magFilter:ETextureFilterMode = ETextureFilterMode.LINEAR;
        public minFilter:ETextureFilterMode = ETextureFilterMode.LINEAR_MIPMAP_LINEAR;
        public type:ETextureType = ETextureType.UNSIGNED_BYTE;
        public mipmaps:wdCb.Collection<any> = wdCb.Collection.create<any>();
        public anisotropy:number = 0;
        public needUpdate:boolean = true;


        public abstract toTexture():Texture;

        public abstract toCubemapFaceTexture():CubemapFaceTexture;

        public abstract cloneToCubemapFaceTexture(cubemapFaceTexture:any);

        public clone(){
            //todo clone more attributes

            return CloneUtils.clone(this);
        }

        public cloneToCubemapTexture(cubemapTexture:ICubemapTextureAsset){
            cubemapTexture.generateMipmaps = this.generateMipmaps;
            cubemapTexture.minFilter = this.minFilter;
            cubemapTexture.magFilter = this.magFilter;
            cubemapTexture.width = this.width;
            cubemapTexture.height = this.height;
            cubemapTexture.wrapS = this.wrapS;
            cubemapTexture.wrapT = this.wrapT;
            cubemapTexture.anisotropy = this.anisotropy;
            cubemapTexture.premultiplyAlpha = this.premultiplyAlpha;
            cubemapTexture.flipY = false;
            cubemapTexture.unpackAlignment = this.unpackAlignment;
            cubemapTexture.packAlignment = this.packAlignment;
            cubemapTexture.colorspaceConversion = this.colorspaceConversion;
            cubemapTexture.needUpdate = this.needUpdate;
            cubemapTexture.mode = EEnvMapMode.BASIC;
        }

        public cloneTo(texture:BasicTexture){
            Log.error(!texture, Log.info.FUNC_MUST_DEFINE("texture"));

            texture.source = this.source;

            texture.width = this.width;
            texture.height = this.height;

            texture.mipmaps = this.mipmaps.clone();

            texture.wrapS = this.wrapS;
            texture.wrapT = this.wrapT;

            texture.magFilter = this.magFilter;
            texture.minFilter = this.minFilter;

            texture.anisotropy = this.anisotropy;

            texture.format = this.format;
            texture.type = this.type;

            texture.repeatRegion = this.repeatRegion.clone();
            texture.sourceRegion = this.sourceRegion && this.sourceRegion.clone();
            texture.sourceRegionMapping = this.sourceRegionMapping;

            texture.sourceRegionMethod = this.sourceRegionMethod;

            texture.generateMipmaps = this.generateMipmaps;
            texture.premultiplyAlpha = this.premultiplyAlpha;
            texture.flipY = this.flipY;
            texture.unpackAlignment = this.unpackAlignment;
            texture.packAlignment = this.packAlignment;
            texture.colorspaceConversion = this.colorspaceConversion;

            texture.needUpdate = this.needUpdate;

            return texture;
        }
    }
}

