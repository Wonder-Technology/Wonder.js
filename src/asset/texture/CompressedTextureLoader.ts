/// <reference path="../../filePath.d.ts"/>
module wd{
    export class CompressedTextureLoader{
        public static load(url:string) {
            return AjaxLoader.load(url, "arraybuffer")
            .map((data:any) => {
                    var texDatas:DDSData = DDSParser.parse(data, true);
                    //var images = [];

                    var asset = CompressedTextureAsset.create();
                    //asset.image = images;


                    //if ( texDatas.isCubemap ) {
                    //    var faces = texDatas.mipmaps.getCount() / texDatas.mipmapCount;
                    //
                    //    for ( var f = 0; f < faces; f ++ ) {
                    //
                    //        images[ f ] = { mipmaps : [] };
                    //
                    //        for ( var i = 0; i < texDatas.mipmapCount; i ++ ) {
                    //
                    //            images[ f ].mipmaps.push( texDatas.mipmaps[ f * texDatas.mipmapCount + i ] );
                    //            images[ f ].format = texDatas.format;
                    //            images[ f ].width = texDatas.width;
                    //            images[ f ].height = texDatas.height;
                    //
                    //        }
                    //
                    //    }
                    //
                    //}
                    //else {
                    //    asset.image.width = texDatas.width;
                    //    asset.image.height = texDatas.height;
                    asset.width = texDatas.width;
                    asset.height = texDatas.height;
                    asset.mipmaps = texDatas.mipmaps;

                    //}
                    if (texDatas.mipmapCount == 1){
                        asset.minFilter = TextureFilterMode.LINEAR;
                    }


                    asset.format = this._getCompressedFormat(texDatas.format);
                    //asset.needsUpdate = true;

                    return asset;
                })
        }


        //todo support pvr
        private static _getCompressedFormat(format:TextureFormat){
            var extension = GPUDetector.getInstance().extensionCompressedTextureS3TC;

            if(format === TextureFormat.RGBA){
                return format;
            }

            if(!extension){
                return null;
            }

            switch (format){
                case TextureFormat.RGB_S3TC_DXT1:
                    format = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT1:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT3:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    break;
                case TextureFormat.RGBA_S3TC_DXT5:
                    format = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    break;
            }

            return format;
        }
    }
}

