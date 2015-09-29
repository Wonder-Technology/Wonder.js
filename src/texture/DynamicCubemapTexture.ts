/// <reference path="../definitions.d.ts"/>
module dy {
    export class DynamicCubemapTexture extends RenderTargetTexture {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _renderList:dyCb.Hash<[string, Array<GameObject>]> = null;
        get renderList() {
            return this._renderList;
        }

        set renderList(renderList:any) {
            if (JudgeUtils.isDirectObject(renderList)) {
                this._renderList = dyCb.Hash.create<[string, Array<GameObject>]>(renderList);
            }
            else if (renderList instanceof dyCb.Hash) {
                this._renderList = renderList;
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST_BE("renderList", "array or dyCb.Collection"));
            }
        }

        public size:number = 256;
        public near:number = 0.1;
        public far:number = 100;
        public mode:EnvMapMode = null;

        public target:TextureTarget = TextureTarget.TEXTURE_CUBE_MAP;

        public init() {
            super.init();

            this.width = this.size;
            this.height = this.size;

            Director.getInstance().stage.addRenderTargetRenderer(CubemapRenderTargetRenderer.create(this));

            return this;
        }

        public sendData(program:Program, index:number) {
            this.sendSamplerVariable(VariableType.SAMPLER_CUBE, program, index);

            program.sendUniformData("u_repeatRegion", VariableType.FLOAT_4, this.repeatRegion);

            return this;
        }

        public createEmptyTexture() {
            var gl = DeviceManager.getInstance().gl,
                texture = gl.createTexture(),
                i = null;

            this.setEmptyTexture(texture);

            for (i = 0; i < 6; i++) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }

            return texture;
        }
    }
}

