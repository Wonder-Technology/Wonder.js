module wd{
    export class TerrainMixCommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrain_mix_common";
    }
}

