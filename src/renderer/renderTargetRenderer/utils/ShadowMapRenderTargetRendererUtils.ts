module wd {
    export abstract class ShadowMapRenderTargetRendererUtils{
        constructor(_light:Light, _texture:Texture){
            this._light = _light;
            this._texture = _texture;
        }

        private _texture:Texture = null;
        private _light:Light = null;

        public initWhenCreate(){
            this._texture.width = this._light.shadowMapWidth;
            this._texture.height = this._light.shadowMapHeight;
        }

        public beforeRender(shaderType:EShaderTypeOfScene){
            Director.getInstance().scene.useShaderType(shaderType);

        }

        public afterRender(){
            Director.getInstance().scene.unUseShader();
        }

        public renderRenderer(renderer:Renderer){
            this.setWebglState(renderer);
            renderer.render();
        }

        protected abstract setWebglState(renderer:Renderer);
    }
}

