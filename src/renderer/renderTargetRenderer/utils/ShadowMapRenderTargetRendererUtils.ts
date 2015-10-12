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


        public setShadowData(target:GameObject);
        public setShadowData(target:GameObject, shadowMapCamera:GameObject);

        public setShadowData(arg){
            var target:GameObject = arguments[0],
                material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material,
          shadowMapCamera = null;

            if(arguments.length === 2){
                shadowMapCamera = arguments[1];
            }

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.setMaterialShadowMapData(material, target, shadowMapCamera);
        }

        public clearShadowData(target:GameObject){
            var target:GameObject = arguments[0],
                material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;


            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.clearShadowMapData();
        }

        protected abstract setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject);
    }
}

