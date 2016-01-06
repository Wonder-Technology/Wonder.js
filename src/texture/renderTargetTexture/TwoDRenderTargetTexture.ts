module wd {
    export abstract class TwoDRenderTargetTexture extends RenderTargetTexture {
        private _renderList:wdCb.Collection<GameObject> = null;
        get renderList(){
            return this._renderList;
        }
        set renderList(renderList:any) {
            if (JudgeUtils.isArray(renderList)) {
                this._renderList = wdCb.Collection.create<GameObject>(renderList);
            }
            else if (renderList instanceof wdCb.Collection) {
                this._renderList = renderList;
            }
            else {
                Log.error(true, Log.info.FUNC_MUST_BE("renderList", "array or wdCb.Collection"));
            }
        }

        public width:number = 256;
        public height:number = 256;


        public createEmptyTexture(){
            var gl = DeviceManager.getInstance().gl,
                texture = gl.createTexture();

            this.setEmptyTexture(texture);

            gl.texImage2D(gl[this.target], 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            this.glTexture = texture;
        }
    }
}

