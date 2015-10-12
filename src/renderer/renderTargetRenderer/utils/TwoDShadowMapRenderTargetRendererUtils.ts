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
                self._setTwoDShadowMap(child, self.texture);
            });
        }

        public clearTwoDShadowData(target:GameObject){
            var target:GameObject = arguments[0],
                material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;


            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.clearTwoDShadowMapData();
        }

        protected setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject){
            var cameraComponent = shadowMapCamera.getComponent<OrthographicCamera>(OrthographicCamera);

            material.addTwoDShadowMapData({
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                shadowSize: [this.light.shadowMapWidth, this.light.shadowMapHeight],
                lightPos: this.light.position,
                //todo optimize: compute vpMatrix once here or when render shadowRenderList
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix)
            });

            material.buildTwoDShadowMapData = {
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix)
            };
        }

        private _setTwoDShadowMap(target:GameObject, shadowMap:TwoDShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            if(material.hasShadowMap(shadowMap)){
                return;
            }

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.addTwoDShadowMap(shadowMap);
        }
    }
}

