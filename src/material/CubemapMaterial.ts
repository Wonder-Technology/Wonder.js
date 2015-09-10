/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubemapMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public refractionRatio:number = null;
        public reflectivity:number = null;

        public init(){
            var envMap = this.getEnvMap();

            switch (envMap.mode){
                case CubemapMode.NORMAL:
                    this.shader.addLib(render.BasicCubemapShaderLib.getInstance());
                    break;
                case CubemapMode.REFLECTION:
                    this.shader.addLib(render.ReflectionShaderLib.getInstance());
                    break;
                case CubemapMode.REFRACTION:
                    this.shader.addLib(render.RefractionShaderLib.getInstance());
                    break;
                case CubemapMode.FRESNEL:
                    this.shader.addLib(render.FresnelShaderLib.getInstance());
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("CubemapMode"));
                    break;
            }

            super.init();
        }
    }
}

