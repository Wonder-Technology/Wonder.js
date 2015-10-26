/// <reference path="../definitions.d.ts"/>
module dy{
    export class EnvMapMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public refractionRatio:number = ShaderChunk.NULL;
        public reflectivity:number = ShaderChunk.NULL;

        public init(){
            var envMap = this.envMap;

            switch (envMap.mode){
                case EnvMapMode.NORMAL:
                    this.shader.addLib(BasicEnvMapShaderLib.create());
                    break;
                case EnvMapMode.REFLECTION:
                    this.shader.addLib(ReflectionShaderLib.create());
                    break;
                case EnvMapMode.REFRACTION:
                    this.shader.addLib(RefractionShaderLib.create());
                    break;
                case EnvMapMode.FRESNEL:
                    this.shader.addLib(FresnelShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("EnvMapMode"));
                    break;
            }

            super.init();
        }
    }
}

