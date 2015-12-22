/// <reference path="../filePath.d.ts"/>
module wd{
    export class LoaderFactory{
        public static create(type:AssetType, extname:string) {
            var loader = null;

            switch (type){
                case AssetType.FONT:
                    loader = FontLoader.getInstance();
                    break;
                case AssetType.UNKNOW:
                    loader = this._getLoaderByExtname(extname);
                    break;
                default:
                    wdCb.Log.error(true, wdCb.Log.info.FUNC_UNKNOW(`asset type:${type}`));
                    break;
            }

            return loader;
        }

        public static createAllLoader():wdCb.Collection<Loader>{
            return wdCb.Collection.create<Loader>([JsLoader.getInstance(), GLSLLoader.getInstance(), TextureLoader.getInstance(), VideoLoader.getInstance(), FontLoader.getInstance()]);
        }

        private static _getLoaderByExtname(extname:string){
            var loader = null;

            switch (extname){
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
                case ".wd":
                    loader = WDLoader.getInstance();
                    break;
                case ".eot":
                case ".ttf":
                case ".woff":
                case ".svg":
                    loader = FontLoader.getInstance();
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNKNOW(`extname:${extname}`));
                    break;
            }

            return loader;
        }
    }
}
