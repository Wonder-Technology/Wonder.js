module wd {
    export abstract class TwoDRenderTargetTexture extends RenderTargetTexture {
        private _renderList:wdCb.Collection<GameObject> = null;
        @requireSetter(function(renderList:any){
            assert(JudgeUtils.isArrayExactly(renderList) || JudgeUtils.isCollection(renderList), Log.info.FUNC_MUST_BE("renderList", "array or collection"))
        })
        @cloneAttributeAsCloneable()
        get renderList(){
            return this._renderList;
        }
        set renderList(renderList:any) {
            if (JudgeUtils.isArrayExactly(renderList)) {
                this._renderList = wdCb.Collection.create<GameObject>(renderList);
            }
            else{
                this._renderList = renderList;
            }
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.width = 256;
            this.height = 256;
        }

        public createEmptyTexture(){
            var gl = DeviceManager.getInstance().gl,
                texture = gl.createTexture();

            this.setEmptyTexture(texture);

            this.texImageEmpty();

            this.glTexture = texture;
        }

        @virtual
        protected texImageEmpty(){
            var gl = DeviceManager.getInstance().gl;

            gl.texImage2D(gl[this.target], 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
    }
}

