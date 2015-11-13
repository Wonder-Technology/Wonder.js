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

        public init(){
            this._getMapList().forEach((texture:Texture) => {
                texture.init();
            });
        }

        public addMap(asset:TextureAsset);
        public addMap(asset:TextureAsset, option:MapVariableData);
        public addMap(map:Texture);
        public addMap(map:Texture, option:MapVariableData);

        public addMap(arg){
            var map = null;
                if(arguments[0] instanceof TextureAsset){
                    let asset:TextureAsset = arguments[0];

                    map = asset.toTexture();
                }
                else if(arguments[0] instanceof Texture){
                    map = arguments[0];
                }

            if(arguments.length === 2){
                let option = arguments[1];

                map.variableData = option;
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

        public setEnvMap(envMap:CubemapTexture){
            envMap.material = this._material;
            this._textures.addChild("envMap", envMap);
        }

        public getEnvMap():CubemapTexture{
            return <CubemapTexture>this._textures.getChild("envMap");
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
    }
}
