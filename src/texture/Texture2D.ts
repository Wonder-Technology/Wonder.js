/// <reference path="../definitions.d.ts"/>
module dy{
    export class Texture2D extends Texture{
        public static create(source:any=Texture.defaultTexture){
            var obj = new this(source);

            return obj;
        }

        public copy(){
            return this.copyHelper(Texture2D.create());
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
                var gl = Director.getInstance().gl;

            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels

            if(isSourcePowerOfTwo && this.mipmaps.getCount() > 0) {
                this.mipmaps.forEach((mipmap:IMipmap, index:number) => {
                    gl.texImage2D(gl.TEXTURE_2D, index, gl[this.format], gl[this.format], gl[this.type], mipmap);
                });

                this.generateMipmaps = false;
            }
            else {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl[this.format], gl[this.format], gl[this.type], this.source);
            }
        }
    }
}
