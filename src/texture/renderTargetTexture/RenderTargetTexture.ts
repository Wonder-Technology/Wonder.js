/// <reference path="../../definitions.d.ts"/>
module dy {
    export abstract class RenderTargetTexture extends Texture {
        public abstract createEmptyTexture();

        public init(){
            //todo support mipmap?
            this.generateMipmaps = false;
            this.minFilter = TextureFilterMode.LINEAR;
            this.magFilter = TextureFilterMode.LINEAR;
            this.wrapS = TextureWrapMode.CLAMP_TO_EDGE;
            this.wrapT = TextureWrapMode.CLAMP_TO_EDGE;

            return this;
        }

        public setTexture(texture:any){
            this.glTexture = texture;
        }

        public getPosition(){
            return this.geometry.gameObject.transform.position;
        }

        public update(index:number){
            return this;
        }

        protected setEmptyTexture(texture){
            var gl = DeviceManager.getInstance().gl;

            dyCb.Log.error(!texture, "Failed to create texture object");

            gl.bindTexture(gl[this.target], texture);


            this.setTextureParameters(gl[this.target], this.isSourcePowerOfTwo());
            //todo support mipmap?
            //if (this.generateMipmaps && isSourcePowerOfTwo) {
            //    gl.generateMipmap(gl[this.target]);
            //}
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
        }
    }
}

