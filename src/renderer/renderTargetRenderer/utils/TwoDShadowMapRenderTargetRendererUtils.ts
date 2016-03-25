module wd {
    export class TwoDShadowMapRenderTargetRendererUtils extends ShadowMapRenderTargetRendererUtils{
        public static create(light:DirectionLight, texture:TwoDShadowMapTexture) {
            var obj = new this(light, texture);

            obj.initWhenCreate();

            return obj;
        }

        public texture:TwoDShadowMapTexture;

        protected light:DirectionLight;

        public initWhenCreate(){
            var self = this;

            super.initWhenCreate();

            //todo refactor
            //todo if renderList is null, draw all
            this.light.shadowRenderList.forEach((child:GameObject) => {
                self.setShadowMap(child, self.texture);
            });
        }

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

        protected addShadowMap(material:LightMaterial, shadowMap:TwoDShadowMapTexture){
            material.addTwoDShadowMap(shadowMap);
        }
    }
}

