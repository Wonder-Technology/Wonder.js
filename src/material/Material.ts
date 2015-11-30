/// <reference path="../filePath.d.ts"/>
module wd {
    export abstract class Material {
        get program(){
            return this.shader.program;
        }

        private _blendType:BlendType = null;
        get blendType(){
            if(this._blendType){
                return this._blendType;
            }

            if ( (this.blendSrc === BlendFunc.ONE)
                && (this.blendDst === BlendFunc.ZERO)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.NONE;
            }
            else if ((this.blendSrc === BlendFunc.SRC_ALPHA)
                && (this.blendDst === BlendFunc.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.NORMAL;
            }
            else if ((this.blendSrc === BlendFunc.ONE)
                && (this.blendDst === BlendFunc.ONE)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.ADDITIVE;
            }
            else if ((this.blendSrc === BlendFunc.SRC_ALPHA)
                && (this.blendDst === BlendFunc.ONE)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.ADDITIVEALPHA;
            }
            else if ((this.blendSrc === BlendFunc.DST_COLOR)
                && (this.blendDst === BlendFunc.ZERO)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.MULTIPLICATIVE;
            }
            else if ((this.blendSrc === BlendFunc.ONE)
                && (this.blendDst === BlendFunc.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.PREMULTIPLIED;
            }
            else {
                return BlendType.NORMAL;
            }
        }
        set blendType(blendType:BlendType){
            switch (blendType) {
                case BlendType.NONE:
                    this.blend = false;
                    this.blendSrc = BlendFunc.ONE;
                    this.blendDst = BlendFunc.ZERO;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.NORMAL:
                    this.blend = true;
                    this.blendSrc = BlendFunc.SRC_ALPHA;
                    this.blendDst = BlendFunc.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.PREMULTIPLIED:
                    this.blend = true;
                    this.blendSrc = BlendFunc.ONE;
                    this.blendDst = BlendFunc.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.ADDITIVE:
                    this.blend = true;
                    this.blendSrc = BlendFunc.ONE;
                    this.blendDst = BlendFunc.ONE;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.ADDITIVEALPHA:
                    this.blend = true;
                    this.blendSrc = BlendFunc.SRC_ALPHA;
                    this.blendDst = BlendFunc.ONE;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.MULTIPLICATIVE:
                    this.blend = true;
                    this.blendSrc = BlendFunc.DST_COLOR;
                    this.blendDst = BlendFunc.ZERO;
                    this.blendEquation = BlendEquation.ADD;
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

        private _blendSrc:BlendFunc= BlendFunc.ONE;
        get blendSrc(){
            return this._blendSrc;
        }
        set blendSrc(blendSrc:BlendFunc){
            this._blendSrc = blendSrc;
            this.blendFuncSeparate = null;
        }

        private _blendDst:BlendFunc= BlendFunc.ZERO;
        get blendDst(){
            return this._blendDst;
        }
        set blendDst(blendDst:BlendFunc){
            this._blendDst = blendDst;
            this.blendFuncSeparate = null;
        }

        private _blendEquation:BlendEquation = BlendEquation.ADD;
        get blendEquation(){
            return this._blendEquation;
        }
        set blendEquation(blendEquation:BlendEquation){
            this._blendEquation = blendEquation;
            this.blendEquationSeparate = null;
        }

        public shader:Shader = Shader.create();
        public color:Color = Color.create("#ffffff");
        public redWrite:boolean = true;
        public greenWrite:boolean = true;
        public blueWrite:boolean = true;
        public alphaWrite:boolean = true;
        public polygonOffsetMode:PolygonOffsetMode = PolygonOffsetMode.NONE;
        public side:Side = Side.FRONT;
        public blend:boolean = false;
        public blendFuncSeparate:Array<BlendFunc> = null;
        public blendEquationSeparate:Array<BlendEquation> = [BlendEquation.ADD, BlendEquation.ADD];
        public shading = Shading.FLAT;
        public refractionRatio:number = 0;
        public reflectivity:number = ShaderChunk.NULL;
        public mapCombineMode:TextureCombineMode = TextureCombineMode.MIX;
        public mapMixRatio:number = 0.5;
        public mapManager:MapManager = MapManager.create(this);
        public geometry:Geometry = null;


        @require(function(){
            assert(!(this.mirrorMap && this.envMap), Log.info.FUNC_SHOULD_NOT("mirrorMap and envMap", "be set both"));
        })
        public init(){
            this._addTopShaderLib();
            this.addShaderLib();

            this.mapManager.init();
            this.shader.init();
        }

        public dispose(){
            this.mapManager.dispose();
        }

        public updateTexture(){
            this.mapManager.update();
        }

        public updateShader(quadCmd:QuadCommand){
            var scene:Scene = Director.getInstance().scene;

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
            if(opacity < 1.0 && opacity > 0.0){
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
    }

    export type MapVariableData = {
        samplerVariableName?: string;
        samplerData?:any
    }
}
