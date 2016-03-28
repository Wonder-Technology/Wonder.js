module wd {
    export class TwoDShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:DirectionLight, texture:TwoDShadowMapTexture) {
        //public static create(texture:TwoDShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:TwoDShadowMapTexture;

        protected light:DirectionLight;

        @require(function(target:GameObject){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            assert(material instanceof LightMaterial, Log.info.FUNC_MUST_BE("material", "LightMaterial when render shadowMap"));
        })
        public clearTwoDShadowMapData(target:GameObject){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;

            material.glslData.removeChild(<any>EShaderGLSLData.TWOD_SHADOWMAP);
            material.glslData.removeChild(<any>EShaderGLSLData.BUILD_TWOD_SHADOWMAP);
        }

        protected setMaterialShadowMapData(material:LightMaterial, target:GameObject, shadowMapCamera:GameObject){
            var cameraComponent:CameraController = shadowMapCamera.getComponent<CameraController>(CameraController);

            material.glslData.addChild(<any>EShaderGLSLData.BUILD_TWOD_SHADOWMAP, {
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix, true)
            });

            material.glslData.appendChild(<any>EShaderGLSLData.TWOD_SHADOWMAP, {
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                shadowSize: [this.light.shadowMapWidth, this.light.shadowMapHeight],
                lightPos: this.light.position,
                //todo optimize: compute vpMatrix once here or when render shadowRenderList
                vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix, true)
            });
        }





        //todo refactor
        //public setShadowMapData2(target:GameObject, shadowMapCamera:GameObject, light:DirectionLight){
        //    var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;
        //
        //
        //    //this.setMaterialShadowMapData(material, target, shadowMapCamera);
        //
        //
        //    var cameraComponent:CameraController = shadowMapCamera.getComponent<CameraController>(CameraController);
        //
        //    material.glslData.addChild(<any>EShaderGLSLData.BUILD_TWOD_SHADOWMAP, {
        //        vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix, true)
        //    });
        //
        //    material.glslData.appendChild(<any>EShaderGLSLData.TWOD_SHADOWMAP, {
        //        shadowBias: light.shadowBias,
        //        shadowDarkness: light.shadowDarkness,
        //        shadowSize: [light.shadowMapWidth, light.shadowMapHeight],
        //        lightPos: light.position,
        //        //todo optimize: compute vpMatrix once here or when render shadowRenderList
        //        vpMatrixFromLight: cameraComponent.worldToCameraMatrix.applyMatrix(cameraComponent.pMatrix, true)
        //    });
        //}


        //todo remove
        protected addShadowMap(material:LightMaterial, shadowMap:TwoDShadowMapTexture){
            //material.twoDShadowMap = shadowMap;
        }
    }
}

