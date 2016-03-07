module wd{
    export class TerrainLayerShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrainLayer";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:TerrainMaterial){
            material.layer.mapDataList.forEach((mapData:TerrainLayerMapData, index:number) => {
                program.sendStructureData(`u_layerHeightDatas[${index}].minHeight`, EVariableType.FLOAT_1, mapData.minHeight);
                program.sendStructureData(`u_layerHeightDatas[${index}].maxHeight`, EVariableType.FLOAT_1, mapData.maxHeight);
            });
        }

        @require(function(quadCmd:QuadCommand, material:TerrainMaterial){
            assert(!!material, Log.info.FUNC_NOT_EXIST("param:material"));
            assert(material.layer.mapDataList.getCount() >= 0, Log.info.FUNC_SHOULD("TerrainMaterial->layer->mapDataList->count", ">= 0"));
        })
        public setShaderDefinition(quadCmd:QuadCommand, material:TerrainMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_layerHeightDatas", "u_layerSampler2Ds"]);

            this.fsSourceDefineList.addChildren([{
                name: "LAYER_COUNT",
                value: material.layer.mapDataList.getCount()
            }]);
        }
    }
}

