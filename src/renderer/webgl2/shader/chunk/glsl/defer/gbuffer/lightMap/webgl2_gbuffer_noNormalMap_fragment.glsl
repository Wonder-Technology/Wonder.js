@varDeclare
in vec3 v_normal;
@end

@funcDeclare
vec3 getNormal();

@end

@funcDefine
vec3 getNormal(){
    return v_normal;
}

@end
