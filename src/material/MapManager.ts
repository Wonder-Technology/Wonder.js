module wd{
    export class MapManager{
        public static create(material:Material) {
            var obj = new this(material);

            obj.initWhenCreate();

            return obj;
        }

        constructor(material:Material){
            this._material = material;
        }

        private _material:Material = null;
        private _textureDirty:boolean = false;
        private _allMapsCache:Array<Texture> = null;
        private _allSingleMapsCache:Array<Texture> = null;

        private _shadowMapController:ShadowMapController = null;
        private _envMapController:EnvMapController = null;
        private _arrayMapController:ArrayMapController = null;
        private _commonMapController:CommonMapController = null;

        public initWhenCreate(){
            this._shadowMapController = ShadowMapController.create(this._material);
            this._envMapController = EnvMapController.create(this._material);
            this._arrayMapController = ArrayMapController.create(this._material);
            this._commonMapController = CommonMapController.create(this._material);
        }

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
            assert(args[0] instanceof TextureAsset || args[0] instanceof Texture, Log.info.FUNC_SHOULD("arguments[0]", "be TextureAsset || Texture"));
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
            assert(JudgeUtils.isArrayExactly(mapArray), Log.info.FUNC_SHOULD("second param", "be array"));

            for(let map of mapArray){
                assert(map instanceof Texture, Log.info.FUNC_SHOULD(Log.info.FUNC_SHOULD("second param", "be Array<Texture>")));
            }
        })
        public addArrayMap(samplerName:string, mapArray:Array<Texture>){
            this._arrayMapController.addArrayMap(samplerName, mapArray);

            this._textureDirty = true;
        }

        @require(function(shadowMap:IShadowMapTexture){
            assert(!this._shadowMapController.hasTwoDShadowMap(shadowMap), Log.info.FUNC_SHOULD_NOT("add the shadowMap which is already exist"));
        })
        public addTwoDShadowMap(shadowMap:TwoDShadowMapTexture){
            this._shadowMapController.addTwoDShadowMap(shadowMap);

            this._textureDirty = true;
        }

        public getTwoDShadowMapList(){
            return this._shadowMapController.getTwoDShadowMapList();
        }

        public hasTwoDShadowMap(shadowMap:TwoDShadowMapTexture){
            return this._shadowMapController.hasTwoDShadowMap(shadowMap);
        }

        @ensure(function(mapList:wdCb.Collection<BasicTexture|ProceduralTexture>){
            mapList.forEach((map:BasicTexture|ProceduralTexture) => {
                assert(map instanceof BasicTexture || map instanceof ProceduralTexture, Log.info.FUNC_SHOULD("mapList", "only contain BasicTexture or ProceduralTexture"));
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

        public removeAllChildren(){
            for(let controller of this._getAllControllerArr()){
                controller.removeAllChildren();
            }

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

                assert(mapMap[samplerName] !== 1, Log.info.FUNC_SHOULD_NOT(`has duplicate maps, but actual has the ones with the same samplerName:${samplerName}`));

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
                assert(map instanceof Texture, Log.info.FUNC_SHOULD("each element", "be Texture"));
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
                arr = arr.concat(controller.getAllMapArr());
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
