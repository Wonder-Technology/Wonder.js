module wd{
    export class GrassMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "grass_map";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:GrassMaterial){
            var quadIndexBuffer = <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.CUSTOM, "quadIndices");

            if(!quadIndexBuffer){
                return;
            }

            let map:GrassMap = material.map,
                grassMap = map.grassMap;

            this.sendAttributeBuffer(program, "a_quadIndex", quadIndexBuffer);

            program.sendStructureData("u_windData.direction", EVariableType.VECTOR_2, map.wind.direction);
            program.sendStructureData("u_windData.time", EVariableType.FLOAT_1, map.wind.time);
            program.sendStructureData("u_windData.strength", EVariableType.FLOAT_1, map.wind.strength);

            map.mapData.forEach((mapData:GrassMapData, index:number) => {
                program.sendStructureData(`u_grassMapDatas[${index}].sourceRegion`, EVariableType.VECTOR_4, GlobalTextureUtils.convertSourceRegionCanvasMapToUV(mapData.sourceRegion, grassMap.width, grassMap.height));
            });
        }

        public setShaderDefinition(cmd:QuadCommand, material:GrassMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_quadIndex"]);
            this.addUniformVariable([
                VariableNameTable.getVariableName("grassMap"),
                "u_grassMapDatas",
                "u_windData"
            ]);

            this.fsSourceBody += `if (totalColor.a < ${material.map.alphaTest}){
    discard;
}\n`;
        }
    }
}

