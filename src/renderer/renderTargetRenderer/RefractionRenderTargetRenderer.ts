module wd {
    export class RefractionRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(refractionTexture:RefractionTexture) {
            var obj = new this(refractionTexture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:RefractionTexture;


        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
        }

        protected getRenderList():wdCb.Collection<GameObject>{
            return this.texture.renderList;
        }

        protected renderRenderer(renderer){
            renderer.webglState = BasicState.create();
            renderer.render();
        }

        protected isNeedCreateCamera(){
            return false;
        }
    }
}

