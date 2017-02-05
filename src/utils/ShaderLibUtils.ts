module wd{
    export class ShaderLibUtils{
        public static addVerticeShaderLib(geometry:Geometry, shader:Shader){
            // if(GlobalGeometryUtils.hasMorphData(geometry)){
            //     let CommonMorphShaderLib = ClassUtils.getClass("CommonMorphShaderLib"),
            //         VerticeMorphShaderLib = ClassUtils.getClass("VerticeMorphShaderLib");
            //
            //     shader.addLib(CommonMorphShaderLib.create());
            //     shader.addLib(VerticeMorphShaderLib.create());
            // }
            // else if(GlobalGeometryUtils.hasSkinSkeletonData(geometry)){
            //     let VerticeSkinSkeletonShaderLib = ClassUtils.getClass("VerticeSkinSkeletonShaderLib");
            //
            //     shader.addLib(VerticeCommonShaderLib.create());
            //     shader.addLib(VerticeSkinSkeletonShaderLib.create());
            // }
            // else{
                shader.addLib(VerticeCommonShaderLib.create());
            // }
        }
    }
}
