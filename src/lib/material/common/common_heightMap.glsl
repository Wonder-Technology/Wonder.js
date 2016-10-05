@funcDefine
float _computeHeightMapCol(float x){
    return (x + u_terrainRangeWidth / 2.0) / u_terrainRangeWidth;
}

float _computeHeightMapRow(float z){
    return (z + u_terrainRangeHeight / 2.0) / u_terrainRangeHeight;
}

vec2 getHeightMapSampleTexCoord(float x, float z){
float heightMapRow = _computeHeightMapRow(z),
heightMapCol = _computeHeightMapCol(x);

return vec2(heightMapCol, heightMapRow);
}

float getHeightFromHeightMap(vec2 heightMapSampleTexCoord){
vec4 data = texture2D(u_heightMapSampler, heightMapSampleTexCoord);
            /*!
             compute gradient from rgb heightMap->r,g,b components
             */
                float r = data.r,
                g = data.g,
                b = data.b,
                gradient = r * 0.3 + g * 0.59 + b * 0.11;

            return u_terrainMinHeight + (u_terrainMaxHeight - u_terrainMinHeight) * gradient;
}
@end
