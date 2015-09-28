/// <reference path="../definitions.d.ts"/>
module dy {
    export class CubemapRenderTargetRenderer extends RenderTargetRenderer{
        public static create(texture:DynamicCubemapTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:DynamicCubemapTexture;

        private _frameBuffers:dyCb.Collection<WebGLFramebuffer> = dyCb.Collection.create<WebGLFramebuffer>();
        private _frameBufferTexture:WebGLTexture = null;

        protected attachTexture(){
            this.texture.setTexture(this._frameBufferTexture);
        }

        protected initFrameBuffer(){
            var frameBuffer = this.frameBuffer,
                gl = DeviceManager.getInstance().gl,
                i = null,
                depthBuffer = frameBuffer.createRenderBuffer();

            this._frameBufferTexture = this.texture.createEmptyTexture();

            for(i = 0; i < 6; i++){
                let buffer = frameBuffer.createFrameBuffer();

                this._frameBuffers.addChild(buffer);

                frameBuffer.bindFrameBuffer(buffer);
                frameBuffer.attachTexture(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this._frameBufferTexture);
                frameBuffer.attachRenderBuffer("DEPTH_ATTACHMENT", depthBuffer);
                frameBuffer.unBind();
            }

            frameBuffer.check();
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var i = null;

            for(i = 0; i < 6; i++){
                this.frameBuffer.bindFrameBuffer(this._frameBuffers.getChild(i));
                this.frameBuffer.setViewport();


                //todo if renderList is null, draw all
                //todo optimize:if renderObject is behind plane, not render it!
                this.texture.renderList.forEach((list:Array<GameObject>, face:string) => {
                    list.forEach((child:GameObject) => child.render(renderer, this._createCamera(i), true));
                });
                renderer.render();
            }

            this.frameBuffer.unBind();
            this.frameBuffer.restoreViewport();
        }

        private _createCamera(index:number){
            var cubeCameraComponent = Camera.create(),
                camera = GameObject.create();

            cubeCameraComponent.fovy = 90;
            cubeCameraComponent.aspect = 1;
            cubeCameraComponent.near = this.texture.near;
            cubeCameraComponent.far = this.texture.far;

            camera.transform.translate(this.texture.getPosition());

            //todo any problem?
            switch (index){
                case 0:
                    camera.transform.lookAt(1, 0, 0, 0, -1, 0);
                    break;
                case 1:
                    camera.transform.lookAt(-1, 0, 0, 0, -1, 0);
                    break;
                case 2:
                    camera.transform.lookAt(0, 1, 0, 0, 0, 1);
                    break;
                case 3:
                    camera.transform.lookAt(0, -1, 0, 0, 0, 1);
                    break;
                case 4:
                    camera.transform.lookAt(0, 0, 1, 0, -1, 0);
                    break;
                case 5:
                    camera.transform.lookAt(0, 0, -1, 0, -1, 0);
                    break;
                default:
                    break;
            }

            return camera.addComponent(cubeCameraComponent);
        }
    }
}

