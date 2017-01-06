module wd{
    export class EmptyShadowManager{
        public static create() {
            var obj = new this();

            return obj;
        }
        //
        // get twoDShadowMapDataMap(){
        //     return this._shadowMapManager.twoDShadowMapDataMap;
        // }
        //
        // get twoDShadowMapCountForGLSL(){
        //     return this._shadowMapManager.twoDShadowMapCountForGLSL;
        // }
        //
        // get cubemapShadowMapDataMap(){
        //     return this._shadowMapManager.cubemapShadowMapDataMap;
        // }
        //
        // get cubemapShadowMapCountForGLSL(){
        //     return this._shadowMapManager.cubemapShadowMapCountForGLSL;
        // }
        //
        //
        // public gameObjectScene:GameObjectScene = null;
        //
        // private _shadowRenderList:wdCb.Collection<GameObject> = null;
        // private _endLoopSubscription:wdFrp.IDisposable = null;
        // private _shadowMapManager:ShadowMapManager = ShadowMapManager.create(this);
        // private _shadowMapLayerChangeSubscription:wdFrp.IDisposable = null;

        public update(elapsed:number){
        }

        public dispose(){
        }

        public getTwoDShadowMapDataMap(layer:string) {
            return null;
        }

        public getCubemapShadowMapDataMap(layer:string){
            return null;
        }

        public setShadowRenderListForCurrentLoop(){
        }

        public getShadowRenderListByLayer(layer:string){
            return null;
        }

        public getShadowLayerList(){
            return null;
        }

        public init(){
        }
    }
}

