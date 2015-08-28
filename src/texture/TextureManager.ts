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
            var copyTexture = texture.copy();

            copyTexture.init();

            this._textures.addChild(copyTexture);
        }

        public getChildren(){
            return this._textures.getChildren();
        }

        public getChild(index){
            return this._textures.getChild(index);
        }

        public removeAllChildren(){
            var gl = Director.getInstance().gl;

            //todo all dispose

            this._textures.removeAllChildren();

            //gl.bindTexture(gl.TEXTURE, null);
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
