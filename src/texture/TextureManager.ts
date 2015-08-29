/// <reference path="../definitions.d.ts"/>
module dy{
    export class TextureManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _textures:dyCb.Collection<Texture> = dyCb.Collection.create<Texture>();

        //public init(){
        //    this._textures.forEach((texture:Texture, index:number) => {
        //        texture.init();
        //    });
        //}

        public addChild(texture:Texture){
            //var copyTexture = texture.copy();
            //
            //copyTexture.init();

            this._textures.addChild(texture.copy().init());
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
