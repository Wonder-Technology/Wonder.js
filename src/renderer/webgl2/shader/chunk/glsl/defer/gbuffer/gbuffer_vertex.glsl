@body
//todo use u_vpMatrix
    gl_Position = cameraUbo.pMatrix * cameraUbo.vMatrix * vec4(v_worldPosition, 1.0);
//    gl_Position = u_vpMatrix * vec4(v_worldPosition, 1.0);
@end
