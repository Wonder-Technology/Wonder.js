    vec3 getMaterialDiffuse() {
        return vec3(texture2D(u_diffuseMapSampler, a_texCoord));
    }

