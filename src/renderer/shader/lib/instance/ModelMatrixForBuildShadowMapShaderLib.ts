module wd{
    export class ModelMatrixForBuildShadowMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "modelMatrix_forBuildShadowMap";

        //todo refactor?
        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
            //if(cmd.target.hasComponent(Instance) && GPUDetector.getInstance().extensionInstancedArrays !== null){
            //    //if(cmd.target.hasComponent(Instance)){
            //    return;
            //}

            //todo refactor

            if((<SingleDrawCommand>cmd).mMatrix){
                this.sendUniformData(program, "u_mMatrix", (<SingleDrawCommand>cmd).mMatrix);
            }
            else{
                this.sendUniformData(program, "u_mMatrix",Matrix4.create().translate(50,50,50) );
            }
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            //if(cmd.target.hasComponent(Instance)){
            //    this.addAttributeVariable(["a_mVec4_0", "a_mVec4_1","a_mVec4_2","a_mVec4_3"]);
            //
            //    this.setVsSource(this.getVsChunk("modelMatrix_instance"));
            //    this.setFsSource(this.getFsChunk("modelMatrix_instance"));
            //}
            //else{
            //    this.addUniformVariable(["u_mMatrix"]);
            //
            //    this.setVsSource(this.getVsChunk("modelMatrix_noInstance"));
            //    this.setFsSource(this.getFsChunk("modelMatrix_noInstance"));
            //}

            this.addUniformVariable(["u_mMatrix"]);

            this.addAttributeVariable(["a_mVec4_0", "a_mVec4_1","a_mVec4_2","a_mVec4_3"]);

            this.setVsSource(this.getVsChunk("modelMatrix_noInstance"));
            //this.setVsSource(this.getVsChunk("modelMatrix_instance"), "+");
            this.setFsSource(this.getFsChunk("modelMatrix_noInstance"));
            //this.setFsSource(this.getFsChunk("modelMatrix_instance", "+"));

        }
    }
}

