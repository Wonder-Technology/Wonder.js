describe("light shader", function () {
    describe("phong shader", function(){
        var ambientLightComponent, ambientLight;
        var pointLightComponent, pointLight,pointLightComponent2, pointLight2;
        var directionLightComponent, directionLight,directionLightComponent2, directionLight2;



        var VariableType = dy.VariableType;
        var VariableCategory = dy.VariableCategory;


        rendererTool.shaderTest(
            {
                MaterialClassName: "LightMaterial",
                shaderName: "phong shader",
                definitionData_attributes: {
                    a_normal: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_uniforms: {
                    u_normalMatrix: {
                        type:VariableType.FLOAT_MAT4,
                        value:VariableCategory.ENGINE
                    },
                    u_cameraPos: {
                        type:VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_diffuse: {
                        type:VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_specular: {
                        type:VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_shininess: {
                        type: dy.VariableType.FLOAT_1,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_ambient: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    },


                    u_directionLights: {
                        type:VariableType.STRUCTURES,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_pointLights: {
                        type:VariableType.STRUCTURES,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                judge_sendLibVariable_attributes: function(program, quadCmd, material){
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
                judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_diffuse", dy.VariableType.FLOAT_3, material.color.toVector3()]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_specular", dy.VariableType.FLOAT_3, material.specular.toVector3()]
                    );
                    expect(program.sendUniformData.getCall(5).args).toEqual(
                        ["u_normalMatrix", dy.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
                    );

                    expect(program.sendUniformData.getCall(6).args).toEqual(
                        ["u_cameraPos", dy.VariableType.FLOAT_3, dy.Director.getInstance().stage.camera.transform.position]
                    );


                    expect(program.sendUniformData.getCall(7).args).toEqual(
                        ["u_shininess", dy.VariableType.FLOAT_1, material.shininess]
                    );


                    expect(program.sendUniformData.getCall(8).args).toEqual(
                        ["u_ambient", dy.VariableType.FLOAT_3, ambientLightComponent.color.toVector3()]
                    );

                    expect(program.sendUniformData.getCall(9).args).toEqual(
                        ["u_pointLights[0].position", dy.VariableType.FLOAT_3, pointLight.transform.position]
                    );
                    expect(program.sendUniformData.getCall(10).args).toEqual(
                        ["u_pointLights[0].color", dy.VariableType.FLOAT_3, pointLightComponent.color.toVector3()]
                    );

                    expect(program.sendUniformData.getCall(11).args).toEqual(
                        ["u_pointLights[0].intensity", dy.VariableType.FLOAT_1, pointLightComponent.intensity]
                    );
                    expect(program.sendUniformData.getCall(12).args).toEqual(
                        ["u_pointLights[0].range", dy.VariableType.FLOAT_1, pointLightComponent.range]
                    );
                    expect(program.sendUniformData.getCall(13).args).toEqual(
                        ["u_pointLights[0].constant", dy.VariableType.FLOAT_1, pointLightComponent.constant]
                    );
                    expect(program.sendUniformData.getCall(14).args).toEqual(
                        ["u_pointLights[0].linear", dy.VariableType.FLOAT_1, pointLightComponent.linear]
                    );
                    expect(program.sendUniformData.getCall(15).args).toEqual(
                        ["u_pointLights[0].quadratic", dy.VariableType.FLOAT_1, pointLightComponent.quadratic]
                    );



                    expect(program.sendUniformData.getCall(16).args).toEqual(
                        ["u_pointLights[1].position", dy.VariableType.FLOAT_3, pointLight2.transform.position]
                    );
                    expect(program.sendUniformData.getCall(17).args).toEqual(
                        ["u_pointLights[1].color", dy.VariableType.FLOAT_3, pointLightComponent2.color.toVector3()]
                    );

                    expect(program.sendUniformData.getCall(18).args).toEqual(
                        ["u_pointLights[1].intensity", dy.VariableType.FLOAT_1, pointLightComponent2.intensity]
                    );
                    expect(program.sendUniformData.getCall(19).args).toEqual(
                        ["u_pointLights[1].range", dy.VariableType.FLOAT_1, pointLightComponent2.range]
                    );
                    expect(program.sendUniformData.getCall(20).args).toEqual(
                        ["u_pointLights[1].constant", dy.VariableType.FLOAT_1, pointLightComponent2.constant]
                    );
                    expect(program.sendUniformData.getCall(21).args).toEqual(
                        ["u_pointLights[1].linear", dy.VariableType.FLOAT_1, pointLightComponent2.linear]
                    );
                    expect(program.sendUniformData.getCall(22).args).toEqual(
                        ["u_pointLights[1].quadratic", dy.VariableType.FLOAT_1, pointLightComponent2.quadratic]
                    );




                    expect(program.sendUniformData.getCall(23).args).toEqual(
                        ["u_directionLights[0].position", dy.VariableType.FLOAT_3, directionLight.transform.position]
                    );
                    expect(program.sendUniformData.getCall(24).args).toEqual(
                        ["u_directionLights[0].color", dy.VariableType.FLOAT_3, directionLightComponent.color.toVector3()]
                    );

                    expect(program.sendUniformData.getCall(25).args).toEqual(
                        ["u_directionLights[0].intensity", dy.VariableType.FLOAT_1, directionLightComponent.intensity]
                    );




                    expect(program.sendUniformData.getCall(26).args[0]).toEqual(
                        "u_directionLights[1].position"
                    );
                    expect(testTool.getValues(program.sendUniformData.getCall(26).args[2])).toEqual(
                        [10, 0, 0]
                    );

                    expect(program.sendUniformData.getCall(27).args).toEqual(
                        ["u_directionLights[1].color", dy.VariableType.FLOAT_3, directionLightComponent2.color.toVector3()]
                    );

                    expect(program.sendUniformData.getCall(28).args).toEqual(
                        ["u_directionLights[1].intensity", dy.VariableType.FLOAT_1, directionLightComponent2.intensity]
                    );
                },
                judge_sendLibVariable_texture: function(program, quadCmd, material){
                },
                setMaterial: function(material){
                    var director = dy.Director.getInstance();


                    ambientLightComponent = dy.AmbientLight.create();
                    ambientLightComponent.color = dy.Color.create("rgb(30, 30, 30)");

                    ambientLight = dy.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);




                    directionLightComponent = dy.DirectionLight.create();
                    directionLightComponent.color = dy.Color.create("#000000");
                    directionLightComponent.intensity = 1;

                    directionLight = dy.GameObject.create();
                    directionLight.addComponent(directionLightComponent);



                    directionLightComponent2 = dy.DirectionLight.create();
                    directionLightComponent2.color = dy.Color.create("#222222");
                    directionLightComponent2.intensity = 1;

                    directionLight2 = dy.GameObject.create();
                    directionLight2.addComponent(directionLightComponent2);


                    directionLight2.transform.translate(dy.Vector3.create(10, 0, 0));

                    directionLight2.transform.rotateLocal(dy.Vector3.create(0, 90, 0));




                    director.stage.addChild(ambientLight);
                    director.stage.addChild(directionLight);
                    director.stage.addChild(directionLight2);





                    pointLightComponent = dy.PointLight.create();
                    pointLightComponent.color = dy.Color.create("#1f89ca");
                    pointLightComponent.intensity = 1;
                    pointLightComponent.rangeLevel = 10;

                    pointLight = dy.GameObject.create();
                    pointLight.addComponent(pointLightComponent);


                    pointLight.transform.translate(dy.Vector3.create(0, 0, 10));





                    pointLightComponent2 = dy.PointLight.create();
                    pointLightComponent2.color = dy.Color.create("#f99981");
                    pointLightComponent2.intensity = 0.5;
                    pointLightComponent2.rangeLevel = 5;

                    pointLight2 = dy.GameObject.create();
                    pointLight2.addComponent(pointLightComponent2);

                    pointLight.transform.translate(dy.Vector3.create(0, 10, 0));



                    director.stage.addChild(pointLight);
                    director.stage.addChild(pointLight2);



                    material.color = dy.Color.create("rgb(100, 255, 100)");
                    material.specular = dy.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                }
            }
        );
    });
});

