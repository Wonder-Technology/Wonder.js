module wd {
    //todo support specify marble color(more than one color param) by user
    export class MarbleProceduralTexture extends ProceduralTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        @cloneAttributeAsBasicType()
        public tilesHeightNumber:number = 3;
        @cloneAttributeAsBasicType()
        public tilesWidthNumber:number = 3;
        @cloneAttributeAsBasicType()
        public amplitude:number = 9;
        @cloneAttributeAsCloneable()
        public jointColor:Color = Color.create("rgb(0.72, 0.72, 0.72)");

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(MarbleProceduralRenderTargetRenderer.create(this));

            return this;
        }
    }
}

