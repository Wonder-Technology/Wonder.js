/// <reference path="../../filePath.d.ts"/>
module wd {
    declare var Math:any;

    export class BasicTextureUtils extends TextureUtils{
        public static isDrawPartOfTexture(sourceRegion:RectRegion, sourceRegionMethod:TextureSourceRegionMethod){
            return sourceRegion && sourceRegion.isNotEmpty() && sourceRegionMethod === TextureSourceRegionMethod.DRAW_IN_CANVAS;
        }

        public static drawPartOfTextureByCanvas(source:HTMLImageElement, canvasWidth:number, canvasHeight:number, sx:number, sy:number, sWidth:number, sHeight:number, dx:number, wd:number, dWidth:number, dHeight:number){
            //var canvas = wdCb.DomQuery.create("<canvas></canvas>").prependTo("body").get(0),
            var canvas = wdCb.DomQuery.create("<canvas></canvas>").get(0),
                ctx = null;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx = canvas.getContext( "2d" );
            ctx.drawImage( source, sx, sy, sWidth, sHeight, dx, wd, dWidth, dHeight);

            return canvas
        }

        public static isSourcePowerOfTwo(sourceRegion, sourceRegionMethod, width, height){
            if(this.isDrawPartOfTexture(sourceRegion, sourceRegionMethod)){
                return this.isPowerOfTwo(sourceRegion.width, sourceRegion.height)
            }

            return this.isPowerOfTwo(width, height);
        }

        public static needClampMaxSize(maxSize:number, width:number, height:number){
            return width > maxSize || height > maxSize;
        }

        public static clampToMaxSize (source:any, maxSize:number) {
            var maxDimension = null,
                newWidth = null,
                newHeight = null,
                canvas = null;

            maxDimension = Math.max( source.width, source.height );
            newWidth = Math.floor( source.width * maxSize / maxDimension );
            newHeight = Math.floor( source.height * maxSize / maxDimension );

            canvas = this.drawPartOfTextureByCanvas(source, newWidth, newHeight, 0, 0, source.width, source.height, 0, 0, newWidth, newHeight);

            Log.log(`source is too big (width:${source.width}, height:${source.height}), resize it to be width:${canvas.width}, height:${canvas.height}.`);

            return canvas;
        }
    }
}

