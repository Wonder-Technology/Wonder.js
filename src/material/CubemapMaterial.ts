/// <reference path="../definitions.d.ts"/>
module dy{
    export class CubemapMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public refractionRatio:number = null;

        public init(){
            var envMap = this.getEnvMap();

            if(envMap.mode === CubemapMode.REFLECTION){
                this.shader.addLib(render.ReflectionShaderLib.getInstance());
            }
            else if(envMap.mode === CubemapMode.REFRACTION){
                this.shader.addLib(render.RefractionShaderLib.getInstance());
            }
            else if(envMap.mode === CubemapMode.FRESNEL){
                this.shader.addLib(render.FresnelShaderLib.getInstance());
            }

            super.init();
        }
    }
}

