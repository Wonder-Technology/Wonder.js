	varying vec2 v_specularMapTexCoord;

    vec3 getMaterialSpecular() {
        return vec3(texture2D(u_specularMapSampler, v_specularMapTexCoord));
    }
