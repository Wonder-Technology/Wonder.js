module wd {
    export class DynamicCubemapRenderTargetRenderer extends CubemapRenderTargetRenderer{
        public static create(texture:DynamicCubemapTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:DynamicCubemapTexture;

        protected  getRenderList():wdCb.Hash<GameObject>{
         return this.texture.renderList;
        }

        protected setCamera(camera:PerspectiveCamera){
            camera.aspect = 1;
            camera.near = this.texture.near;
            camera.far = this.texture.far;
        }

        protected getPosition(){
            return this.texture.getPosition();
        }

        protected beforeRender(){
            if(this.isRenderListEmptyWhenRender()){
                Director.getInstance().scene.glslData.addChild(<any>EShaderGLSLData.DYNAMIC_CUBEMAP, {
                    isRenderListEmpty:true
                });
            }
            else{
                Director.getInstance().scene.glslData.addChild(<any>EShaderGLSLData.DYNAMIC_CUBEMAP, {
                    isRenderListEmpty:false
                });
            }
        }
    }
}

