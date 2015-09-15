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
            //todo should be only one ambient
                ambientLight:AmbientLight = <AmbientLight>lights.getChild("ambientLight");
            //todo type to enum?
            var pointLight:PointLight = <PointLight>lights.getChild("pointLight");

            if(quadCmd.buffers.hasChild("normalBuffer")){
                program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            program.sendUniformData("u_normalMatrix", VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose());
            program.sendUniformData("u_cameraPos", VariableType.FLOAT_3, Director.getInstance().stage.camera.transform.position);


            program.sendUniformData("u_diffuse", VariableType.FLOAT_3, material.color.toVector3());
            program.sendUniformData("u_specular", VariableType.FLOAT_3, material.specular.toVector3());
            program.sendUniformData("u_shininess", VariableType.FLOAT_1, material.shininess);

            program.sendUniformData("u_ambient", VariableType.FLOAT_3, ambientLight.color.toVector3());

            if(pointLight){
                program.sendStructureData("u_pointLight.position", VariableType.FLOAT_3, pointLight.position);
                program.sendStructureData("u_pointLight.color", VariableType.FLOAT_3, pointLight.color.toVector3());

                program.sendStructureData("u_pointLight.intensity", VariableType.FLOAT_1, pointLight.intensity);
                program.sendStructureData("u_pointLight.range", VariableType.FLOAT_1, pointLight.range);
                program.sendStructureData("u_pointLight.constant", VariableType.FLOAT_1, pointLight.constant);
                program.sendStructureData("u_pointLight.linear", VariableType.FLOAT_1, pointLight.linear);
                program.sendStructureData("u_pointLight.quadratic", VariableType.FLOAT_1, pointLight.quadratic);
            }

            //program.sendStructureData("u_directionLight.direction", VariableType.FLOAT_3, directionLight.direction);
            //program.sendStructureData("u_directionLight.intensity", VariableType.FLOAT_1, directionLight.intensity);
            //program.sendStructureData("u_directionLight.color", VariableType.FLOAT_3, directionLight.color.toVector3());
        }

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_normal"]);
            //this.addUniformVariable(["u_directionLight", "u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);
            this.addUniformVariable(["u_pointLight", "u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);

            this.vsSourceHead = ShaderChunk.light_head_vertex;
            this.vsSourceBody = ShaderChunk.light_body_vertex;
            this.fsSourceHead = ShaderChunk.light_head_fragment;
            this.fsSourceBody = ShaderChunk.light_body_fragment;

            this.fsSourceDefine.addChild({
                name: "POINT"
            });
        }
    }
}

