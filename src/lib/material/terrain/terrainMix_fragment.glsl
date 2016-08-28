@varDeclare
varying vec2 v_mixTexCoord;
varying vec2 v_diffuse1TexCoord;
varying vec2 v_diffuse2TexCoord;
varying vec2 v_diffuse3TexCoord;
@end

@funcDefine
vec4 getMixTextureColor(){
    vec4 baseColor=texture2D(u_mixMapSampler,v_mixTexCoord);

    if (baseColor.a<0.4){
        discard;
    }

    vec4 diffuse1Color=texture2D(u_diffuseMap1Sampler,v_diffuse1TexCoord);
    vec4 diffuse2Color=texture2D(u_diffuseMap2Sampler,v_diffuse2TexCoord);
    vec4 diffuse3Color=texture2D(u_diffuseMap3Sampler,v_diffuse3TexCoord);

    diffuse1Color.rgb*=baseColor.r;
    diffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,baseColor.g);
    baseColor.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,baseColor.b);

    return baseColor;
}
@end


@body
totalColor *= getMixTextureColor();
@end
