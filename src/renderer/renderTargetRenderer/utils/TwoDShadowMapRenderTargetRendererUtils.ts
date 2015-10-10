/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class TwoDShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:DirectionLight, texture:TwoDShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        //todo private?
        public light:DirectionLight;
        public texture:TwoDShadowMapTexture;

        public initWhenCreate(){
            var self = this;

            super.initWhenCreate();

            //todo if renderList is null, draw all
            this.light.shadowRenderList.forEach((child:GameObject) => {
                //todo support multi shadowMap
                self._setShadowMap(child, self.texture);
            });
        }

        public init(){
            super.init();

            Director.getInstance().stage.createShaderOnlyOnce(BuildShadowMapShaderLib.getInstance());
        }

        protected setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject){
            var cameraComponent = shadowMapCamera.getComponent<OrthographicCamera>(OrthographicCamera);

            //todo refactor
            material.shadowMapData = {
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                shadowMapSize: [this.light.shadowMapWidth, this.light.shadowMapHeight],
                //todo optimize: compute vpMatrix once here or when render shadowRenderList
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix)
            };
        }

        private _setShadowMap(target:GameObject, shadowMap:TwoDShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.twoDShadowMap = shadowMap;
        }
    }
}

