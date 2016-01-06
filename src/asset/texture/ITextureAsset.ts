module wd{
    export interface ITextureAsset{
        width:number;
        height:number;
        generateMipmaps:boolean;
        sourceRegionMethod:TextureSourceRegionMethod;
        format:TextureFormat;
        source:any;
        repeatRegion:RectRegion;
        sourceRegion:RectRegion;
        sourceRegionMapping:TextureSourceRegionMapping;
        flipY:boolean;
        premultiplyAlpha:boolean;
        unpackAlignment:number;
        wrapS:TextureWrapMode;
        wrapT:TextureWrapMode;
        magFilter:TextureFilterMode;
        minFilter:TextureFilterMode;
        type:TextureType;
        mipmaps:wdCb.Collection<any>;
        anisotropy:number;
        needUpdate:boolean;
    }

    export interface ICubemapTextureAsset {
        generateMipmaps:boolean;
        width:number;
        height:number;
        minFilter:TextureFilterMode;
        magFilter:TextureFilterMode;
        wrapS:TextureWrapMode;
        wrapT:TextureWrapMode;
        anisotropy:number;
        premultiplyAlpha:boolean;
        unpackAlignment:number;
        needUpdate:boolean;
        mode:EnvMapMode;
    }

    export interface ICubemapFaceCompressedTextureAsset {
        type:TextureType;
        format:TextureFormat;
        width:number;
        height:number;
        mipmaps:wdCb.Collection<CompressedTextureMipmap>;
        minFilter:TextureFilterMode;
    }

    export interface ICubemapFaceTwoDTextureAsset {
        sourceRegion:RectRegion;
        sourceRegionMethod:TextureSourceRegionMethod;
        type:TextureType;
        format:TextureFormat;
        width:number;
        height:number;
        source:any;
    }
}

