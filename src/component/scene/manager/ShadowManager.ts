module wd{
    export class ShadowManager extends SceneComponent{
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public entityObject:SceneDispatcher;

        private _beforeInitSubscription:wdFrp.IDisposable = null;

        public dispose(){
            this._beforeInitSubscription.dispose();
        }

        public initWhenCreate(){
            var self = this;

            this._beforeInitSubscription = EventManager.fromEvent(<any>EEngineEvent.BEFORE_GAMEOBJECT_INIT)
                .subscribe(() => {
                    self._beforeInitHandler();
                });
        }

        private _beforeInitHandler(){
            this.entityObject.directionLights.forEach((lightObject:GameObject) => {
                var light:DirectionLight = lightObject.getComponent<DirectionLight>(DirectionLight);

                if(light.castShadow){
                    let renderer = TwoDShadowMapRenderTargetRenderer.create(TwoDShadowMapTexture.create(), light);

                    this.entityObject.addRenderTargetRenderer(renderer);
                }
            }, this);
        }
    }
}
