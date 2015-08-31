/// <reference path="../definitions.d.ts"/>
module dy{
    export class TwoDTexture extends Texture{
        public static create(source:any=Texture.defaultTexture){
            var obj = new this(source);

            return obj;
        }

        public copy(){
            return this.copyHelper(TwoDTexture.create());
        }

        protected allocateSourceToTexture(isSourcePowerOfTwo:boolean) {
            var self = this;

            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels

            if(isSourcePowerOfTwo && this.mipmaps.getCount() > 0) {
                this.mipmaps.forEach((mipmap:HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, index:number) => {
                    self._drawTexture(index, mipmap);
                });

                this.generateMipmaps = false;
            }
            else {
                this._drawTexture(0, this.source);
            }
        }

        private _drawTexture(index:number, source:any){
            var gl = Director.getInstance().gl;

            gl.texImage2D(gl.TEXTURE_2D, index, gl[this.format], gl[this.format], gl[this.type], this.getDrawTarget(source));
        }
    }
}
