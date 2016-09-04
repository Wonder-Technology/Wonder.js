@varDeclare
struct GrassMapData {
    vec4 sourceRegion;
};
uniform GrassMapData u_grassMapDatas[3];

struct GrassWindData {
    vec2 direction;
    float time;
    float strength;
};
uniform GrassWindData u_windData;


varying vec2 v_grassTexCoord;
varying float v_quadIndex;
@end

@funcDefine
bool isTopPartOfGrass(){
    return v_grassTexCoord.y > 0.1;
}

//todo need more random
float getWindPower(){
    float windPower = sin(u_windData.time) * u_windData.strength;

    return windPower;
}

vec4 getGrassMapColor(in sampler2D grassMapSampler, in GrassMapData grassMapDatas[3]){
    vec4 sourceRegion;
    vec2 grassTexCoord;

    if(v_quadIndex == 0.0){
        sourceRegion = grassMapDatas[0].sourceRegion;
    }
    else if(v_quadIndex == 1.0){
        sourceRegion = grassMapDatas[1].sourceRegion;
    }
    else if(v_quadIndex == 2.0){
        sourceRegion = grassMapDatas[2].sourceRegion;
    }

    if(isTopPartOfGrass()){
        grassTexCoord = v_grassTexCoord + u_windData.direction *  getWindPower();
    }
    else{
        grassTexCoord = v_grassTexCoord;
    }

    return texture2D(grassMapSampler, grassTexCoord * sourceRegion.zw + sourceRegion.xy);
}
@end


@body
totalColor *= getGrassMapColor(u_grassMapSampler, u_grassMapDatas);
@end
