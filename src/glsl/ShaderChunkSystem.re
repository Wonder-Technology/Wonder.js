
  open ShaderChunkType;

  open StateDataMainType;

  let _getGLSLChunkMap = ({chunkMap}) => chunkMap;

  let getChunk = (name: string, glslChunkRecord) =>
    glslChunkRecord
    |> _getGLSLChunkMap
    |> WonderCommonlib.HashMapService.get(name)
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
  
    WonderCommonlib.HashMapService.{
      chunkMap:
        createEmpty()
        
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

vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)
{
        vec3 materialLight = getMaterialLight();
        vec3 materialDiffuse = getMaterialDiffuse();
        vec3 materialSpecular = u_specular;
        vec3 materialEmission = getMaterialEmission();

        float specularStrength = getSpecularStrength();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);

        vec3 emissionColor = materialEmission;

        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse.rgb;


        // if(u_lightModel == 3){
        //     return emissionColor + ambientColor;
        // }

//        vec4 diffuseColor = vec4(color * materialDiffuse.rgb * diff * intensity, materialDiffuse.a);
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

//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);
        return emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor);
}




#if POINT_LIGHTS_COUNT > 0
        vec3 calcPointLight(vec3 lightDir, PointLightAPI light, vec3 normal, vec3 viewDir)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        float attenuation = 0.0;

        if(distance < light.range)
        {
            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
        }

        lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif



#if DIRECTION_LIGHTS_COUNT > 0
        vec3 calcDirectionLight(vec3 lightDir, DirectionLightAPI light, vec3 normal, vec3 viewDir)
{
        float attenuation = 1.0;

        lightDir = normalize(lightDir);

        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
}
#endif



vec4 calcTotalLight(vec3 norm, vec3 viewDir){
    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);

    #if POINT_LIGHTS_COUNT > 0
                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
                totalLight += vec4(calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir), 0.0);
        }
    #endif

    #if DIRECTION_LIGHTS_COUNT > 0
                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
                totalLight += vec4(calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir), 0.0);
        }
    #endif

        return totalLight;
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
struct PointLightAPI {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLightAPI u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLightAPI {
    vec3 position;

    float intensity;

    vec3 color;
};
uniform DirectionLightAPI u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},({|
vec3 getDirectionLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
|},{|
vec3 getDirectionLightDirByLightPos(vec3 lightPos){
    return lightPos - vec3(0.0);
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
struct PointLightAPI {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLightAPI u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLightAPI {
    vec3 position;

    float intensity;

    vec3 color;
};
uniform DirectionLightAPI u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},({|
vec3 getDirectionLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
|},{|
vec3 getDirectionLightDirByLightPos(vec3 lightPos){
    return lightPos - vec3(0.0);
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
struct PointLightAPI {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLightAPI u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLightAPI {
    vec3 position;

    float intensity;

    vec3 color;
};
uniform DirectionLightAPI u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
|},({|
vec3 getDirectionLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
|},{|
vec3 getDirectionLightDirByLightPos(vec3 lightPos){
    return lightPos - vec3(0.0);
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

|> set("webgl1_noSpecularMap_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
float getSpecularStrength() {
        return 1.0;
    }
|}),{|

|}))

|> set("webgl1_noShadowMap_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
float getShadowVisibility() {
        return 1.0;
    }
|}),{|

|}))

|> set("webgl1_noNormalMap_vertex", _buildChunk(({|

|},{|

|}),{|
varying vec3 v_normal;
|},({|

|},{|

|}),{|
v_normal = normalize(normalMatrix * a_normal);
|}))

|> set("webgl1_noNormalMap_fragment", _buildChunk(({|

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
            return getDirectionLightDirByLightPos(u_directionLights[x].position);
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

|> set("webgl1_noLightMap_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
vec3 getMaterialLight() {
        return vec3(0.0);
    }
|}),{|

|}))

|> set("webgl1_noEmissionMap_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
vec3 getMaterialEmission() {
        return vec3(0.0);
    }
|}),{|

|}))

|> set("webgl1_noDiffuseMap_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|
vec3 getMaterialDiffuse() {
        return u_diffuse;
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


// #export 

// ##name
// aaaa
// ##end

// ##body


// ##end


// #end
|}),{|

|},({|

|},{|
// #import * from "common_function"
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

|> set("webgl1_basic_color_fragment", _buildChunk(({|

|},{|

|}),{|

|},({|

|},{|

|}),{|
vec4 totalColor = vec4(u_color, 1.0);
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
vec4 totalColor *= texture2D(u_sampler2D, v_mapCoord0);
|}))

    };
  