module wd {
    export abstract class RenderTargetRenderer{
        constructor(renderTargetTexture:RenderTargetTexture){
            this.texture = renderTargetTexture;
        }

        public texture:RenderTargetTexture = null;

        protected frameBufferOperator:FrameBuffer = null;

        private _isRenderListEmpty:boolean = false;

        public initWhenCreate(){
            this.frameBufferOperator = FrameBuffer.create(this.texture.width, this.texture.height);
        }

        public init(){
            this.texture.createEmptyTexture();
            this.initFrameBuffer();
        }

        public render(renderer:Renderer);
        public render(renderer:Renderer, camera:GameObject);

        public render(...args){
            var renderer:Renderer = args[0],
                renderList = this.getRenderList();

            this._isRenderListEmpty = this.isRenderListEmpty(renderList);

            this.beforeRender();

            if(args.length === 1){
                this.renderFrameBufferTexture(renderList, renderer);
            }
            else{
                let camera:GameObject = args[1];

                this.renderFrameBufferTexture(renderList, renderer, camera);
            }

            this.afterRender();
        }

        public dispose(){
            this.frameBufferOperator.dispose();
            this.disposeFrameBuffer();
            this.texture.dispose();
        }


        protected abstract initFrameBuffer();
        protected abstract renderFrameBufferTexture(renderList:any, renderer:Renderer, camera?:GameObject);
        protected abstract disposeFrameBuffer();
        protected abstract getRenderList():any;
        protected abstract isRenderListEmpty(renderList:any):boolean;

        @virtual
        protected beforeRender(){
        }

        @virtual
        protected afterRender(){
        }

        @ensure(function(isRenderListEmpty:boolean){
            if(isRenderListEmpty){
                assert(this.isRenderListEmpty(this.getRenderList()), Log.info.FUNC_SHOULD("renderList", "be empty"));
            }
        })
        protected isRenderListEmptyWhenRender(){
            return this._isRenderListEmpty;
        }
    }
}

