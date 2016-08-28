module wd{
    export class TerrainMixCommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrainMix_common";
    }
}

