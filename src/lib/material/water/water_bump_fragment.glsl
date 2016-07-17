@varDeclare
varying vec2 v_bumpTexCoord;
@end


@body
    // fetch bump texture, unpack from [0..1] to [-1..1]
	vec3 bumpNormal = 2.0 * texture2D(u_bumpMapSampler, v_bumpTexCoord).rgb - 1.0;
	vec2 perturbation = u_waveData.height * bumpNormal.rg;
@end
