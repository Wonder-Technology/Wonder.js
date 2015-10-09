/// <reference path="../../definitions.d.ts"/>
module dy {
    export class ShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(light:DirectionLight) {
            var obj = new this(light);

            obj.initWhenCreate();

            return obj;
        }

        constructor(light:DirectionLight){
            super(light.shadowMap);

            this.light = light;
        }

        //todo private?
        public light:DirectionLight = null;

        protected texture:ShadowMapTexture;

        public initWhenCreate(){
            var self = this;

            this.texture.width = this.light.shadowMapWidth;
            this.texture.height = this.light.shadowMapHeight;


            //todo if renderList is null, draw all
            this.light.shadowRenderList.forEach((child:GameObject) => {
                //todo support multi shadowMap
                self._setShadowMap(child, self.texture);
            });

            super.initWhenCreate();
        }

        public init(){
            this.texture.init();

            Director.getInstance().stage.createShaderOnlyOnce(BuildShadowMapShaderLib.getInstance());

            super.init();
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var self = this,
                shadowMapCamera = this.createCamera(),
                stage:Stage = Director.getInstance().stage;

            if(!stage.shadowMap.enable){
                return;
            }

            //todo No color buffer is drawn to(webgl not support yet)
            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.frameBufferOperator.setViewport();

            stage.useProgram();

            //todo if renderList is null, draw all
            this.light.shadowRenderList.forEach((child:GameObject) => {
                self._setShadowData(child, shadowMapCamera);
                child.render(renderer, shadowMapCamera);
            });
            renderer.render();

            stage.unUseProgram();

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected warnTextureSizeExceedCanvasSize(){
            //not warn
        }

        protected createCamera():GameObject{
            var orthoCameraComponent = OrthographicCamera.create(),
                light:DirectionLight = this.light,
                camera = GameObject.create();

            orthoCameraComponent.left = light.shadowCameraLeft;
            orthoCameraComponent.right = light.shadowCameraRight;
            orthoCameraComponent.top = light.shadowCameraTop;
            orthoCameraComponent.bottom = light.shadowCameraBottom;
            orthoCameraComponent.near = light.shadowCameraNear;
            orthoCameraComponent.far = light.shadowCameraFar;

            camera.addComponent(orthoCameraComponent);

            //todo optimize:dirty?
            camera.transform.translate(light.position);
            camera.transform.lookAt(0, 0, 0);

            camera.init();

            return camera;
        }

        private _setShadowMap(target:GameObject, shadowMap:ShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));


            material.shadowMap = shadowMap;
        }

        private _setShadowData(target:GameObject, shadowMapCamera:GameObject){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material,
                cameraComponent = shadowMapCamera.getComponent<OrthographicCamera>(OrthographicCamera);
            //cameraComponent = shadowMapCamera.getComponent<PerspectiveCamera>(PerspectiveCamera);

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            //todo refactor
            material.shadowMapData = {
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                shadowMapSize: [this.light.shadowMapWidth, this.light.shadowMapHeight],
                //todo optimize: compute vpMatrix once here or when render shadowRenderList
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix)
            };
        }
    }
}

