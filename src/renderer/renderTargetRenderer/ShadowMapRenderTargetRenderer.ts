/// <reference path="../../definitions.d.ts"/>
module dy {
    export class ShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(light:DirectionLight) {
            var obj = new this(light);

            obj.initWhenCreate();

            return obj;
        }

        constructor(light:DirectionLight){
            super(ShadowMapTexture.create());

            this.light = light;
        }

        //todo private?
        public light:DirectionLight = null;

        protected texture:ShadowMapTexture;

        public initWhenCreate(){
            this.texture.width = this.light.shadowMapWidth;
            this.texture.height = this.light.shadowMapHeight;

            super.initWhenCreate();
        }

        public init(){
            this.texture.init();

            super.init();
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var self = this,
                shadowMapCamera = this.light.createShadowMapCamera(),
                stage:Stage = Director.getInstance().stage;


            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.frameBufferOperator.setViewport();

            stage.useProgram(BuildShadowMapShaderLib.getInstance());

            //todo if renderList is null, draw all
            this.light.shadowRenderList.forEach((child:GameObject) => {
                //todo support multi shadowMap
                self._setShadowMap(child, self.texture);
                child.render(renderer, shadowMapCamera, true);
            });
            renderer.render();

            stage.clearProgram();

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();

        }

        protected warnTextureSizeExceedCanvasSize(){
            //not warn
        }

        private _setShadowMap(target:GameObject, shadowMap:ShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            //todo refactor
            material.shadowMapData = {
                shadowMap: shadowMap,
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                mvpMatrixFromLight: this.light.getShadowMapMvpMatrix()
            };
        }
    }
}

