@varDeclare
vec4 baseColor;
@end

@body
//vec4 baseColor = vec4(0.0);
baseColor = texture2D(u_mixMapSampler,v_mixTexCoord);
@end
