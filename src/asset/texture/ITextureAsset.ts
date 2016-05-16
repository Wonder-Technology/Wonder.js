module wd{
    export interface ITextureAsset{
        width:number;
        height:number;
        generateMipmaps:boolean;
        sourceRegionMethod:ETextureSourceRegionMethod;
        format:ETextureFormat;
        source:any;
        repeatRegion:RectRegion;
        sourceRegion:RectRegion;
        sourceRegionMapping:ETextureSourceRegionMapping;
        unpackAlignment:number;
        packAlignment:number;
        flipY:boolean;
        premultiplyAlpha:boolean;
        colorspaceConversion:any;
        wrapS:ETextureWrapMode;
        wrapT:ETextureWrapMode;
        magFilter:ETextureFilterMode;
        minFilter:ETextureFilterMode;
        type:ETextureType;
        mipmaps:wdCb.Collection<any>;
        anisotropy:number;
        needUpdate:boolean;
    }

    export interface ICubemapTextureAsset {
        generateMipmaps:boolean;
        width:number;
        height:number;
        minFilter:ETextureFilterMode;
        magFilter:ETextureFilterMode;
        wrapS:ETextureWrapMode;
        wrapT:ETextureWrapMode;
        anisotropy:number;
        unpackAlignment:number;
        packAlignment:number;
        flipY:boolean;
        premultiplyAlpha:boolean;
        colorspaceConversion:any;
        needUpdate:boolean;
        mode:EEnvMapMode;
    }

    export interface ICubemapFaceCompressedTextureAsset {
        type:ETextureType;
        format:ETextureFormat;
        width:number;
        height:number;
        mipmaps:wdCb.Collection<CompressedTextureMipmap>;
        minFilter:ETextureFilterMode;
    }

    export interface ICubemapFaceTwoDTextureAsset {
        sourceRegion:RectRegion;
        sourceRegionMethod:ETextureSourceRegionMethod;
        type:ETextureType;
        format:ETextureFormat;
        width:number;
        height:number;
        source:any;
    }
}

