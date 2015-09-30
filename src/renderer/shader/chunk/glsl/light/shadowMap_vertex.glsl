@varDeclare
	varying vec4 v_positionFromLight;
@end

@body
    v_positionFromLight = u_mvpMatrixFromLight * a_position;
@end
