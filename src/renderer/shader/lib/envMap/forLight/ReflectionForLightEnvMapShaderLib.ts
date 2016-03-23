module wd{
    export class ReflectionForLightEnvMapShaderLib extends ForLightEnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "reflection_forLight_envMap";

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}


