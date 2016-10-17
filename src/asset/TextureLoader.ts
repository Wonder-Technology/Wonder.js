module wd{
    @singleton()
    export class TextureLoader extends Loader{
        public static getInstance():any {}

		private constructor(){super();}

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var extname = null,
                stream = null,
                url = args[0];

            extname = wdCb.PathUtils.extname(url).toLowerCase();

            switch (extname){
                case ".jpg":
                case ".jpeg":
                case ".gif":
                    case ".bmp":
                    //todo is RGB?
                    stream =  ImageLoader.load(url)
                        .map((image:HTMLImageElement) => {
                            var asset = ImageTextureAsset.create(image);

                            asset.format = ETextureFormat.RGB;

                            return asset;
                        });
                    break;
                case ".png":
                    stream =  ImageLoader.load(url)
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

