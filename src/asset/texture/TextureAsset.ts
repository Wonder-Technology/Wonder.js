import { ETextureFormat } from "../../renderer/enum/ETextureFormat";
import { ETextureType } from "../../renderer/enum/ETextureType";

export abstract class TextureAsset {
    // public static defaultTexture = null;

    private _width: number = null;
    get width() {
        return this._width === null ? (this.source ? this.source.width : null) : this._width;
    }

    set width(width: number) {
        this._width = width;
    }

    private _height: number = null;
    get height() {
        return this._height === null ? (this.source ? this.source.height : null) : this._height;
    }

    set height(height: number) {
        this._height = height;
    }

    // public generateMipmaps: boolean = true;
    // public sourceRegionMethod: ETextureSourceRegionMethod = ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
    public format: ETextureFormat = ETextureFormat.RGBA;
    // @cloneAttributeAsBasicType()
    // public source: any = TextureAsset.defaultTexture;
    public source: any = null;
    // public repeatRegion: RectRegion = RectRegion.create(0, 0, 1, 1);
    // public sourceRegion: RectRegion = null;

    // public sourceRegionMapping: ETextureSourceRegionMapping = ETextureSourceRegionMapping.CANVAS;

    //todo use gl.getParameter(e.g., gl.getParameter(gl.UNPACK_ALIGNMENT)) to query the actual value?
    // public packAlignment: number = 4;
    // public unpackAlignment: number = 4;
    // public flipY: boolean = true;
    // public premultiplyAlpha: boolean = false;
    // public isPremultipliedAlpha: boolean = null;
    // public colorspaceConversion: any = DeviceManager.getInstance().gl.BROWSER_DEFAULT_WEBGL;

    // public wrapS: ETextureWrapMode = ETextureWrapMode.CLAMP_TO_EDGE;
    // public wrapT: ETextureWrapMode = ETextureWrapMode.CLAMP_TO_EDGE;
    // public magFilter: ETextureFilterMode = ETextureFilterMode.LINEAR;
    // public minFilter: ETextureFilterMode = ETextureFilterMode.LINEAR_MIPMAP_LINEAR;
    public type: ETextureType = ETextureType.UNSIGNED_BYTE;
    // public mipmaps: wdCb.Collection<any> = wdCb.Collection.create<any>();
    // public anisotropy: number = 0;
    public needUpdate: boolean = true;


    // public abstract toTexture(): Texture;
}
