/// <reference path="../definitions.d.ts"/>
module dy{
    export class EnvMapMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public refractionRatio:number = null;
        public reflectivity:number = null;

        public init(){
            var envMap = this.getEnvMap();

            switch (envMap.mode){
                case EnvMapMode.NORMAL:
                    this.shader.addLib(render.BasicEnvMapShaderLib.getInstance());
                    break;
                case EnvMapMode.REFLECTION:
                    this.shader.addLib(render.ReflectionShaderLib.getInstance());
                    break;
                case EnvMapMode.REFRACTION:
                    this.shader.addLib(render.RefractionShaderLib.getInstance());
                    break;
                case EnvMapMode.FRESNEL:
                    this.shader.addLib(render.FresnelShaderLib.getInstance());
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("EnvMapMode"));
                    break;
            }

            super.init();
        }
    }
}

