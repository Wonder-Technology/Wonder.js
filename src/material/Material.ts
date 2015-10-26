/// <reference path="../definitions.d.ts"/>
module dy {
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
            return this.textureManager.getEnvMap();
        }
        set envMap(envMap:CubemapTexture){
            this.textureManager.setEnvMap(envMap);
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
        public color:Color = Color.create("0xffffff");

        //public depthTest:boolean = true;
        //public depthWrite:boolean = true;
        public redWrite:boolean = true;
        public greenWrite:boolean = true;
        public blueWrite:boolean = true;
        public alphaWrite:boolean = true;
        public polygonOffsetMode:PolygonOffsetMode = PolygonOffsetMode.NONE;
        public side:Side = Side.FRONT;
        public blend:boolean = false;
        public blendFuncSeparate:Array<BlendFunc> = null;
        public blendEquationSeparate:Array<BlendEquation> = [BlendEquation.ADD, BlendEquation.ADD];



            public textureManager:TextureManager = TextureManager.create(this);
        public geometry:Geometry = null;


        public init(){
            this.textureManager.init();

            this.shader.init();
        }

        public dispose(){
            this.textureManager.dispose();
        }

        public addMap(asset:TextureAsset);
        public addMap(asset:TextureAsset, option:MapVariableData);
        public addMap(map:Texture);
        public addMap(map:Texture, option:MapVariableData);

        public addMap(arg){
            this.textureManager.addMap.apply(this.textureManager, Array.prototype.slice.call(arguments, 0));
        }

        public updateTexture(){
            this.textureManager.update();
        }

        //public useProgram(){
        //    var stage:Stage = Director.getInstance().stage;
        //
        //    if(stage.isUseProgram){
        //        return;
        //    }
        //
        //    this.shader.program.use();
        //}

        public updateShader(quadCmd:QuadCommand){
            var stage:Stage = Director.getInstance().stage;

            if(stage.isUseProgram){
                stage.shader.update(quadCmd, this);
            }
            else{
                this.shader.update(quadCmd, this);
            }
        }
    }

    export type MapVariableData = {
        samplerVariableName?: string;
        samplerData?:any
    }
}
