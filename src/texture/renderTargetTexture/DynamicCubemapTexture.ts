module wd {
    export class DynamicCubemapTexture extends CubemapRenderTargetTexture {
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _renderList:wdCb.Hash<wdCb.Collection<GameObject>> = null;
        @cloneAttributeAsCustomType(function(source:DynamicCubemapTexture, target:DynamicCubemapTexture, memberName:string){
            var result = null;

            if(source[memberName] === null){
                return;
            }

            result = wdCb.Hash.create<wdCb.Collection<GameObject>>();

            source[memberName].forEach((list:wdCb.Collection<GameObject>, key:string) => {
                result.addChild(key, list.clone());
            });

            target[memberName] = result;
        })
        get renderList() {
            return this._renderList;
        }

        set renderList(renderList:any) {
            var convertedRenderList = wdCb.Hash.create<wdCb.Collection<GameObject>>();

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

        @cloneAttributeAsBasicType()
        public size:number = 256;
        @cloneAttributeAsBasicType()
        public near:number = 0.1;
        @cloneAttributeAsBasicType()
        public far:number = 100;
        @cloneAttributeAsBasicType()
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

