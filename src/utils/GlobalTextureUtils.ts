module wd{
    export class GlobalTextureUtils{
        public static convertSourceRegionCanvasMapToUV(sourceRegion:RectRegion, textureWidth:number, textureHeight:number){
            var region:RectRegion = null;

            region = RectRegion.create(
                sourceRegion.x / textureWidth,
                sourceRegion.y / textureHeight,
                sourceRegion.width / textureWidth,
                sourceRegion.height / textureHeight
            );

            region.y = 1 - region.y - region.height;

            return region;
        }
    }
}

