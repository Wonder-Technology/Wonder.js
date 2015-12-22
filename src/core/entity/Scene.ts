/// <reference path="../../filePath.d.ts"/>
module wd {
    export class Scene extends GameObject{
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

        public side:Side = null;
        public shadowMap = {
            enable: true,
            softType: ShadowMapSoftType.NONE
        };
        public shader:Shader = null;
        public camera:GameObject = null;
        public isUseProgram:Boolean = false;
        public physics = PhysicsConfig.create();
        public physicsEngineAdapter:IPhysicsEngineAdapter = null;

        private _lightManager:LightManager = LightManager.create();
        private _renderTargetRenderers:wdCb.Collection<RenderTargetRenderer> = wdCb.Collection.create<RenderTargetRenderer>();
        private _collisionDetector:CollisionDetector = CollisionDetector.create();

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
                this.camera = child;
            }
            else if(this._isLight(child)){
                this._lightManager.addChild(child);
            }

            return super.addChild(child);
        }

        public addRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            this._renderTargetRenderers.addChild(renderTargetRenderer);
        }

        public removeRenderTargetRenderer(renderTargetRenderer:RenderTargetRenderer){
            this._renderTargetRenderers.removeChild(renderTargetRenderer);
        }

        public update(time:number){
            if(this.physics.enable){
                this.physicsEngineAdapter.update(time);
            }

            super.update(time);

            this._collisionDetector.detect(this);
        }

        //@require(function(renderer:Renderer){
        //    assert(!!this.camera, Log.info.FUNC_MUST("scene",  "add camera"));
        //})
        public render(renderer:Renderer) {
            var self = this;

            this._renderTargetRenderers.forEach((target:RenderTargetRenderer) =>{
                target.render(renderer, self.camera);
            });

            super.render(renderer, this.camera);
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(CameraController);
        }

        private _isLight(child:GameObject){
            return child.hasComponent(Light);
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
        public engine:PhysicsEngineType = PhysicsEngineType.CANNON;
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

