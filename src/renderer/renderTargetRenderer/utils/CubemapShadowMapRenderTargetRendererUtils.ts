/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:PointLight, texture:CubemapShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:CubemapShadowMapTexture;

        protected light:PointLight;

        public initWhenCreate(){
            var self = this;

            super.initWhenCreate();

            this.light.shadowRenderList.forEach((childList:Array<GameObject>|dyCb.Collection<GameObject>) => {
                childList.forEach((child:GameObject) => {
                    self.setShadowMap(child, self.texture);
                })
            });
        }

        public clearCubemapShadowMapData(target:GameObject){
            var target:GameObject = arguments[0],
                material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;


            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.clearCubemapShadowMapData();
        }

        public setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject){
            material.addCubemapShadowMapData({
                shadowBias:this.light.shadowBias,
                shadowDarkness:this.light.shadowDarkness,
                lightPos:this.light.position,
                farPlane:this.light.shadowCameraFar
            });

            material.buildCubemapShadowMapData = {
                lightPos: this.light.position,
                farPlane: this.light.shadowCameraFar
            };
        }


        protected addShadowMap(material:LightMaterial, shadowMap:CubemapShadowMapTexture){
            material.addCubemapShadowMap(shadowMap);
        }
    }
}
