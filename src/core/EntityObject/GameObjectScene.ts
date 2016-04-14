module wd {
    export class GameObjectScene extends Scene{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        get ambientLight():GameObject {
            return this._lightManager.ambientLight;
        }

        get directionLights(): wdCb.Collection<GameObject>{
            return this._lightManager.directionLights;
        }

        get pointLights(): wdCb.Collection<GameObject>{
            return this._lightManager.pointLights;
        }

        private _currentCamera:GameObject = null;
        get currentCamera():any{
            return this._currentCamera || this._cameraList.getChild(0);
        }
        @requireSetter(function(arg:any){
            if(JudgeUtils.isNumber(arg)){
                let index:number = arg;

                assert(!!this._cameraList.getChild(index), Log.info.FUNC_NOT_EXIST("current camera in cameraList"));
            }
        })
        set currentCamera(arg:any){
            if(JudgeUtils.isNumber(arg)){
                let index:number = arg;

                this._currentCamera = this._cameraList.getChild(index);
            }
            else if(arg instanceof GameObject){
                let currentCamera:GameObject = arg;

                this._currentCamera = currentCamera;
            }
        }

        get isUseShader(){
            return this.currentShaderType !== null;
        }

        public side:ESide = null;
        public shadowMap = ShadowMapModel.create(this);
        public physics = PhysicsConfig.create();
        public physicsEngineAdapter:IPhysicsEngineAdapter = null;
        public glslData:wdCb.Hash<any> = wdCb.Hash.create<any>();
        public currentShaderType:EShaderTypeOfScene = null;
        public shadowLayerList:ShadowLayerList = ShadowLayerList.create();
        public renderTargetRendererManager:RenderTargetRendererManager = null;

        private _shadowManager:ShadowManager = null;
        private _lightManager:LightManager = null;
        private _collisionDetector:CollisionDetector = null;
        private _cameraList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        private _shaderMap:wdCb.Hash<Shader> = wdCb.Hash.create<Shader>();

        public initWhenCreate(){
            super.initWhenCreate();

            this._shadowManager = ShadowManager.create();
            this.addComponent(this._shadowManager);

            this._lightManager = LightManager.create();
            this.addComponent(this._lightManager);

            this.renderTargetRendererManager = RenderTargetRendererManager.create();
            this.addComponent(this.renderTargetRendererManager);

            this._collisionDetector = CollisionDetector.create();
            this.addComponent(this._collisionDetector);
        }

        public init(){
            if(this.physics.enable){
                this.physicsEngineAdapter = PhysicsEngineFactory.create(this.physics.engine);
                this.physicsEngineAdapter.init();
            }

            super.init();

            this.renderTargetRendererManager.afterInit();

            return this;
        }

        public dispose(){
            super.dispose();

            this._shaderMap.forEach((shader:Shader) => {
                shader.dispose();
            });
        }

        public addChild(child:GameObject):GameObject{
            var cameraList = this._getCameras(child),
                lightList = this._getLights(child);

            if(cameraList.getCount() > 0){
                this._cameraList.addChildren(cameraList);
            }
            if(lightList.getCount() > 0){
                this._lightManager.addChildren(lightList);
            }

            return <GameObject>super.addChild(child);
        }

        public update(elapsedTime:number){
            var currentCamera= this._getCurrentCameraComponent(),
                shadowManager:ShadowManager = this.getComponent<ShadowManager>(ShadowManager),
                collisionDetector:CollisionDetector = this.getComponent<CollisionDetector>(CollisionDetector);

            if(this.physics.enable){
                this.physicsEngineAdapter.update(elapsedTime);
            }

            if(currentCamera){
                currentCamera.update(elapsedTime);
            }

            shadowManager.update(elapsedTime);

            super.update(elapsedTime);

            collisionDetector.update(elapsedTime);
        }

        public render(renderer:Renderer) {
            this._shadowManager.setShadowRenderListInEachLoop();

            this.renderTargetRendererManager.renderCommonRenderTargetRenderer(renderer, this.currentCamera);

            super.render(renderer, this.currentCamera);
        }

        public useShaderType(type:EShaderTypeOfScene){
            this.currentShaderType = type;
        }

        public unUseShader(){
            this.currentShaderType = null;

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.UNUSE_SCENE_SHADER));
        }

        public addShader(key:EShaderMapKeyOfScene, shader:Shader){
            this._shaderMap.addChild(<any>key, shader);
        }

        public hasShader(key:EShaderMapKeyOfScene){
            return this._shaderMap.hasChild(<any>key);
        }

        public getShader(key:EShaderMapKeyOfScene){
            var shader = this._shaderMap.getChild(<any>key)

            /*! defer init
             init when get shader(it will be judged in "init" method that not init if already inited)
             */
            shader.init(null);

            return shader;
        }

        protected getRenderList(){
            return RenderUtils.getGameObjectRenderList(this.children);
        }

        protected createTransform(){
            return null;
        }

        private _getCameras(gameObject:GameObject){
            return this._find(gameObject, this._isCamera);
        }

        private _getLights(gameObject:GameObject){
            return this._find(gameObject, this._isLight);
        }

        private _find(gameObject:GameObject, judgeFunc){
            var self = this,
                resultArr:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
            var find = (gameObject:GameObject) => {
                if(judgeFunc.call(self, gameObject)){
                    resultArr.addChild(gameObject);
                }

                gameObject.forEach((child:GameObject) => {
                    find(child);
                });
            }

            find(gameObject);

            return resultArr;
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(CameraController);
        }

        private _isLight(child:GameObject){
            return child.hasComponent(Light);
        }

        private _getCurrentCameraComponent():CameraController{
            if(!this.currentCamera){
                return null;
            }

            return this.currentCamera.getComponent(CameraController);
        }
    }

    export class PhysicsConfig{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _gravity:Vector3 = Vector3.create(0, -9.8, 0);
        @operateWorldDataGetterAndSetter("Gravity")
        get gravity(){
            return this._gravity;
        }
        set gravity(gravity:Vector3){
            this._gravity = gravity;
        }

        public enable:boolean = false;
        public engine:EPhysicsEngineType = EPhysicsEngineType.CANNON;
        public iterations:number = 10;
    }

    export class ShadowMapModel{
        public static create(scene:GameObjectScene) {
        	var obj = new this(scene);

        	return obj;
        }

        private _scene:GameObjectScene = null;

        constructor(scene:GameObjectScene){
            this._scene = scene;
        }

        private _enable:boolean = true;
        get enable(){
            return this._enable;
        }
        set enable(enable:boolean){
            this._enable = enable;

            //todo send event if need
        }

        private _softType:EShadowMapSoftType = EShadowMapSoftType.NONE;
        get softType(){
            return this._softType;
        }
        set softType(softType:EShadowMapSoftType){
            if(softType !== this._softType){
                EventManager.broadcast(this._scene, CustomEvent.create(<any>EEngineEvent.SHADOWMAP_SOFTTYPE_CHANGE));

                this._softType = softType;
            }
        }
    }
}

