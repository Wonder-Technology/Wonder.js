/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:PointLight, texture:CubemapShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        //todo private?
        public light:PointLight;
        public texture:CubemapShadowMapTexture;

        public initWhenCreate(){
            var self = this;

            super.initWhenCreate();

            this.light.shadowRenderList.forEach((childList:Array<GameObject>|dyCb.Collection<GameObject>) => {
                childList.forEach((child:GameObject) => {
                    self._setCubemapShadowMap(child, self.texture);
                })
            });
        }

        public init(){
            super.init();

            Director.getInstance().stage.createShaderOnlyOnce(BuildCubemapShadowMapShaderLib.getInstance());
        }


        public setBuildShadowData(target:GameObject){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
            //
            //this.setMaterialShadowMapData(material, target, shadowMapCamera);



            material.buildCubemapShadowMapData = {
                lightPos: this.light.position,
                farPlane: this.light.shadowCameraFar
            };
        }
        //
        //protected setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject){
        //    var cameraComponent = shadowMapCamera.getComponent<PerspectiveCamera>(PerspectiveCamera);
        //
        //    material.cubemapShadowMapData = {
        //        shadowBias: this.light.shadowBias,
        //        shadowDarkness: this.light.shadowDarkness,
        //        lightPos: this.light.position,
        //        farPlane: cameraComponent.far
        //    };
        //}

        private _setCubemapShadowMap(target:GameObject, shadowMap:CubemapShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;


            //if(material.cubemapShadowMap){
            if(material.hasShadowMap(shadowMap)){
                return;
            }

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.addCubemapShadowMap(shadowMap);
        }
    }
}
