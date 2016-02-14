module wd {
    export abstract class RenderTargetTexture extends Texture {
        public abstract createEmptyTexture();

        public init(){
            //todo support mipmap?
            //this.generateMipmaps = false;
            this.minFilter = ETextureFilterMode.LINEAR;
            this.magFilter = ETextureFilterMode.LINEAR;
            this.wrapS = ETextureWrapMode.CLAMP_TO_EDGE;
            this.wrapT = ETextureWrapMode.CLAMP_TO_EDGE;

            return this;
        }

        public getPosition(){
            return this.geometry.entityObject.transform.position;
        }

        protected setEmptyTexture(texture){
            var gl = DeviceManager.getInstance().gl;

            Log.error(!texture, "Failed to create texture object");

            gl.bindTexture(gl[this.target], texture);


            this.setTextureParameters(gl[this.target], this.isSourcePowerOfTwo());
            //todo support mipmap?
            //if (this.generateMipmaps && isSourcePowerOfTwo) {
            //    gl.generateMipmap(gl[this.target]);
            //}
        }
    }
}

