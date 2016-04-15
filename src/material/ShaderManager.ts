module wd{
    export class ShaderManager{
        public static create(material:Material) {
        	var obj = new this(material);

        	return obj;
        }

        constructor(material:Material){
            this._material = material;
        }

        //private _shader:Shader = null;
        @ensureGetter(function(shader:Shader){
            assert(!!shader, Log.info.FUNC_NOT_EXIST("shader"));
        })
        get shader(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            return scene.isUseShader ? this._otherShaderMap.getChild(<any>scene.currentShaderType) : this._mainShader;
        }

        get mapManager(){
            return this.shader.mapManager;
        }

        private _material:Material = null;
        //private _sceneShader:Shader = null;
        //private _unUseSceneShaderSubscription:wdFrp.IDisposable = null;
        private _otherShaderMap:wdCb.Hash<Shader> = wdCb.Hash.create<Shader>();
        private _mainShader:Shader = null;

        public setShader(shader:Shader){
            this._mainShader = shader;

            this._mainShader.mapManager.material = this._material;
        }

        public init(){
            var material = this._material;

            this._otherShaderMap.forEach((shader:Shader) => {
                shader.init(material);
            });

            this._mainShader.init(material);

            //this._unUseSceneShaderSubscription = EventManager.fromEvent(<any>EEngineEvent.UNUSE_SCENE_SHADER)
            //    .subscribe(() => {
            //        self._sceneShader = null;
            //    });
        }

        public dispose(){
            this._otherShaderMap.forEach((shader:Shader) => {
                shader.dispose();
            });

            this._mainShader.dispose();

            //this._unUseSceneShaderSubscription && this._unUseSceneShaderSubscription.dispose();
        }

        public update(quadCmd:QuadCommand){
            this.shader.update(quadCmd, this._material);
        }

        public addShader(shaderKey:EShaderTypeOfScene, shader:Shader){
            this._otherShaderMap.addChild(<any>shaderKey, shader);
        }

        public hasShader(shaderKey:EShaderTypeOfScene){
            return this._otherShaderMap.hasChild(<any>shaderKey);
        }

        public getShader(shaderKey:EShaderTypeOfScene){
            return this._otherShaderMap.getChild(<any>shaderKey);
        }

        //private _getSceneShader(){
        //    var scene:SceneDispatcher = null,
        //        shader:Shader = null,
        //        gameObject:GameObject = null;
        //
        //    if(this._sceneShader){
        //        return this._sceneShader;
        //    }
        //
        //    scene = Director.getInstance().scene;
        //    gameObject = this._material.geometry.entityObject;
        //
        //    switch (scene.currentShaderType){
        //        case EShaderTypeOfScene.BUILD_TWOD_SHADOWMAP:
        //            if (InstanceUtils.isHardwareSupport() && InstanceUtils.isInstance(gameObject)) {
        //                shader = scene.getShader(EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_INSTANCE);
        //            }
        //            else{
        //                shader = scene.getShader(EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_NO_INSTANCE);
        //            }
        //
        //            break;
        //        case EShaderTypeOfScene.BUILD_CUBEMAP_SHADOWMAP:
        //            if (InstanceUtils.isHardwareSupport() && InstanceUtils.isInstance(gameObject)) {
        //                shader = scene.getShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_INSTANCE);
        //            }
        //            else{
        //                shader = scene.getShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_NO_INSTANCE);
        //            }
        //
        //            break;
        //        default:
        //            Log.error(true, Log.info.FUNC_UNKNOW(`scene.currentShaderKey: ${scene.currentShaderType}`));
        //            break;
        //    }
        //
        //    this._sceneShader = shader;
        //
        //    return this._sceneShader;
        //}
    }
}
