module wd{
    export class GrassHardwareInstanceShaderLib extends GrassInstanceShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "grass_hardware_instance";
    }
}

