module wd{
    export abstract class DrawTwoDTextureCommand extends DrawTextureCommand{
        public source:any = null;

        protected drawTexture(index:number, source:any){
            var gl = DeviceManager.getInstance().gl;

            gl.texImage2D(this.glTarget, index, gl[this.format], gl[this.format], gl[this.type], this.getDrawTarget(source));
        }
    }
}

