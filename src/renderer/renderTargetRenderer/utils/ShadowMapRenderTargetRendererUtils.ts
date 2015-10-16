/// <reference path="../../../definitions.d.ts"/>
module dy {
    export abstract class ShadowMapRenderTargetRendererUtils{
        constructor(light:Light, texture:Texture){
            this.light = light;
            this.texture = texture;
        }

        public texture:Texture = null;

        protected light:Light = null;

        private _endLoopHandler:Function = null;

        public initWhenCreate(){
            this.texture.width = this.light.shadowMapWidth;
            this.texture.height = this.light.shadowMapHeight;
        }

        public init(){
            this.texture.init();
        }


        public setShadowMapData(target:GameObject);
        public setShadowMapData(target:GameObject, shadowMapCamera:GameObject);

        public setShadowMapData(arg){
            var target:GameObject = arguments[0],
                material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material,
          shadowMapCamera = null;

            if(arguments.length === 2){
                shadowMapCamera = arguments[1];
            }

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.setMaterialShadowMapData(material, target, shadowMapCamera);
        }

        public bindEndLoop(func:Function){
            this._endLoopHandler = func;

            EventManager.on("dy_endLoop",this._endLoopHandler);
        }

        public unBindEndLoop(){
            EventManager.off("dy_endLoop", this._endLoopHandler);
        }

        public beforeRender(lib:BuildShadowMapShaderLib){
            var stage:Stage = Director.getInstance().stage;

            stage.shader.addLib(lib);
            stage.shader.initProgram();
            stage.shader.program.use();
        }

        public afterRender(lib:BuildShadowMapShaderLib){
            var stage:Stage = Director.getInstance().stage;

            stage.shader.program.unUse();
            stage.shader.removeLib(lib);
            stage.shader.clearSource();
        }

        protected abstract setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject);
        protected abstract addShadowMap(material:LightMaterial, shadowMap:IShadowMapTexture);

        protected setShadowMap(target:GameObject, shadowMap:IShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            if(material.hasShadowMap(shadowMap)){
                return;
            }

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.addShadowMap(material, shadowMap);
        }
    }
}

