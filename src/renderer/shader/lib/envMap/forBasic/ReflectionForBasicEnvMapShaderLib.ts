module wd{
    export class ReflectionForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "reflection_forBasic_envMap";

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}


