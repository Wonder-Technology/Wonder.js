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
            var lights = dy.Director.getInstance().stage.lights,
                //todo move to LightManager
                directionLights:dyCb.Collection<DirectionLight> = <dyCb.Collection<DirectionLight>>lights.getChild("directionLight"),
            //todo should be only one ambient
                ambientLight:AmbientLight = <AmbientLight>lights.getChild("ambientLight");
            //todo type to enum?
            var pointLights:dyCb.Collection<PointLight> = <dyCb.Collection<PointLight>>lights.getChild("pointLight");

            if(quadCmd.buffers.hasChild("normalBuffer")){
                program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            program.sendUniformData("u_normalMatrix", VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose());
            program.sendUniformData("u_cameraPos", VariableType.FLOAT_3, Director.getInstance().stage.camera.transform.position);


            program.sendUniformData("u_diffuse", VariableType.FLOAT_3, material.color.toVector3());
            program.sendUniformData("u_specular", VariableType.FLOAT_3, material.specular.toVector3());
            program.sendUniformData("u_shininess", VariableType.FLOAT_1, material.shininess);

            program.sendUniformData("u_ambient", VariableType.FLOAT_3, ambientLight.color.toVector3());

            //todo refactor
            if(pointLights){
                pointLights.forEach((pointLight:PointLight, index:number) => {
                    program.sendStructureData(`u_pointLights[${index}].position`, VariableType.FLOAT_3, pointLight.position);
                    program.sendStructureData(`u_pointLights[${index}].color`, VariableType.FLOAT_3, pointLight.color.toVector3());

                    program.sendStructureData(`u_pointLights[${index}].intensity`, VariableType.FLOAT_1, pointLight.intensity);
                    program.sendStructureData(`u_pointLights[${index}].range`, VariableType.FLOAT_1, pointLight.range);
                    program.sendStructureData(`u_pointLights[${index}].constant`, VariableType.FLOAT_1, pointLight.constant);
                    program.sendStructureData(`u_pointLights[${index}].linear`, VariableType.FLOAT_1, pointLight.linear);
                    program.sendStructureData(`u_pointLights[${index}].quadratic`, VariableType.FLOAT_1, pointLight.quadratic);
                });
            }

            if(directionLights){
                directionLights.forEach((directionLight:DirectionLight, index:number) => {
                    program.sendStructureData(`u_directionLights[${index}].direction`, VariableType.FLOAT_3, directionLight.direction);
                    program.sendStructureData(`u_directionLights[${index}].color`, VariableType.FLOAT_3, directionLight.color.toVector3());

                    program.sendStructureData(`u_directionLights[${index}].intensity`, VariableType.FLOAT_1, directionLight.intensity);
                });
            }
        }

        protected setShaderDefinition(){
            var lights = dy.Director.getInstance().stage.lights,
            //todo move to LightManager
                directionLights:dyCb.Collection<DirectionLight> = <dyCb.Collection<DirectionLight>>lights.getChild("directionLight");
            //todo type to enum?
            var pointLights:dyCb.Collection<PointLight> = <dyCb.Collection<PointLight>>lights.getChild("pointLight");

            var max_direction_lights = 0,
                max_point_lights = 0;

            //todo refactor
            if(directionLights){
                this.addUniformVariable(["u_directionLights", "u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);

                max_direction_lights = directionLights.getCount();
            }

            if(pointLights){
                this.addUniformVariable(["u_pointLights", "u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);

                max_point_lights = pointLights.getCount();
            }

            this.fsSourceDefine.addChildren([{
                name: "MAX_DIRECTION_LIGHTS",
                value: max_direction_lights
            }, {
                name: "MAX_POINT_LIGHTS",
                value: max_point_lights
            }]);


            this.addAttributeVariable(["a_normal"]);
            //this.addUniformVariable(["u_directionLight", "u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);

            this.vsSourceHead = ShaderChunk.light_head_vertex;
            this.vsSourceBody = ShaderChunk.light_body_vertex;
            this.fsSourceHead = ShaderChunk.light_head_fragment;
            this.fsSourceBody = ShaderChunk.light_body_fragment;
        }
    }
}

