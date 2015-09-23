@varDeclare
		varying vec4 v_mirrorCoord;
@end


@funcDefine
		float blendOverlay(float base, float blend) {
			return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
		}
@end


@body

			vec4 color = v_mirrorCoord.w < 0.0 ? vec4(0,0,0,1) :  texture2DProj(u_mirrorSampler, v_mirrorCoord);

			//color = vec4(blendOverlay(mirrorColor.r, color.r), blendOverlay(mirrorColor.g, color.g), blendOverlay(mirrorColor.b, color.b), 1.0);

			gl_FragColor = color;
			//gl_FragColor = vec4(v_mirrorCoord.x/v_mirrorCoord.w, v_mirrorCoord.y/v_mirrorCoord.w, 1.0, 1.0);

@end
