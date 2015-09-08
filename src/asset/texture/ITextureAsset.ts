/// <reference path="../../definitions.d.ts"/>
module dy{
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
        mipmaps:dyCb.Collection<any>;
        anisotropy:number;
        needUpdate:boolean;
    }

    export interface ICubeTextureAsset {
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
        mode:CubemapMode;
    }

    export interface ICubeFaceCompressedTextureAsset {
        type:TextureType;
        format:TextureFormat;
        width:number;
        height:number;
        mipmaps:dyCb.Collection<ICompressedTextureMipmap>;
        minFilter:TextureFilterMode;
    }

    export interface ICubeFaceTwoDTextureAsset {
        sourceRegion:RectRegion;
        sourceRegionMethod:TextureSourceRegionMethod;
        type:TextureType;
        format:TextureFormat;
        width:number;
        height:number;
        source:any;
    }
}

