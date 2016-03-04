module wd{
    export class SkyboxMaterial extends EngineMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.side = ESide.BACK;
        }

        protected addShaderLib(){
            this.shader.addLib(SkyboxShaderLib.create());
        }
    }
}

