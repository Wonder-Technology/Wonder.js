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
                        type: dy.VariableType.FLOAT_4,
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
                definitionData_vsSource:
                    'precision highp float;precision highp int;attribute vec4 a_position;attribute vec4 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform mat4 u_normalMatrix;varying vec3 v_normal;varying vec3 v_worldPosition;void main(void){    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;    v_worldPosition = vec3(u_mMatrix * a_position);    v_normal = vec3(u_normalMatrix * a_normal);}',
                definitionData_fsSource:
                    'precision highp float;precision highp int;#define DIRECTION_LIGHTS_COUNT 2#define POINT_LIGHTS_COUNT 2uniform vec3 u_cameraPos;uniform vec3 u_diffuse;uniform vec3 u_specular;uniform float u_shininess;uniform vec3 u_ambient;varying vec3 v_worldPosition;varying vec3 v_normal;vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir){    float dotResultBetweenNormAndLight = dot(normal, lightDir);    // Diffuse shading    float diff = max(dotResultBetweenNormAndLight, 0.0);    // Specular shading    float spec = 0.0;    //背面（指立方体中与当前面对应的背面，而不是当前面的反面）没有当前面反射光    if(dotResultBetweenNormAndLight < 0.0){        spec = 0.0;    }    else{        vec3 reflectDir = reflect(-lightDir, normal);        spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);    }    // Combine results    vec3 ambientColor = u_ambient;    vec3 diffuseColor = diff * color * u_diffuse * intensity;    vec3 specularColor = spec * u_specular * intensity;    return  ambientColor + attenuation * (diffuseColor + specularColor);    //return vec3(distance/ 256.0, ambientColor, 0.0);}#if POINT_LIGHTS_COUNT > 0struct PointLight {    vec3 position;    vec3 color;    float intensity;    float range;    float constant;    float linear;    float quadratic;};uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];vec3 calcPointLight(PointLight light, vec3 normal, vec3 viewDir){    vec3 lightDir = normalize(light.position - v_worldPosition);    // Attenuation    float distance = length(light.position - v_worldPosition);    float attenuation = 0.0;    if(distance < light.range)    {        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));    }    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);}#endif#if DIRECTION_LIGHTS_COUNT > 0struct DirectionLight {    vec3 direction;    float intensity;    vec3 color;};uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];vec3 calcDirectionLight(DirectionLight light, vec3 normal, vec3 viewDir){    vec3 lightDir = normalize(-light.direction);    float attenuation = 1.0;    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);}#endifvoid main(void){    vec3 norm = normalize(v_normal);    vec3 viewDir = normalize(u_cameraPos - v_worldPosition);    vec3 totalLight = vec3(0, 0, 0);#if POINT_LIGHTS_COUNT > 0   for(int i = 0; i < POINT_LIGHTS_COUNT; i++){        totalLight += calcPointLight(u_pointLights[i], norm, viewDir);   }#endif#if DIRECTION_LIGHTS_COUNT > 0   for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){        totalLight += calcDirectionLight(u_directionLights[i], norm, viewDir);   }#endif    gl_FragColor = vec4(totalLight, 1.0);}',
                judge_sendLibVariable_attributes: function(program, quadCmd, material){
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
                judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_normalMatrix", dy.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_cameraPos", dy.VariableType.FLOAT_3, dy.Director.getInstance().stage.camera.transform.position]
                    );


                    expect(program.sendUniformData.getCall(5).args).toEqual(
                        ["u_diffuse", dy.VariableType.FLOAT_3, material.color.toVector3()]
                    );
                    expect(program.sendUniformData.getCall(6).args).toEqual(
                        ["u_specular", dy.VariableType.FLOAT_3, material.specular.toVector3()]
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
                        ["u_directionLights[0].direction", dy.VariableType.FLOAT_3, dy.DirectionLight.defaultDirection]
                    );
                    expect(program.sendUniformData.getCall(24).args).toEqual(
                        ["u_directionLights[0].color", dy.VariableType.FLOAT_3, directionLightComponent.color.toVector3()]
                    );

                    expect(program.sendUniformData.getCall(25).args).toEqual(
                        ["u_directionLights[0].intensity", dy.VariableType.FLOAT_1, directionLightComponent.intensity]
                    );




                    expect(program.sendUniformData.getCall(26).args[0]).toEqual(
                        "u_directionLights[1].direction"
                    );
                    expect(testTool.getValues(program.sendUniformData.getCall(26).args[2])).toEqual(
                        [-1, 0, 0]
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






    describe("gouraud shader", function(){
        var ambientLightComponent, ambientLight;
        var pointLightComponent, pointLight,pointLightComponent2, pointLight2;
        var directionLightComponent, directionLight,directionLightComponent2, directionLight2;



        var VariableType = dy.VariableType;
        var VariableCategory = dy.VariableCategory;


        rendererTool.shaderTest(
            {
                MaterialClassName: "LightMaterial",
                shaderName: "gouraud shader",
                definitionData_attributes: {
                    a_normal: {
                        type: dy.VariableType.FLOAT_4,
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
                definitionData_vsSource:
                    'precision highp float;precision highp int;#define DIRECTION_LIGHTS_COUNT 2#define POINT_LIGHTS_COUNT 2attribute vec4 a_position;attribute vec4 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform mat4 u_normalMatrix;uniform vec3 u_cameraPos;uniform vec3 u_diffuse;uniform vec3 u_specular;uniform float u_shininess;uniform vec3 u_ambient;varying vec3 v_color;vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir){    float dotResultBetweenNormAndLight = dot(normal, lightDir);    // Diffuse shading    float diff = max(dotResultBetweenNormAndLight, 0.0);    // Specular shading    float spec = 0.0;    //背面（指立方体中与当前面对应的背面，而不是当前面的反面）没有当前面反射光    if(dotResultBetweenNormAndLight < 0.0){        spec = 0.0;    }    else{        vec3 reflectDir = reflect(-lightDir, normal);        spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);    }    // Combine results    vec3 ambientColor = u_ambient;    vec3 diffuseColor = diff * color * u_diffuse * intensity;    vec3 specularColor = spec * u_specular * intensity;    return  ambientColor + attenuation * (diffuseColor + specularColor);    //return vec3(distance/ 256.0, ambientColor, 0.0);}#if POINT_LIGHTS_COUNT > 0struct PointLight {    vec3 position;    vec3 color;    float intensity;    float range;    float constant;    float linear;    float quadratic;};uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];vec3 calcPointLight(PointLight light, vec3 normal, vec3 viewDir, vec3 worldPosition){    vec3 lightDir = normalize(light.position - worldPosition);    // Attenuation    float distance = length(light.position - worldPosition);    float attenuation = 0.0;    if(distance < light.range)    {        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));    }    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);}#endif#if DIRECTION_LIGHTS_COUNT > 0struct DirectionLight {    vec3 direction;    float intensity;    vec3 color;};uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];vec3 calcDirectionLight(DirectionLight light, vec3 normal, vec3 viewDir){    vec3 lightDir = normalize(-light.direction);    float attenuation = 1.0;    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);}#endifvoid main(void){    gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;    vec3 worldPosition = vec3(u_mMatrix * a_position);    vec3 normal = vec3(u_normalMatrix * a_normal);    vec3 norm = normalize(normal);    vec3 viewDir = normalize(u_cameraPos - worldPosition);    vec3 totalLight = vec3(0, 0, 0);#if POINT_LIGHTS_COUNT > 0   for(int i = 0; i < POINT_LIGHTS_COUNT; i++){        totalLight += calcPointLight(u_pointLights[i], norm, viewDir, worldPosition);   }#endif#if DIRECTION_LIGHTS_COUNT > 0   for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){        totalLight += calcDirectionLight(u_directionLights[i], norm, viewDir);   }#endif    v_color = totalLight;}',
                definitionData_fsSource:
                    'precision highp float;precision highp int;varying vec3 v_color;void main(void){    gl_FragColor = vec4(v_color, 1.0);}',
                judge_sendLibVariable_attributes: function(program, quadCmd, material){
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
                judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_normalMatrix", dy.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_cameraPos", dy.VariableType.FLOAT_3, dy.Director.getInstance().stage.camera.transform.position]
                    );


                    expect(program.sendUniformData.getCall(5).args).toEqual(
                        ["u_diffuse", dy.VariableType.FLOAT_3, material.color.toVector3()]
                    );
                    expect(program.sendUniformData.getCall(6).args).toEqual(
                        ["u_specular", dy.VariableType.FLOAT_3, material.specular.toVector3()]
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
                        ["u_directionLights[0].direction", dy.VariableType.FLOAT_3, dy.DirectionLight.defaultDirection]
                    );
                    expect(program.sendUniformData.getCall(24).args).toEqual(
                        ["u_directionLights[0].color", dy.VariableType.FLOAT_3, directionLightComponent.color.toVector3()]
                    );

                    expect(program.sendUniformData.getCall(25).args).toEqual(
                        ["u_directionLights[0].intensity", dy.VariableType.FLOAT_1, directionLightComponent.intensity]
                    );




                    expect(program.sendUniformData.getCall(26).args[0]).toEqual(
                        "u_directionLights[1].direction"
                    );
                    expect(testTool.getValues(program.sendUniformData.getCall(26).args[2])).toEqual(
                        [-1, 0, 0]
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

                    material.mode = dy.LightShaderMode.GOURAUD;
                }
            }
        );
    });
});

