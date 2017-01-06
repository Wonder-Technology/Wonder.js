module wd {
    export abstract class Material {
        get program(){
            return this.shader.program;
        }

        private _blendType:EBlendType = null;
        @cloneAttributeAsBasicType({
            order:1
        })
        get blendType(){
            return this._blendType;
        }
        set blendType(blendType:EBlendType){
            if(blendType === null){
                return;
            }

            switch (blendType) {
                case EBlendType.NONE:
                    this.blend = false;
                    this.blendSrc = EBlendFunc.ONE;
                    this.blendDst = EBlendFunc.ZERO;
                    this.blendEquation = EBlendEquation.ADD;
                    break;
                case EBlendType.NORMAL:
                    this.blend = true;
                    this.blendSrc = EBlendFunc.SRC_ALPHA;
                    this.blendDst = EBlendFunc.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = EBlendEquation.ADD;
                    break;
                case EBlendType.PREMULTIPLIED:
                    this.blend = true;
                    this.blendSrc = EBlendFunc.ONE;
                    this.blendDst = EBlendFunc.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = EBlendEquation.ADD;
                    break;
                case EBlendType.ADDITIVE:
                    this.blend = true;
                    this.blendSrc = EBlendFunc.ONE;
                    this.blendDst = EBlendFunc.ONE;
                    this.blendEquation = EBlendEquation.ADD;
                    break;
                case EBlendType.ADDITIVEALPHA:
                    this.blend = true;
                    this.blendSrc = EBlendFunc.SRC_ALPHA;
                    this.blendDst = EBlendFunc.ONE;
                    this.blendEquation = EBlendEquation.ADD;
                    break;
                case EBlendType.MULTIPLICATIVE:
                    this.blend = true;
                    this.blendSrc = EBlendFunc.DST_COLOR;
                    this.blendDst = EBlendFunc.ZERO;
                    this.blendEquation = EBlendEquation.ADD;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("blendType"));
                    break;
            }

            this._blendType = blendType;
        }

        @cloneAttributeAsCloneable()
        get envMap(){
            return this.mapManager.getEnvMap();
        }
        set envMap(envMap:CubemapTexture){
            this.mapManager.setEnvMap(envMap);
        }

        private _blendSrc:EBlendFunc= EBlendFunc.ONE;
        @cloneAttributeAsBasicType()
        get blendSrc(){
            return this._blendSrc;
        }
        set blendSrc(blendSrc:EBlendFunc){
            if(this._blendSrc === blendSrc){
                return;
            }

            this._blendSrc = blendSrc;
            this.blendFuncSeparate = null;
        }

        private _blendDst:EBlendFunc= EBlendFunc.ZERO;
        @cloneAttributeAsBasicType()
        get blendDst(){
            return this._blendDst;
        }
        set blendDst(blendDst:EBlendFunc){
            if(this._blendDst === blendDst){
                return;
            }

            this._blendDst = blendDst;
            this.blendFuncSeparate = null;
        }

        private _blendEquation:EBlendEquation = EBlendEquation.ADD;
        @cloneAttributeAsBasicType()
        get blendEquation(){
            return this._blendEquation;
        }
        set blendEquation(blendEquation:EBlendEquation){
            if(this._blendEquation === blendEquation){
                return;
            }

            this._blendEquation = blendEquation;
            this.blendEquationSeparate = null;
        }

        private _alphaToCoverage:boolean = false;
        @cloneAttributeAsBasicType()
        @ensureGetter(function(alphaToCoverage:boolean){
            it("if enable alphaToCoverage, multiSample should be enabled", () => {
                if(alphaToCoverage){
                    expect(DeviceManager.getInstance().contextConfig.options.antialias).true;
                }
            });
        })
        get alphaToCoverage(){
            return this._alphaToCoverage;
        }
        set alphaToCoverage(alphaToCoverage:boolean){
            this._alphaToCoverage = alphaToCoverage;
        }

        private _color:Color = Color.create("#ffffff");
        @cloneAttributeAsCloneable()
        get color(){
            return this._color;
        }
        set color(color:Color){
            if(this._color.isEqual(color)){
                return;
            }

            if(this.geometry && this.geometry.entityObject){
                EventManager.trigger(this.geometry.entityObject, CustomEvent.create(<any>EEngineEvent.MATERIAL_COLOR_CHANGE));
            }

            this._color = color;
        }

        get mapManager(){
            return this._shaderManager.mapManager;
        }

        get shader(){
            return this._shaderManager.shader;
        }

        @cloneAttributeAsBasicType()
        public redWrite:boolean = true;
        @cloneAttributeAsBasicType()
        public greenWrite:boolean = true;
        @cloneAttributeAsBasicType()
        public blueWrite:boolean = true;
        @cloneAttributeAsBasicType()
        public alphaWrite:boolean = true;
        @cloneAttributeAsBasicType()
        public polygonOffsetMode:EPolygonOffsetMode = EPolygonOffsetMode.NONE;
        @cloneAttributeAsBasicType()
        public side:ESide = ESide.FRONT;
        @cloneAttributeAsBasicType()
        public blend:boolean = false;
        @cloneAttributeAsBasicType({
            order:-1
        })
        public blendFuncSeparate:Array<EBlendFunc> = null;
        @cloneAttributeAsBasicType()
        public blendEquationSeparate:Array<EBlendEquation> = [EBlendEquation.ADD, EBlendEquation.ADD];
        @cloneAttributeAsBasicType()
        public shading = EShading.FLAT;
        @cloneAttributeAsBasicType()
        public geometry:Geometry = null;

        private _shaderManager:ShaderManager = ShaderManager.create(this);

        public abstract getTextureForRenderSort():Texture;

        public clone(){
            return CloneUtils.clone(this);
        }

        public initWhenCreate(){
            this._shaderManager.setShader(this.createShader());
        }

        public init(){
            this._shaderManager.init();
        }

        public dispose(){
            this._shaderManager.dispose();
        }

        public updateShader(quadCmd:QuadCommand){
            this._shaderManager.update(quadCmd);
        }

        public addShader(shaderKey:EShaderTypeOfScene, shader:Shader){
            this._shaderManager.addShader(shaderKey, shader);
        }

        public hasShader(shaderKey:EShaderTypeOfScene){
            return this._shaderManager.hasShader(shaderKey);
        }

        public getShader(shaderKey:EShaderTypeOfScene){
            return this._shaderManager.getShader(shaderKey);
        }

        public hasMap(map:Texture){
            return this.mapManager.hasMap(map);
        }

        protected abstract createShader():Shader;
    }
}

