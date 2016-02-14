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

        public side:Side = null;
        public shadowMap = {
            enable: true,
            softType: ShadowMapSoftType.NONE
        };
        public shader:Shader = null;
        public isUseProgram:boolean = false;
        public physics = PhysicsConfig.create();
        public physicsEngineAdapter:IPhysicsEngineAdapter = null;

        private _lightManager:LightManager = LightManager.create();
        private _renderTargetRenderers:wdCb.Collection<RenderTargetRenderer> = wdCb.Collection.create<RenderTargetRenderer>();
        private _collisionDetector:CollisionDetector = CollisionDetector.create();
        private _cameraList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();

        public init(){
            if(this.physics.enable){
                this.physicsEngineAdapter = PhysicsEngineFactory.create(this.physics.engine);
                this.physicsEngineAdapter.init();
            }

            super.init();

            this._renderTargetRenderers.forEach((renderTargetRenderer:RenderTargetRenderer) => renderTargetRenderer.init());

            return this;
        }

        public useProgram(shader:Shader){
            this.isUseProgram = true;

            this.shader = shader;
        }

        public unUseProgram(){
            this.isUseProgram = false;
        }

        public addChild(child:GameObject):GameObject{
            if(this._isCamera(child)){
                this._cameraList.addChild(child);
            }
            else if(this._isLight(child)){
                this._lightManager.addChild(child);
            }

            return <GameObject>super.addChild(child);
        }

        @require(function(cameraObject:GameObject){
            assert(cameraObject.hasComponent(CameraController), Log.info.FUNC_SHOULD("only add camera object"));
        })
        public addToCameraList(cameraObject:GameObject){
            this._cameraList.addChild(cameraObject);
        }

        public addRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            this._renderTargetRenderers.addChild(renderTargetRenderer);
        }

        public removeRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            this._renderTargetRenderers.removeChild(renderTargetRenderer);
        }

        public update(elapsedTime:number){
            var currentCameraComponent = this._getCurrentCameraComponent();

            if(this.physics.enable){
                this.physicsEngineAdapter.update(elapsedTime);
            }

            if(currentCameraComponent){
                currentCameraComponent.update(elapsedTime);
            }

            super.update(elapsedTime);

            this._collisionDetector.detect(this);
        }

        public render(renderer:Renderer) {
            var self = this;

            this._renderTargetRenderers.forEach((target:RenderTargetRenderer) =>{
                target.render(renderer, self.currentCamera);
            });

            super.render(renderer, this.currentCamera);
        }

        protected createTransform(){
            return null;
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


    export type ShadowMapConfig = {
        enable:boolean;
        softType:ShadowMapSoftType
    }

    export enum ShadowMapSoftType{
        NONE,
        PCF
    }
}

