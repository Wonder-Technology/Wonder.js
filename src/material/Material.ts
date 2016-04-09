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

        get mapManager(){
            return this._shader.mapManager;
        }

        private _shader:Shader = null;
        @ensureGetter(function(shader:Shader){
            assert(!!shader, Log.info.FUNC_NOT_EXIST("shader"));
        })
        get shader(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            return scene.isUseShader ? this._getSceneShader() : this._shader;
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

        private _sceneShader:Shader = null;
        private _unUseSceneShaderSubscription:wdFrp.IDisposable = null;

        //public abstract copy():Material;

        public initWhenCreate(){
            this._shader = this.createShader();
            this._shader.mapManager.material = this;
        }

        public init(){
            var self = this;

            this._shader.init(this);

            this._unUseSceneShaderSubscription = EventManager.fromEvent(<any>EEngineEvent.UNUSE_SCENE_SHADER)
                .subscribe(() => {
                    self._sceneShader = null;
                });
        }

        public dispose(){
            this._shader.dispose();

            //todo test
            this._unUseSceneShaderSubscription && this._unUseSceneShaderSubscription.dispose();
        }

        public updateShader(quadCmd:QuadCommand){
            this.shader.update(quadCmd, this);
        }

        public hasMap(map:Texture){
            return this.mapManager.hasMap(<Texture>map);
        }

        protected abstract createShader():Shader;

        private _isColorEqual(color1:Color, color2:Color){
            return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
        }

        private _getSceneShader(){
            var scene:SceneDispatcher = null,
                shader:Shader = null,
                gameObject:GameObject = null;

            if(this._sceneShader){
                return this._sceneShader;
            }

            scene = Director.getInstance().scene;
            gameObject = this.geometry.entityObject;

            switch (scene.currentShaderType){
                case EShaderTypeOfScene.BUILD_TWOD_SHADOWMAP:
                    if (InstanceUtils.isHardwareSupport() && InstanceUtils.isInstance(gameObject)) {
                        shader = scene.getShader(EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_INSTANCE);
                    }
                    else{
                        shader = scene.getShader(EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_NO_INSTANCE);
                    }

                    break;
                case EShaderTypeOfScene.BUILD_CUBEMAP_SHADOWMAP:
                    if (InstanceUtils.isHardwareSupport() && InstanceUtils.isInstance(gameObject)) {
                        shader = scene.getShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_INSTANCE);
                    }
                    else{
                        shader = scene.getShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_NO_INSTANCE);
                    }

                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNKNOW(`scene.currentShaderKey: ${scene.currentShaderType}`));
                    break;
            }

            this._sceneShader = shader;

            return this._sceneShader;
        }
    }
}

