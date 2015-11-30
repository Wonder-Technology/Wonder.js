/// <reference path="../filePath.d.ts"/>
module wd{
    export class LoaderFactory{
        public static create(extname:string) {
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
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(extname));
                    break;
            }

            return loader;
        }

        public static createAllLoader():wdCb.Collection<Loader>{
            return wdCb.Collection.create<Loader>([JsLoader.getInstance(), GLSLLoader.getInstance(), TextureLoader.getInstance(), VideoLoader.getInstance()]);
        }
    }
}
