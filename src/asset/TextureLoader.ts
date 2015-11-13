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

        @In(function (...args) {
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(arg):dyRt.Stream {
            var extname = null,
                stream = null,
                url = arguments[0];

            extname = dyCb.PathUtils.extname(url).toLowerCase();

            switch (extname){
                case ".jpg":
                case ".jpeg":
                case ".gif":
                    case ".bmp":
                    //todo is RGB?
                    stream =  ImgLoader.load(url)
                        .map((image:HTMLImageElement) => {
                            var asset = ImageTextureAsset.create(image);

                            asset.format = TextureFormat.RGB;

                            return asset;
                        });
                    break;
                case ".png":
                    stream =  ImgLoader.load(url)
                        .map((image:HTMLImageElement) => {
                            return ImageTextureAsset.create(image);
                        });
                    break;
                case ".dds":
                    stream = CompressedTextureLoader.load(url);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(extname));
                    break;
            }

            return stream;
        }
    }
}

