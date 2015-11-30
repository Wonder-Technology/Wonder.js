/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class TwoDShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:DirectionLight, texture:TwoDShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:TwoDShadowMapTexture;

        protected light:DirectionLight;

        public initWhenCreate(){
            var self = this;

            super.initWhenCreate();

            //todo if renderList is null, draw all
            this.light.shadowRenderList.forEach((child:GameObject) => {
                self.setShadowMap(child, self.texture);
            });
        }

        @require(function(target:GameObject){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            assert(material instanceof LightMaterial, Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
        })
        public clearTwoDShadowMapData(target:GameObject){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            material.clearTwoDShadowMapData();
        }

        protected setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject){
            var cameraComponent:CameraController = shadowMapCamera.getComponent<CameraController>(CameraController);

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

        protected addShadowMap(material:LightMaterial, shadowMap:TwoDShadowMapTexture){
            material.addTwoDShadowMap(shadowMap);
        }
    }
}

