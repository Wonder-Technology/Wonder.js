module wd {
    export abstract class ShadowMapRenderTargetRendererUtils{
        constructor(_light:Light, texture:Texture){
            this._light = _light;
            this.texture = texture;
        }

        protected texture:Texture = null;
        protected mapManager:MapManager = MapManager.create();

        private _light:Light = null;

        public initWhenCreate(){
            this.texture.width = this._light.shadowMapWidth;
            this.texture.height = this._light.shadowMapHeight;
        }

        public init(){
            this.mapManager.init();
        }

        public dispose(){
            this.mapManager.dispose();
        }

        public beforeRender(shaderType:EShaderTypeOfScene){
            Director.getInstance().scene.useShaderType(shaderType);

        }

        public afterRender(){
            Director.getInstance().scene.unUseShader();
        }

        public renderRenderer(renderer:Renderer){
            renderer.webglState = BuildShadowMapState.create();
            renderer.render();
        }
    }
}

