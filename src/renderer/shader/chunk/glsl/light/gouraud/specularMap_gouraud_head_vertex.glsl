    vec3 getMaterialSpecular() {
        return vec3(texture2D(u_specularMapSampler, a_texCoord));
    }
