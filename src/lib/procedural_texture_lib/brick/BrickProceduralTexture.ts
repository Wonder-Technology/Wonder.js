module wd {
    export class BrickProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public tilesHeightNumber:number = 15;
        public tilesWidthNumber:number = 5;
        public brickColor:Color = Color.create("rgb(0.77, 0.47, 0.40)");
        public jointColor:Color = Color.create("rgb(0.72, 0.72, 0.72)");

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(BrickProceduralRenderTargetRenderer.create(this));

            return this;
        }
    }
}

