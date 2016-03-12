module wd{
    export class WaterNoBumpMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "water_noBump";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:WaterMaterial){
        }
    }
}

