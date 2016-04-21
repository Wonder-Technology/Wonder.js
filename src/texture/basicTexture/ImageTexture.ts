module wd{
    export class ImageTexture extends CommonTexture{
        public static create(asset:ImageTextureAsset);
        public static create(canvas:HTMLCanvasElement);

        public static create(arg:any) {
            var obj = new this(arg);

            obj.initWhenCreate();

            return obj;
        }

        constructor(asset:ImageTextureAsset);
        constructor(canvas:HTMLCanvasElement);

        constructor(arg:any){
            if(arg instanceof ImageTextureAsset){
                let asset:ImageTextureAsset = arg;

                super(asset);
            }
            else{
                let canvas:HTMLCanvasElement = arg;

                super(ImageTextureAsset.create(canvas));
            }
        }
    }
}
