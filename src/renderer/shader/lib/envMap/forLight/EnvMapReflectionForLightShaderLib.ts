module wd{
    export class EnvMapReflectionForLightShaderLib extends EnvMapForLightShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "envMap_reflection_forLight";

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}


