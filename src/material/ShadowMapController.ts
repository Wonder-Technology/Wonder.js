module wd{
    export class ShadowMapController extends MapController{
        public static create() {
            var obj = new this(null);

            return obj;
        }

        private _twoDShadowMapList:wdCb.Collection<TwoDShadowMapTexture> = wdCb.Collection.create<TwoDShadowMapTexture>();

        public addTwoDShadowMap(shadowMap:TwoDShadowMapTexture){
            this.setMapOption(shadowMap, {
                samplerData: this._twoDShadowMapList.getCount()
            });

            this._twoDShadowMapList.addChild(shadowMap);
        }

        public getTwoDShadowMapList(){
            return this._twoDShadowMapList;
        }

        public hasTwoDShadowMap(shadowMap:TwoDShadowMapTexture){
            return this.hasMapHelper(this._twoDShadowMapList, shadowMap);
        }

        public getAllMapArr(){
            return this._twoDShadowMapList.toArray();
        }

        public removeAllChildren(){
            this._twoDShadowMapList.removeAllChildren();
        }
    }
}

