/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class LightShaderLib extends ShaderLib{
        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            if(quadCmd.buffers.hasChild("normalBuffer")){
                program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            program.sendUniformData("u_normalMatrix", VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose());
            program.sendUniformData("u_cameraPos", VariableType.FLOAT_3, Director.getInstance().stage.camera.transform.position);


            program.sendUniformData("u_diffuse", VariableType.FLOAT_3, material.color.toVector3());
            program.sendUniformData("u_specular", VariableType.FLOAT_3, material.specular.toVector3());
            program.sendUniformData("u_shininess", VariableType.FLOAT_1, material.shininess);


            this._sendLightVariables(program);
        }

        protected abstract setSourceContent();
        protected abstract setSourceDefine(direction_lights_count:number, point_lights_count:number);

        protected setShaderDefinition(){
            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_normalMatrix", "u_cameraPos", "u_diffuse", "u_specular", "u_shininess", "u_ambient"]);

            this._setLightDefinition();

            this.setSourceContent();
        }

        private _sendLightVariables(program:Program){
            var stage:Stage = dy.Director.getInstance().stage,
                directionLights:dyCb.Collection<GameObject> = stage.directionLights,
                ambientLight:GameObject =stage.ambientLight,
                pointLights:dyCb.Collection<GameObject> = stage.pointLights;

            program.sendUniformData("u_ambient", VariableType.FLOAT_3, ambientLight.getComponent<AmbientLight>(AmbientLight).color.toVector3());

            if(pointLights){
                this._sendPointLightVariables(program, pointLights);
            }

            if(directionLights){
                this._sendDirectionLightVariables(program, directionLights);
            }
        }

        private _sendPointLightVariables(program: Program, pointLights:dyCb.Collection<GameObject> ){
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

        private _sendDirectionLightVariables(program: Program, directionLights:dyCb.Collection<GameObject> ){
            var self = this;

            directionLights.forEach((directionLight:GameObject, index:number) => {
                var lightComponent:DirectionLight = directionLight.getComponent<DirectionLight>(DirectionLight);

                program.sendStructureData(`u_directionLights[${index}].direction`, VariableType.FLOAT_3, self._getDirection(directionLight));
                program.sendStructureData(`u_directionLights[${index}].color`, VariableType.FLOAT_3, lightComponent.color.toVector3());

                program.sendStructureData(`u_directionLights[${index}].intensity`, VariableType.FLOAT_1, lightComponent.intensity);
            });
        }

        private _getDirection(directionLight:GameObject){
            return directionLight.transform.rotation.multiplyVector3(DirectionLight.defaultDirection);
        }

        private _setLightDefinition(){
            var stage:Stage = dy.Director.getInstance().stage,
                directionLights:dyCb.Collection<GameObject> = stage.directionLights,
                pointLights:dyCb.Collection<GameObject> = stage.pointLights,
                direction_lights_count = 0,
                point_lights_count = 0;

            if(directionLights){
                this.addUniformVariable(["u_directionLights"]);

                direction_lights_count = directionLights.getCount();
            }

            if(pointLights){
                this.addUniformVariable(["u_pointLights"]);

                point_lights_count = pointLights.getCount();
            }

            this.setSourceDefine(direction_lights_count, point_lights_count);
        }
    }
}

