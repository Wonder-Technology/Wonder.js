module wd{
    export class TerrainLayerShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrain_layer";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:TerrainMaterial){
            material.layer.mapData.forEach((mapData:TerrainLayerData, index:number) => {
                program.sendStructureData(`u_layerHeightDatas[${index}].minHeight`, EVariableType.FLOAT_1, mapData.minHeight);
                program.sendStructureData(`u_layerHeightDatas[${index}].maxHeight`, EVariableType.FLOAT_1, mapData.maxHeight);

                //todo test
                program.sendStructureData(`u_layerHeightDatas[${index}].repeatRegion`, EVariableType.VECTOR_4, mapData.diffuseMap.repeatRegion);
            });
        }

        @require(function(cmd:QuadCommand, material:TerrainMaterial){
            it("TerrainMaterial->layer->mapData->count should > 0", () => {
                expect(material).exist;
                expect(material.layer.getMapCount()).greaterThan(0);
            });
        })
        public setShaderDefinition(cmd:QuadCommand, material:TerrainMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_layerHeightDatas", "u_layerSampler2Ds"]);

            this.fsSourceDefineList.addChildren([{
                name: "LAYER_COUNT",
                value: material.layer.getMapCount()
            }]);
        }
    }
}

