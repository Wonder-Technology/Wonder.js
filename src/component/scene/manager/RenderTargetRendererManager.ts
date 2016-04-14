module wd{
    export class RenderTargetRendererManager extends SceneComponent{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _commonRenderTargetRendererList:wdCb.Collection<CommonRenderTargetRenderer> = wdCb.Collection.create<CommonRenderTargetRenderer>();
        private _proceduralRendererList:wdCb.Collection<ProceduralRenderTargetRenderer> = wdCb.Collection.create<ProceduralRenderTargetRenderer>();

        public afterInit(){
            this._commonRenderTargetRendererList.forEach((renderTargetRenderer:RenderTargetRenderer) => renderTargetRenderer.init());
            this._proceduralRendererList.forEach((renderTargetRenderer:ProceduralRenderTargetRenderer) => renderTargetRenderer.init());
        }

        public dispose(){
            this._commonRenderTargetRendererList.forEach((renderTargetRenderer:RenderTargetRenderer) => renderTargetRenderer.dispose());
            this._proceduralRendererList.forEach((renderTargetRenderer:ProceduralRenderTargetRenderer) => renderTargetRenderer.dispose());
        }

        public addCommonRenderTargetRenderer(renderTargetRenderer:CommonRenderTargetRenderer){
            this._commonRenderTargetRendererList.addChild(renderTargetRenderer);
        }

        public getCommonRenderTargetRendererList(){
            return this._commonRenderTargetRendererList;
        }

        public removeCommonRenderTargetRenderer(func:(renderTargetRenderer:CommonRenderTargetRenderer) => boolean){
            return this._commonRenderTargetRendererList.removeChild(func);
        }

        public addProceduralRenderTargetRenderer(renderTargetRenderer:ProceduralRenderTargetRenderer){
            this._proceduralRendererList.addChild(renderTargetRenderer);
        }

        public renderCommonRenderTargetRenderer(renderer:Renderer, camera:GameObject) {
            this._commonRenderTargetRendererList.forEach((target:RenderTargetRenderer) =>{
                target.render(renderer, camera);
            });

            this._proceduralRendererList.filter((target:ProceduralRenderTargetRenderer) =>{
                    return target.needRender();
                })
                .forEach((target:ProceduralRenderTargetRenderer) =>{
                    target.render(renderer);
                });
        }
    }
}
