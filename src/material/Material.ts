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

        get reflectionMap(){
            return this.mapManager.getReflectionMap();
        }
        set reflectionMap(reflectionMap:Texture){
            this.mapManager.setReflectionMap(reflectionMap);
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

        public shader:Shader = this.createShader();
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
        public mapManager:MapManager = MapManager.create(this);
        public geometry:Geometry = null;

        public init(){
            this.shader.init(this);

            this.mapManager.init();
        }

        public dispose(){
            this.shader.dispose();

            this.mapManager.dispose();
        }

        public bindAndUpdateTexture(){
            this.mapManager.bindAndUpdate();
        }

        public sendTexture(program){
            this.mapManager.sendData(program);
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

        protected abstract createShader():Shader;

        protected setReflectionMapShaderLib(){
            if(this.reflectionMap){
                this.shader.addLib(wd.ReflectionMapShaderLib.create());
            }
        }

        private _isColorEqual(color1:Color, color2:Color){
            return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
        }
    }
}
