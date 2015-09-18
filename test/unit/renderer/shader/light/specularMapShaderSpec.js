describe("specular map shader", function () {
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
                },
                a_texCoord: {
                    type:VariableType.FLOAT_2,
                    value:VariableCategory.ENGINE
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
                u_specularMapSampler: {
                    type:VariableType.SAMPLER_2D,
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
                'precision highp float;precision highp int;#define DIRECTION_LIGHTS_COUNT 2#define POINT_LIGHTS_COUNT 2attribute vec3 a_position;attribute vec2 a_texCoord;attribute vec3 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform mat4 u_normalMatrix;varying vec2 v_specularMapTexCoord;varying vec3 v_normal;varying vec3 v_worldPosition;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){v_specularMapTexCoord = a_texCoord;v_worldPosition = vec3(u_mMatrix * vec4(a_position, 1.0));    v_normal = vec3(u_normalMatrix * vec4(a_normal, 1.0));gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);}',
            definitionData_fsSource:
                "precision highp float;precision highp int;#define DIRECTION_LIGHTS_COUNT 2#define POINT_LIGHTS_COUNT 2uniform vec3 u_diffuse;uniform sampler2D u_specularMapSampler;uniform vec3 u_cameraPos;uniform float u_shininess;uniform vec3 u_ambient;varying vec2 v_specularMapTexCoord;varying vec3 v_normal;varying vec3 v_worldPosition;#if POINT_LIGHTS_COUNT > 0struct PointLight {    vec3 position;    vec3 color;    float intensity;    float range;    float constant;    float linear;    float quadratic;};uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];#endif#if DIRECTION_LIGHTS_COUNT > 0struct DirectionLight {    vec3 direction;    float intensity;    vec3 color;};uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];#endifmat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }vec3 getMaterialDiffuse() {        return u_diffuse;    }vec3 getMaterialSpecular() {        return vec3(texture2D(u_specularMapSampler, v_specularMapTexCoord));    }#if POINT_LIGHTS_COUNT > 0vec3 getPointLightDir(int index){    //workaround '[] : Index expression must be constant' error    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {        if(x == index){            return u_pointLights[x].position - v_worldPosition;        }    }}#endif#if DIRECTION_LIGHTS_COUNT > 0vec3 getDirectionLightDir(int index){    //workaround '[] : Index expression must be constant' error    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {        if(x == index){            return - u_directionLights[x].direction;        }    }}#endifvec3 getViewDir(){    return normalize(u_cameraPos - v_worldPosition);}vec3 getNormal(){    return v_normal;}vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir){    vec3 materialDiffuse = getMaterialDiffuse();    vec3 materialSpecular = getMaterialSpecular();    float dotResultBetweenNormAndLight = dot(normal, lightDir);    float diff = max(dotResultBetweenNormAndLight, 0.0);    float spec = 0.0;    //背面（指立方体中与当前面对应的背面，而不是当前面的反面）没有当前面反射光    if(dotResultBetweenNormAndLight < 0.0){        spec = 0.0;    }    else{        vec3 reflectDir = reflect(-lightDir, normal);        spec = pow(max(dot(viewDir, reflectDir), 0.0), u_shininess);    }    vec3 ambientColor = u_ambient * materialDiffuse;    vec3 diffuseColor = diff * color * materialDiffuse * intensity;    vec3 specularColor = spec * materialSpecular * intensity;    return  ambientColor + attenuation * (diffuseColor + specularColor);}#if POINT_LIGHTS_COUNT > 0vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir){    //lightDir is not normalize computing distance    float distance = length(lightDir);    float attenuation = 0.0;    if(distance < light.range)    {        attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));    }    lightDir = normalize(lightDir);    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);}#endif#if DIRECTION_LIGHTS_COUNT > 0vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir){    float attenuation = 1.0;    lightDir = normalize(-lightDir);    return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);}#endifvoid calcTotalLight(inout vec3 totalLight, vec3 norm, vec3 viewDir){    #if POINT_LIGHTS_COUNT > 0       for(int i = 0; i < POINT_LIGHTS_COUNT; i++){            totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);       }    #endif    #if DIRECTION_LIGHTS_COUNT > 0       for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){            totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);       }    #endif}void main(void){vec3 norm = normalize(getNormal());    vec3 viewDir = normalize(getViewDir());    vec3 totalLight = vec3(0, 0, 0);    calcTotalLight(totalLight, norm, viewDir);    gl_FragColor = vec4(totalLight, 1.0);}",
            judge_sendLibVariable_attributes: function(program, quadCmd, material){
                expect(program.sendAttributeData.getCall(1).args[0]).toEqual("a_texCoord");
                expect(quadCmd.buffers.getChild.getCall(1)).toCalledWith("texCoordsBuffer");

                expect(program.sendAttributeData.getCall(2).args[0]).toEqual("a_normal");
                expect(quadCmd.buffers.getChild.getCall(2)).toCalledWith("normalBuffer");
            },
            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                expect(program.sendUniformData.getCall(3).args).toEqual(
                    ["u_diffuse", dy.VariableType.FLOAT_3, material.color.toVector3()]
                );
            },
            judge_sendLibVariable_texture: function(program, quadCmd, material){
                expect(program.sendUniformData).toCalledWith(
                    "u_specularMapSampler", dy.VariableType.SAMPLER_2D, 0
                );
                expect(program.sendUniformData).toCalledWith(
                    "u_sourceRegion"
                );
                expect(program.sendUniformData).toCalledWith(
                    "u_repeatRegion"
                );
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



                material.color = dy.Color.create("rgb(0, 255, 0)");
                material.shininess = 32;

                var asset = dy.TwoDTextureAsset.create({});
                var map = dy.TwoDTexture.create( asset );
                material.specularMap = dy.TwoDTexture.create(map);
            }
        }
    );
});

