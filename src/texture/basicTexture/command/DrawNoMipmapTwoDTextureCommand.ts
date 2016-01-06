module wd{
    export class DrawNoMipmapTwoDTextureCommand extends DrawTwoDTextureCommand{
        public static create() {
            var obj = new this();

            return obj;
        }

        public execute(){
            this.drawTexture(0, this.source);
        }
    }
}

