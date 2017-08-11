@varDeclare
out vec4 fragColor;
@end

@body
    fragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);
@end
