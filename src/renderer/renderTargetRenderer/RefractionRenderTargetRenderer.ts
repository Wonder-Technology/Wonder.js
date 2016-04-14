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

        protected beforeRender(){
            if(this.isRenderListEmptyWhenRender()){
                Director.getInstance().scene.glslData.addChild(<any>EShaderGLSLData.REFRACTION, {
                    isRenderListEmpty:true
                });
            }
            else{
                Director.getInstance().scene.glslData.addChild(<any>EShaderGLSLData.REFRACTION, {
                    isRenderListEmpty:false
                });
            }
        }

        protected isNeedCreateCamera(){
            return false;
        }
    }
}

