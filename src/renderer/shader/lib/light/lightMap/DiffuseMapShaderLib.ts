module wd{
    export class DiffuseMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "diffuseMap";

        @require(function(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            assert(!!material.diffuseMap, Log.info.FUNC_MUST_DEFINE("diffuseMap"));
        })
        protected sendBaseLightMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var diffuseMap = material.diffuseMap;

            this.sendUniformData(program, "u_diffuseSourceRegion", diffuseMap.sourceRegionForGLSL);
            this.sendUniformData(program, "u_diffuseRepeatRegion", diffuseMap.repeatRegion);

            return this;
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("diffuseMap"),
                "u_diffuseSourceRegion", "u_diffuseRepeatRegion"
            ]);
        }
    }
}

