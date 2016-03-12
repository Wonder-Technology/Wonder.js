module wd{
    export class EnvMapBasicForLightShaderLib extends EnvMapForLightShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "envMap_basic_forLight";
    }
}


