@varDeclare
varying vec3 v_texCoord;
@end


@body
gl_FragColor = textureCube(u_skyboxCubeMapSampler, vec3(-v_texCoord.x, v_texCoord.y, v_texCoord.z));
@end