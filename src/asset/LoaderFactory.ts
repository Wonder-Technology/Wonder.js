/// <reference path="../definitions.d.ts"/>
module dy{
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
                //case ".bmp":
                    loader = TextureLoader.getInstance();
                    break;
                case ".mp4":
                case ".ogv":
                case ".webm":
                    loader = VideoLoader.getInstance();
                    break;
                case ".obj":
                    loader = OBJLoader.getInstance();
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(extname));
                    break;
            }

            return loader;
        }

        public static createAllLoader():dyCb.Collection<Loader>{
            return dyCb.Collection.create<Loader>([JsLoader.getInstance(), GLSLLoader.getInstance(), TextureLoader.getInstance(), VideoLoader.getInstance(), OBJLoader.getInstance()]);
        }
    }
}
