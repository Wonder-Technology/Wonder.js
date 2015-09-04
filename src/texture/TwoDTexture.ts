/// <reference path="../definitions.d.ts"/>
module dy{
    export class TwoDTexture extends CommonTexture{
        public static create(asset:CommonTextureAsset);
        public static create(canvas:HTMLCanvasElement);

        public static create(arg) {
            var obj = new this();

            obj.initWhenCreate(arg);

            return obj;
        }


        public initWhenCreate(asset:CommonTextureAsset);
        public initWhenCreate(canvas:HTMLCanvasElement);

        public initWhenCreate(arg){
            if(arguments[0] instanceof CommonTextureAsset){
                let asset = arguments[0];

                super.initWhenCreate(asset);
            }
            else{
                let canvas = arguments[0];

                CommonTextureAsset.create(canvas).copyTo(this);
            }
        }
    }
}
