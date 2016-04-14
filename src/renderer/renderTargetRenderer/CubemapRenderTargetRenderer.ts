module wd {
    export abstract class CubemapRenderTargetRenderer extends CommonRenderTargetRenderer{
        public texture:CubemapRenderTargetTexture;

        private _frameBufferList:wdCb.Collection<WebGLFramebuffer> = wdCb.Collection.create<WebGLFramebuffer>();
        private _renderBufferList:wdCb.Collection<WebGLRenderbuffer> = wdCb.Collection.create<WebGLRenderbuffer>();
        private _lastCameraList: wdCb.Collection<GameObject> = null;
        private _lastPosition:Vector3 = null;

        protected abstract setCamera(cubeCameraComponent:PerspectiveCamera);
        protected abstract getPosition():Vector3;

        @virtual
        protected renderRenderer(renderer:Renderer){
            renderer.webglState = BasicState.create();
            renderer.render();
        }

        @virtual
        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
        }

        //todo can one frameBuffer bind six faces of cubemap?
        protected initFrameBuffer(){
            var frameBufferOperator = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            for(let i = 0; i < 6; i++){
                let frameBuffer = frameBufferOperator.createFrameBuffer(),
                    renderBuffer = frameBufferOperator.createRenderBuffer();

                this._frameBufferList.addChild(frameBuffer);
                this._renderBufferList.addChild(renderBuffer);

                frameBufferOperator.bindFrameBuffer(frameBuffer);
                frameBufferOperator.attachTexture(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.texture.glTexture);
                frameBufferOperator.attachRenderBuffer("DEPTH_ATTACHMENT", renderBuffer);
                frameBufferOperator.check();
            }

            frameBufferOperator.unBind();
        }

        @require(function(renderList:wdCb.Hash<any>, renderer:Renderer, camera:GameObject){
            assert(!!camera, Log.info.FUNC_SHOULD("pass param->camera"));
        })
        protected renderFrameBufferTexture(renderList:wdCb.Hash<any>, renderer:Renderer, camera:GameObject){
            var renderCamera = null,
                faceRenderList = null,
                newCameraList = null,
                position = null,
                isNeedCreateCamera = null;

            if(this.isRenderListEmptyWhenRender()){
                return;
            }

            this.texture.bindToUnit(0);

            position = this.getPosition();
            isNeedCreateCamera = this._isNeedCreateCamera(position);

            if(isNeedCreateCamera){
                newCameraList = wdCb.Collection.create<GameObject>();
            }

            for(let i = 0; i < 6; i++){
                faceRenderList = renderList.getChild(this._convertIndexToFaceKey(i));
                if(this._isEmpty(faceRenderList)) {
                    continue;
                }

                //if(this._isNeedCreateCamera(position)) {
                if(isNeedCreateCamera){
                    renderCamera = this.createCamera(i);
                    newCameraList.addChild(renderCamera);
                }
                else{
                    renderCamera = this._lastCameraList.getChild(i);
                }

                this.beforeRenderFrameBufferTexture(renderCamera);

                this.frameBufferOperator.bindFrameBuffer(this._frameBufferList.getChild(i));
                this.frameBufferOperator.setViewport();

                faceRenderList.forEach((child:GameObject) => {
                    child.render(renderer, renderCamera)
                });

                renderer.clear();
                this.renderRenderer(renderer);
            }

            if(isNeedCreateCamera){
                if(this._lastCameraList){
                    this._lastCameraList.forEach((camera:GameObject) => {
                        camera.dispose();
                    })
                }

                this._lastCameraList = newCameraList;
                this._lastPosition = position;
            }

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            this._frameBufferList.forEach((buffer:WebGLFramebuffer) => gl.deleteFramebuffer(buffer));
            this._renderBufferList.forEach((buffer:WebGLRenderbuffer) => gl.deleteRenderbuffer(buffer));
        }

        protected createCamera(index:number){
            var cubeCameraComponent = PerspectiveCamera.create(),
                camera = GameObject.create(),
                pos = this.getPosition();

            cubeCameraComponent.fovy = 90;
            this.setCamera(cubeCameraComponent);

            camera.addComponent(BasicCameraController.create(cubeCameraComponent));

            camera.transform.translate(pos);

            this._lookAtFace(camera, pos, index);

            camera.init();

            return camera;
        }

        protected isRenderListEmpty(renderList:wdCb.Hash<any>){
            var isEmpty = true;

            renderList.forEach((faceRenderList) => {
                if(!this._isEmpty(faceRenderList)){
                    isEmpty = false;
                    return wdCb.$BREAK;
                }
            }, this);

            return isEmpty;
        }

        private _isEmpty(faceRenderList){
            if(faceRenderList === void 0 || null){
                return true;
            }

            return faceRenderList.getCount() === 0;
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

        private _isNeedCreateCamera(position:Vector3){
            if(this._lastPosition === null || this._lastCameraList === null || this._lastCameraList.getCount() === 0){
                return true;
            }

            return !position.isEqual(this._lastPosition);
        }
    }
}

