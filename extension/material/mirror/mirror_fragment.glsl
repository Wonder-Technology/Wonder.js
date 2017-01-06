@varDeclare
		varying vec4 v_reflectionMapCoord;
@end

@funcDefine
        //todo add more blend way to mix reflectionMap color and textureColor
		float blendOverlay(float base, float blend) {
			return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
		}
		vec4 getReflectionMapColor(in vec4 materialColor){
			vec4 color = texture2DProj(u_reflectionMapSampler, v_reflectionMapCoord);

			color = vec4(blendOverlay(materialColor.r, color.r), blendOverlay(materialColor.g, color.g), blendOverlay(materialColor.b, color.b), 1.0);

			return color;
		}
@end

@body
if(!isRenderListEmpty(u_isRenderListEmpty)){
    totalColor *= getReflectionMapColor(totalColor);
}
@end

