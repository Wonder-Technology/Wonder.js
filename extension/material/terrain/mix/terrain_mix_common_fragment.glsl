@varDeclare
vec4 baseColor;
@end

@body
baseColor = texture2D(u_mixMapSampler,v_mixMapTexCoord);
@end
