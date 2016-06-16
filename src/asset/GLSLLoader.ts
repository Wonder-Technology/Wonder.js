module wd{
    @singleton()
    export class GLSLLoader extends Loader{
        public static getInstance():any {}

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0];

            return AjaxLoader.load(url, "text");
        }
    }
}
