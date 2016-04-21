module wd {
    export abstract class ProceduralTexture extends TwoDRenderTargetTexture {
        get sourceRegionForGLSL(){
            return RectRegion.create(0, 0, 1, 1);
        }

        @cloneAttributeAsCloneable()
        public repeatRegion:RectRegion = RectRegion.create(0, 0, 1, 1);

        //public needUpdate:boolean = false;

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, EVariableType.SAMPLER_2D);
        }
    }
}

