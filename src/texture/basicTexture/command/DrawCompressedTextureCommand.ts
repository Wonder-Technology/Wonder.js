/// <reference path="../../../filePath.d.ts"/>

module wd{
    export class DrawCompressedTextureCommand extends DrawTextureCommand{
        public static create() {
            var obj = new this();

            return obj;
        }

        public mipmaps:wdCb.Collection<CompressedTextureMipmap> = null;

        public execute(){
            var gl = DeviceManager.getInstance().gl,
                self = this;

            Log.error(this.format === null, Log.info.FUNC_NOT_SUPPORT(this.format));

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
