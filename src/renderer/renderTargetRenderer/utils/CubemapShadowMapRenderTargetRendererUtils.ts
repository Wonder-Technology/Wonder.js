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

        private _setCubemapShadowMap(target:GameObject, shadowMap:CubemapShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            if(material.hasShadowMap(shadowMap)){
                return;
            }

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.addCubemapShadowMap(shadowMap);
        }
    }
}
