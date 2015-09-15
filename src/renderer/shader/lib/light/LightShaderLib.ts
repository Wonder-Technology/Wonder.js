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
            var stage:Stage = dy.Director.getInstance().stage,
                directionLights:dyCb.Collection<GameObject> = stage.directionLights,
                ambientLight:GameObject =stage.ambientLight,
                pointLights:dyCb.Collection<GameObject> = stage.pointLights;

            if(quadCmd.buffers.hasChild("normalBuffer")){
                program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            program.sendUniformData("u_normalMatrix", VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose());
            program.sendUniformData("u_cameraPos", VariableType.FLOAT_3, Director.getInstance().stage.camera.transform.position);


            program.sendUniformData("u_diffuse", VariableType.FLOAT_3, material.color.toVector3());
            program.sendUniformData("u_specular", VariableType.FLOAT_3, material.specular.toVector3());
            program.sendUniformData("u_shininess", VariableType.FLOAT_1, material.shininess);

            program.sendUniformData("u_ambient", VariableType.FLOAT_3, ambientLight.getComponent<AmbientLight>(AmbientLight).color.toVector3());


            //todo refactor
            if(pointLights){
                pointLights.forEach((pointLight:GameObject, index:number) => {
                    var lightComponent:PointLight = pointLight.getComponent<PointLight>(PointLight);

                    program.sendStructureData(`u_pointLights[${index}].position`, VariableType.FLOAT_3, pointLight.transform.position);
                    program.sendStructureData(`u_pointLights[${index}].color`, VariableType.FLOAT_3, lightComponent.color.toVector3());

                    program.sendStructureData(`u_pointLights[${index}].intensity`, VariableType.FLOAT_1, lightComponent.intensity);
                    program.sendStructureData(`u_pointLights[${index}].range`, VariableType.FLOAT_1, lightComponent.range);
                    program.sendStructureData(`u_pointLights[${index}].constant`, VariableType.FLOAT_1, lightComponent.constant);
                    program.sendStructureData(`u_pointLights[${index}].linear`, VariableType.FLOAT_1, lightComponent.linear);
                    program.sendStructureData(`u_pointLights[${index}].quadratic`, VariableType.FLOAT_1, lightComponent.quadratic);
                });
            }

            if(directionLights){
                var self = this;

                directionLights.forEach((directionLight:GameObject, index:number) => {
                    var lightComponent:DirectionLight = directionLight.getComponent<DirectionLight>(DirectionLight);

                    program.sendStructureData(`u_directionLights[${index}].direction`, VariableType.FLOAT_3, self._getDirection(directionLight));
                    program.sendStructureData(`u_directionLights[${index}].color`, VariableType.FLOAT_3, lightComponent.color.toVector3());

                    program.sendStructureData(`u_directionLights[${index}].intensity`, VariableType.FLOAT_1, lightComponent.intensity);
                });
            }
        }

        //todo test
        private _getDirection(directionLight:GameObject){
            return directionLight.transform.rotation.multiplyVector3(DirectionLight.defaultDirection);
        }

        protected setShaderDefinition(){
            var stage:Stage = dy.Director.getInstance().stage,
                directionLights:dyCb.Collection<GameObject> = stage.directionLights,
                pointLights:dyCb.Collection<GameObject> = stage.pointLights;




            var max_direction_lights = 0,
                max_point_lights = 0;

            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);


            //todo refactor
            if(directionLights){
                this.addUniformVariable(["u_directionLights"]);

                max_direction_lights = directionLights.getCount();
            }

            if(pointLights){
                this.addUniformVariable(["u_pointLights"]);

                max_point_lights = pointLights.getCount();
            }

            this.fsSourceDefine.addChildren([{
                name: "MAX_DIRECTION_LIGHTS",
                value: max_direction_lights
            }, {
                name: "MAX_POINT_LIGHTS",
                value: max_point_lights
            }]);


            this.vsSourceHead = ShaderChunk.light_head_vertex;
            this.vsSourceBody = ShaderChunk.light_body_vertex;
            this.fsSourceHead = ShaderChunk.light_head_fragment;
            this.fsSourceBody = ShaderChunk.light_body_fragment;
        }
    }
}

