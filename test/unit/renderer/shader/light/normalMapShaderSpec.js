//describe("normal map shader", function () {
//    var ambientLightComponent, ambientLight;
//    var pointLightComponent, pointLight,pointLightComponent2, pointLight2;
//    var directionLightComponent, directionLight,directionLightComponent2, directionLight2;
//
//
//
//    var VariableType = wd.VariableType;
//    var VariableCategory = wd.VariableCategory;
//
//
//    rendererTool.shaderTest(
//        {
//            MaterialClassName: "LightMaterial",
//            shaderName: "phong shader",
//            definitionData_attributes: {
//                a_normal: {
//                    type: wd.VariableType.FLOAT_3,
//                    value: wd.VariableCategory.ENGINE
//                },
//                a_texCoord: {
//                    type:VariableType.FLOAT_2,
//                    value:VariableCategory.ENGINE
//                },
//                a_tangent: {
//                    type:VariableType.FLOAT_3,
//                    value:VariableCategory.ENGINE
//                }
//            },
//            definitionData_uniforms: {
//                u_normalMatrix: {
//                    type:VariableType.FLOAT_MAT4,
//                    value:VariableCategory.ENGINE
//                },
//                u_cameraPos: {
//                    type:VariableType.FLOAT_3,
//                    value: wd.VariableCategory.ENGINE
//                },
//                u_normalMapSampler: {
//                    type:VariableType.SAMPLER_2D,
//                    value: wd.VariableCategory.ENGINE
//                },
//                u_diffuse: {
//                    type:VariableType.FLOAT_3,
//                    value: wd.VariableCategory.ENGINE
//                },
//                u_specular: {
//                    type:VariableType.FLOAT_3,
//                    value: wd.VariableCategory.ENGINE
//                },
//                u_shininess: {
//                    type: wd.VariableType.FLOAT_1,
//                    value: wd.VariableCategory.ENGINE
//                },
//                u_ambient: {
//                    type: wd.VariableType.FLOAT_3,
//                    value: wd.VariableCategory.ENGINE
//                },
//
//
//                u_directionLights: {
//                    type:VariableType.STRUCTURES,
//                    value: wd.VariableCategory.ENGINE
//                },
//                u_pointLights: {
//                    type:VariableType.STRUCTURES,
//                    value: wd.VariableCategory.ENGINE
//                }
//            },
//            judge_sendLibVariable_attributes: function(program, quadCmd, material){
//                expect(program.sendAttributeData).toCalledWith("a_normal");
//                expect(quadCmd.buffers.getChild).toCalledWith("normalBuffer");
//
//                expect(program.sendAttributeData).toCalledWith("a_texCoord");
//                expect(quadCmd.buffers.getChild).toCalledWith("texCoordBuffer");
//
//                expect(program.sendAttributeData).toCalledWith("a_tangent");
//                expect(quadCmd.buffers.getChild).toCalledWith("tangentBuffer");
//            },
//            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
//                expect(program.sendUniformData.getCall(3).args).toEqual(
//                    ["u_diffuse", wd.VariableType.FLOAT_3, material.color.toVector3()]
//                );
//                expect(program.sendUniformData.getCall(4).args).toEqual(
//                    ["u_specular", wd.VariableType.FLOAT_3, material.specular.toVector3()]
//                );
//            },
//            judge_sendLibVariable_texture: function(program, quadCmd, material){
//                expect(program.sendUniformData).toCalledWith(
//                    "u_normalMapSampler", wd.VariableType.SAMPLER_2D, 0
//                );
//                expect(program.sendUniformData).toCalledWith(
//                    "u_sourceRegion"
//                );
//                expect(program.sendUniformData).toCalledWith(
//                    "u_repeatRegion"
//                );
//            },
//            setMaterial: function(material){
//                var director = wd.Director.getInstance();
//
//
//                ambientLightComponent = wd.AmbientLight.create();
//                ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");
//
//                ambientLight = wd.GameObject.create();
//                ambientLight.addComponent(ambientLightComponent);
//
//
//
//
//                directionLightComponent = wd.DirectionLight.create();
//                directionLightComponent.color = wd.Color.create("#000000");
//                directionLightComponent.intensity = 1;
//
//                directionLight = wd.GameObject.create();
//                directionLight.addComponent(directionLightComponent);
//
//
//
//                directionLightComponent2 = wd.DirectionLight.create();
//                directionLightComponent2.color = wd.Color.create("#222222");
//                directionLightComponent2.intensity = 1;
//
//                directionLight2 = wd.GameObject.create();
//                directionLight2.addComponent(directionLightComponent2);
//
//
//                directionLight2.transform.translate(wd.Vector3.create(10, 0, 0));
//
//
//
//
//
//                director.scene.addChild(ambientLight);
//                director.scene.addChild(directionLight);
//                director.scene.addChild(directionLight2);
//
//
//
//
//
//                pointLightComponent = wd.PointLight.create();
//                pointLightComponent.color = wd.Color.create("#1f89ca");
//                pointLightComponent.intensity = 1;
//                pointLightComponent.rangeLevel = 10;
//
//                pointLight = wd.GameObject.create();
//                pointLight.addComponent(pointLightComponent);
//
//
//                pointLight.transform.translate(wd.Vector3.create(0, 0, 10));
//
//
//
//
//
//                pointLightComponent2 = wd.PointLight.create();
//                pointLightComponent2.color = wd.Color.create("#f99981");
//                pointLightComponent2.intensity = 0.5;
//                pointLightComponent2.rangeLevel = 5;
//
//                pointLight2 = wd.GameObject.create();
//                pointLight2.addComponent(pointLightComponent2);
//
//                pointLight.transform.translate(wd.Vector3.create(0, 10, 0));
//
//
//
//                director.scene.addChild(pointLight);
//                director.scene.addChild(pointLight2);
//
//
//
//                material.specular = wd.Color.create("rgb(0, 255, 0)");
//                material.shininess = 32;
//
//                var asset = wd.ImageTextureAsset.create({});
//                var map = wd.ImageTexture.create( asset );
//                material.normalMap = wd.ImageTexture.create(map);
//            }
//        }
//    );
//});

