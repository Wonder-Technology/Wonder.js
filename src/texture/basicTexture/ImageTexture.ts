/// <reference path="../../definitions.d.ts"/>
module dy{
    export class ImageTexture extends CommonTexture{
        public static create(asset:ImageTextureAsset);
        public static create(canvas:HTMLCanvasElement);

        public static create(arg) {
            var obj = new this();

            obj.initWhenCreate(arg);

            return obj;
        }


        public initWhenCreate(asset:ImageTextureAsset);
        public initWhenCreate(canvas:HTMLCanvasElement);

        public initWhenCreate(arg){
            if(arguments[0] instanceof ImageTextureAsset){
                let asset:ImageTextureAsset = arguments[0];

                super.initWhenCreate(asset);
            }
            else{
                let canvas:HTMLCanvasElement = arguments[0];

                super.initWhenCreate(ImageTextureAsset.create(canvas));
            }
        }
    }
}
