/// <reference path="../definitions.d.ts"/>
module dy{
    export class TextureManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _textures:dyCb.Collection<Texture> = dyCb.Collection.create<Texture>();

        public init(){
            this._textures.forEach((texture:Texture) => {
                texture.init();
            });
        }

        public addChild(asset:TextureAsset);
        public addChild(assets:Array<ICubemapData>);
        public addChild(texture:Texture);

        public addChild(arg){
            if(arguments[0] instanceof TextureAsset){
                let asset:TextureAsset = arguments[0];

                this._textures.addChild(asset.toTexture());
            }
            else if(JudgeUtils.isArray(arguments[0])){
                let assets:Array<ICubemapData> = arguments[0];

                this._textures.addChild(CubeTexture.create(assets));
            }
            else if(arguments[0] instanceof Texture){
                let texture:Texture = arguments[0];

                this._textures.addChild(texture);
            }
        }

        public getChildren(){
            return this._textures.getChildren();
        }

        public getChild(index){
            return this._textures.getChild(index);
        }

        public removeAllChildren(){
            this._textures.removeAllChildren();
        }

        public dispose(){
            this._textures.forEach((texture:Texture) => {
                texture.dispose();
            });

            this.removeAllChildren();
        }

        public update(){
            this._textures
                .filter((texture:Texture) => {
                    return texture.needUpdate;
                })
                .forEach((texture:Texture, index:number) => {
                    texture.update(index);
            });
        }

        public sendData(){
            this._textures.forEach((texture:Texture, index:number) => {
                texture.bindToUnit(index);
                texture.sendData(index);
            });
        }
    }
}
