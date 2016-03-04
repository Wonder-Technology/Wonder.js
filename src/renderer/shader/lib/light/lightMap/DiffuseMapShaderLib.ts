module wd{
    export class DiffuseMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "diffuseMap";

        @require(function(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var diffuseMap:any = material.diffuseMap;

            assert(!!diffuseMap, Log.info.FUNC_MUST_DEFINE("diffuseMap"));

            assert(!!diffuseMap.sourceRegionForGLSL && !!diffuseMap.repeatRegion, Log.info.FUNC_SHOULD("material.diffuseMap", "has sourceRegionForGLSL,repeatRegion data"));
        })
        protected sendBaseLightMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var diffuseMap:ImageTexture|ProceduralTexture = <ImageTexture|ProceduralTexture>material.diffuseMap;

            this.sendUniformData(program, "u_diffuseSourceRegion", diffuseMap.sourceRegionForGLSL);
            this.sendUniformData(program, "u_diffuseRepeatRegion", diffuseMap.repeatRegion);

            return this;
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("diffuseMap"),
                "u_diffuseSourceRegion", "u_diffuseRepeatRegion"
            ]);
        }
    }
}

