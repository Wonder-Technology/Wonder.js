module wd{
    export class NoSpecularMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noSpecularMap";
    }
}

