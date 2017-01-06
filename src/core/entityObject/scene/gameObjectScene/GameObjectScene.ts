module wd {
    export class GameObjectScene extends Scene{
        public static create() {
            var obj = new this();

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
        public physics = ClassUtils.createClassInstance("PhysicsConfig");
        public glslData:wdCb.Hash<any> = wdCb.Hash.create<any>();
        public currentShaderType:EShaderTypeOfScene = null;
        public renderTargetRendererManager:RenderTargetRendererManager = RenderTargetRendererManager.create();
        public shadowManager:any = ClassUtils.createClassInstanceOrEmpty("ShadowManager", "EmptyShadowManager", this);

        private _lightManager:LightManager = LightManager.create();
        private _cameraList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();

        public init(){
            ClassUtils.execSingletonMethod("PhysicsEngine", "initPhysicsEngineAdapter");

            if(this.shadowManager){
                this.shadowManager.init();
            }

            super.init();

            this.renderTargetRendererManager.init();

            ClassUtils.execSingletonMethod("PhysicsEngine", "initBody");
            ClassUtils.execSingletonMethod("PhysicsEngine", "initConstraint");

            return this;
        }

        public dispose(){
            super.dispose();

            this.shadowManager.dispose();
            this.renderTargetRendererManager.dispose();
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

        public update(elapsed:number){
            var currentCamera= this._getCurrentCameraComponent(),
                shadowManager:any = this.shadowManager;

            ClassUtils.execSingletonMethod("PhysicsEngine", "update", elapsed);

            if(currentCamera){
                currentCamera.update(elapsed);
            }

            shadowManager.update(elapsed);

            ClassUtils.execSingletonMethod("LODEngine", "update", elapsed);
            ClassUtils.execSingletonMethod("SpacePartitionEngine", "update", elapsed);

            ClassUtils.execSingletonMethod("AnimationEngine", "update", elapsed);

            CollisionEngine.getInstance().update(elapsed);

            ClassUtils.execSingletonMethod("ThreeDUIEngine", "update", elapsed);

            super.update(elapsed);

            CollisionEngine.getInstance().detect(elapsed);

            ClassUtils.execSingletonMethod("BillboardEngine", "update", elapsed);
        }

        public render(renderer:Renderer) {
            this.shadowManager.setShadowRenderListForCurrentLoop();

            this.renderTargetRendererManager.render(renderer, this.currentCamera);

            super.render(renderer, this.currentCamera);
        }

        public useShaderType(type:EShaderTypeOfScene){
            this.currentShaderType = type;
        }

        public unUseShader(){
            this.currentShaderType = null;
        }

        protected getRenderList(){
            return RenderUtils.getGameObjectRenderList(this.getChildren());
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

    export class ShadowMapModel{
        public static create(scene:GameObjectScene) {
        	var obj = new this(scene);

        	return obj;
        }

        constructor(scene:GameObjectScene){
            this._scene = scene;
        }

        private _scene:GameObjectScene = null;

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

        public shadowLayerList:any = ClassUtils.createClassInstance("ShadowLayerList", this);

        public getTwoDShadowMapDataMap(layer:string) {
            return this._scene.shadowManager.getTwoDShadowMapDataMap(layer);
        }

        public getCubemapShadowMapDataMap(layer:string){
            return this._scene.shadowManager.getCubemapShadowMapDataMap(layer);
        }
    }
}

