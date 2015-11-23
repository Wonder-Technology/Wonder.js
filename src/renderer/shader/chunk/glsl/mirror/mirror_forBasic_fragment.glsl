@varDeclare
		varying vec4 v_mirrorCoord;
@end

@funcDefine
        //todo add more blend way to mix mirror color and textureColor
		float blendOverlay(float base, float blend) {
			return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
		}
		vec3 getMirrorColor(in vec3 materialColor){
			vec3 color = vec3(texture2DProj(u_mirrorSampler, v_mirrorCoord));

			color = vec3(blendOverlay(materialColor.r, color.r), blendOverlay(materialColor.g, color.g), blendOverlay(materialColor.b, color.b));

			return color;
		}
@end

@body
totalColor = getMirrorColor(totalColor);
@end
