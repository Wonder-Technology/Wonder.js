module wd{
    export class WaterNoLightEffectShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_noLightEffect";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
        }
    }
}

