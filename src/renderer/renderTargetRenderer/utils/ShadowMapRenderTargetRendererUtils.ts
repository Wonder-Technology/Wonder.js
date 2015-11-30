/// <reference path="../../../filePath.d.ts"/>
module wd {
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

        public setShadowMapData(...args){
            var target:GameObject = args[0],
                material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material,
          shadowMapCamera = null;

            if(args.length === 2){
                shadowMapCamera = args[1];
            }

            Log.error(!(material instanceof LightMaterial), Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            this.setMaterialShadowMapData(material, target, shadowMapCamera);
        }

        public bindEndLoop(func:Function){
            this._endLoopHandler = func;

            EventManager.on(<any>EngineEvent.ENDLOOP,this._endLoopHandler);
        }

        public unBindEndLoop(){
            EventManager.off(<any>EngineEvent.ENDLOOP, this._endLoopHandler);
        }

        public beforeRender(){
            var scene:Scene = Director.getInstance().scene;

            scene.useProgram(this._shader);
        }

        public afterRender(){
            var scene:Scene = Director.getInstance().scene;

            scene.unUseProgram();
        }

        public createShaderWithShaderLib(lib:BuildShadowMapShaderLib){
            this._shader = Shader.create();
            this._shader.addLib(CommonShaderLib.create());
            this._shader.addLib(CommonVerticeShaderLib.create());
            this._shader.addLib(lib);
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

