

import * as Js_option from "../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function _getGLSLChunkMap(param) {
  return param[/* chunkMap */0];
}

function getChunk(name, glslChunkRecord) {
  return Js_option.getExn(MutableHashMapService$WonderCommonlib.get(name, glslChunkRecord[/* chunkMap */0]));
}

function _buildChunk(param, varDeclare, param$1, body) {
  return /* record */[
          /* top */param[0],
          /* define */param[1],
          /* varDeclare */varDeclare,
          /* funcDeclare */param$1[0],
          /* funcDefine */param$1[1],
          /* body */body
        ];
}

function create(param) {
  return /* record */[/* chunkMap */MutableHashMapService$WonderCommonlib.set("webgl1_basic_map_fragment", _buildChunk(/* tuple */[
                    "\n\n",
                    "\n\n"
                  ], "\nvarying vec2 v_mapCoord0;\n", /* tuple */[
                    "\n\n",
                    "\n\n"
                  ], "\nvec4 texelColor = texture2D(u_mapSampler, v_mapCoord0);\n\n    vec4 totalColor = vec4(texelColor.rgb * u_color, texelColor.a * u_alpha);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_basic_map_vertex", _buildChunk(/* tuple */[
                        "\n\n",
                        "\n\n"
                      ], "\nvarying vec2 v_mapCoord0;\n", /* tuple */[
                        "\n\n",
                        "\n\n"
                      ], "\n//    vec2 sourceTexCoord0 = a_texCoord * u_map0SourceRegion.zw + u_map0SourceRegion.xy;\n//\n//    v_mapCoord0 = sourceTexCoord0 * u_map0RepeatRegion.zw + u_map0RepeatRegion.xy;\n\n    v_mapCoord0 = a_texCoord;\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_basic_map_fragment", _buildChunk(/* tuple */[
                            "\n\n",
                            "\n\n"
                          ], "\n\n", /* tuple */[
                            "\n\n",
                            "\n\n"
                          ], "\nvec4 totalColor = vec4(u_color, u_alpha);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_basic_end_fragment", _buildChunk(/* tuple */[
                                "\n\n",
                                "\n\n"
                              ], "\n\n", /* tuple */[
                                "\n\n",
                                "\n\n"
                              ], "\ngl_FragColor = vec4(totalColor.rgb, totalColor.a);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_basic_vertex", _buildChunk(/* tuple */[
                                    "\n\n",
                                    "\n\n"
                                  ], "\n\n", /* tuple */[
                                    "\n\n",
                                    "\n\n"
                                  ], "\ngl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"), MutableHashMapService$WonderCommonlib.set("common_define", _buildChunk(/* tuple */[
                                        "\n\n",
                                        "\n\n"
                                      ], "\n\n", /* tuple */[
                                        "\n\n",
                                        "\n\n"
                                      ], "\n\n"), MutableHashMapService$WonderCommonlib.set("common_fragment", _buildChunk(/* tuple */[
                                            "\n\n",
                                            "\n\n"
                                          ], "\n\n", /* tuple */[
                                            "\n\n",
                                            "\n\n"
                                          ], "\n\n"), MutableHashMapService$WonderCommonlib.set("common_function", _buildChunk(/* tuple */[
                                                "\n\n",
                                                "\n\n"
                                              ], "\n\n", /* tuple */[
                                                "\n\n",
                                                "\n// mat2 transpose(mat2 m) {\n//   return mat2(  m[0][0], m[1][0],   // new col 0\n//                 m[0][1], m[1][1]    // new col 1\n//              );\n//   }\n\n// mat3 transpose(mat3 m) {\n//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n//                 m[0][1], m[1][1], m[2][1],  // new col 1\n//                 m[0][2], m[1][2], m[2][2]   // new col 1\n//              );\n//   }\n\n//bool isRenderArrayEmpty(int isRenderArrayEmpty){\n//  return isRenderArrayEmpty == 1;\n//}\n"
                                              ], "\n\n"), MutableHashMapService$WonderCommonlib.set("common_vertex", _buildChunk(/* tuple */[
                                                    "\n\n",
                                                    "\n\n"
                                                  ], "\n\n", /* tuple */[
                                                    "\n\n",
                                                    "\n// mat2 transpose(mat2 m) {\n//   return mat2(  m[0][0], m[1][0],   // new col 0\n//                 m[0][1], m[1][1]    // new col 1\n//              );\n//   }\n\n// mat3 transpose(mat3 m) {\n//   return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n//                 m[0][1], m[1][1], m[2][1],  // new col 1\n//                 m[0][2], m[1][2], m[2][2]   // new col 1\n//              );\n//   }\n\n//bool isRenderArrayEmpty(int isRenderArrayEmpty){\n//  return isRenderArrayEmpty == 1;\n//}\n"
                                                  ], "\n\n"), MutableHashMapService$WonderCommonlib.set("highp_fragment", _buildChunk(/* tuple */[
                                                        "\nprecision highp float;\nprecision highp int;\n",
                                                        "\n\n"
                                                      ], "\n\n", /* tuple */[
                                                        "\n\n",
                                                        "\n\n"
                                                      ], "\n\n"), MutableHashMapService$WonderCommonlib.set("lowp_fragment", _buildChunk(/* tuple */[
                                                            "\nprecision lowp float;\nprecision lowp int;\n",
                                                            "\n\n"
                                                          ], "\n\n", /* tuple */[
                                                            "\n\n",
                                                            "\n\n"
                                                          ], "\n\n"), MutableHashMapService$WonderCommonlib.set("mediump_fragment", _buildChunk(/* tuple */[
                                                                "\nprecision mediump float;\nprecision mediump int;\n",
                                                                "\n\n"
                                                              ], "\n\n", /* tuple */[
                                                                "\n\n",
                                                                "\n\n"
                                                              ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_setPos_mvp", _buildChunk(/* tuple */[
                                                                    "\n\n",
                                                                    "\n\n"
                                                                  ], "\n\n", /* tuple */[
                                                                    "\n\n",
                                                                    "\n\n"
                                                                  ], "\ngl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_rotation_gizmo_circle_for_editor_fragment", _buildChunk(/* tuple */[
                                                                        "\n\n",
                                                                        "\n\n"
                                                                      ], "\nvarying vec3 v_position;\n", /* tuple */[
                                                                        "\nbool isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(vec3 vertexPos, vec3 cameraPosInLocalCoordSystem);\n",
                                                                        "\nbool isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(vec3 vertexPos, vec3 cameraPosInLocalCoordSystem){\nreturn dot(\nnormalize(-vertexPos),\ncameraPosInLocalCoordSystem - vertexPos\n) >= 0.0;\n}\n"
                                                                      ], "\nif(isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(v_position, u_cameraPosInLocalCoordSystem)){\n    discard;\n}\n\ngl_FragColor = vec4(u_color, u_alpha);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_rotation_gizmo_circle_for_editor_vertex", _buildChunk(/* tuple */[
                                                                            "\n\n",
                                                                            "\n\n"
                                                                          ], "\nvarying vec3 v_position;\n", /* tuple */[
                                                                            "\n\n",
                                                                            "\n\n"
                                                                          ], "\nv_position = a_position;\n\ngl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"), MutableHashMapService$WonderCommonlib.set("modelMatrix_batch_instance_vertex", _buildChunk(/* tuple */[
                                                                                "\n\n",
                                                                                "\n\n"
                                                                              ], "\n\n", /* tuple */[
                                                                                "\n\n",
                                                                                "\n\n"
                                                                              ], "\nmat4 mMatrix = u_mMatrix;\n"), MutableHashMapService$WonderCommonlib.set("normalMatrix_batch_instance_vertex", _buildChunk(/* tuple */[
                                                                                    "\n\n",
                                                                                    "\n\n"
                                                                                  ], "\n\n", /* tuple */[
                                                                                    "\n\n",
                                                                                    "\n\n"
                                                                                  ], "\nmat3 normalMatrix = u_normalMatrix;\n"), MutableHashMapService$WonderCommonlib.set("modelMatrix_hardware_instance_vertex", _buildChunk(/* tuple */[
                                                                                        "\n\n",
                                                                                        "\n\n"
                                                                                      ], "\n\n", /* tuple */[
                                                                                        "\n\n",
                                                                                        "\n\n"
                                                                                      ], "\nmat4 mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);\n"), MutableHashMapService$WonderCommonlib.set("normalMatrix_hardware_instance_vertex", _buildChunk(/* tuple */[
                                                                                            "\n\n",
                                                                                            "\n\n"
                                                                                          ], "\n\n", /* tuple */[
                                                                                            "\n\n",
                                                                                            "\n\n"
                                                                                          ], "\nmat3 normalMatrix = mat3(a_normalVec3_0, a_normalVec3_1, a_normalVec3_2);\n"), MutableHashMapService$WonderCommonlib.set("modelMatrix_noInstance_vertex", _buildChunk(/* tuple */[
                                                                                                "\n\n",
                                                                                                "\n\n"
                                                                                              ], "\n\n", /* tuple */[
                                                                                                "\n\n",
                                                                                                "\n\n"
                                                                                              ], "\nmat4 mMatrix = u_mMatrix;\n"), MutableHashMapService$WonderCommonlib.set("normalMatrix_noInstance_vertex", _buildChunk(/* tuple */[
                                                                                                    "\n\n",
                                                                                                    "\n\n"
                                                                                                  ], "\n\n", /* tuple */[
                                                                                                    "\n\n",
                                                                                                    "\n\n"
                                                                                                  ], "\nmat3 normalMatrix = u_normalMatrix;\n"), MutableHashMapService$WonderCommonlib.set("webgl1_diffuse_map_fragment", _buildChunk(/* tuple */[
                                                                                                        "\n\n",
                                                                                                        "\n\n"
                                                                                                      ], "\nvarying vec2 v_diffuseMapTexCoord;\n", /* tuple */[
                                                                                                        "\n\n",
                                                                                                        "\nvec4 getMaterialDiffuse() {\n        vec4 texelColor = texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord);\n\n        return vec4(texelColor.rgb * u_diffuse, texelColor.a);\n    }\n"
                                                                                                      ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_diffuse_map_vertex", _buildChunk(/* tuple */[
                                                                                                            "\n\n",
                                                                                                            "\n\n"
                                                                                                          ], "\nvarying vec2 v_diffuseMapTexCoord;\n", /* tuple */[
                                                                                                            "\n\n",
                                                                                                            "\n\n"
                                                                                                          ], "\n//TODO optimize(combine, reduce compute numbers)\n    //TODO BasicTexture extract textureMatrix\n//    vec2 sourceTexCoord = a_texCoord * u_diffuseMapSourceRegion.zw + u_diffuseMapSourceRegion.xy;\n//    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseMapRepeatRegion.zw + u_diffuseMapRepeatRegion.xy;\n\n    v_diffuseMapTexCoord = a_texCoord;\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_diffuse_map_fragment", _buildChunk(/* tuple */[
                                                                                                                "\n\n",
                                                                                                                "\n\n"
                                                                                                              ], "\n\n", /* tuple */[
                                                                                                                "\n\n",
                                                                                                                "\nvec4 getMaterialDiffuse() {\n        return vec4(u_diffuse, 1.0);\n    }\n"
                                                                                                              ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_emission_map_fragment", _buildChunk(/* tuple */[
                                                                                                                    "\n\n",
                                                                                                                    "\n\n"
                                                                                                                  ], "\n\n", /* tuple */[
                                                                                                                    "\n\n",
                                                                                                                    "\nvec3 getMaterialEmission() {\n        return vec3(0.0);\n    }\n"
                                                                                                                  ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_light_map_fragment", _buildChunk(/* tuple */[
                                                                                                                        "\n\n",
                                                                                                                        "\n\n"
                                                                                                                      ], "\n\n", /* tuple */[
                                                                                                                        "\n\n",
                                                                                                                        "\nvec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n"
                                                                                                                      ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_normal_map_fragment", _buildChunk(/* tuple */[
                                                                                                                            "\n\n",
                                                                                                                            "\n\n"
                                                                                                                          ], "\nvarying vec3 v_normal;\n", /* tuple */[
                                                                                                                            "\nvec3 getNormal();\n",
                                                                                                                            "\nvec3 getNormal(){\n    return v_normal;\n}\n\n#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getPointLightDirByLightPos(u_pointLights[x].position);\n        }\n    }\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getDirectionLightDir(u_directionLights[x].direction);\n        }\n    }\n\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\n"
                                                                                                                          ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_normal_map_vertex", _buildChunk(/* tuple */[
                                                                                                                                "\n\n",
                                                                                                                                "\n\n"
                                                                                                                              ], "\nvarying vec3 v_normal;\n", /* tuple */[
                                                                                                                                "\n\n",
                                                                                                                                "\n\n"
                                                                                                                              ], "\nv_normal = normalize(normalMatrix * a_normal);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_shadow_map_fragment", _buildChunk(/* tuple */[
                                                                                                                                    "\n\n",
                                                                                                                                    "\n\n"
                                                                                                                                  ], "\n\n", /* tuple */[
                                                                                                                                    "\n\n",
                                                                                                                                    "\nfloat getShadowVisibility() {\n        return 1.0;\n    }\n"
                                                                                                                                  ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_no_specular_map_fragment", _buildChunk(/* tuple */[
                                                                                                                                        "\n\n",
                                                                                                                                        "\n\n"
                                                                                                                                      ], "\n\n", /* tuple */[
                                                                                                                                        "\n\n",
                                                                                                                                        "\nfloat getSpecularStrength() {\n        return 1.0;\n    }\n"
                                                                                                                                      ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_specular_map_fragment", _buildChunk(/* tuple */[
                                                                                                                                            "\n\n",
                                                                                                                                            "\n\n"
                                                                                                                                          ], "\nvarying vec2 v_specularMapTexCoord;\n", /* tuple */[
                                                                                                                                            "\n\n",
                                                                                                                                            "\nfloat getSpecularStrength() {\n        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;\n    }\n"
                                                                                                                                          ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_specular_map_vertex", _buildChunk(/* tuple */[
                                                                                                                                                "\n\n",
                                                                                                                                                "\n\n"
                                                                                                                                              ], "\nvarying vec2 v_specularMapTexCoord;\n", /* tuple */[
                                                                                                                                                "\n\n",
                                                                                                                                                "\n\n"
                                                                                                                                              ], "\nv_specularMapTexCoord = a_texCoord;\n"), MutableHashMapService$WonderCommonlib.set("webgl1_ambientLight_fragment", _buildChunk(/* tuple */[
                                                                                                                                                    "\n\n",
                                                                                                                                                    "\n\n"
                                                                                                                                                  ], "\nuniform vec3 u_ambient;\n", /* tuple */[
                                                                                                                                                    "\n\n",
                                                                                                                                                    "\n\n"
                                                                                                                                                  ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_frontLight_common_fragment", _buildChunk(/* tuple */[
                                                                                                                                                        "\n\n",
                                                                                                                                                        "\n\n"
                                                                                                                                                      ], "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", /* tuple */[
                                                                                                                                                        "\nvec3 getDirectionLightDir(vec3 lightDirection);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n",
                                                                                                                                                        "\nvec3 getDirectionLightDir(vec3 lightDirection){\n    lightDirection =  normalize(lightDirection);\n\n    return -lightDirection;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n"
                                                                                                                                                      ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_frontLight_common_vertex", _buildChunk(/* tuple */[
                                                                                                                                                            "\n\n",
                                                                                                                                                            "\n\n"
                                                                                                                                                          ], "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", /* tuple */[
                                                                                                                                                            "\nvec3 getDirectionLightDir(vec3 lightDirection);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n",
                                                                                                                                                            "\nvec3 getDirectionLightDir(vec3 lightDirection){\n    lightDirection =  normalize(lightDirection);\n\n    return -lightDirection;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n"
                                                                                                                                                          ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_frontLight_common", _buildChunk(/* tuple */[
                                                                                                                                                                "\n\n",
                                                                                                                                                                "\n\n"
                                                                                                                                                              ], "\nvarying vec3 v_worldPosition;\n\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 direction;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", /* tuple */[
                                                                                                                                                                "\nvec3 getDirectionLightDir(vec3 lightDirection);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n",
                                                                                                                                                                "\nvec3 getDirectionLightDir(vec3 lightDirection){\n    lightDirection =  normalize(lightDirection);\n\n    return -lightDirection;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n"
                                                                                                                                                              ], "\n\n"), MutableHashMapService$WonderCommonlib.set("webgl1_frontLight_end_fragment", _buildChunk(/* tuple */[
                                                                                                                                                                    "\n\n",
                                                                                                                                                                    "\n\n"
                                                                                                                                                                  ], "\n\n", /* tuple */[
                                                                                                                                                                    "\n\n",
                                                                                                                                                                    "\n\n"
                                                                                                                                                                  ], "\ngl_FragColor = totalColor;\n"), MutableHashMapService$WonderCommonlib.set("webgl1_frontLight_fragment", _buildChunk(/* tuple */[
                                                                                                                                                                        "\n\n",
                                                                                                                                                                        "\n\n"
                                                                                                                                                                      ], "\n\n", /* tuple */[
                                                                                                                                                                        "\n\n",
                                                                                                                                                                        "\nfloat getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 halfAngle = normalize(lightDir + viewDir);\n\n        float blinnTerm = dot(normal, halfAngle);\n\n        blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;\n        blinnTerm = pow(blinnTerm, shininess);\n\n        return blinnTerm;\n}\n\n// float getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n//         vec3 reflectDir = reflect(-lightDir, normal);\n//         float phongTerm = dot(viewDir, reflectDir);\n\n//         phongTerm = clamp(phongTerm, 0.0, 1.0);\n//         phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;\n//         phongTerm = pow(phongTerm, shininess);\n\n//         return phongTerm;\n// }\n\nvec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir, vec3 materialDiffuse)\n{\n        vec3 materialSpecular = u_specular;\n        vec3 materialEmission = getMaterialEmission();\n\n        float specularStrength = getSpecularStrength();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n\n\n        // if(u_lightModel == 3){\n        //     return emissionColor + ambientColor;\n        // }\n\n        vec3 diffuseColor = color * materialDiffuse.rgb * diff * intensity;\n\n        float spec = 0.0;\n\n        // if(u_lightModel == 2){\n        //         spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);\n        // }\n        // else if(u_lightModel == 1){\n        //         spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n        // }\n\n        spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n       return vec3(emissionColor + attenuation * (diffuseColor.rgb + specularColor));\n}\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\n        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir, vec3 materialDiffuse)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        float attenuation = 0.0;\n\n        if(distance < light.range)\n        {\n            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n        }\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir, materialDiffuse);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n        vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir, vec3 materialDiffuse)\n{\n        float attenuation = 1.0;\n\n        // lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir, materialDiffuse);\n}\n#endif\n\n\n\nvec4 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec3 totalLight = vec3(0.0, 0.0, 0.0);\n\n    vec4 materialDiffuse = getMaterialDiffuse();\n\n    float alpha = materialDiffuse.a;\n    vec3 materialDiffuseRGB = materialDiffuse.rgb;\n\n\n    #if (DIRECTION_LIGHTS_COUNT == 0 && POINT_LIGHTS_COUNT == 0 )\n        return vec4(u_ambient * materialDiffuseRGB, alpha);\n    #endif\n\n\n    #if POINT_LIGHTS_COUNT > 0\n                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n                totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir, materialDiffuseRGB);\n        }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n                totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir, materialDiffuseRGB);\n        }\n    #endif\n\n        totalLight += u_ambient * materialDiffuseRGB;\n\n        return vec4(totalLight, alpha);\n}\n"
                                                                                                                                                                      ], "\nvec3 normal = normalize(getNormal());\n\n// #ifdef BOTH_SIdE\n// normal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));\n// #endif\n\nvec3 viewDir = normalize(getViewDir());\n\nvec4 totalColor = calcTotalLight(normal, viewDir);\n\n// totalColor.a *= u_opacity;\n\ntotalColor.rgb = totalColor.rgb * getShadowVisibility();\n"), MutableHashMapService$WonderCommonlib.set("webgl1_frontLight_setWorldPosition_vertex", _buildChunk(/* tuple */[
                                                                                                                                                                            "\n\n",
                                                                                                                                                                            "\n\n"
                                                                                                                                                                          ], "\n\n", /* tuple */[
                                                                                                                                                                            "\n\n",
                                                                                                                                                                            "\n\n"
                                                                                                                                                                          ], "\nv_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));\n"), MutableHashMapService$WonderCommonlib.set("webgl1_frontLight_vertex", _buildChunk(/* tuple */[
                                                                                                                                                                                "\n\n",
                                                                                                                                                                                "\n\n"
                                                                                                                                                                              ], "\n\n", /* tuple */[
                                                                                                                                                                                "\n\n",
                                                                                                                                                                                "\n\n"
                                                                                                                                                                              ], "\ngl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_outline_expand_fragment", _buildChunk(/* tuple */[
                                                                                                                                                                                    "\n\n",
                                                                                                                                                                                    "\n\n"
                                                                                                                                                                                  ], "\n\n", /* tuple */[
                                                                                                                                                                                    "\n\n",
                                                                                                                                                                                    "\n\n"
                                                                                                                                                                                  ], "\ngl_FragColor = vec4(u_outlineColor, 1.0);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_outline_expand_vertex", _buildChunk(/* tuple */[
                                                                                                                                                                                        "\n\n",
                                                                                                                                                                                        "\n\n"
                                                                                                                                                                                      ], "\n\n", /* tuple */[
                                                                                                                                                                                        "\n\n",
                                                                                                                                                                                        "\n\n"
                                                                                                                                                                                      ], "\nvec3 position = a_position.xyz + a_normal.xyz * 0.08;\n\ngl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(position, 1.0);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_outline_origin_fragment", _buildChunk(/* tuple */[
                                                                                                                                                                                            "\n\n",
                                                                                                                                                                                            "\n\n"
                                                                                                                                                                                          ], "\n\n", /* tuple */[
                                                                                                                                                                                            "\n\n",
                                                                                                                                                                                            "\n\n"
                                                                                                                                                                                          ], "\ngl_FragColor = vec4(1.0);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_outline_origin_vertex", _buildChunk(/* tuple */[
                                                                                                                                                                                                "\n\n",
                                                                                                                                                                                                "\n\n"
                                                                                                                                                                                              ], "\n\n", /* tuple */[
                                                                                                                                                                                                "\n\n",
                                                                                                                                                                                                "\n\n"
                                                                                                                                                                                              ], "\ngl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n"), MutableHashMapService$WonderCommonlib.set("webgl1_skybox_fragment", _buildChunk(/* tuple */[
                                                                                                                                                                                                    "\n\n",
                                                                                                                                                                                                    "\n\n"
                                                                                                                                                                                                  ], "\nvarying vec3 v_texCoord;\n", /* tuple */[
                                                                                                                                                                                                    "\n\n",
                                                                                                                                                                                                    "\n\n"
                                                                                                                                                                                                  ], "\ngl_FragColor = textureCube(u_skyboxCubeMapSampler, vec3(-v_texCoord.x, v_texCoord.y, v_texCoord.z));\n"), MutableHashMapService$WonderCommonlib.set("webgl1_skybox_vertex", _buildChunk(/* tuple */[
                                                                                                                                                                                                        "\n\n",
                                                                                                                                                                                                        "\n\n"
                                                                                                                                                                                                      ], "\nvarying vec3 v_texCoord;\n", /* tuple */[
                                                                                                                                                                                                        "\n\n",
                                                                                                                                                                                                        "\n\n"
                                                                                                                                                                                                      ], "\nv_texCoord = a_position;\n\nvec4 pos = u_pMatrix * u_skyboxVMatrix * vec4(a_position, 1.0);\ngl_Position = pos.xyww;\n"), MutableHashMapService$WonderCommonlib.createEmpty(/* () */0)))))))))))))))))))))))))))))))))))))))))))))))];
}

export {
  _getGLSLChunkMap ,
  getChunk ,
  _buildChunk ,
  create ,
  
}
/* No side effect */
