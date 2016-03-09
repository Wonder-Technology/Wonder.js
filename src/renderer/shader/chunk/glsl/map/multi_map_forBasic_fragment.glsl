@varDeclare
varying vec2 v_mapCoord0;
varying vec2 v_mapCoord1;
@end

@funcDefine
		vec4 getMapColor(){
            vec4 color0 = vec4(texture2D(u_sampler2D0, v_mapCoord0).xyz, 1.0);
            vec4 color1 = vec4(texture2D(u_sampler2D1, v_mapCoord1).xyz, 1.0);

            if(u_combineMode == 0){
                return mix(color0, color1, u_mixRatio);
            }
            else if(u_combineMode == 1){
                return color0 * color1;
            }
            else if(u_combineMode == 2){
                return color0 + color1;
            }

            /*!
            solve error in window7 chrome/firefox:
            not all control paths return a value.
            failed to create d3d shaders
            */
            return vec4(1.0);
		}
@end

@body
    totalColor *= getMapColor();
@end

