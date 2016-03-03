module wd {
    export abstract class ProceduralTexture extends TwoDRenderTargetTexture {
        get sourceRegionForGLSL(){
            return RectRegion.create(0, 0, 1, 1);
        }

        public repeatRegion:RectRegion = RectRegion.create(0, 0, 1, 1);
    }
}

