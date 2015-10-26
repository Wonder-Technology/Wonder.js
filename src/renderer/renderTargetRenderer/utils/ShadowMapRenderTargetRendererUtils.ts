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
        private _shader:Shader = null;

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

            Log.error(!(material instanceof LightMaterial), Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.setMaterialShadowMapData(material, target, shadowMapCamera);
        }

        public bindEndLoop(func:Function){
            this._endLoopHandler = func;

            EventManager.on("dy_endLoop",this._endLoopHandler);
        }

        public unBindEndLoop(){
            EventManager.off("dy_endLoop", this._endLoopHandler);
        }

        public beforeRender(){
            var stage:Stage = Director.getInstance().stage;

            stage.useProgram(this._shader);
        }

        public afterRender(){
            var stage:Stage = Director.getInstance().stage;

            stage.unUseProgram();
        }

        public createShaderWithShaderLib(lib:BuildShadowMapShaderLib){
            this._shader = Shader.create();
            this._shader.addLib(lib);
            //this._shader.buildGLSLAndInitProgram();
        }

        protected abstract setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject);
        protected abstract addShadowMap(material:LightMaterial, shadowMap:IShadowMapTexture);

        protected setShadowMap(target:GameObject, shadowMap:IShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            if(material.hasShadowMap(shadowMap)){
                return;
            }

            Log.error(!(material instanceof LightMaterial), Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.addShadowMap(material, shadowMap);
        }
    }
}

