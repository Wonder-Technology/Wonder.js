/// <reference path="../definitions.d.ts"/>
module dy{
    export class TextureManager{
        public static create(material:Material) {
        	var obj = new this(material);

        	return obj;
        }

        constructor(material:Material){
            this._material = material;
        }

        private _material:Material = null;
        private _textures:dyCb.Hash<any> = dyCb.Hash.create<any>();
        private _mirrorMap:MirrorTexture = null;

        public init(){
            this._getMapList().forEach((texture:Texture) => {
                texture.init();
            });
        }

        public addMap(asset:TextureAsset);
        public addMap(asset:TextureAsset, option:MapVariableData);
        public addMap(map:Texture);
        public addMap(map:Texture, option:MapVariableData);

        public addMap(...args){
            var map = null;
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
            this._textures.appendChild("map", map);
        }

        public getMap(index:number){
            return this._textures.getChild("map").getChild(index);
        }

        public hasMap(func:(...args)=>boolean);
        public hasMap(map:Texture);

        public hasMap(...args){
            var maps = null;

            maps = this._textures.getChild("map");

            return maps && maps.hasChild(arguments[0]);
        }

        public getMapCount(){
            var map = this._textures.getChild("map");

            return map ? map.getCount() : 0;
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

        public removeAllChildren(){
            this._textures.removeAllChildren();
        }

        public dispose(){
            this._getMapList().forEach((texture:Texture) => {
                texture.dispose();
            });

            this.removeAllChildren();
        }

        public update(){
            this._getMapList()
                .filter((texture:Texture) => {
                    return texture instanceof BasicTexture && texture.needUpdate;
                })
                .forEach((texture:BasicTexture, index:number) => {
                    texture.update(index);
                });
        }

        public sendData(program:Program){
            this._getMapList().forEach((texture:Texture, index:number) => {
                var samplerName = texture.getSamplerName(index),
                    pos = program.getUniformLocation(samplerName);

                if(program.isUniformDataNotExistByLocation(pos)){
                    return;
                }

                texture.bindToUnit(index);
                texture.sendData(program, pos, index);
            });
        }

        private _getMapList(){
            return this._textures.toCollection();
        }

        private _getMap<T>(key:string):T{
            return this._textures.getChild(key);
        }

        private _setMap(key:string, map:Texture);
        private _setMap(key:string, map:Texture, option:MapVariableData);

        private _setMap(...args){
            var key:string = args[0],
                map:Texture = args[1];

            if(arguments.length === 3){
                let option:MapVariableData = args[1];

                this._setMapOption(map, option);
            }

            map.material = this._material;

            this._textures.addChild(key, map);
        }

        private _setMapOption(map:Texture, option:MapVariableData){
            map.variableData = option;
        }
    }
}
