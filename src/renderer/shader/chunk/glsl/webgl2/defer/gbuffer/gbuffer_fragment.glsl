////precision highp float;
//
////in vec3 v_worldPosition;
////in vec4 v_normal;
////in vec4 vUV;
//
//layout(location=0) out vec3 gbufferPosition;
//layout(location=1) out vec3 gbufferNormal;
//layout(location=2) out vec4 gbufferColor;
//
//void main() {
////todo set shininess
//
//    gbufferPosition = v_worldPosition;
////    gbufferNormal = vec4(normalize(v_normal.xyz), 0.0);
//    gbufferNormal = getNormal();
////    gbufferUV = vUV;
//
//    gbufferColor.rgb = getMaterialDiffuse();
//    gbufferColor.a = getSpecularStrength();
//}

