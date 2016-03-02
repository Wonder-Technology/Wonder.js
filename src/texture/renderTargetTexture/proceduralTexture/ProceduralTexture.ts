module wd {
    export abstract class ProceduralTexture extends TwoDRenderTargetTexture {
        //todo refactor
        get sourceRegionForGLSL(){
            return RectRegion.create(0, 0, 1, 1);
        }

        public repeatRegion:RectRegion = RectRegion.create(0, 0, 1, 1);

        //public convertToImageTexture():ImageTexture{
        //    //var imageTexture = ImageTexture.create();
        //    //todo finish it?
        //}
    }
}

