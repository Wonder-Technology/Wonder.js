/// <reference path="../../definitions.d.ts"/>
module dy{
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


                    asset.format = texDatas.format;
                    //asset.needsUpdate = true;

                    return asset;
                })
        }
    }
}

