/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class LightShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var lights:dyCb.Hash<Light> = dy.Director.getInstance().stage.lights,
                //todo move to LightManager
                directionLight:DirectionLight = <DirectionLight>lights.getChild("directionLight"),
                ambientLight:AmbientLight = <AmbientLight>lights.getChild("ambientLight");

            if(quadCmd.buffers.hasChild("normalBuffer")){
                program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            program.sendUniformData("u_normalMatrix", VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose());
            program.sendUniformData("u_cameraPos", VariableType.FLOAT_3, Director.getInstance().stage.camera.transform.position);


            program.sendUniformData("u_diffuse", VariableType.FLOAT_3, material.color.toVector3());
            program.sendUniformData("u_specular", VariableType.FLOAT_3, material.specular.toVector3());
            program.sendUniformData("u_shininess", VariableType.FLOAT_1, material.shininess);

            program.sendUniformData("u_ambient", VariableType.FLOAT_3, ambientLight.color.toVector3());

            program.sendStructureData("u_directionLight.direction", VariableType.FLOAT_3, directionLight.direction);
            program.sendStructureData("u_directionLight.intensity", VariableType.FLOAT_1, directionLight.intensity);
            program.sendStructureData("u_directionLight.color", VariableType.FLOAT_3, directionLight.color.toVector3());
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_normal"]);
            //todo specify structure type?
            this.addUniformVariable(["u_directionLight", "u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);

            this.vsSourceHead = ShaderChunk.light_head_vertex;
            this.vsSourceBody = ShaderChunk.light_body_vertex;
            this.fsSourceHead = ShaderChunk.light_head_fragment;
            this.fsSourceBody = ShaderChunk.light_body_fragment;
        }
    }
}

