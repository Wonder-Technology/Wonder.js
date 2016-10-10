module wd{
    export class LightSetWorldPositionShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "light_setWorldPosition";
    }
}

