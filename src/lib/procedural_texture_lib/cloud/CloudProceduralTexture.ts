module wd {
    export class CloudProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        @cloneAttributeAsCloneable()
        public skyColor:Color = Color.create("rgb(0.15, 0.68, 1.0)");
        @cloneAttributeAsCloneable()
        public cloudColor:Color = Color.create("rgb(1.0, 1.0, 1.0)");

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(CloudProceduralRenderTargetRenderer.create(this));

            return this;
        }
    }
}

