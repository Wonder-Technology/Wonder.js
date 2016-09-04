module wd{
    export class GrassMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "grass_map";

        //todo assert quadIndex should >= 0 && <= 2
        public sendShaderVariables(program: Program, cmd:QuadCommand, material:GrassMaterial){
            var quadIndexBuffer = <ArrayBuffer>cmd.buffers.getChild(EBufferDataType.CUSTOM, "quadIndices");

            if(!quadIndexBuffer){
                return;
            }

            let grassMap = material.grassMap;

            this.sendAttributeBuffer(program, "a_quadIndex", quadIndexBuffer);

            program.sendStructureData("u_windData.direction", EVariableType.VECTOR_2, material.wind.direction);
            program.sendStructureData("u_windData.time", EVariableType.FLOAT_1, material.wind.time);
            program.sendStructureData("u_windData.strength", EVariableType.FLOAT_1, material.wind.strength);

            material.mapData.forEach((mapData:GrassMapData, index:number) => {
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

            this.fsSourceBody += `if (totalColor.a < ${material.alphaTest}){
    discard;
}\n`;
        }
    }
}

