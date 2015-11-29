/// <reference path="../../filePath.d.ts"/>
module dy {
    export abstract class RenderTargetRenderer{
        constructor(renderTargetTexture:RenderTargetTexture){
            this.texture = renderTargetTexture;
        }

        protected texture:RenderTargetTexture = null;
        protected frameBufferOperator:FrameBuffer = null;

        public initWhenCreate(){
            this.frameBufferOperator = FrameBuffer.create(this.texture.width, this.texture.height);
        }

        public init(){
            //this.frameBufferTexture = this.texture.createEmptyTexture();
            this.texture.createEmptyTexture();

            //this.texture.setTexture(this.frameBufferTexture);
            this.initFrameBuffer();
        }

        public render(renderer:Renderer, camera:GameObject){
            this.beforeRender();
            this.renderFrameBufferTexture(renderer, camera);
            this.afterRender();
        }

        public dispose(){
            this.frameBufferOperator.dispose();
            this.disposeFrameBuffer();
            this.texture.dispose();
        }


        protected abstract initFrameBuffer();
        protected abstract renderFrameBufferTexture(renderer:Renderer, camera:GameObject);
        protected abstract disposeFrameBuffer();
        protected abstract createCamera(...args):GameObject;

        protected  beforeRender(){
        }

        protected  afterRender(){
        }
    }
}

