module wd{
    export class DiffuseMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "diffuseMap";

        @require(function(program: Program, cmd:QuadCommand, material:LightMaterial){
            var diffuseMap:any = material.diffuseMap;

            assert(!!diffuseMap, Log.info.FUNC_MUST_DEFINE("diffuseMap"));

            assert(!!diffuseMap.sourceRegionForGLSL && !!diffuseMap.repeatRegion, Log.info.FUNC_SHOULD("material.diffuseMap", "has sourceRegionForGLSL,repeatRegion data"));
        })
        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
            var diffuseMap:ImageTexture|ProceduralTexture = <ImageTexture|ProceduralTexture>material.diffuseMap;

            this.sendUniformData(program, "u_diffuseSourceRegion", diffuseMap.sourceRegionForGLSL);
            this.sendUniformData(program, "u_diffuseRepeatRegion", diffuseMap.repeatRegion);

            return this;
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("diffuseMap"),
                "u_diffuseSourceRegion", "u_diffuseRepeatRegion"
            ]);
        }
    }
}

