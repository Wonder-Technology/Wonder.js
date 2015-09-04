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

        protected loadAsset(url:string):dyRt.Stream;
        protected loadAsset(url:Array<string>):dyRt.Stream;

        protected loadAsset(arg):dyRt.Stream {
            var extname = null,
                stream = null,
                url = arguments[0];

            dyCb.Log.error(JudgeUtils.isArray(url), dyCb.Log.info.FUNC_MUST_BE("texture's url", "string"));

            extname = dyCb.PathUtils.extname(url).toLowerCase();

            switch (extname){
                case ".jpg":
                case ".jpeg":
                case ".gif":
                    //todo is RGB?
                    stream =  ImgLoader.load(url)
                        .map((image:HTMLImageElement) => {
                            var asset = TwoDTextureAsset.create(image);

                            asset.format = TextureFormat.RGB;

                            return asset;
                        });
                    break;
                case ".png":
                    stream =  ImgLoader.load(url)
                        .map((image:HTMLImageElement) => {
                            return TwoDTextureAsset.create(image);
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

