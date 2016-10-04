@varDeclare
    varying vec4 v_color;
    varying vec2 v_texCoord;
//    varying vec2 v_heightMapSampleTexCoord;
@end

@funcDefine
// Rotate by an angle
vec2 rotate (float x, float y, float r) {
    float c = cos(r);
    float s = sin(r);
    return vec2(x * c - y * s, x * s + y * c);
}

// Rotate by a vector
vec2 rotate (float x, float y, vec2 r) {
    return vec2(x * r.x - y * r.y, x * r.y + y * r.x);
}


//todo refactor:move
float _computeHeightMapCol(float x){
//    return floor((((x + u_terrainRangeWidth / 2.0) / u_terrainRangeWidth) * (u_heightMapImageDataWidth - 1.0)));
    return (x + u_terrainRangeWidth / 2.0) / u_terrainRangeWidth;
}

float _computeHeightMapRow(float z){
//    return floor(((1.0 - (z + u_terrainRangeHeight / 2.0) / u_terrainRangeHeight) * (u_heightMapImageDataHeight - 1.0)));
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
//return 5.7;
//return z;
//return heightMapSampleTexCoord.x;

//return data.r;
}
@end

@body
    float vi = mod(a_vertexIndex, BLADE_VERTS); // vertex index for this side of the blade
    float di = floor(vi / 2.0);  // div index (0 .. BLADE_DIVS)
    float hpct = di / BLADE_SEGS;  // percent of height of blade this vertex is at
    float bside = floor(a_vertexIndex / BLADE_VERTS);  // front/back side of blade
    float bedge = mod(vi, 2.0);  // left/right edge (x=0 or x=1)
    // Vertex position - start with 2D a_shape, no bend applied
    vec4 pos = vec4(
        a_shape.x * (bedge - 0.5) * (1.0 - pow(hpct, 3.0)), // taper blade edges as approach tip
        a_shape.y * di / BLADE_SEGS, // height of vtx, unbent
        0.0, // flat z, unbent
        1.0
    );


    // Start computing a normal for this vertex
//    vec3 normal = vec3(rotate(0.0, bside * 2.0 - 1.0, a_offset.w), 0.0);

    // Apply blade's natural curve amount
    float curve = a_shape.w;
    // Then add animated curve amount by u_time using this blade's
    // unique properties to randomize its oscillation
    curve += a_shape.w + 0.125 * (sin(u_time * 4.0 + a_offset.w * 0.2 * a_shape.y + a_offset.x + a_offset.z));
    // put lean and curve together
    float rot = a_shape.z + curve * hpct;
    vec2 rotv = vec2(cos(rot), sin(rot));
    pos.zy = rotate(pos.z, pos.y, rotv);
//    normal.yz = rotate(normal.y, normal.z, rotv);

    // rotation of this blade as a vector
    rotv = vec2(cos(a_offset.w), sin(a_offset.w));
    pos.xz = rotate(pos.x, pos.z, rotv);

    // Based on centre of view cone position, what grid tile should
    // this piece of grass be drawn at?
    vec2 gridOffset = vec2(
//        floor((drawPos.x - a_offset.x) / u_size) * u_size + u_size / 2.0,
//        floor((drawPos.y - a_offset.y) / u_size) * u_size + u_size / 2.0
        floor((- a_offset.x) / u_size) * u_size + u_size / 2.0,
//        floor((- a_offset.y) / u_size) * u_size + u_size / 2.0
        floor((- a_offset.z) / u_size) * u_size + u_size / 2.0
    );

    // Find the blade mesh world x,y position
    vec2 bladePos = vec2(a_offset.xz + gridOffset);

    pos.x += bladePos.x;
    pos.z += bladePos.y;


    pos = u_mMatrix * pos;

    vec2 heightMapSampleTexCoord = getHeightMapSampleTexCoord(pos.x, pos.z);

    pos.y += getHeightFromHeightMap(heightMapSampleTexCoord);

//    heightMapSampleTexCoord = bladePos.xy * heightMapScale.xy + vec2(0.5, 0.5);

    // Compute wind effect
//    float wind = getHeightFromHeightMap(vec2(heightMapSampleTexCoord.x - u_time / 100.0, heightMapSampleTexCoord.y - u_time / 50.0));




//    wind = (clamp(wind, 0.35, 0.85) - 0.35) * 2.0;
//    wind = wind * wind * 1.5;

    //todo pass wind direction uniform

//    wind *= hpct; // min(hpct * a_shape.y / BLADE_HEIGHT_TALL, 1.0); // scale wind by height of blade
//    wind = -wind;
//    rotv = vec2(cos(wind), sin(wind));
    // Wind blows in axis-aligned direction to make things simpler
//    pos.zy = rotate(pos.z, pos.y, rotv);
//    normal.yz = rotate(normal.y, normal.z, rotv);

    // Sample the data texture to get altitude for this blade position
//    float altitude = texture2D(heightMap, heightMapSampleTexCoord).r;
//    float altclr = (clamp(altitude, 0.45, 0.75) - 0.45) * 3.3333333;
//    vec3 grassColor = mix(grassColorLow, grassColorHigh, altclr);
    // Vertex color must be brighter because it is multiplied with blade texture
//    grassColor = min(vec3(grassColor.r * 1.5, grassColor.g * 1.5, grassColor.b * 0.95), 1.0);
//    altitude *= heightMapScale.z;

    // Translate to world coordinates
//    pos.z += altitude;

    // Compute light for this vertex
//    float c = max(-dot(normal, lightDir), 0.0);
//    c = max(c - (1.0 - hpct) * 0.75, 0.0);
//    c = 0.3 + 0.7 * c;
//    v_color = vec4(
//        c * 0.85 + cos(a_offset.x * 80.0) * 0.05,
//        c * 0.95 + sin(a_offset.y * 140.0) * 0.05,
//        c * 0.95 + sin(a_offset.x * 99.0) * 0.05,
//        1.0
//    );
//    v_color.rgb = v_color.rgb * LIGHT_COLOR * grassColor;
        v_color = vec4(1.0);


    // grass texture coordinate for this vertex
    v_texCoord = vec2(bedge, di * 2.0);

    gl_Position = u_vpMatrix * pos;
@end
