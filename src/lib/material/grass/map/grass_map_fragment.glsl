@varDeclare
struct GrassMapData {
    vec4 sourceRegion;
};
uniform GrassMapData u_grassMapDatas[3];

varying vec2 v_grassTexCoord;
varying float v_quadIndex;
@end

@funcDefine
vec4 getGrassMapColor(in sampler2D u_grassMapSampler, in GrassMapData grassMapDatas[3]){
    vec4 sourceRegion;

    if(v_quadIndex == 0.0){
        sourceRegion = grassMapDatas[0].sourceRegion;
    }
    else if(v_quadIndex == 1.0){
        sourceRegion = grassMapDatas[1].sourceRegion;
    }
    else if(v_quadIndex == 2.0){
        sourceRegion = grassMapDatas[2].sourceRegion;
    }

    return texture2D(u_grassMapSampler, v_grassTexCoord * sourceRegion.zw + sourceRegion.xy);
}
@end


@body

totalColor *= getGrassMapColor(u_grassMapSampler, u_grassMapDatas);
@end
