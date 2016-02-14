module wd{
    export class TwoDShadowMapShaderLib extends ShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "twoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            material.twoDShadowMapDatas.forEach((data:TwoDShadowMapData, index:number) => {
                program.sendStructureData(`u_vpMatrixFromLight[${index}]`, EVariableType.FLOAT_MAT4, data.vpMatrixFromLight);
                program.sendStructureData(`u_twoDShadowSize[${index}]`, EVariableType.FLOAT_2, data.shadowSize);
                program.sendStructureData(`u_twoDShadowBias[${index}]`, EVariableType.FLOAT_1, data.shadowBias);
                program.sendStructureData(`u_twoDShadowDarkness[${index}]`, EVariableType.FLOAT_1, data.shadowDarkness);
                program.sendStructureData(`u_twoDLightPos[${index}]`, EVariableType.FLOAT_3, data.lightPos);
            });
        }
    }
}

