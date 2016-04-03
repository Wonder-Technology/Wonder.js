module wd {
    export abstract class CubemapRenderTargetRenderer extends RenderTargetRenderer{
        protected texture:CubemapRenderTargetTexture;

        private _frameBufferList:wdCb.Collection<WebGLFramebuffer> = wdCb.Collection.create<WebGLFramebuffer>();
        private _renderBufferList:wdCb.Collection<WebGLRenderbuffer> = wdCb.Collection.create<WebGLRenderbuffer>();
        private _lastCameraList: wdCb.Collection<GameObject> = null;
        private _lastPosition:Vector3 = null;

        protected abstract getRenderList():wdCb.Hash<any>;
        protected abstract setCamera(cubeCameraComponent:PerspectiveCamera);
        protected abstract getPosition():Vector3;

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

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var renderCamera = null,
                faceRenderList = null,
                newCameraList = null,
                position = this.getPosition(),
                renderList = null;

            renderList = this.getRenderList();
            //todo remove
            this.texture.bindToUnit(0);

            if(this._needCreateCamera(position)){
                newCameraList = wdCb.Collection.create<GameObject>();
            }

            for(let i = 0; i < 6; i++){
                faceRenderList = renderList.getChild(this._convertIndexToFaceKey(i));
                //faceRenderList can be array or collection
                if(this._isEmpty(faceRenderList)) {
                    continue;
                }

                if(this._needCreateCamera(position)) {
                    renderCamera = this.createCamera(i);
                    newCameraList.addChild(renderCamera);
                }
                else{
                    renderCamera = this._lastCameraList.getChild(i);
                }

                this.frameBufferOperator.bindFrameBuffer(this._frameBufferList.getChild(i));
                this.frameBufferOperator.setViewport();

                faceRenderList.forEach((child:GameObject) => {
                    child.render(renderer, renderCamera)
                });

                renderer.clear();
                renderer.effect = BasicEffect.create();
                renderer.render();
            }

            if(this._needCreateCamera(position)){
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

        private _isEmpty(faceRenderList){
            return !faceRenderList || (faceRenderList.length && faceRenderList.length === 0) || (faceRenderList.getCount && faceRenderList.getCount() === 0);
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

        private _needCreateCamera(position:Vector3){
            if(this._lastPosition === null || this._lastCameraList === null){
                return true;
            }

            return !position.isEqual(this._lastPosition);
        }
    }
}

