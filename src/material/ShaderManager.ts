module wd{
    export class ShaderManager{
        public static create(material:Material) {
        	var obj = new this(material);

        	return obj;
        }

        constructor(material:Material){
            this._material = material;
        }

        private _shader:Shader = null;
        @ensureGetter(function(shader:Shader){
            assert(!!shader, Log.info.FUNC_NOT_EXIST("shader"));
        })
        get shader(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            return scene.isUseShader ? this._getSceneShader() : this._shader;
        }

        get mapManager(){
            return this._shader.mapManager;
        }

        private _material:Material = null;
        private _sceneShader:Shader = null;
        private _unUseSceneShaderSubscription:wdFrp.IDisposable = null;

        public setShader(shader:Shader){
            this._shader = shader;

            this._shader.mapManager.material = this._material;
        }

        public init(){
            var self = this;

            this._shader.init(this._material);

            this._unUseSceneShaderSubscription = EventManager.fromEvent(<any>EEngineEvent.UNUSE_SCENE_SHADER)
                .subscribe(() => {
                    self._sceneShader = null;
                });
        }

        public dispose(){
            this._shader.dispose();

            this._unUseSceneShaderSubscription && this._unUseSceneShaderSubscription.dispose();
        }

        public update(quadCmd:QuadCommand){
            this.shader.update(quadCmd, this._material);
        }

        private _getSceneShader(){
            var scene:SceneDispatcher = null,
                shader:Shader = null,
                gameObject:GameObject = null;

            if(this._sceneShader){
                return this._sceneShader;
            }

            scene = Director.getInstance().scene;
            gameObject = this._material.geometry.entityObject;

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
