
  open ShaderChunkType;

  open StateDataMainType;

  let _getGLSLChunkMap = ({chunkMap}) => chunkMap;

  let getChunk = (name: string, glslChunkRecord) =>
    glslChunkRecord
    |> _getGLSLChunkMap
    |> WonderCommonlib.MutableHashMapService.get(name)
    |> Js.Option.getExn;

  let _buildChunk =
      (
        (top: string, define: string),
        varDeclare: string,
        (funcDeclare: string, funcDefine: string),
        body: string
      ) => {
    top,
    define,
    varDeclare,
    funcDeclare,
    funcDefine,
    body
  };

  let create = () =>
  
    WonderCommonlib.MutableHashMapService.{
      chunkMap:
        createEmpty()
        
|> set("webgl1_skybox_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_texCoord;
|},({|

|},{|

|}),{|
v_texCoord = a_position;

vec4 pos = u_pMatrix * u_skyboxVMatrix * vec4(a_position, 1.0);
gl_Position = pos.xyww;
|}))

|> set("webgl1_skybox_fragment", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_texCoord;
|},({|

|},{|

|}),{|
//gl_FragColor = textureCube(u_skyboxCubeMapSampler, v_texCoord);
vec3 dir = vec3(-v_texCoord.x, v_texCoord.y, v_texCoord.z);
gl_FragColor = textureCube(u_skyboxCubeMapSampler, dir);
|}))

|> set("webgl1_outline_origin_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}))

|> set("webgl1_outline_origin_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_FragColor = vec4(1.0);
|}))

|> set("webgl1_outline_expand_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
vec3 position = a_position.xyz + a_normal.xyz * 0.08;

gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(position, 1.0);
|}))

|> set("webgl1_outline_expand_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_FragColor = vec4(u_outlineColor, 1.0);
|}))

|> set("webgl1_frontLight_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);
|}))

|> set("webgl1_frontLight_setWorldPosition_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));
|}))

|> set("webgl1_frontLight_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
        vec3 halfAngle = normalize(lightDir + viewDir);

        float blinnTerm = dot(normal, halfAngle);

        blinnTerm = clamp(blinnTerm, 0.0, 1.0);
        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;
        blinnTerm = pow(blinnTerm, shininess);

        return blinnTerm;
}

// float getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
//         vec3 reflectDir = reflect(-lightDir, normal);
//         float phongTerm = dot(viewDir, reflectDir);

//         phongTerm = clamp(phongTerm, 0.0, 1.0);
//         phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;
//         phongTerm = pow(phongTerm, shininess);

//         return phongTerm;
// }

vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir, vec3 materialDiffuse)
{
        vec3 materialSpecular = u_specular;
        vec3 materialEmission = getMaterialEmission();

        float specularStrength = getSpecularStrength();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);

        vec3 emissionColor = materialEmission;



        // if(u_lightModel == 3){
        //     return emissionColor + ambientColor;
        // }

        vec3 diffuseColor = color * materialDiffuse.rgb * diff * intensity;

        float spec = 0.0;

        // if(u_lightModel == 2){
        //         spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);
        // }
        // else if(u_lightModel == 1){
        //         spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);
        // }

        spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);


        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;

       return vec3(emissionColor + attenuation * (diffuseColor.rgb + specularColor));
}




#if POINT_LIGHTS_COUNT > 0
        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir, vec3 materialDiffuse)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        float attenuation = 0.0;

        if(distance < light.range)
        {
            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
        }

        lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir, materialDiffuse);
}
#endif



#if DIRECTION_LIGHTS_COUNT > 0
        vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir, vec3 materialDiffuse)
{
        float attenuation = 1.0;

        // lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir, materialDiffuse);
}
#endif



vec4 calcTotalLight(vec3 norm, vec3 viewDir){
    vec3 totalLight = vec3(0.0, 0.0, 0.0);

    vec4 materialDiffuse = getMaterialDiffuse();

    float alpha = materialDiffuse.a;
    vec3 materialDiffuseRGB = materialDiffuse.rgb;


    #if (DIRECTION_LIGHTS_COUNT == 0 && POINT_LIGHTS_COUNT == 0 )
        return vec4(u_ambient * materialDiffuseRGB, alpha);
    #endif


    #if POINT_LIGHTS_COUNT > 0
                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
                totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir, materialDiffuseRGB);
        }
    #endif

    #if DIRECTION_LIGHTS_COUNT > 0
                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
                totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir, materialDiffuseRGB);
        }
    #endif

        totalLight += u_ambient;

        return vec4(totalLight, alpha);
}
|}),{|
vec3 normal = normalize(getNormal());

// #ifdef BOTH_SIdE
// normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));
// #endif

vec3 viewDir = normalize(getViewDir());

vec4 totalColor = calcTotalLight(normal, viewDir);

// totalColor.a *= u_opacity;

totalColor.rgb = totalColor.rgb * getShadowVisibility();
|}))

