module wd {
    export abstract class RenderTargetTexture extends Texture {
        public abstract createEmptyTexture();

        public initWhenCreate(){
            this.needUpdate = false;
        }

        public init(){
            //todo support mipmap?
            //this.generateMipmaps = false;
            this.minFilter = ETextureFilterMode.LINEAR;
            this.magFilter = ETextureFilterMode.LINEAR;
            this.wrapS = ETextureWrapMode.CLAMP_TO_EDGE;
            this.wrapT = ETextureWrapMode.CLAMP_TO_EDGE;

            return this;
        }

        public update(){
        }

        public getPosition(){
            return this.geometry.entityObject.transform.position;
        }

        @require(function(texture:any){
            Log.assert(!!texture, Log.info.FUNC_NOT_EXIST("texture object"));
        })
        protected setEmptyTexture(texture:any){
            var gl = DeviceManager.getInstance().gl;

            gl.bindTexture(gl[this.target], texture);


            this.setTextureParameters(gl[this.target], this.isSourcePowerOfTwo());
            //todo support mipmap?
            //if (this.generateMipmaps && isSourcePowerOfTwo) {
            //    gl.generateMipmap(gl[this.target]);
            //}
        }
    }
}

