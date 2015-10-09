/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapRenderTargetRenderer extends RenderTargetRenderer{
        public static create(light:PointLight) {
            var obj = new this(light);

            obj.initWhenCreate();

            return obj;
        }

        constructor(light:PointLight){
            super(light.shadowMap);

            this.light = light;
        }

        //todo private?
        public light:PointLight = null;

        protected texture:CubemapShadowMapTexture;

        private _frameBuffers:dyCb.Collection<WebGLFramebuffer> = dyCb.Collection.create<WebGLFramebuffer>();
        private _renderBuffers:dyCb.Collection<WebGLRenderbuffer> = dyCb.Collection.create<WebGLRenderbuffer>();

        //todo dry
        public initWhenCreate(){
            var self = this;

            this.texture.width = this.light.shadowMapWidth;
            this.texture.height = this.light.shadowMapHeight;


            this.light.shadowRenderList.forEach((childList:Array<GameObject>|dyCb.Collection<GameObject>) => {
                childList.forEach((child:GameObject) => {
                    //todo support multi shadowMap
                    self._setCubemapShadowMap(child, self.texture);
                })
            });

            super.initWhenCreate();
        }

        public init(){
            this.texture.init();

            Director.getInstance().stage.createShaderOnlyOnce(BuildCubemapShadowMapShaderLib.getInstance());

            super.init();
        }





        //todo can one frameBuffer bind six faces of cubemap?
        protected initFrameBuffer(){
            var frameBufferOperator = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl,
                i = null;

            for(i = 0; i < 6; i++){
                let frameBuffer = frameBufferOperator.createFrameBuffer(),
                    //todo use one renderBuffer?
                    renderBuffer = frameBufferOperator.createRenderBuffer();

                this._frameBuffers.addChild(frameBuffer);
                this._renderBuffers.addChild(renderBuffer);

                frameBufferOperator.bindFrameBuffer(frameBuffer);
                frameBufferOperator.attachTexture(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.frameBufferTexture);
                frameBufferOperator.attachRenderBuffer("DEPTH_ATTACHMENT", renderBuffer);
                frameBufferOperator.check();
            }

            frameBufferOperator.unBind();
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var i = null,
                stage:Stage = Director.getInstance().stage,
                renderCamera = null,
                faceRenderList = null,
                self = this;

            //todo dry
            if(!stage.shadowMap.enable){
                return;
            }

            stage.useProgram();

            for(i = 0; i < 6; i++){
                faceRenderList = this.light.shadowRenderList.getChild(this._convertIndexToFaceKey(i));
                //faceRenderList can be array or collection
                if(!faceRenderList || (faceRenderList.length && faceRenderList.length === 0) || (faceRenderList.getCount && faceRenderList.getCount() === 0)){
                    continue;
                }

                //todo optimize:create six camera once
                renderCamera = self.createCamera(i);

                this.frameBufferOperator.bindFrameBuffer(this._frameBuffers.getChild(i));
                this.frameBufferOperator.setViewport();



                //todo if renderList is null, draw all
                //this.texture.renderList.getChild(this._convertIndexToFaceKey(i)).forEach((child:GameObject) => child.render(renderer, self.createCamera(i)));
                faceRenderList.forEach((child:GameObject) =>{
                    //todo dry
                    self._setCubemapShadowData(child, renderCamera);
                    child.render(renderer, renderCamera)
                });

                //todo render once?
                renderer.render();
            }

            stage.unUseProgram();

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            this._frameBuffers.forEach((buffer:WebGLFramebuffer) => gl.deleteFramebuffer(buffer));
            this._renderBuffers.forEach((buffer:WebGLRenderbuffer) => gl.deleteRenderbuffer(buffer));
        }

        protected createCamera(index:number){
            var cubeCameraComponent = PerspectiveCamera.create(),
                camera = GameObject.create(),
                light:PointLight = this.light,
                pos = light.position;

            cubeCameraComponent.fovy = 90;

            //cubeCameraComponent.aspect = 1;
            cubeCameraComponent.aspect = light.shadowMapWidth / light.shadowMapHeight;
            cubeCameraComponent.near = light.shadowCameraNear;
            cubeCameraComponent.far = light.shadowCameraFar;



            camera.addComponent(cubeCameraComponent);

            camera.transform.translate(pos);

            this._lookAtFace(camera, pos, index);

            camera.init();

            return camera;
        }

        private _convertIndexToFaceKey(index:number){
            var face = null;

            switch (index){
                case 0:
                    face = "px";
                    break;
                case 1:
                    face = "nx";
                    break;
                case 2:
                    face = "py";
                    break;
                case 3:
                    face = "ny";
                    break;
                case 4:
                    face = "pz";
                    break;
                case 5:
                    face = "nz";
                    break;
                default :
                    break;
            }

            return face;
        }

        private _lookAtFace(camera:GameObject, position:Vector3, index:number){
            switch (index){
                case 0:
                    camera.transform.lookAt(position.x + 1, position.y, position.z, 0, -1, 0);
                    break;
                case 1:
                    camera.transform.lookAt(position.x-1, position.y, position.z, 0, -1, 0);
                    break;
                case 2:
                    camera.transform.lookAt(position.x, position.y + 1, position.z, 0, 0, 1);
                    break;
                case 3:
                    camera.transform.lookAt(position.x, position.y-1, position.z, 0, 0, -1);
                    break;
                case 4:
                    camera.transform.lookAt(position.x, position.y, position.z + 1, 0, -1, 0);
                    break;
                case 5:
                    camera.transform.lookAt(position.x, position.y, position.z-1, 0, -1, 0);
                    break;
                default:
                    break;
            }
        }

        private _setCubemapShadowMap(target:GameObject, shadowMap:CubemapShadowMapTexture){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material;


            //todo refactor?
            if(material.cubemapShadowMap){
                return;
            }

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            material.cubemapShadowMap = shadowMap;
        }

        private _setCubemapShadowData(target:GameObject, shadowMapCamera:GameObject){
            var material:LightMaterial = <LightMaterial>target.getComponent<Geometry>(Geometry).material,
                //cameraComponent = shadowMapCamera.getComponent<OrthographicCamera>(OrthographicCamera);
            cameraComponent = shadowMapCamera.getComponent<PerspectiveCamera>(PerspectiveCamera);

            dyCb.Log.error(!(material instanceof LightMaterial), dyCb.Log.info.FUNC_MUST_BE("material", "LightMaterial when set shadowMap"));

            //todo refactor
            material.shadowMapData = {
                shadowBias: this.light.shadowBias,
                shadowDarkness: this.light.shadowDarkness,
                shadowMapSize: [this.light.shadowMapWidth, this.light.shadowMapHeight],
                //vpMatrixFromLight: null,

                lightPos: this.light.position,
                farPlane: cameraComponent.far
            };
        }
    }
}
