/// <reference path="../../definitions.d.ts"/>
module dy.render{
    export class TextureManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _textures:dyCb.Collection<Texture2D> = dyCb.Collection.create<Texture2D>();

        public addChild(texture:Texture2D){
            this._textures.addChild(texture);
        }

        public removeAllChildren(){
            var gl = Director.getInstance().gl;

            this._textures.removeAllChildren();

            gl.bindTexture(gl.TEXTURE_2D, null);
        }

        public sendData(){
            this._textures.forEach((texture:Texture2D, index:number) => {
                texture.bindToUnit(index);
                texture.sendData(index);
            });
        }
    }
}
