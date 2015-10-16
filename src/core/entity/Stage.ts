/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Stage extends GameObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        get ambientLight():GameObject {
            return this._lightManager.ambientLight;
        }

        get directionLights(): dyCb.Collection<GameObject>{
            return this._lightManager.directionLights;
        }

        get pointLights(): dyCb.Collection<GameObject>{
            return this._lightManager.pointLights;
        }

        get program():Program{
            return this.shader.program
        }

        get isUseProgram():boolean{
            return this.program.isUse;
        }

        public cullMode:CullMode = null;
        public shadowMap = {
            enable: true,
            softType: ShadowMapSoftType.NONE
        };

        public shader:Shader = Shader.create();
        public camera:GameObject = null;


        private _lightManager:LightManager = LightManager.create();
        private _renderTargetRenderers:dyCb.Collection<RenderTargetRenderer> = dyCb.Collection.create<RenderTargetRenderer>();

        public init(){
            this.addComponent(TopCollider.create());

            super.init();

            this._renderTargetRenderers.forEach((renderTargetRenderer:RenderTargetRenderer) => renderTargetRenderer.init());

            return this;
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

        public render(renderer:Renderer) {
            var self = this;

            Log.error(!this.camera, "stage must add camera");

            this._renderTargetRenderers.forEach((target:RenderTargetRenderer) =>{
                target.render(renderer, self.camera);
            });

            super.render(renderer, this.camera);
        }

        private _isCamera(child:GameObject){
            return child.hasComponent(Camera);
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
