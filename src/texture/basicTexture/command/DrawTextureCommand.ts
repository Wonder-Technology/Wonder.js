module wd{
    export abstract class DrawTextureCommand{
        public format:ETextureFormat = null;
        public type:ETextureType = null;
        public sourceRegion:RectRegion = null;
        public sourceRegionMethod:ETextureSourceRegionMethod = ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
        public glTarget:any = null;

        public abstract execute();

        protected getDrawTarget(source:any, sourceRegion:RectRegion=this.sourceRegion){
            var result = null;

            if(BasicTextureUtils.isDrawPartOfTexture(sourceRegion, this.sourceRegionMethod)){
                result = BasicTextureUtils.drawPartOfTextureByCanvas(source, sourceRegion.width, sourceRegion.height, sourceRegion.x, sourceRegion.y, sourceRegion.width, sourceRegion.height, 0, 0, sourceRegion.width, sourceRegion.height);
            }
            else{
                result = source;
            }

            return result;
        }
    }
}
