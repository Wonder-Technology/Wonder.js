/// <reference path="../definitions.d.ts"/>
module dy{
    export class TextureManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _textures:dyCb.Hash<any> = dyCb.Hash.create<any>();

        public init(){
            this._getTextureList().forEach((texture:Texture) => {
                texture.init();
            });
        }

        public addMap(asset:TextureAsset);
        public addMap(map:CommonTexture|CompressedTexture);

        public addMap(arg){
            var map = null;
                if(arguments[0] instanceof TextureAsset){
                    let asset:TextureAsset = arguments[0];

                    map = asset.toTexture();
                }
                else if(arguments[0] instanceof CommonTexture
                || arguments[0] instanceof CompressedTexture){
                    map = arguments[0];
                }


            this._textures.appendChild("map", map);
        }

        public getMap(index:number){
            return this._textures.getChild("map").getChild(index);
        }

        public setEnvMap(envMap:CubemapTexture){
            this._textures.addChild("envMap", envMap);
        }

        public getEnvMap():CubemapTexture{
            return <CubemapTexture>this._textures.getChild("envMap");
        }

        public removeAllChildren(){
            this._textures.removeAllChildren();
        }

        public dispose(){
            this._getTextureList().forEach((texture:Texture) => {
                texture.dispose();
            });

            this.removeAllChildren();
        }

        public update(){
            this._getTextureList()
                .filter((texture:Texture) => {
                    return texture.needUpdate;
                })
                .forEach((texture:Texture, index:number) => {
                    texture.update(index);
                });
        }

        public sendData(program:render.Program){
            this._getTextureList().forEach((texture:Texture, index:number) => {
                texture.bindToUnit(index);
                texture.sendData(program, index);
            });
        }

        public hasMultiTextures(){
            return this._getTextureList().getCount() > 1;
        }

        private _getTextureList(){
            return this._textures.toCollection();
        }
    }
}
