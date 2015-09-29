/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CubemapRenderTargetRenderer extends RenderTargetRenderer{
        public static create(texture:DynamicCubemapTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:DynamicCubemapTexture;

        private _frameBuffers:dyCb.Collection<WebGLFramebuffer> = dyCb.Collection.create<WebGLFramebuffer>();
        private _renderBuffers:dyCb.Collection<WebGLRenderbuffer> = dyCb.Collection.create<WebGLRenderbuffer>();

        protected initFrameBuffer(){
            var frameBufferOperator = this.frameBuffer,
                gl = DeviceManager.getInstance().gl,
                i = null;

            for(i = 0; i < 6; i++){
                let frameBuffer = frameBufferOperator.createFrameBuffer(),
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
            var i = null;

            for(i = 0; i < 6; i++){
                this.frameBuffer.bindFrameBuffer(this._frameBuffers.getChild(i));
                this.frameBuffer.setViewport();


                //todo if renderList is null, draw all
                //todo optimize:if renderObject is behind plane, not render it!
                this.texture.renderList.getChild(this._convertIndexToFaceKey(i)).forEach((child:GameObject) => child.render(renderer, this._createCamera(i), true));
                renderer.render();
            }

            this.frameBuffer.unBind();
            this.frameBuffer.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            this._frameBuffers.forEach((buffer:WebGLFramebuffer) => gl.deleteFramebuffer(buffer));
            this._renderBuffers.forEach((buffer:WebGLRenderbuffer) => gl.deleteRenderbuffer(buffer));
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


        private _createCamera(index:number){
            var cubeCameraComponent = Camera.create(),
                camera = GameObject.create(),
                pos = this.texture.getPosition();

            cubeCameraComponent.fovy = 90;
            cubeCameraComponent.aspect = 1;
            cubeCameraComponent.near = this.texture.near;
            cubeCameraComponent.far = this.texture.far;


            camera.addComponent(cubeCameraComponent);

            camera.transform.translate(pos);

            this._lookAtFace(camera, pos, index);

            camera.init();

            return camera;
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
    }
}

