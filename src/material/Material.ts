module wd {
    export abstract class Material {
        get program(){
            return this.shader.program;
        }

        get mapManager(){
            return this.shader.mapManager;
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
        @cloneAttributeAsCloneable()
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
        public geometry:Geometry = null;
        //public glslData:wdCb.Hash<any> = wdCb.Hash.create<any>();

        private _shaderMap:wdCb.Hash<Shader> = wdCb.Hash.create<Shader>();
        private _currentShader:Shader = null;

        //public abstract copy():Material;

        public initWhenCreate(){
            this._currentShader = this.createShader();
            this.addShader(<any>EShaderMapKey.DEFAULT, this._currentShader);
        }

        public init(){
            var self = this;

            //todo test
            this._shaderMap.forEach((shader:Shader) => {
                shader.init(self);
            });
        }

        public dispose(){
            //todo test
            this._shaderMap.forEach((shader:Shader) => {
                shader.dispose();
            });
        }

        public updateShader(quadCmd:QuadCommand){
            var scene:SceneDispatcher = Director.getInstance().scene,
                shader:Shader = null;

            if(scene.isUseShader){
                shader = this._shaderMap.getChild(<any>scene.currentShaderKey);
            }
            else{
                shader = this._currentShader;
            }

            shader.update(quadCmd, this);
        }

        @ensureGetter(function(shader:Shader){
            assert(!!shader, Log.info.FUNC_NOT_EXIST("current shader"));
        })
        get shader(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            return scene.isUseShader ? this._shaderMap.getChild(<any>scene.currentShaderKey) : this._currentShader;
        }

        public addShader(shaderKey:string, shader:Shader){
            this._shaderMap.addChild(shaderKey, shader);
        }

        public removeShader(shaderKey:string){
            this._shaderMap.removeChild(shaderKey);
        }

        public getShader(shaderKey:string){
            return this._shaderMap.getChild(shaderKey);
        }

        public hasShader(shaderKey:string){
            return this._shaderMap.hasChild(shaderKey);
        }

        public forEachShader(func:(shader:Shader) => void){
            this._shaderMap.forEach(func);
        }

        public hasMap(map:Texture){
            return this.mapManager.hasMap(<Texture>map);
        }






        protected abstract createShader():Shader;

        private _isColorEqual(color1:Color, color2:Color){
            return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
        }
    }
}
