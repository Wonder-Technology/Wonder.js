module wd {
    export class DynamicCubemapTexture extends CubemapRenderTargetTexture {
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _renderList:wdCb.Hash<[string, wdCb.Collection<GameObject>]> = null;
        get renderList() {
            return this._renderList;
        }

        set renderList(renderList:any) {
            var convertedRenderList = wdCb.Hash.create<[string, wdCb.Collection<GameObject>]>();

            if (renderList instanceof wdCb.Hash) {
            }
            else if (JudgeUtils.isDirectObject(renderList)) {
                renderList = wdCb.Hash.create<[string, Array<GameObject>]>(renderList);
            }
            else {
                Log.error(true, Log.info.FUNC_MUST_BE("renderList", "array or wdCb.Collection"));
            }

            renderList.forEach((faceRenderList, face:string) => {
                if (JudgeUtils.isArrayExactly(faceRenderList)) {
                    convertedRenderList.addChild(face, wdCb.Collection.create<GameObject>(faceRenderList));
                }
                else if (JudgeUtils.isCollection(faceRenderList)) {
                    convertedRenderList.addChild(face, faceRenderList);
                }
                else {
                    Log.error(true, Log.info.FUNC_MUST_BE("faceRenderList", "array or wdCb.Collection"));
                }
            });

            this._renderList = convertedRenderList;
        }

        public size:number = 256;
        public near:number = 0.1;
        public far:number = 100;
        public mode:EEnvMapMode = null;

        public init() {
            super.init();

            this.width = this.size;
            this.height = this.size;

            Director.getInstance().scene.addCommonRenderTargetRenderer(DynamicCubemapRenderTargetRenderer.create(this));

            return this;
        }

        public getSamplerName(unit:number){
            return this.getSamplerNameByVariableData(unit, EVariableType.SAMPLER_CUBE);
        }
    }
}

