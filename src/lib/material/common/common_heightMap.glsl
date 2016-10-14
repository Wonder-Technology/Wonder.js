@funcDefine
float _getHeightFromHeightMap(vec2 heightMapSampleTexCoord){
heightMapSampleTexCoord.x /= u_subdivisions;
heightMapSampleTexCoord.y /= u_subdivisions;


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


float _getBilinearInterpolatedHeight(vec2 offset, float heightMinXMinZ, float heightMaxXMinZ, float heightMaxXMaxZ, float heightMinXMaxZ){
    return (heightMinXMinZ * (1.0 - offset.x) + heightMaxXMinZ * offset.x) * (1.0 - offset.y) + (heightMaxXMaxZ * offset.x + heightMinXMaxZ * (1.0 - offset.x)) * offset.y;
}


float getHeightFromHeightMap(float x, float z){
    x += u_terrainRangeWidth / 2.0;
    z += u_terrainRangeHeight / 2.0;

    if(x > u_terrainRangeWidth || z > u_terrainRangeHeight || x < 0.0 || z < 0.0){
        return 0.0;
    }



/*!
1.get grid subdivisions row,col
2.get grid height
3.get bilinear interpolated height
*/



    float sx = x / u_terrainRangeWidth * u_subdivisions,
        sz = z / u_terrainRangeHeight * u_subdivisions;

    float sFloorX = floor(sx),
        sFloorZ = floor(sz);

    float sMinX,
    sMaxX,
    sMinZ,
    sMaxZ;

    if(sFloorX < u_subdivisions){
        sMinX = sFloorX;
        sMaxX = sFloorX + 1.0;
    }
    else{
        sMinX = sFloorX - 1.0;
        sMaxX = sFloorX;
    }

    if(sFloorZ < u_subdivisions){
        sMinZ = sFloorZ;
        sMaxZ = sFloorZ + 1.0;
    }
    else{
        sMinZ = sFloorZ - 1.0;
        sMaxZ = sFloorZ;
    }

    vec2 quadSubdivisionsCoordinateArr[5];

    quadSubdivisionsCoordinateArr[0] = vec2(sMinX, sMinZ);
    quadSubdivisionsCoordinateArr[1] = vec2(sMaxX, sMinZ);
    quadSubdivisionsCoordinateArr[2] = vec2(sMaxX, sMaxZ);
    quadSubdivisionsCoordinateArr[3] = vec2(sMinX, sMaxZ);

    quadSubdivisionsCoordinateArr[4] = vec2(sx - sMinX, sz - sMinZ);


    float heightMinXMinZ = _getHeightFromHeightMap(quadSubdivisionsCoordinateArr[0]);
    float heightMaxXMinZ = _getHeightFromHeightMap(quadSubdivisionsCoordinateArr[1]);
    float heightMaxXMaxZ = _getHeightFromHeightMap(quadSubdivisionsCoordinateArr[2]);
    float heightMinXMaxZ = _getHeightFromHeightMap(quadSubdivisionsCoordinateArr[3]);

    return _getBilinearInterpolatedHeight(quadSubdivisionsCoordinateArr[4], heightMinXMinZ, heightMaxXMinZ, heightMaxXMaxZ, heightMinXMaxZ);
}
@end
