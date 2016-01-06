module wd{
    export class BasicEnvMapForBasicShaderLib extends EnvMapForBasicShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basic_envMap_forBasic";
    }
}


