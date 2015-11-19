@body
    vec3 a_normal = a_currentFrameNormal + (a_nextFrameNormal - a_currentFrameNormal) * u_interpolation;
@end
