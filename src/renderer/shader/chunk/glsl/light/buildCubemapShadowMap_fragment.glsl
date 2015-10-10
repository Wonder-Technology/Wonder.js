@varDeclare
    varying vec3 v_worldPosition;
@end

@body

// get distance between fragment and light source
    float lightDistance = length(v_worldPosition - u_lightPos);

    // map to [0,1] range by dividing by farPlane
    lightDistance = lightDistance / u_farPlane;


gl_FragData[0] = packDepth(lightDistance);


//gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
//gl_FragData[0] = vec4(lightDistance, 1.0, 1.0, 1.0);
@end
