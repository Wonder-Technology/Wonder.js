/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapRenderTargetRenderer extends CubemapRenderTargetRenderer{
        public static create(light:PointLight) {
            var obj = new this(light);

            obj.initWhenCreate();

            return obj;
        }

        constructor(light:PointLight){
            super(light.shadowMap);

            this.light = light;
        }

        //todo private?
        public light:PointLight = null;

        protected texture:CubemapShadowMapTexture;

        private _shadowMapRendererUtils:CubemapShadowMapRenderTargetRendererUtils = null;


        public initWhenCreate(){
            this._shadowMapRendererUtils = CubemapShadowMapRenderTargetRendererUtils.create(this.light, this.texture);

            super.initWhenCreate();
        }

        public init(){
            this._shadowMapRendererUtils.init();

            super.init();
        }

        protected warnTextureSizeExceedCanvasSize(){
            //not warn
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            if(!Director.getInstance().stage.shadowMap.enable){
                return;
            }

            super.renderFrameBufferTexture(renderer, camera);
        }

        protected  getRenderList():dyCb.Hash<GameObject>{
            return this.light.shadowRenderList;
        }

        protected  renderFace(faceRenderList:Array<GameObject>|dyCb.Collection<GameObject>, renderCamera:GameObject, renderer:Renderer){
            var utils:CubemapShadowMapRenderTargetRendererUtils = this._shadowMapRendererUtils;

            faceRenderList.forEach((child:GameObject) => child.render(renderer, renderCamera));

            faceRenderList.forEach((child:GameObject) => {
                utils.setShadowData(child, renderCamera);
                child.render(renderer, renderCamera)
            });
        }

        protected beforeRenderSixFaces(){
            Director.getInstance().stage.useProgram();
        }

        protected afterRenderSixFaces(){
            Director.getInstance().stage.unUseProgram();
        }

        protected setCamera(camera:PerspectiveCamera){
            var light:PointLight = this.light;

            camera.aspect = light.shadowMapWidth / light.shadowMapHeight;
            camera.near = light.shadowCameraNear;
            camera.far = light.shadowCameraFar;
        }

        protected getPosition(){
            return this.light.position;
        }
    }
}
