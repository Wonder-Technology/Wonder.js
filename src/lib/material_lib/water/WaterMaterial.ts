module wd{
    export class WaterMaterial extends LightMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }

        protected addExtendShaderLib(){
        }
    }
}

