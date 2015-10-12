@varDeclare
varying vec4 v_positionFromLight[ TWOD_SHADOWMAP_COUNT ];

uniform mat4 u_vpMatrixFromLight[ TWOD_SHADOWMAP_COUNT ];
@end

@body
	for( int i = 0; i < TWOD_SHADOWMAP_COUNT; i ++ ) {
    v_positionFromLight[i] = u_vpMatrixFromLight[i] * vec4(v_worldPosition, 1.0);
	}
@end
