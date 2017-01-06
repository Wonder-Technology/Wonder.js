@funcDeclare
vec3 getNormal();

@end

@funcDefine
vec3 getNormal(){
    vec3 viewDir = getViewDir();
    vec3 mixColor = baseColor.rgb;

    vec3 bump1Color=texture2D(u_bumpMap1Sampler,v_diffuseMap1TexCoord).xyz;
    vec3 bump2Color=texture2D(u_bumpMap2Sampler,v_diffuseMap2TexCoord).xyz;
    vec3 bump3Color=texture2D(u_bumpMap3Sampler,v_diffuseMap3TexCoord).xyz;
    bump1Color.rgb*=mixColor.r;
    bump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);
    vec3 map=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);
    map=map*255./127.-128./127.;

    mat3 TBN=cotangentFrame(v_normal,-viewDir,v_mixMapTexCoord);

    return normalize(TBN*map);
}
@end
