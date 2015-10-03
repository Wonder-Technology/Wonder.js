@varDeclare
	varying vec4 v_positionFromLight;
@end

@body
    v_positionFromLight = u_vpMatrixFromLight * u_mMatrix * vec4(a_position, 1.0);
@end
