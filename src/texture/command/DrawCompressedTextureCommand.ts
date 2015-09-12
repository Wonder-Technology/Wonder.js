/// <reference path="../../definitions.d.ts"/>
module dy{
    export class DrawCompressedTextureCommand extends DrawTextureCommand{
        public static create() {
            var obj = new this();

            return obj;
        }

        public mipmaps:dyCb.Collection<CompressedTextureMipmap> = null;
        //public texture:Texture = null;

        public execute(){
            var gl = Director.getInstance().gl,
                self = this;

            dyCb.Log.error(this.format === null, dyCb.Log.info.FUNC_NOT_SUPPORT(this.format));

            if (this.format !== TextureFormat.RGBA) {
                this.mipmaps.forEach((mipmap:CompressedTextureMipmap, index:number) => {
                    gl.compressedTexImage2D(self.glTarget, index, self.format, mipmap.width, mipmap.height, 0, self.getDrawTarget(mipmap.data));
                });
            }
            else{
                this.mipmaps.forEach((mipmap:CompressedTextureMipmap, index:number) => {
                    gl.texImage2D(self.glTarget, index, gl[self.format], mipmap.width, mipmap.height, 0, gl[self.format], gl[self.type], self.getDrawTarget(mipmap.data));
                });
            }
        }
    }
}
