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

        private _lightManager:LightManager = LightManager.create();
        private _renderTargetRenderers:wdCb.Collection<RenderTargetRenderer> = wdCb.Collection.create<RenderTargetRenderer>();

        public init(){
            this.addComponent(Pick.create());

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
            super.update(time);

            this._checkCollision();
        }

        @require(function(renderer:Renderer){
            assert(!!this.camera, Log.info.FUNC_MUST("scene",  "add camera"));
        })
        public render(renderer:Renderer) {
            var self = this;

            this._renderTargetRenderers.forEach((target:RenderTargetRenderer) =>{
                target.render(renderer, self.camera);
            });

            super.render(renderer, this.camera);
        }

        private _checkCollision(){
            //todo optimize:use scene graph to only get needChecked gameObjects
            //todo optimize:use worker
            var checkTargetList = this.filter((gameObject:GameObject) => {
                    return gameObject.hasComponent(Collider);
                }),
                self = this;

            checkTargetList.forEach((gameObject:GameObject) => {
                var collideObjects = gameObject.getComponent<Collider>(Collider).getCollideObjects(checkTargetList);

                if(collideObjects.getCount() > 0){
                    if(self._isCollisionStart(gameObject)){
                        gameObject.execScript("onCollisionStart", collideObjects);
                    }

                    gameObject.execScript("onContact", collideObjects);

                    gameObject.isCollided = true;
                }
                else{
                  if(self._isCollisionEnd(gameObject)){
                    gameObject.execScript("onCollisionEnd", collideObjects);
                }

                    gameObject.isCollided = false;
                }
            });
        }

        private _isCollisionStart(gameObject:GameObject){
            return !gameObject.isCollided;
        }

        private _isCollisionEnd(gameObject:GameObject){
            return gameObject.isCollided;
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(CameraController);
        }

        private _isLight(child:GameObject){
            return child.hasComponent(Light);
        }
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

