/// <reference path="../../definitions.d.ts"/>
module dy{
    export class CompressedTextureLoader{
        public static load(url:string) {
            return AjaxLoader.load(url, "arraybuffer")
            .map((data:any) => {
                    var texDatas:DDSData = DDSParser.parse(data, true);
                    //var images = [];

                    var texture = render.CompressedTexture.create();
                    //texture.image = images;


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
                    //    texture.image.width = texDatas.width;
                    //    texture.image.height = texDatas.height;
                    texture.width = texDatas.width;
                    texture.height = texDatas.height;
                    texture.mipmaps = texDatas.mipmaps;

                    //}
                    if (texDatas.mipmapCount == 1){
                        texture.minFilter = TextureFilterMode.LINEAR;
                    }


                    texture.format = texDatas.format;
                    //texture.needsUpdate = true;

                    return texture;
                })
        }
    }
}

