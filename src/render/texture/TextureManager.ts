/// <reference path="../../definitions.d.ts"/>
module dy.render{
    export class TextureManager{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _textures:dyCb.Collection<Texture2D> = dyCb.Collection.create<Texture2D>();

        //public init(){
        //    this._textures.forEach((texture:Texture2D, index:number) => {
        //        texture.init();
        //    });
        //}

        public addChild(texture:Texture2D){
            this._textures.addChild(texture);

            texture.init();
        }

        public removeAllChildren(){
            var gl = Director.getInstance().gl;

            //todo all dispose

            this._textures.removeAllChildren();

            //gl.bindTexture(gl.TEXTURE_2D, null);
        }

        public update(){
            this._textures
                .filter((texture:Texture2D) => {
                    return texture.needUpdate;
                })
                .forEach((texture:Texture2D, index:number) => {
                    texture.update(index);
            });
        }

        public sendData(){
            this._textures.forEach((texture:Texture2D, index:number) => {
                texture.bindToUnit(index);
                texture.sendData(index);
            });
        }
    }
}
