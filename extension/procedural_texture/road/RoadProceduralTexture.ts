module wd {
    export class RoadProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        @cloneAttributeAsCloneable()
        public roadColor:Color = Color.create("rgb(0.53, 0.53, 0.53)");

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(RoadProceduralRenderTargetRenderer.create(this));

            return this;
        }
    }
}

