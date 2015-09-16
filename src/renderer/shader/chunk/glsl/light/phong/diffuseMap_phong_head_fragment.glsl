	varying vec2 v_diffuseMapTexCoord;

    vec3 getMaterialDiffuse() {
        return vec3(texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord));
    }
