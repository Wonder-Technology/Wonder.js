@varDeclare
struct GrassMapData {
    vec4 sourceRegion;
    vec4 repeatRegion;
};
uniform GrassMapData u_grassMapDatas[3];

varying vec2 v_grassTexCoord;
varying float v_quadIndex;
@end

@funcDefine
vec4 getGrassMapColor(in sampler2D u_grassMapSampler, in GrassMapData grassMapDatas[3]){
    vec4 sourceRegion,
    repeatRegion;

    if(v_quadIndex == 0.0){
        sourceRegion = grassMapDatas[0].sourceRegion;
        repeatRegion = grassMapDatas[0].repeatRegion;
    }
    else if(v_quadIndex == 1.0){
        sourceRegion = grassMapDatas[1].sourceRegion;
        repeatRegion = grassMapDatas[1].repeatRegion;
    }
    else if(v_quadIndex == 2.0){
        sourceRegion = grassMapDatas[2].sourceRegion;
        repeatRegion = grassMapDatas[2].repeatRegion;
    }

    vec2 sourceTexCoord0 = v_grassTexCoord * sourceRegion.zw + sourceRegion.xy;

    return texture2D(u_grassMapSampler, sourceTexCoord0 * repeatRegion.zw + repeatRegion.xy);
}
@end


@body

totalColor *= getGrassMapColor(u_grassMapSampler, u_grassMapDatas);
@end
