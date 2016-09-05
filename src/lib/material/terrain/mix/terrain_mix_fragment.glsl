@varDeclare
varying vec2 v_mixMapTexCoord;
varying vec2 v_diffuseMap1TexCoord;
varying vec2 v_diffuseMap2TexCoord;
varying vec2 v_diffuseMap3TexCoord;
@end

@funcDefine
vec4 getMixMapColor(){
    vec4 diffuse1Color=texture2D(u_diffuseMap1Sampler,v_diffuseMap1TexCoord);
    vec4 diffuse2Color=texture2D(u_diffuseMap2Sampler,v_diffuseMap2TexCoord);
    vec4 diffuse3Color=texture2D(u_diffuseMap3Sampler,v_diffuseMap3TexCoord);

    diffuse1Color.rgb*=baseColor.r;
    diffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,baseColor.g);
    baseColor.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,baseColor.b);

    return baseColor;
}
@end


@body
totalColor *= getMixMapColor();
@end
