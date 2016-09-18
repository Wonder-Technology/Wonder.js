module wd{
    export class GrassBatchInstanceShaderLib extends GrassInstanceShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "grass_batch_instance";
    }
}

