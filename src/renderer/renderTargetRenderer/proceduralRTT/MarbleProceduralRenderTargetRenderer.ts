module wd {
    export class MarbleProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:MarbleProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:MarbleProceduralTexture;


        //protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
        //}

        //protected getRenderList():wdCb.Collection<GameObject>{
        //    return wdCb.Collection.create([this.texture.entityObject]);
        //}

        //protected renderRenderer(renderer){
        //    //this._setSceneSide(ESide.BACK);
        //    renderer.render();
        //    //this._setSceneSide(null);
        //}
    }
}

