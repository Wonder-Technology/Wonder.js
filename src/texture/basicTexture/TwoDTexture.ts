/// <reference path="../../definitions.d.ts"/>
module dy{
    export class TwoDTexture extends CommonTexture{
        public static create(asset:TwoDTextureAsset);
        public static create(canvas:HTMLCanvasElement);

        public static create(arg) {
            var obj = new this();

            obj.initWhenCreate(arg);

            return obj;
        }


        public initWhenCreate(asset:TwoDTextureAsset);
        public initWhenCreate(canvas:HTMLCanvasElement);

        public initWhenCreate(arg){
            if(arguments[0] instanceof TwoDTextureAsset){
                let asset = arguments[0];

                super.initWhenCreate(asset);
            }
            else{
                let canvas = arguments[0];

                TwoDTextureAsset.create(canvas).copyTo(this);
            }
        }
    }
}
