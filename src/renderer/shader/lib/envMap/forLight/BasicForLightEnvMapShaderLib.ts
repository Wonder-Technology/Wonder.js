module wd{
    export class BasicForLightEnvMapShaderLib extends ForLightEnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basic_forLight_envMap";
    }
}


