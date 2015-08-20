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
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT(extname));
                    break;
            }

            return loader;
        }
    }
}
