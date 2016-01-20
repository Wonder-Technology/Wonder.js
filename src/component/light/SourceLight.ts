module wd{
    export abstract class SourceLight extends Light{
        private _beforeInitSubscription:wdFrp.IDisposable = null;

        public initWhenCreate(){
            var self = this;

            this._beforeInitSubscription = EventManager.fromEvent(<any>EngineEvent.BEFORE_GAMEOBJECT_INIT)
                .subscribe(() => {
                    self.beforeInitHandler();
                });
        }

        public dispose(){
            this.shadowMap && this.shadowMap.dispose();

            Director.getInstance().scene.removeRenderTargetRenderer(this.shadowMapRenderer);

            this._beforeInitSubscription && this._beforeInitSubscription.dispose();
        }

        @execOnlyOnce("_isBeforeInit")
        protected beforeInitHandler(){
            if(this.castShadow){
                this.shadowMap = this.createShadowMap();

                this.shadowMapRenderer = this.createShadowMapRenderer();
                Director.getInstance().scene.addRenderTargetRenderer(this.shadowMapRenderer);
            }
        }

        protected abstract createShadowMap();
        protected abstract createShadowMapRenderer();
    }
}

