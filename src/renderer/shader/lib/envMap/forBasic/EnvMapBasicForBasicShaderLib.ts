module wd{
    export class EnvMapBasicForBasicShaderLib extends EnvMapForBasicShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "envMap_basic_forBasic";
    }
}