|> set("webgl1_frontLight_end_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_FragColor = totalColor;
|}))

|> set("webgl1_frontLight_common", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 direction;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},({|
vec3 getDirectionLightDir(vec3 lightDirection);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
|},{|
vec3 getDirectionLightDir(vec3 lightDirection){
    lightDirection =  normalize(lightDirection);

    return -lightDirection;
}
vec3 getPointLightDirByLightPos(vec3 lightPos){
    return lightPos - v_worldPosition;
}
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
|}),{|

|}))

|> set("webgl1_frontLight_common_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 direction;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},({|
vec3 getDirectionLightDir(vec3 lightDirection);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
|},{|
vec3 getDirectionLightDir(vec3 lightDirection){
    lightDirection =  normalize(lightDirection);

    return -lightDirection;
}
vec3 getPointLightDirByLightPos(vec3 lightPos){
    return lightPos - v_worldPosition;
}
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
|}),{|

|}))

|> set("webgl1_frontLight_common_fragment", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLight u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLight {
    vec3 direction;

    float intensity;

    vec3 color;
};
uniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},({|
vec3 getDirectionLightDir(vec3 lightDirection);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
|},{|
vec3 getDirectionLightDir(vec3 lightDirection){
    lightDirection =  normalize(lightDirection);

    return -lightDirection;
}
vec3 getPointLightDirByLightPos(vec3 lightPos){
    return lightPos - v_worldPosition;
}
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
|}),{|

|}))

|> set("webgl1_ambientLight_fragment", _buildChunk(({|

|},{|

|}),{|
uniform vec3 u_ambient;
|},({|

|},{|

|}),{|

|}))

|> set("webgl1_specular_map_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec2 v_specularMapTexCoord;
|},({|

|},{|

|}),{|
v_specularMapTexCoord = a_texCoord;
|}))

|> set("webgl1_specular_map_fragment", _buildChunk(({|

|},{|

|}),{|
varying vec2 v_specularMapTexCoord;
|},({|

|},{|
float getSpecularStrength() {
        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;
    }
|}),{|

|}))

|> set("webgl1_no_specular_map_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
float getSpecularStrength() {
        return 1.0;
    }
|}),{|

|}))

|> set("webgl1_no_shadow_map_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
float getShadowVisibility() {
        return 1.0;
    }
|}),{|

|}))

|> set("webgl1_no_normal_map_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_normal;
|},({|

|},{|

|}),{|
v_normal = normalize(normalMatrix * a_normal);
|}))

|> set("webgl1_no_normal_map_fragment", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_normal;
|},({|
vec3 getNormal();
|},{|
vec3 getNormal(){
    return v_normal;
}

#if POINT_LIGHTS_COUNT > 0
vec3 getPointLightDir(int index){
    //workaround '[] : Index expression must be constant' error
    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {
        if(x == index){
            return getPointLightDirByLightPos(u_pointLights[x].position);
        }
    }
    /*!
    solve error in window7 chrome/firefox:
    not all control paths return a value.
    failed to create d3d shaders
    */
    return vec3(0.0);
}
#endif

#if DIRECTION_LIGHTS_COUNT > 0
vec3 getDirectionLightDir(int index){
    //workaround '[] : Index expression must be constant' error
    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {
        if(x == index){
            return getDirectionLightDir(u_directionLights[x].direction);
        }
    }

    /*!
    solve error in window7 chrome/firefox:
    not all control paths return a value.
    failed to create d3d shaders
    */
    return vec3(0.0);
}
#endif


vec3 getViewDir(){
    return normalize(u_cameraPos - v_worldPosition);
}
|}),{|

|}))

|> set("webgl1_no_light_map_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
vec3 getMaterialLight() {
        return vec3(0.0);
    }
|}),{|

|}))

|> set("webgl1_no_emission_map_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
vec3 getMaterialEmission() {
        return vec3(0.0);
    }
|}),{|

|}))

|> set("webgl1_no_diffuse_map_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
vec4 getMaterialDiffuse() {
        return vec4(u_diffuse, 1.0);
    }
|}),{|

|}))

|> set("webgl1_diffuse_map_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec2 v_diffuseMapTexCoord;
|},({|

|},{|

|}),{|
//TODO optimize(combine, reduce compute numbers)
    //TODO BasicTexture extract textureMatrix
//    vec2 sourceTexCoord = a_texCoord * u_diffuseMapSourceRegion.zw + u_diffuseMapSourceRegion.xy;
//    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseMapRepeatRegion.zw + u_diffuseMapRepeatRegion.xy;

    v_diffuseMapTexCoord = a_texCoord;
|}))

