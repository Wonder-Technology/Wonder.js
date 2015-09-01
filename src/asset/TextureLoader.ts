/// <reference path="../definitions.d.ts"/>
module dy{
    export class TextureLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        protected loadAsset(url:string):dyRt.Stream {
            var extname = dyCb.PathUtils.extname(url).toLowerCase(),
                stream = null;

            switch (extname){
                case ".jpg":
                case ".jpeg":
                case ".gif":
                    //todo is RGB?
                    stream =  ImgLoader.load(url)
                        .map((image:HTMLImageElement) => {
                            var asset = CommonTextureAsset.create(image);

                            asset.format = TextureFormat.RGB;

                            return asset;
                        });
                    break;
                case ".png":
                    stream =  ImgLoader.load(url)
                        .map((image:HTMLImageElement) => {
                            return CommonTextureAsset.create(image);
                        });
                    break;
                case ".dds":
                    stream = CompressedTextureLoader.load(url);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT(extname));
                    break;
            }

            return stream;
        }
    }
}

