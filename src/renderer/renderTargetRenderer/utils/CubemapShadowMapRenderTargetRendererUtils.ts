module wd {
    export class CubemapShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:PointLight, texture:CubemapShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:CubemapShadowMapTexture;

        protected light:PointLight;

        //public initWhenCreate(){
        //    var self = this;
        //
        //    super.initWhenCreate();
        //
        //    this.light.shadowRenderList.forEach((childList:Array<GameObject>|wdCb.Collection<GameObject>) => {
        //        childList.forEach((child:GameObject) => {
        //            self.setShadowMap(child, self.texture);
        //        })
        //    });
        //}

        //@require(function(target:GameObject){
        //    var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;
        //
        //    assert(material instanceof LightMaterial, Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
        //})
        //public clearCubemapShadowMapData(target:GameObject){
        //    var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;
        //
        //    material.clearCubemapShadowMapData();
        //}
        //
        //public setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject){
        //    material.addCubemapShadowMapData({
        //        shadowBias:this.light.shadowBias,
        //        shadowDarkness:this.light.shadowDarkness,
        //        lightPos:this.light.position,
        //        farPlane:this.light.shadowCameraFar
        //    });
        //
        //    material.buildCubemapShadowMapData = {
        //        lightPos: this.light.position,
        //        farPlane: this.light.shadowCameraFar
        //    };
        //}
        //
        //
        //protected addShadowMap(material:LightMaterial, shadowMap:CubemapShadowMapTexture){
        //    material.addCubemapShadowMap(shadowMap);
        //}
    }
}
