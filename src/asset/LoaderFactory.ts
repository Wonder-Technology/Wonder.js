module wd{
    export class LoaderFactory{
        public static create(type:EAssetType, extname:string) {
            var loader = null;

            switch (type){
                case EAssetType.FONT:
                    loader = FontLoader.getInstance();
                    break;
                case EAssetType.UNKNOW:
                    loader = this._getLoaderByExtname(extname);
                    break;
                default:
                    wdCb.Log.error(true, wdCb.Log.info.FUNC_UNKNOW(`asset type:${type}`));
                    break;
            }

            return loader;
        }

        public static createAllLoader():wdCb.Collection<Loader>{
            return wdCb.Collection.create<Loader>([JsLoader.getInstance(), GLSLLoader.getInstance(), TextureLoader.getInstance(), VideoLoader.getInstance(), FontLoader.getInstance(), FntLoader.getInstance()]);
        }

        private static _getLoaderByExtname(extname:string){
            var loader = null;

            switch (extname){
                case ".json":
                    loader = JSONLoader.getInstance();
                    break;
                case ".js":
                    loader = JsLoader.getInstance();
                    break;
                case ".glsl":
                    loader = GLSLLoader.getInstance();
                    break;
                case ".jpg":
                case ".jpeg":
                case ".png":
                case ".dds":
                case ".gif":
                case ".bmp":
                    loader = TextureLoader.getInstance();
                    break;
                case ".mp4":
                case ".ogv":
                case ".webm":
                    loader = VideoLoader.getInstance();
                    break;
                case ".gltf":
                    loader = GLTFLoader.getInstance();
                    break;
                case ".wd":
                    loader = WDLoader.getInstance();
                    break;
                case ".eot":
                case ".ttf":
                case ".woff":
                case ".svg":
                    loader = FontLoader.getInstance();
                    break;
                case ".fnt":
                    loader = FntLoader.getInstance();
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNKNOW(`extname:${extname}`));
                    break;
            }

            return loader;
        }
    }
}
