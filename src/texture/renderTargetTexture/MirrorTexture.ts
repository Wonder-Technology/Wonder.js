module wd {
    export class MirrorTexture extends LightEffectTexture {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public init(){
            super.init();

            Director.getInstance().scene.addCommonRenderTargetRenderer(MirrorRenderTargetRenderer.create(this));

            return this;
        }
    }
}

