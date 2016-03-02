module wd{
    export class MapManager{
        public static create(material:Material) {
            var obj = new this(material);

            return obj;
        }

        constructor(material:Material){
            this._material = material;
        }

        private _material:Material = null;
        private _mapTable:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _mirrorMap:MirrorTexture = null;
        private _textureDirty:boolean = false;
        private _mapArrCache:Array<Texture> = null;

        public init(){
            var mapList = this._getMapArr();

            for(let i = 0, len = mapList.length; i < len; i++){
                let texture = mapList[i];

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

            if(args.length === 2){
                let option = args[1];

                this._setMapOption(map, option);
            }

            map.material = this._material;
            this._mapTable.appendChild("map", map);

            this._textureDirty = true;
        }

        public getMap(index:number);
        public getMap(func:(map:Texture) => boolean);

        public getMap(...args){
            var mapList = this._mapTable.getChild("map");

            if(JudgeUtils.isNumber(args[0])){
                let index:number = args[0];

                return mapList.getChild(index);
            }
            else{
                let func = args[0];

                return mapList.findOne(func);
            }
        }

        public getProceduralMap():ProceduralTexture{
            return this.getMap((map:Texture) => {
                return map instanceof ProceduralTexture;
            });
        }

        @ensure(function(mapList:wdCb.Collection<BasicTexture|ProceduralTexture>){
            mapList.forEach((map:BasicTexture|ProceduralTexture) => {
                assert(map instanceof BasicTexture || map instanceof ProceduralTexture, Log.info.FUNC_SHOULD("mapList", "only contain BasicTexture or ProceduralTexture"));
            })
        })
        public getMapList():wdCb.Collection<BasicTexture|ProceduralTexture>{
            var self = this,
                map = this._mapTable.getChild("map");

            return map ? this._mapTable.getChild("map")
                .filter((map:Texture) => {
                    return !self.isMirrorMap(map);
                }) : wdCb.Collection.create<BasicTexture|ProceduralTexture>();
        }

        public hasMap(func:(...args) => boolean);
        public hasMap(map:Texture);

        public hasMap(...args){
            var mapList:wdCb.Collection<Texture> = null;

            mapList = this._mapTable.getChild("map");

            if(!mapList){
                return false;
            }

            if(JudgeUtils.isFunction(args[0])){
                return mapList.hasChildWithFunc(args[0]);
            }
            else{
                return mapList.hasChild(args[0]);
            }
        }

        public getMapCount(){
            var self = this,
                map = this._mapTable.getChild("map");

            return map ? map.filter((map:Texture) => {
                return !self.isMirrorMap(map);
            }).getCount() : 0;
        }

        public getEnvMap(){
            return this._getMap<CubemapTexture>("envMap");
        }

        public setEnvMap(envMap:CubemapTexture){
            this._setMap("envMap", envMap);
        }

        public getMirrorMap(){
            return this._mirrorMap;
        }

        public setMirrorMap(mirrorMap:MirrorTexture){
            this.addMap(mirrorMap, {
                samplerVariableName: VariableNameTable.getVariableName("mirrorReflectionMap")
            });

            this._mirrorMap = mirrorMap;
        }

        public isMirrorMap(map:Texture){
            return map === this._mirrorMap;
        }

        public removeAllChildren(){
            this._mapTable.removeAllChildren();

            this._textureDirty = true;
        }

        public dispose(){
            var mapList = this._getMapArr();

            for(let i = 0, len = mapList.length; i < len; i++){
                let texture = mapList[i];

                texture.dispose();
            }

            this.removeAllChildren();
        }

        public update(){
            var mapList = this._getMapArr();

            //todo refactor: filter->not update render texture

            for(let i = 0, len = mapList.length; i < len; i++){
                let texture = mapList[i];

                if(texture.needUpdate && texture instanceof BasicTexture){
                    texture.update(i);
                }
            }
        }

        public sendData(program:Program){
            var mapList = this._getMapArr();

            for(let i = 0, len = mapList.length; i < len; i++){
                let texture = mapList[i],
                    samplerName = texture.getSamplerName(i),
                    pos = program.getUniformLocation(samplerName);

                if(program.isUniformDataNotExistByLocation(pos)){
                    return;
                }
                //todo optimize: if render texture, not judge isExist

                texture.bindToUnit(i);

                //if(texture instanceof BasicTexture){
                    texture.sendData(program, pos, i);
                //}
            }
        }

        @cache(function(){
            return !this._textureDirty && this._mapArrCache;
        }, function(){
            return this._mapArrCache;
        }, function(mapList:wdCb.Collection<Texture>){
            this._mapArrCache = mapList;
            this._textureDirty = false;
        })
        private _getMapArr(){
            return this._mapTable.toArray();
        }

        private _getMap<T>(key:string):T{
            return this._mapTable.getChild(key);
        }

        private _setMap(key:string, map:Texture);
        private _setMap(key:string, map:Texture, option:MapVariableData);

        private _setMap(...args){
            var key:string = args[0],
                map:Texture = args[1];

            if(!map){
                this._removeMap(key, map);

                return;
            }

            if(arguments.length === 3){
                let option:MapVariableData = args[1];

                this._setMapOption(map, option);
            }

            map.material = this._material;

            this._mapTable.addChild(key, map);
        }

        private _removeMap(key:string, map:Texture){
            this._mapTable.removeChild(key);
            this._textureDirty = true;
        }

        private _setMapOption(map:Texture, option:MapVariableData){
            map.variableData = option;
        }
    }
}
