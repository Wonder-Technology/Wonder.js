module wd{
    export class ShadowMapController extends MapController{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _twoDShadowMapList:wdCb.Collection<TwoDShadowMapTexture> = wdCb.Collection.create<TwoDShadowMapTexture>();
        private _cubemapShadowMapList:wdCb.Collection<CubemapShadowMapTexture> = wdCb.Collection.create<CubemapShadowMapTexture>();

        public addTwoDShadowMap(shadowMap:TwoDShadowMapTexture){
            this.setMapOption(shadowMap, {
                samplerData: this._twoDShadowMapList.getCount()
            });

            this._twoDShadowMapList.addChild(shadowMap);
        }

        public addCubemapShadowMap(shadowMap:CubemapShadowMapTexture){
            this.setMapOption(shadowMap, {
                samplerData: this._cubemapShadowMapList.getCount()
            });

            this._cubemapShadowMapList.addChild(shadowMap);
        }

        public hasTwoDShadowMap(shadowMap:TwoDShadowMapTexture){
            return this.hasMapHelper(this._twoDShadowMapList, shadowMap);
        }

        public hasCubemapShadowMap(shadowMap:CubemapShadowMapTexture){
            return this.hasMapHelper(this._cubemapShadowMapList, shadowMap);
        }

        public getTwoDShadowMapList(){
            return this._twoDShadowMapList;
        }

        public getCubemapShadowMapList(){
            return this._cubemapShadowMapList;
        }

        public getAllMapArr(){
            return this._twoDShadowMapList.clone(false).addChildren(this._cubemapShadowMapList).toArray();
        }

        public removeChild(map:Texture){
            this._twoDShadowMapList.removeChild(map);
            this._cubemapShadowMapList.removeChild(map);
        }

        public removeAllChildren(){
            this._twoDShadowMapList.removeAllChildren();
            this._cubemapShadowMapList.removeAllChildren();
        }
    }
}

