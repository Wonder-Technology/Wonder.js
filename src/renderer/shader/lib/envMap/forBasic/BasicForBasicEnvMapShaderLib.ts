module wd{
    export class BasicForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basic_forBasic_envMap";
    }
}


