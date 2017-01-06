module wd{
    export class MapManager{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _material:Material = null;
        get material(){
            return this._material;
        }
        set material(material:Material){
            this._material = material;

            this._envMapController.material = material;
            this._commonMapController.material = material;
        }

        private _textureDirty:boolean = false;
        private _allMapsCache:Array<Texture> = null;
        private _allSingleMapsCache:Array<Texture> = null;

        private _shadowMapController:any = ClassUtils.createClassInstanceOrEmpty("ShadowMapController", "EmptyShadowMapController", this);
        private _arrayMapController:MapArrayController = MapArrayController.create();
        private _envMapController:EnvMapController = EnvMapController.create();
        private _commonMapController:CommonMapController = CommonMapController.create();

        public init(){
            var mapArr = this._getAllMaps();

            for(let i = 0, len = mapArr.length; i < len; i++){
                let texture = mapArr[i];

                texture.init();
            }
        }

        public addMap(asset:TextureAsset);
        public addMap(asset:TextureAsset, option:MapVariableData);
        public addMap(map:Texture);
        public addMap(map:Texture, option:MapVariableData);

        @require(function(...args){
            it("arguments[0] should be TextureAsset or Texture", () => {
                expect(args[0] instanceof TextureAsset || args[0] instanceof Texture).true;
            });
        })
        public addMap(...args){
            var map:Texture = null;

            if(args[0] instanceof TextureAsset){
                let asset:TextureAsset = args[0];

                map = asset.toTexture();
            }
            else if(args[0] instanceof Texture){
                map = args[0];
            }

            if(args.length === 1){
                this._commonMapController.addMap(map);
            }
            else{
                this._commonMapController.addMap(map, args[1]);
            }

            this._textureDirty = true;
        }

        @require(function(samplerName:string, mapArray:Array<Texture>){
            it("mapArray should be array", () => {
                expect(JudgeUtils.isArrayExactly(mapArray)).true;
            });

            for(let map of mapArray){
                it("mapArray should be Array<Texture>", () => {
                    expect(map).instanceof(Texture)
                });
            }
        })
        public addMapArray(samplerName:string, mapArray:Array<Texture>){
            this._arrayMapController.addMapArray(samplerName, mapArray);

            this._textureDirty = true;
        }

        @require(function(shadowMap:any){
            if(!JudgeUtils.isClass(this._shadowMapController, "EmptyShadowMapController")){
                it("shouldn't add the shadowMap which is already exist", () => {
                    expect(this._shadowMapController.hasTwoDShadowMap(shadowMap)).false;
                });
            }
        })
        public addTwoDShadowMap(shadowMap:any){
            this._shadowMapController.addTwoDShadowMap(shadowMap);

            this._textureDirty = true;
        }

        public getTwoDShadowMapList(){
            return this._shadowMapController.getTwoDShadowMapList();
        }

        public hasTwoDShadowMap(shadowMap:any){
            return this._shadowMapController.hasTwoDShadowMap(shadowMap);
        }

        @require(function(shadowMap:any){
            if(!JudgeUtils.isClass(this._shadowMapController, "EmptyShadowMapController")){
                it("shouldn't add the shadowMap which is already exist", () => {
                    expect(this._shadowMapController.hasCubemapShadowMap(shadowMap)).false;
                });
            }
        })
        public addCubemapShadowMap(shadowMap:any){
            this._shadowMapController.addCubemapShadowMap(shadowMap);

            this._textureDirty = true;
        }

        public getCubemapShadowMapList(){
            return this._shadowMapController.getCubemapShadowMapList();
        }

        public hasCubemapShadowMap(shadowMap:any){
            return this._shadowMapController.hasCubemapShadowMap(shadowMap);
        }

        @ensure(function(mapList:wdCb.Collection<BasicTexture|ProceduralTexture>){
            mapList.forEach((map:BasicTexture|ProceduralTexture) => {
                it("mapList should only contain BasicTexture or ProceduralTexture", () => {
                    expect(map instanceof BasicTexture || map instanceof ProceduralTexture).true;
                });
            })
        })
        public getMapList():wdCb.Collection<BasicTexture|ProceduralTexture>{
            return this._commonMapController.getMapList();
        }

        public hasMap(map:Texture){
            return this._commonMapController.hasMap(map);
        }

        public getMapCount(){
            return this.getMapList().getCount();
        }

        public getEnvMap(){
            return this._envMapController.getEnvMap();
        }

        public setEnvMap(envMap:CubemapTexture){
            if(!envMap){
                this._envMapController.setEnvMap(null);
                this._textureDirty = true;
                return;
            }

            this._envMapController.setEnvMap(envMap);
            this._textureDirty = true;
        }

        public removeChild(map:Texture){
            for(let controller of this._getAllControllerArr()){
                controller.removeChild(map);
            }

            this._textureDirty = true;
        }

        public removeAllChildren(){
            for(let controller of this._getAllControllerArr()){
                controller.removeAllChildren();
            }

            this._textureDirty = true;
        }

        public removeAllShdaowMaps(){
            this._shadowMapController.removeAllChildren();

            this._textureDirty = true;
        }

        public dispose(){
            var mapArr = this._getAllMaps();

            for(let i = 0, len = mapArr.length; i < len; i++){
                let texture = mapArr[i];

                texture.dispose();
            }

            this.removeAllChildren();
        }

        public bindAndUpdate(){
            var mapArr = this._getAllMaps();

            for(let i = 0, len = mapArr.length; i < len; i++){
                let texture = mapArr[i];

                texture.bindToUnit(i);

                if(texture.needUpdate){
                    texture.update(i);
                }
            }
        }

        @require(function(program:Program){
            var mapMap = {},
                maps = this._getAllMaps();

            for(let i = 0, len = maps.length; i < len; i++){
                let map = maps[i],
                    samplerName:string = map.getSamplerName(i);

                it(`shouldn't has duplicate maps, but actual has the ones with the same samplerName:${samplerName}`, () => {
                    expect(mapMap[samplerName]).not.equal(1);
                });

                mapMap[samplerName] = 1;
            }
        })
        public sendData(program:Program){
            this._sendSingleMapData(program);
            this._arrayMapController.sendMapData(program, this._getMaxUnitOfBindedSingleMap());
        }

        private _sendSingleMapData(program:Program){
            var mapArr = this._getAllSingleMaps(),
                len = mapArr.length;

            for(let i = 0; i < len; i++){
                let texture = mapArr[i];

                texture.sendData(program, texture.getSamplerName(i), i);
            }
        }

        @ensure(function(mapArr:Array<Texture>){
            for(let map of mapArr){
                it("all maps should be Texture", () => {
                    expect(map).instanceof(Texture);
                });
            }
        })
        @cache(function(){
            return !this._textureDirty && this._allMapsCache;
        }, function(){
            return this._allMapsCache;
        }, function(mapList:wdCb.Collection<Texture>){
            this._allMapsCache = mapList;
            this._textureDirty = false;
        })
        private _getAllMaps(){
            return [].concat(this._getAllSingleMaps(), this._arrayMapController.getAllMapArr());
        }

        private _getMaxUnitOfBindedSingleMap(){
            return this._getAllSingleMaps().length;
        }

        @cache(function(){
            return !this._textureDirty && this._allSingleMapsCache;
        }, function(){
            return this._allSingleMapsCache;
        }, function(mapList:wdCb.Collection<Texture>){
            this._allSingleMapsCache = mapList;
            this._textureDirty = false;
        })
        private _getAllSingleMaps(){
            var arr = [];

            for(let controller of this._getAllSingleMapControllerArr()){
                let map = controller.getAllMapArr();

                if(map !== null){
                    arr = arr.concat(map);
                }
            }

            return arr;
        }

        private _getAllSingleMapControllerArr(){
            return [this._shadowMapController, this._envMapController, this._commonMapController];
        }

        private _getAllControllerArr(){
            return [this._shadowMapController, this._envMapController, this._arrayMapController, this._commonMapController];
        }
    }

    export type MapVariableData = {
        samplerVariableName?: string;
        samplerData?:any
    }
}