|> set("webgl1_diffuse_map_fragment", _buildChunk(({|

|},{|

|}),{|
varying vec2 v_diffuseMapTexCoord;
|},({|

|},{|
vec4 getMaterialDiffuse() {
        vec4 texelColor = texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord);

        return vec4(texelColor.rgb * u_diffuse, texelColor.a);
    }
|}),{|

|}))

|> set("normalMatrix_noInstance_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
mat3 normalMatrix = u_normalMatrix;
|}))

|> set("modelMatrix_noInstance_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
mat4 mMatrix = u_mMatrix;
|}))

|> set("normalMatrix_hardware_instance_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
mat3 normalMatrix = mat3(a_normalVec3_0, a_normalVec3_1, a_normalVec3_2);
|}))

|> set("modelMatrix_hardware_instance_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
mat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);
|}))

|> set("normalMatrix_batch_instance_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
mat3 normalMatrix = u_normalMatrix;
|}))

|> set("modelMatrix_batch_instance_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
mat4 mMatrix = u_mMatrix;
|}))

|> set("webgl1_rotation_gizmo_circle_for_editor_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_position;
|},({|

|},{|

|}),{|
v_position = a_position;

gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}))

|> set("webgl1_rotation_gizmo_circle_for_editor_fragment", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_position;
|},({|
bool isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(vec3 vertexPos, vec3 cameraPosInLocalCoordSystem);
|},{|
bool isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(vec3 vertexPos, vec3 cameraPosInLocalCoordSystem){
return dot(
normalize(-vertexPos),
cameraPosInLocalCoordSystem - vertexPos
) >= 0.0;
}
|}),{|
if(isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(v_position, u_cameraPosInLocalCoordSystem)){
    discard;
}

gl_FragColor = vec4(u_color, u_alpha);
|}))

|> set("webgl1_setPos_mvp", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}))

|> set("mediump_fragment", _buildChunk(({|
precision mediump float;
precision mediump int;
|},{|

|}),{|

|},({|

|},{|

|}),{|

|}))

|> set("lowp_fragment", _buildChunk(({|
precision lowp float;
precision lowp int;
|},{|

|}),{|

|},({|

|},{|

|}),{|

|}))

|> set("highp_fragment", _buildChunk(({|
precision highp float;
precision highp int;
|},{|

|}),{|

|},({|

|},{|

|}),{|

|}))

|> set("common_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
// mat2 transpose(mat2 m) {
//   return mat2(  m[0][0], m[1][0],   // new col 0
//                 m[0][1], m[1][1]    // new col 1
//              );
//   }

// mat3 transpose(mat3 m) {
//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0
//                 m[0][1], m[1][1], m[2][1],  // new col 1
//                 m[0][2], m[1][2], m[2][2]   // new col 1
//              );
//   }

//bool isRenderArrayEmpty(int isRenderArrayEmpty){
//  return isRenderArrayEmpty == 1;
//}
|}),{|

|}))

|> set("common_function", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
// mat2 transpose(mat2 m) {
//   return mat2(  m[0][0], m[1][0],   // new col 0
//                 m[0][1], m[1][1]    // new col 1
//              );
//   }

// mat3 transpose(mat3 m) {
//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0
//                 m[0][1], m[1][1], m[2][1],  // new col 1
//                 m[0][2], m[1][2], m[2][2]   // new col 1
//              );
//   }

//bool isRenderArrayEmpty(int isRenderArrayEmpty){
//  return isRenderArrayEmpty == 1;
//}
|}),{|

|}))

|> set("common_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|

|}))

|> set("common_define", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|

|}))

|> set("webgl1_basic_vertex", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);
|}))

|> set("webgl1_basic_end_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
gl_FragColor = vec4(totalColor.rgb, totalColor.a);
|}))

|> set("webgl1_no_basic_map_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
vec4 totalColor = vec4(u_color, u_alpha);
|}))

|> set("webgl1_basic_map_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec2 v_mapCoord0;
|},({|

|},{|

|}),{|
//    vec2 sourceTexCoord0 = a_texCoord * u_map0SourceRegion.zw + u_map0SourceRegion.xy;
//
//    v_mapCoord0 = sourceTexCoord0 * u_map0RepeatRegion.zw + u_map0RepeatRegion.xy;

    v_mapCoord0 = a_texCoord;
|}))

|> set("webgl1_basic_map_fragment", _buildChunk(({|

|},{|

|}),{|
varying vec2 v_mapCoord0;
|},({|

|},{|

|}),{|
vec4 texelColor = texture2D(u_mapSampler, v_mapCoord0);

    vec4 totalColor = vec4(texelColor.rgb * u_color, texelColor.a * u_alpha);
|}))

    };
  