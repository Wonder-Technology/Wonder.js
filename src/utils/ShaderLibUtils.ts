module wd{
    export class ShaderLibUtils{
        public static addVerticeShaderLib(geometry:Geometry, shader:Shader){
            if(GlobalGeometryUtils.hasMorphAnimation(geometry)){
                shader.addLib(ClassUtils.getClass("CommonMorphShaderLib").create());
                shader.addLib(ClassUtils.getClass("VerticeMorphShaderLib").create());
            }
            else if(GlobalGeometryUtils.hasSkinSkeletonAnimation(geometry)){
                shader.addLib(VerticeCommonShaderLib.create());
                shader.addLib(ClassUtils.getClass("VerticeSkinSkeletonShaderLib").create());
            }
            else{
                shader.addLib(VerticeCommonShaderLib.create());
            }
        }
    }
}
