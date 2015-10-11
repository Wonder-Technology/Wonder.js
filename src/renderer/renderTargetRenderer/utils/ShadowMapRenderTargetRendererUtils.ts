/// <reference path="../../../definitions.d.ts"/>
module dy {
    export abstract class ShadowMapRenderTargetRendererUtils{
        constructor(light:Light, texture:Texture){
            this.light = light;
            this.texture = texture;
        }

        //todo private?
        public light:Light = null;
        public texture:Texture = null;

        public initWhenCreate(){
            this.texture.width = this.light.shadowMapWidth;
            this.texture.height = this.light.shadowMapHeight;
        }

        public init(){
            this.texture.init();
        }

        //todo remove
        public setShadowData(target:GameObject, shadowMapCamera:GameObject){
            //var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;
            //
            //dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));
            //
            //this.setMaterialShadowMapData(material, target, shadowMapCamera);
        }



        //protected abstract setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject);
    }
}

