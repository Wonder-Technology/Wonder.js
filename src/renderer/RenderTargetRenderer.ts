/// <reference path="../definitions.d.ts"/>
module dy {
    export abstract class RenderTargetRenderer{
        constructor(renderTargetTexture:RenderTargetTexture){
            this.texture = renderTargetTexture;
        }

        protected texture:RenderTargetTexture = null;
        protected frameBuffer:FrameBuffer = null;

        public initWhenCreate(){
            if(this._isTextureSizeExceedCanvasSize()){
                dyCb.Log.warn("frameBuffer->viewport's size shouldn't exceed canvas's size");
            }

            this.frameBuffer = FrameBuffer.create(this.texture.width, this.texture.height);
        }

        public init(){
            this.initFrameBuffer();
        }

        public render(renderer:Renderer, camera:GameObject){
            var plane = null,
                cameraComponent = null,
                mirrorCameraViewMatrix = null,
                projectionMatrix = null;

            this.attachTexture();


            this.renderFrameBufferTexture(renderer, camera);
        }

        public dispose(){
            this.frameBuffer.dispose();
            this.texture.dispose();
        }


        protected abstract attachTexture();
        protected abstract initFrameBuffer();
        protected abstract renderFrameBufferTexture(renderer:Renderer, camera:GameObject);

        private _isTextureSizeExceedCanvasSize(){
            var view = DeviceManager.getInstance().view;

            return this.texture.width > view.width || this.texture.height > view.height;
        }
    }
}

