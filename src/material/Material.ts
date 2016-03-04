module wd {
    export abstract class Material {
        get program(){
            return this.shader.program;
        }

        private _blendType:EBlendType = null;
        get blendType(){
            if(this._blendType){
                return this._blendType;
            }

            if ( (this.blendSrc === EBlendFunc.ONE)
                && (this.blendDst === EBlendFunc.ZERO)
                && (this.blendEquation === EBlendEquation.ADD)) {
                return EBlendType.NONE;
            }
            else if ((this.blendSrc === EBlendFunc.SRC_ALPHA)
                && (this.blendDst === EBlendFunc.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === EBlendEquation.ADD)) {
                return EBlendType.NORMAL;
            }
            else if ((this.blendSrc === EBlendFunc.ONE)
                && (this.blendDst === EBlendFunc.ONE)
                && (this.blendEquation === EBlendEquation.ADD)) {
                return EBlendType.ADDITIVE;
            }
            else if ((this.blendSrc === EBlendFunc.SRC_ALPHA)
                && (this.blendDst === EBlendFunc.ONE)
                && (this.blendEquation === EBlendEquation.ADD)) {
                return EBlendType.ADDITIVEALPHA;
            }
            else if ((this.blendSrc === EBlendFunc.DST_COLOR)
                && (this.blendDst === EBlendFunc.ZERO)
                && (this.blendEquation === EBlendEquation.ADD)) {
                return EBlendType.MULTIPLICATIVE;
            }
            else if ((this.blendSrc === EBlendFunc.ONE)
                && (this.blendDst === EBlendFunc.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === EBlendEquation.ADD)) {
                return EBlendType.PREMULTIPLIED;
            }
            else {
                return EBlendType.NORMAL;
            }
        }
        set blendType(blendType:EBlendType){
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

        get envMap(){
            return this.mapManager.getEnvMap();
        }
        set envMap(envMap:CubemapTexture){
            this.mapManager.setEnvMap(envMap);
        }

        private _blendSrc:EBlendFunc= EBlendFunc.ONE;
        get blendSrc(){
            return this._blendSrc;
        }
        set blendSrc(blendSrc:EBlendFunc){
            this._blendSrc = blendSrc;
            this.blendFuncSeparate = null;
        }

        private _blendDst:EBlendFunc= EBlendFunc.ZERO;
        get blendDst(){
            return this._blendDst;
        }
        set blendDst(blendDst:EBlendFunc){
            this._blendDst = blendDst;
            this.blendFuncSeparate = null;
        }

        private _blendEquation:EBlendEquation = EBlendEquation.ADD;
        get blendEquation(){
            return this._blendEquation;
        }
        set blendEquation(blendEquation:EBlendEquation){
            this._blendEquation = blendEquation;
            this.blendEquationSeparate = null;
        }

        private _color:Color = Color.create("#ffffff");
        get color(){
            return this._color;
        }
        set color(color:Color){
            if(!this._isColorEqual(color, this._color)){
                if(this.geometry && this.geometry.entityObject){
                    EventManager.trigger(this.geometry.entityObject, <any>EEngineEvent.MATERIAL_COLOR_CHANGE);
                }

                this._color = color;
            }
        }

        public shader:CommonShader = CommonShader.create();
        public redWrite:boolean = true;
        public greenWrite:boolean = true;
        public blueWrite:boolean = true;
        public alphaWrite:boolean = true;
        public polygonOffsetMode:EPolygonOffsetMode = EPolygonOffsetMode.NONE;
        public side:ESide = ESide.FRONT;
        public blend:boolean = false;
        public blendFuncSeparate:Array<EBlendFunc> = null;
        public blendEquationSeparate:Array<EBlendEquation> = [EBlendEquation.ADD, EBlendEquation.ADD];
        public shading = EShading.FLAT;
        public refractionRatio:number = 0;
        public reflectivity:number = null;
        public mapCombineMode:ETextureCombineMode = ETextureCombineMode.MIX;
        public mapMixRatio:number = 0.5;
        public mapManager:MapManager = MapManager.create(this);
        public geometry:Geometry = null;

        private _afterInitSubscription:wdFrp.IDisposable = null;


        @require(function(){
            assert(!(this.mirrorMap && this.envMap), Log.info.FUNC_SHOULD_NOT("mirrorMap and envMap", "be set both"));
        })
        public init(){
            this._addTopShaderLib();
            this.addShaderLib();

            this.shader.init();

            this.mapManager.init();
        }

        public dispose(){
            this.shader.dispose();

            this.mapManager.dispose();

            this._afterInitSubscription && this._afterInitSubscription.dispose();
        }

        public updateTexture(){
            this.mapManager.update();
        }

        public updateShader(quadCmd:QuadCommand){
            var scene:SceneDispatcher = Director.getInstance().scene;

            if(scene.isUseProgram){
                scene.shader.update(quadCmd, this);
            }
            else{
                this.shader.update(quadCmd, this);
            }
        }

        @virtual
        protected addShaderLib(){
        }

        protected addMap(asset:TextureAsset);
        protected addMap(asset:TextureAsset, option:MapVariableData);
        protected addMap(map:Texture);
        protected addMap(map:Texture, option:MapVariableData);

        protected addMap(...args){
            this.mapManager.addMap.apply(this.mapManager, args);
        }

        protected addNormalShaderLib(){
            if(this._hasAnimation() && !this.shader.hasLib(MorphNormalShaderLib)){
                this._addShaderLibToTop(MorphNormalShaderLib.create());
            }
            else if(!this.shader.hasLib(CommonNormalShaderLib)){
                this._addShaderLibToTop(CommonNormalShaderLib.create());
            }
        }

        protected setBlendByOpacity(opacity:number){
            if(opacity < 1.0 && opacity >= 0.0){
                this.blend = true;
            }
            else{
                this.blend = false;
            }
        }

        private _addTopShaderLib(){
            this.shader.addLib(CommonShaderLib.create());

            if(this._hasAnimation()){
                this.shader.addLib(MorphCommonShaderLib.create());
                this.shader.addLib(MorphVerticeShaderLib.create());
            }
            else{
                this.shader.addLib(CommonVerticeShaderLib.create());
            }
        }

        private _addShaderLibToTop(lib:ShaderLib){
            this.shader.addShaderLibToTop(lib);
        }

        private _hasAnimation(){
            if(this.geometry instanceof ModelGeometry){
                let geo = <any>(this.geometry);

                return geo.hasAnimation();
            }

            return false;
        }

        private _isColorEqual(color1:Color, color2:Color){
            return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
        }
    }

    export type MapVariableData = {
        samplerVariableName?: string;
        samplerData?:any
    }
}
