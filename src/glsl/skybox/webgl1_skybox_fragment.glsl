@varDeclare
varying vec3 v_texCoord;
@end


@body
gl_FragColor = textureCube(u_skyboxCubeMapSampler, v_texCoord);
@end