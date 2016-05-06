module wd{
    export class SkyboxMaterial extends EngineMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.side = ESide.BACK;
        }

        public getTextureForRenderSort():Texture{
            return null;
        }

        protected addShaderLib(){
            this.shader.addLib(SkyboxShaderLib.create());
        }
    }
}

