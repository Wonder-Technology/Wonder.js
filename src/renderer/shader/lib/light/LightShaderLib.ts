module wd{
    export class LightShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "light";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_normalMatrix", quadCmd.normalMatrix);
            this.sendUniformData(program, "u_cameraPos", Director.getInstance().scene.currentCamera.transform.position);


            this.sendUniformData(program, "u_shininess", material.shininess);
            this.sendUniformData(program, "u_opacity", material.opacity);

            this.sendUniformData(program, "u_lightModel", this._convertLightModelToGLSLVariable(material.lightModel));

            this._sendLightVariables(program);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_normalMatrix", "u_cameraPos", "u_shininess", "u_ambient", "u_opacity", "u_isBothSide", "u_lightModel"]);

            this._setLightDefinition(material);
        }

        private _sendLightVariables(program:Program){
            var scene:SceneDispatcher = wd.Director.getInstance().scene,
                directionLights:wdCb.Collection<GameObject> = scene.directionLights,
                ambientLight:GameObject =scene.ambientLight,
                pointLights:wdCb.Collection<GameObject> = scene.pointLights;

            if(ambientLight){
                this.sendUniformData(program, "u_ambient", ambientLight.getComponent<AmbientLight>(AmbientLight).color.toVector3());
            }

            if(pointLights){
                this._sendPointLightVariables(program, pointLights);
            }

            if(directionLights){
                this._sendDirectionLightVariables(program, directionLights);
            }
        }

        private _sendPointLightVariables(program: Program, pointLights:wdCb.Collection<GameObject> ){
            pointLights.forEach((pointLight:GameObject, index:number) => {
                var lightComponent:PointLight = pointLight.getComponent<PointLight>(PointLight);

                program.sendStructureData(`u_pointLights[${index}].position`, EVariableType.FLOAT_3, lightComponent.position);
                program.sendStructureData(`u_pointLights[${index}].color`, EVariableType.FLOAT_3, lightComponent.color.toVector3());

                program.sendStructureData(`u_pointLights[${index}].intensity`, EVariableType.FLOAT_1, lightComponent.intensity);
                program.sendStructureData(`u_pointLights[${index}].constant`, EVariableType.FLOAT_1, lightComponent.constant);
                program.sendStructureData(`u_pointLights[${index}].linear`, EVariableType.FLOAT_1, lightComponent.linear);
                program.sendStructureData(`u_pointLights[${index}].quadratic`, EVariableType.FLOAT_1, lightComponent.quadratic);

                if(lightComponent.range !== null){
                    program.sendStructureData(`u_pointLights[${index}].range`, EVariableType.FLOAT_1, lightComponent.range);
                }
                else{
                    program.sendStructureData(`u_pointLights[${index}].range`, EVariableType.FLOAT_1, ShaderChunk.NULL);
                }
            });
        }

        private _sendDirectionLightVariables(program: Program, directionLights:wdCb.Collection<GameObject> ){
            var self = this;

            directionLights.forEach((directionLight:GameObject, index:number) => {
                var lightComponent:DirectionLight = directionLight.getComponent<DirectionLight>(DirectionLight);

                if(self._isZero(lightComponent.position)){
                    program.sendStructureData(`u_directionLights[${index}].position`, EVariableType.FLOAT_3, DirectionLight.defaultPosition);
                }
                else{
                    program.sendStructureData(`u_directionLights[${index}].position`, EVariableType.FLOAT_3, lightComponent.position);
                }

                program.sendStructureData(`u_directionLights[${index}].color`, EVariableType.FLOAT_3, lightComponent.color.toVector3());

                program.sendStructureData(`u_directionLights[${index}].intensity`, EVariableType.FLOAT_1, lightComponent.intensity);
            });
        }

        private _isZero(position:Vector3){
            var val = position.values;

            return val[0] === 0 && val[1] === 0 && val[2] === 0;
        }

        private _setLightDefinition(material:EngineMaterial){
            var scene:SceneDispatcher = wd.Director.getInstance().scene,
                directionLights:wdCb.Collection<GameObject> = scene.directionLights,
                pointLights:wdCb.Collection<GameObject> = scene.pointLights,
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

            this._addDefine(this.vsSourceDefineList, direction_lights_count, point_lights_count);
            this._addDefine(this.fsSourceDefineList, direction_lights_count, point_lights_count);

            //todo if "both side" logic become complex or be used in many places, then it should extract BothSideShaderLib and NoBothSideShaderLib
            if(material.side === ESide.BOTH){
                this.fsSourceDefineList.addChildren([{
                    name: "BOTH_SIDE"
                }]);
            }
        }

        private _addDefine(list, direction_lights_count, point_lights_count){
            list.addChildren([{
                name: "DIRECTION_LIGHTS_COUNT",
                value: direction_lights_count
            }, {
                name: "POINT_LIGHTS_COUNT",
                value: point_lights_count
            }]);
        }

        @require(function(lightModel:ELightModel){
            assert(lightModel !== ELightModel.LAMBERT, Log.info.FUNC_SHOULD_NOT("lightModel", "=== ELightModel.LAMBERT"));
        })
        private _convertLightModelToGLSLVariable(lightModel:ELightModel){
            switch (lightModel){
                case ELightModel.BLINN:
                    return 1;
                case ELightModel.PHONG:
                    return 2;
                case ELightModel.CONSTANT:
                    return 3;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`lightModel:${lightModel}`));
                    break;
            }
        }
    }
}

