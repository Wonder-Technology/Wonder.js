@varDeclare
struct GrassWindData {
    vec2 direction;
    float time;
    float strength;
};
uniform GrassWindData u_windData;
@end

@funcDefine
bool isTopPartOfGrass(){
    return a_texCoord.y >= 0.9;
}

float getWindPower(){
    float windPower = sin(u_windData.time) * u_windData.strength;

    return windPower;
}

vec3 computeVertexPositionForAnimation(vec3 position, float time, vec2 windDirection){
    vec2 windData = windDirection * getWindPower();
    vec3 translation = vec3(windData.x, 0, windData.y);

    return position + translation;
}
@end

@body
    vec3 position;

    if(isTopPartOfGrass()){
        position = computeVertexPositionForAnimation(a_position, u_windData.time, u_windData.direction);
    }
    else{
        position = a_position;
    }

    v_worldPosition = vec3(mMatrix * vec4(position, 1.0));
@end


