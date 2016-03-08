module wd {
    export class WoodProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public ampScale:number = 100.0;
        public woodColor:Color = Color.create("rgb(0.32, 0.17, 0.09)");

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(WoodProceduralRenderTargetRenderer.create(this));

            return this;
        }
    }
}

